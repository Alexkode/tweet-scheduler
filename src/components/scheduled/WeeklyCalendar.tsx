import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, addMonths, startOfMonth, endOfMonth, isSameMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [mode, setMode] = useState<"extended" | "normal" | "compact">("normal");
  const navigate = useNavigate();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const getTimeSlots = () => {
    switch (mode) {
      case "extended":
        return Array.from({ length: 96 }, (_, i) => i * 15); // Every 15 minutes
      case "normal":
        return Array.from({ length: 48 }, (_, i) => i * 30); // Every 30 minutes
      case "compact":
        return Array.from({ length: 24 }, (_, i) => i * 60); // Every hour
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const getDays = () => {
    switch (view) {
      case "day":
        return [currentDate];
      case "week":
        return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
      case "month":
        const days = [];
        let currentDay = startOfWeek(monthStart, { weekStartsOn: 1 });
        while (currentDay <= endOfMonth(monthEnd)) {
          days.push(currentDay);
          currentDay = addDays(currentDay, 1);
        }
        return days;
    }
  };

  const handlePrevious = () => {
    switch (view) {
      case "day":
        setCurrentDate(prev => addDays(prev, -1));
        break;
      case "week":
        setCurrentDate(prev => addDays(prev, -7));
        break;
      case "month":
        setCurrentDate(prev => addMonths(prev, -1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case "day":
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case "week":
        setCurrentDate(prev => addDays(prev, 7));
        break;
      case "month":
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={(v: "day" | "week" | "month") => setView(v)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Vue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Jour</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
            </SelectContent>
          </Select>

          <Select value={mode} onValueChange={(v: "extended" | "normal" | "compact") => setMode(v)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="extended">Étendu</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="compact">Condensé</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => setCurrentDate(new Date())}
          >
            Aujourd'hui
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {format(currentDate, "d MMM yyyy", { locale: fr })}
          </span>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={() => navigate("/new-post")}>Créer une publication</Button>
      </div>

      <div className="border rounded-lg">
        <div className="grid" style={{ 
          gridTemplateColumns: `auto repeat(${getDays().length}, 1fr)`
        }}>
          <div className="p-2 border-r"></div>
          {getDays().map((day) => (
            <div
              key={day.toString()}
              className={`p-2 text-center border-r last:border-r-0 font-medium ${
                !isSameMonth(day, currentDate) ? "text-gray-400" : ""
              } ${isSameDay(day, new Date()) ? "bg-blue-50" : ""}`}
            >
              {format(day, view === "month" ? "d" : "EEEE d", { locale: fr })}
            </div>
          ))}
        </div>

        <div className="grid" style={{ 
          gridTemplateColumns: `auto repeat(${getDays().length}, 1fr)`
        }}>
          <div className="border-r">
            {getTimeSlots().map((minutes) => (
              <div key={minutes} className="h-12 border-b last:border-b-0 p-2 text-xs">
                {formatTime(minutes)}
              </div>
            ))}
          </div>

          {getDays().map((day) => (
            <div key={day.toString()} className="border-r last:border-r-0">
              {getTimeSlots().map((minutes) => (
                <div
                  key={`${day}-${minutes}`}
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