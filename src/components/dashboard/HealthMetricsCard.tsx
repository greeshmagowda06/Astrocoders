import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, TrendingUp, Activity, Droplet, Weight, Heart as HeartIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HealthMetric {
  id: string;
  metric_type: string;
  value: any;
  recorded_at: string;
  notes?: string;
}

const HealthMetricsCard = ({ userId }: { userId: string }) => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [open, setOpen] = useState(false);
  const [metricType, setMetricType] = useState("blood_pressure");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [glucose, setGlucose] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchMetrics();
  }, [userId]);

  const fetchMetrics = async () => {
    const { data, error } = await supabase
      .from("health_metrics")
      .select("*")
      .eq("user_id", userId)
      .order("recorded_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      setMetrics(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let value: any;
    switch (metricType) {
      case "blood_pressure":
        value = { systolic: parseInt(bpSystolic), diastolic: parseInt(bpDiastolic) };
        break;
      case "glucose":
        value = { level: parseFloat(glucose), unit: "mg/dL" };
        break;
      case "heart_rate":
        value = { bpm: parseInt(heartRate) };
        break;
      case "weight":
        value = { weight: parseFloat(weight), unit: "kg" };
        break;
    }

    const { error } = await supabase.from("health_metrics").insert({
      user_id: userId,
      metric_type: metricType,
      value,
      notes,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Health metric recorded!" });
      fetchMetrics();
      setOpen(false);
      resetForm();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setBpSystolic("");
    setBpDiastolic("");
    setGlucose("");
    setHeartRate("");
    setWeight("");
    setNotes("");
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case "blood_pressure": return <Activity className="h-5 w-5 text-primary" />;
      case "glucose": return <Droplet className="h-5 w-5 text-secondary" />;
      case "heart_rate": return <HeartIcon className="h-5 w-5 text-accent" />;
      case "weight": return <Weight className="h-5 w-5 text-primary-light" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const formatValue = (metric: HealthMetric) => {
    switch (metric.metric_type) {
      case "blood_pressure":
        return `${metric.value.systolic}/${metric.value.diastolic} mmHg`;
      case "glucose":
        return `${metric.value.level} ${metric.value.unit}`;
      case "heart_rate":
        return `${metric.value.bpm} BPM`;
      case "weight":
        return `${metric.value.weight} ${metric.value.unit}`;
      default:
        return JSON.stringify(metric.value);
    }
  };

  const getStatusColor = (metric: HealthMetric) => {
    if (metric.metric_type === "blood_pressure") {
      const sys = metric.value.systolic;
      if (sys > 140) return "text-destructive";
      if (sys > 120) return "text-accent";
      return "text-secondary";
    }
    if (metric.metric_type === "glucose") {
      const level = metric.value.level;
      if (level > 180 || level < 70) return "text-destructive";
      if (level > 140) return "text-accent";
      return "text-secondary";
    }
    return "text-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Health Metrics
          </h2>
          <p className="text-muted-foreground">Track your vital signs</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary-light">
              <Plus className="h-4 w-4" />
              Add Reading
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Health Metric</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Metric Type</Label>
                <Select value={metricType} onValueChange={setMetricType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood_pressure">Blood Pressure</SelectItem>
                    <SelectItem value="glucose">Blood Glucose</SelectItem>
                    <SelectItem value="heart_rate">Heart Rate</SelectItem>
                    <SelectItem value="weight">Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {metricType === "blood_pressure" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Systolic</Label>
                    <Input
                      type="number"
                      value={bpSystolic}
                      onChange={(e) => setBpSystolic(e.target.value)}
                      placeholder="120"
                      required
                    />
                  </div>
                  <div>
                    <Label>Diastolic</Label>
                    <Input
                      type="number"
                      value={bpDiastolic}
                      onChange={(e) => setBpDiastolic(e.target.value)}
                      placeholder="80"
                      required
                    />
                  </div>
                </div>
              )}

              {metricType === "glucose" && (
                <div>
                  <Label>Glucose Level (mg/dL)</Label>
                  <Input
                    type="number"
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                    placeholder="100"
                    required
                  />
                </div>
              )}

              {metricType === "heart_rate" && (
                <div>
                  <Label>Heart Rate (BPM)</Label>
                  <Input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    placeholder="72"
                    required
                  />
                </div>
              )}

              {metricType === "weight" && (
                <div>
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70.5"
                    required
                  />
                </div>
              )}

              <div>
                <Label>Notes (Optional)</Label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="After morning workout..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Reading"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getMetricIcon(metric.metric_type)}
                <div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {metric.metric_type.replace("_", " ")}
                  </p>
                  <p className={`text-lg font-semibold ${getStatusColor(metric)}`}>
                    {formatValue(metric)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(metric.recorded_at).toLocaleString()}
            </p>
            {metric.notes && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                {metric.notes}
              </p>
            )}
          </Card>
        ))}
      </div>

      {metrics.length === 0 && (
        <Card className="p-8 text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No health metrics recorded yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Click "Add Reading" to start tracking
          </p>
        </Card>
      )}
    </div>
  );
};

export default HealthMetricsCard;