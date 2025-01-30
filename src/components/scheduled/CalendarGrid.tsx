import { format, isSameMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  onCellClick: (date: Date) => void;
}

const CalendarGrid = ({ days, currentDate, onCellClick }: CalendarGridProps) => {
  return (
    <div className="grid grid-cols-7 gap-0">
      {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
        <div key={day} className="p-4 text-center border-b font-medium">
          {day}
        </div>
      ))}
      {days.map((day, index) => (
        <div
          key={day.toString() + index}
          onClick={() => onCellClick(day)}
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
  );
};

export default CalendarGrid;