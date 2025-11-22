import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Radio, Activity, Heart, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IoTReading {
  id: string;
  device_type: string;
  reading_data: any;
  recorded_at: string;
}

const IoTSimulator = ({ userId }: { userId: string }) => {
  const [readings, setReadings] = useState<IoTReading[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReadings();
  }, [userId]);

  const fetchReadings = async () => {
    const { data, error } = await supabase
      .from("iot_readings")
      .select("*")
      .eq("user_id", userId)
      .order("recorded_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      setReadings(data);
    }
  };

  const simulateReading = async (deviceType: string) => {
    setIsSimulating(true);

    let readingData: any;
    switch (deviceType) {
      case "fitness_tracker":
        readingData = {
          steps: Math.floor(Math.random() * 5000) + 5000,
          heart_rate: Math.floor(Math.random() * 30) + 60,
          calories: Math.floor(Math.random() * 500) + 200,
          distance_km: (Math.random() * 5 + 2).toFixed(2),
        };
        break;
      case "glucometer":
        readingData = {
          glucose_level: Math.floor(Math.random() * 80) + 80,
          unit: "mg/dL",
          fasting: Math.random() > 0.5,
        };
        break;
      case "bp_monitor":
        readingData = {
          systolic: Math.floor(Math.random() * 40) + 110,
          diastolic: Math.floor(Math.random() * 20) + 70,
          pulse: Math.floor(Math.random() * 30) + 60,
        };
        break;
    }

    const { error } = await supabase.from("iot_readings").insert({
      user_id: userId,
      device_type: deviceType,
      reading_data: readingData,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Reading Received",
        description: `New ${deviceType.replace("_", " ")} data recorded`,
      });
      fetchReadings();
    }

    setIsSimulating(false);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "fitness_tracker":
        return <Activity className="h-5 w-5" />;
      case "glucometer":
        return <TrendingUp className="h-5 w-5" />;
      case "bp_monitor":
        return <Heart className="h-5 w-5" />;
      default:
        return <Radio className="h-5 w-5" />;
    }
  };

  const formatReadingData = (reading: IoTReading) => {
    switch (reading.device_type) {
      case "fitness_tracker":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Steps:</span>{" "}
              <span className="font-semibold">{reading.reading_data.steps}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Heart Rate:</span>{" "}
              <span className="font-semibold">{reading.reading_data.heart_rate} BPM</span>
            </div>
            <div>
              <span className="text-muted-foreground">Calories:</span>{" "}
              <span className="font-semibold">{reading.reading_data.calories}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Distance:</span>{" "}
              <span className="font-semibold">{reading.reading_data.distance_km} km</span>
            </div>
          </div>
        );
      case "glucometer":
        return (
          <div className="text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">Glucose:</span>{" "}
              <span className="font-semibold text-lg">
                {reading.reading_data.glucose_level} {reading.reading_data.unit}
              </span>
            </div>
            <Badge variant={reading.reading_data.fasting ? "default" : "secondary"}>
              {reading.reading_data.fasting ? "Fasting" : "Non-Fasting"}
            </Badge>
          </div>
        );
      case "bp_monitor":
        return (
          <div className="text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">Blood Pressure:</span>{" "}
              <span className="font-semibold text-lg">
                {reading.reading_data.systolic}/{reading.reading_data.diastolic} mmHg
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Pulse:</span>{" "}
              <span className="font-semibold">{reading.reading_data.pulse} BPM</span>
            </div>
          </div>
        );
      default:
        return <pre className="text-xs">{JSON.stringify(reading.reading_data, null, 2)}</pre>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Radio className="h-6 w-6 text-primary" />
          IoT Device Simulator
        </h2>
        <p className="text-muted-foreground">
          Simulate connected health devices for demonstration
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
        <div className="flex items-start gap-4 mb-4">
          <Zap className="h-6 w-6 text-accent" />
          <div>
            <h3 className="font-semibold mb-2">Device Simulator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click below to simulate readings from different IoT health devices. 
              This demonstrates real-time device integration capabilities.
            </p>
          </div>
        </div>
        
        <div className="grid gap-3 md:grid-cols-3">
          <Button
            onClick={() => simulateReading("fitness_tracker")}
            disabled={isSimulating}
            variant="outline"
            className="gap-2 h-auto py-3 flex-col"
          >
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-sm">Fitness Tracker</span>
          </Button>
          <Button
            onClick={() => simulateReading("glucometer")}
            disabled={isSimulating}
            variant="outline"
            className="gap-2 h-auto py-3 flex-col"
          >
            <TrendingUp className="h-5 w-5 text-secondary" />
            <span className="text-sm">Glucometer</span>
          </Button>
          <Button
            onClick={() => simulateReading("bp_monitor")}
            disabled={isSimulating}
            variant="outline"
            className="gap-2 h-auto py-3 flex-col"
          >
            <Heart className="h-5 w-5 text-accent" />
            <span className="text-sm">BP Monitor</span>
          </Button>
        </div>
      </Card>

      <div>
        <h3 className="font-semibold mb-4">Recent Device Readings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {readings.map((reading) => (
            <Card key={reading.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {getDeviceIcon(reading.device_type)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold capitalize">
                    {reading.device_type.replace("_", " ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(reading.recorded_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {formatReadingData(reading)}
            </Card>
          ))}
        </div>
      </div>

      {readings.length === 0 && (
        <Card className="p-8 text-center">
          <Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No IoT readings yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Use the simulator above to generate sample data
          </p>
        </Card>
      )}
    </div>
  );
};

export default IoTSimulator;