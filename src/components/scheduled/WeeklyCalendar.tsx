import { Card } from "@/components/ui/card";
import { format, addDays, startOfWeek, addMonths, startOfMonth, endOfMonth, setHours, setMinutes } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import TimeGrid from "./TimeGrid";

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
      <CalendarHeader
        view={view}
        setView={setView}
        mode={mode}
        setMode={setMode}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <div className="border rounded-lg">
        {view === "month" ? (
          <CalendarGrid
            days={getDays()}
            currentDate={currentDate}
            onCellClick={(date) => handleCellClick(date)}
          />
        ) : (
          <TimeGrid
            days={getDays()}
            currentDate={currentDate}
            timeSlots={getTimeSlots()}
            formatTime={formatTime}
            onCellClick={handleCellClick}
          />
        )}
      </div>
    </Card>
  );
};

export default WeeklyCalendar;