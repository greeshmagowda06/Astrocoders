import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { BookOpen, ExternalLink, Heart, Activity, Utensils, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Resource {
  id: string;
  title: string;
  content: string;
  category: string;
  research_link?: string;
}

const EducationalResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from("educational_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setResources(data);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "diabetes":
        return <Activity className="h-5 w-5" />;
      case "hypertension":
        return <Heart className="h-5 w-5" />;
      case "nutrition":
        return <Utensils className="h-5 w-5" />;
      case "exercise":
        return <Dumbbell className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "diabetes":
        return "bg-secondary/10 text-secondary";
      case "hypertension":
        return "bg-primary/10 text-primary";
      case "nutrition":
        return "bg-accent/10 text-accent";
      case "exercise":
        return "bg-primary-light/10 text-primary-light";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Educational Resources
        </h2>
        <p className="text-muted-foreground">
          Research-backed information about chronic disease management
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.id} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getCategoryColor(resource.category)}`}>
                {getCategoryIcon(resource.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                  <Badge variant="outline" className="capitalize">
                    {resource.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {resource.content}
                </p>
                {resource.research_link && (
                  <Button
                    variant="link"
                    className="p-0 h-auto gap-2 text-primary"
                    asChild
                  >
                    <a
                      href={resource.research_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Research
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {resources.length === 0 && (
        <Card className="p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No resources available yet</p>
        </Card>
      )}

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Medical Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All resources are for educational purposes only and backed by published research. 
              Always consult with your healthcare provider before making any decisions about 
              your health or treatment. This assistant does not replace professional medical advice, 
              diagnosis, or treatment.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EducationalResources;