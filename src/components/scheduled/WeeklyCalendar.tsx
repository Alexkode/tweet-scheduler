import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";

const WeeklyCalendar = () => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Vue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="normal">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {format(today, "d MMM yyyy", { locale: fr })}
          </span>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button>Créer une publication</Button>
      </div>

      <div className="border rounded-lg">
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 border-r"></div>
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className="p-2 text-center border-r last:border-r-0 font-medium"
            >
              {format(day, "EEEE d", { locale: fr })}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          <div className="border-r">
            {hours.map((hour) => (
              <div key={hour} className="h-12 border-b last:border-b-0 p-2 text-xs">
                {String(hour).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {weekDays.map((day) => (
            <div key={day.toString()} className="border-r last:border-r-0">
              {hours.map((hour) => (
                <div
                  key={`${day}-${hour}`}
                  className="h-12 border-b last:border-b-0"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WeeklyCalendar;