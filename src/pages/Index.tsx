import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Activity, Shield, Brain, Smartphone, BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Heart className="h-10 w-10 text-primary" />
            <Activity className="h-5 w-5 text-secondary absolute -bottom-1 -right-1" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HealthGuard AI
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Privacy-First Healthcare</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            AI-Powered Chronic Disease
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Management Assistant
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Manage diabetes, hypertension, and other chronic conditions with personalized AI insights, 
            secure data protection, and evidence-based education.
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 text-lg px-8"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-lg px-8"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Health Assistant</h3>
            <p className="text-muted-foreground">
              Context-aware AI analyzes your health data to provide personalized recommendations and answer questions.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy by Design</h3>
            <p className="text-muted-foreground">
              Bank-level encryption, strict data isolation with RLS, and zero third-party sharing. Your health data stays yours.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">IoT Integration</h3>
            <p className="text-muted-foreground">
              Connect fitness trackers, glucometers, and BP monitors for automated health tracking and insights.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary-light/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary-light" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
            <p className="text-muted-foreground">
              Monitor BP, glucose, heart rate, weight, and medications with visual trends and actionable insights.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-secondary-light/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-secondary-light" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Research-Backed</h3>
            <p className="text-muted-foreground">
              All recommendations and resources are validated by published medical research and clinical guidelines.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent-light/10 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-accent-light" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Medication Management</h3>
            <p className="text-muted-foreground">
              Track prescriptions, set reminders, and never miss a dose with our intelligent medication system.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
