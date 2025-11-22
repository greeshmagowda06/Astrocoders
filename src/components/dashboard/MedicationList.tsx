import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pill, Clock, CheckCircle, XCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time_of_day: string[];
  start_date: string;
  end_date?: string;
  notes?: string;
  is_active: boolean;
}

const MedicationList = ({ userId }: { userId: string }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [timeOfDay, setTimeOfDay] = useState("08:00");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchMedications();
  }, [userId]);

  const fetchMedications = async () => {
    const { data, error } = await supabase
      .from("medications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMedications(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("medications").insert({
      user_id: userId,
      name,
      dosage,
      frequency,
      time_of_day: [timeOfDay],
      start_date: new Date().toISOString().split('T')[0],
      notes,
      is_active: true,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Medication added!" });
      fetchMedications();
      setOpen(false);
      resetForm();
    }
    setLoading(false);
  };

  const toggleMedication = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from("medications")
      .update({ is_active: !isActive })
      .eq("id", id);

    if (!error) {
      fetchMedications();
      toast({ 
        title: isActive ? "Medication paused" : "Medication activated",
      });
    }
  };

  const resetForm = () => {
    setName("");
    setDosage("");
    setFrequency("daily");
    setTimeOfDay("08:00");
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            Medications
          </h2>
          <p className="text-muted-foreground">Manage your prescriptions</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-secondary to-secondary-light">
              <Plus className="h-4 w-4" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Medication Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Metformin"
                  required
                />
              </div>

              <div>
                <Label>Dosage</Label>
                <Input
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="500mg"
                  required
                />
              </div>

              <div>
                <Label>Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="twice_daily">Twice Daily</SelectItem>
                    <SelectItem value="three_times_daily">Three Times Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="as_needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Time of Day</Label>
                <Input
                  type="time"
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Notes (Optional)</Label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take with food..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Adding..." : "Add Medication"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {medications.map((med) => (
          <Card key={med.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${med.is_active ? 'bg-secondary/10' : 'bg-muted'}`}>
                  <Pill className={`h-5 w-5 ${med.is_active ? 'text-secondary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{med.name}</h3>
                  <p className="text-sm text-muted-foreground">{med.dosage}</p>
                </div>
              </div>
              <Badge variant={med.is_active ? "default" : "secondary"}>
                {med.is_active ? "Active" : "Paused"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="capitalize">{med.frequency.replace("_", " ")}</span>
                {med.time_of_day.length > 0 && (
                  <span className="text-muted-foreground">
                    at {med.time_of_day.join(", ")}
                  </span>
                )}
              </div>
              {med.notes && (
                <p className="text-sm text-muted-foreground italic">
                  {med.notes}
                </p>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={() => toggleMedication(med.id, med.is_active)}
            >
              {med.is_active ? (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Activate
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>

      {medications.length === 0 && (
        <Card className="p-8 text-center">
          <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No medications added yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Click "Add Medication" to start tracking
          </p>
        </Card>
      )}
    </div>
  );
};

export default MedicationList;