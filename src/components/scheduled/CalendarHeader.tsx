import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type ViewType = "day" | "week" | "month";
type ModeType = "extended" | "normal" | "compact";

interface CalendarHeaderProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const CalendarHeader = ({
  view,
  setView,
  mode,
  setMode,
  currentDate,
  setCurrentDate,
  onPrevious,
  onNext,
}: CalendarHeaderProps) => {
  return (
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

        <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
          Aujourd'hui
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {format(currentDate, "d MMM yyyy", { locale: fr })}
        </span>
        <Button variant="outline" size="icon" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;