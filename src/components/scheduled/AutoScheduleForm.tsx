import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const AutoScheduleForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifier la liste automatique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Nom</Label>
            <Input placeholder="Nouvelle liste automatique 1" />
          </div>

          <div>
            <Label>Fuseau horaire</Label>
            <Select defaultValue="Europe/Paris">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un fuseau horaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                <SelectItem value="America/New_York">America/New York</SelectItem>
                <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Publications par jour</Label>
            <Select defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le nombre" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Horaires de publication</Label>
            <Input type="time" defaultValue="09:00" />
          </div>

          <div>
            <Label>Jours de publication</Label>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox id={day} />
                  <Label htmlFor={day}>{day}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label>Contenu de la liste automatique</Label>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Ajouter à partir d'un fichier (CSV)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoScheduleForm;