import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Twitter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface AutoScheduleConfigFormProps {
  publicationsPerDay: string;
  onPublicationsPerDayChange: (value: string) => void;
  publicationTimes: string[];
  onTimeChange: (index: number, time: string) => void;
  selectedDays: string[];
  onDayToggle: (day: string) => void;
}

const AutoScheduleConfigForm = ({
  publicationsPerDay,
  onPublicationsPerDayChange,
  publicationTimes,
  onTimeChange,
  selectedDays,
  onDayToggle,
}: AutoScheduleConfigFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Nom</Label>
        <Input placeholder="Nouvelle liste automatique 1" />
      </div>

      <div>
        <Label>Compte</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un compte Twitter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="account1">
              <div className="flex items-center">
                <Twitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
                Compte Twitter 1
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Publications par jour</Label>
        <Input 
          type="number"
          min="1"
          value={publicationsPerDay}
          onChange={(e) => onPublicationsPerDayChange(e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Horaires de publication</Label>
        <div className="space-y-2 mt-2">
          {publicationTimes.map((time, index) => (
            <Input 
              key={index}
              type="time"
              value={time}
              onChange={(e) => onTimeChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Jours de publication</Label>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox 
                id={day}
                checked={selectedDays.includes(day)}
                onCheckedChange={() => onDayToggle(day)}
              />
              <Label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1, 3)}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScheduleConfigForm;