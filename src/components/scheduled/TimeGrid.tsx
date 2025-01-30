import { format, isSameMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

interface TimeGridProps {
  days: Date[];
  currentDate: Date;
  timeSlots: number[];
  formatTime: (minutes: number) => string;
  onCellClick: (date: Date, minutes: number) => void;
}

const TimeGrid = ({ days, currentDate, timeSlots, formatTime, onCellClick }: TimeGridProps) => {
  return (
    <>
      <div className="grid" style={{ 
        gridTemplateColumns: `auto repeat(${days.length}, 1fr)`
      }}>
        <div className="p-2 border-r bg-gray-50 w-20"></div>
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`p-4 text-center border-r last:border-r-0 font-medium ${
              !isSameMonth(day, currentDate) ? "text-gray-400" : ""
            } ${isSameDay(day, new Date()) ? "bg-blue-50" : ""}`}
          >
            {format(day, "EEEE d", { locale: fr })}
          </div>
        ))}
      </div>

      <div className="grid" style={{ 
        gridTemplateColumns: `auto repeat(${days.length}, 1fr)`
      }}>
        <div className="border-r bg-gray-50 w-20">
          {timeSlots.map((minutes) => (
            <div key={minutes} className="h-12 border-b last:border-b-0 p-2 text-xs text-gray-500">
              {formatTime(minutes)}
            </div>
          ))}
        </div>

        {days.map((day) => (
          <div key={day.toString()} className="border-r last:border-r-0">
            {timeSlots.map((minutes) => (
              <div
                key={`${day}-${minutes}`}
                onClick={() => onCellClick(day, minutes)}
                className="h-12 border-b last:border-b-0 hover:bg-blue-50 transition-colors cursor-pointer"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TimeGrid;