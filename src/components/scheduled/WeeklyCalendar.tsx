import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { format, addDays, startOfWeek, addMonths, startOfMonth, endOfMonth, isSameMonth, isSameDay, setHours, setMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ViewType = "day" | "week" | "month";
type ModeType = "extended" | "normal" | "compact";

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("week");
  const [mode, setMode] = useState<ModeType>("normal");
  const navigate = useNavigate();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const getTimeSlots = () => {
    switch (mode) {
      case "extended":
        return Array.from({ length: 96 }, (_, i) => i * 15);
      case "normal":
        return Array.from({ length: 48 }, (_, i) => i * 30);
      case "compact":
        return Array.from({ length: 24 }, (_, i) => i * 60);
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
      case "month": {
        const days = [];
        let currentDay = startOfWeek(monthStart, { weekStartsOn: 1 });
        while (currentDay <= endOfMonth(monthEnd)) {
          days.push(currentDay);
          currentDay = addDays(currentDay, 1);
        }
        return days;
      }
    }
  };

  const handleCellClick = (date: Date, minutes?: number) => {
    const selectedDate = minutes !== undefined 
      ? setMinutes(setHours(date, Math.floor(minutes / 60)), minutes % 60)
      : date;
    
    navigate("/new-post", {
      state: {
        scheduledDate: selectedDate.toISOString(),
      }
    });
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
          <Select value={view} onValueChange={(v: ViewType) => setView(v)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Vue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Jour</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
            </SelectContent>
          </Select>

          {view !== "month" && (
            <Select value={mode} onValueChange={(v: ModeType) => setMode(v)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="extended">Étendu</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="compact">Condensé</SelectItem>
              </SelectContent>
            </Select>
          )}

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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={() => navigate("/new-post")} className="bg-blue-500 hover:bg-blue-600">
          Créer une publication
        </Button>
      </div>

      <div className="border rounded-lg">
        {view === "month" ? (
          <div className="grid grid-cols-7 gap-0">
            {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
              <div key={day} className="p-4 text-center border-b font-medium">
                {day}
              </div>
            ))}
            {getDays().map((day, index) => (
              <div
                key={day.toString() + index}
                onClick={() => handleCellClick(day)}
                className={`min-h-[120px] p-2 border cursor-pointer hover:bg-blue-50 transition-colors ${
                  !isSameMonth(day, currentDate) ? "bg-gray-50 text-gray-400" : ""
                } ${isSameDay(day, new Date()) ? "bg-blue-50" : ""}`}
              >
                <span className="block text-sm mb-2">
                  {format(day, "d")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid" style={{ 
              gridTemplateColumns: `auto repeat(${getDays().length}, 1fr)`
            }}>
              <div className="p-2 border-r bg-gray-50 w-20"></div>
              {getDays().map((day) => (
                <div
                  key={day.toString()}
                  className={`p-4 text-center border-r last:border-r-0 font-medium ${
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
              <div className="border-r bg-gray-50 w-20">
                {getTimeSlots().map((minutes) => (
                  <div key={minutes} className="h-12 border-b last:border-b-0 p-2 text-xs text-gray-500">
                    {formatTime(minutes)}
                  </div>
                ))}
              </div>

              {getDays().map((day) => (
                <div key={day.toString()} className="border-r last:border-r-0">
                  {getTimeSlots().map((minutes) => (
                    <div
                      key={`${day}-${minutes}`}
                      onClick={() => handleCellClick(day, minutes)}
                      className="h-12 border-b last:border-b-0 hover:bg-blue-50 transition-colors cursor-pointer"
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default WeeklyCalendar;
