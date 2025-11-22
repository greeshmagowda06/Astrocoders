import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, Activity, Heart, Pill, BookOpen, Radio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HealthMetricsCard from "@/components/dashboard/HealthMetricsCard";
import MedicationList from "@/components/dashboard/MedicationList";
import AIChat from "@/components/dashboard/AIChat";
import EducationalResources from "@/components/dashboard/EducationalResources";
import IoTSimulator from "@/components/dashboard/IoTSimulator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary" />
              <Activity className="h-4 w-4 text-secondary absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HealthGuard AI
              </h1>
              <p className="text-xs text-muted-foreground">Privacy-First Health Assistant</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="medications" className="gap-2">
              <Pill className="h-4 w-4" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <Heart className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="iot" className="gap-2">
              <Radio className="h-4 w-4" />
              IoT Devices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <HealthMetricsCard userId={user.id} />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationList userId={user.id} />
          </TabsContent>

          <TabsContent value="chat">
            <AIChat userId={user.id} />
          </TabsContent>

          <TabsContent value="education">
            <EducationalResources />
          </TabsContent>

          <TabsContent value="iot">
            <IoTSimulator userId={user.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;