-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  date_of_birth DATE,
  conditions TEXT[], -- Array of chronic conditions (diabetes, hypertension, etc.)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create health metrics table
CREATE TABLE public.health_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- 'blood_pressure', 'glucose', 'heart_rate', 'weight'
  value JSONB NOT NULL, -- Flexible structure for different metric types
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own metrics"
  ON public.health_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON public.health_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON public.health_metrics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own metrics"
  ON public.health_metrics FOR DELETE
  USING (auth.uid() = user_id);

-- Create medications table
CREATE TABLE public.medications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL, -- 'daily', 'twice_daily', 'weekly', etc.
  time_of_day TEXT[], -- Array of times like ['08:00', '20:00']
  start_date DATE NOT NULL,
  end_date DATE,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own medications"
  ON public.medications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medications"
  ON public.medications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medications"
  ON public.medications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own medications"
  ON public.medications FOR DELETE
  USING (auth.uid() = user_id);

-- Create educational resources table (public for all users)
CREATE TABLE public.educational_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 'diabetes', 'hypertension', 'nutrition', 'exercise'
  research_link TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.educational_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view resources"
  ON public.educational_resources FOR SELECT
  TO authenticated
  USING (true);

-- Create IoT device readings table
CREATE TABLE public.iot_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL, -- 'fitness_tracker', 'glucometer', 'bp_monitor'
  reading_data JSONB NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.iot_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own IoT readings"
  ON public.iot_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own IoT readings"
  ON public.iot_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create AI chat messages table
CREATE TABLE public.ai_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat messages"
  ON public.ai_chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON public.ai_chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON public.medications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample educational resources
INSERT INTO public.educational_resources (title, content, category, research_link) VALUES
('Understanding Blood Pressure', 'Blood pressure is the force of blood pushing against artery walls. Normal BP is below 120/80 mmHg. High blood pressure (hypertension) increases risk of heart disease and stroke. Monitor regularly and follow your care plan.', 'hypertension', 'https://www.heart.org'),
('Managing Diabetes with Diet', 'A balanced diet is crucial for diabetes management. Focus on whole grains, lean proteins, and vegetables. Monitor carbohydrate intake and maintain consistent meal times. Work with a dietitian for personalized guidance.', 'diabetes', 'https://www.diabetes.org'),
('Exercise for Heart Health', 'Regular physical activity strengthens your heart and improves circulation. Aim for 150 minutes of moderate exercise weekly. Start slowly and gradually increase intensity. Always consult your doctor before starting a new exercise program.', 'hypertension', 'https://www.who.int'),
('Glucose Monitoring Best Practices', 'Regular blood glucose monitoring helps you understand how food, activity, and medication affect your levels. Test at recommended times and log results. Target ranges vary by individual - discuss yours with your healthcare team.', 'diabetes', 'https://www.cdc.gov');