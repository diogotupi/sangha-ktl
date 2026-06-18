"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AvailabilityCalendarProps = {
  selectedDates: string[];
  onChange: (dates: string[]) => void;
  minDate?: Date;
  maxMonthsAhead?: number;
};

function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function AvailabilityCalendar({
  selectedDates,
  onChange,
  minDate = startOfDay(new Date()),
  maxMonthsAhead = 6,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const maxMonth = useMemo(
    () => startOfMonth(addMonths(new Date(), maxMonthsAhead)),
    [maxMonthsAhead],
  );

  const selectedSet = useMemo(
    () => new Set(selectedDates),
    [selectedDates],
  );

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth]);

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function toggleDate(date: Date) {
    const key = toDateKey(date);
    if (isBefore(date, minDate)) return;

    if (selectedSet.has(key)) {
      onChange(selectedDates.filter((d) => d !== key));
    } else {
      onChange([...selectedDates, key].sort());
    }
  }

  function goToPrevMonth() {
    setCurrentMonth((m) => addMonths(m, -1));
  }

  function goToNextMonth() {
    setCurrentMonth((m) => addMonths(m, 1));
  }

  const canGoPrev = !isSameMonth(currentMonth, startOfMonth(minDate));
  const canGoNext = isBefore(currentMonth, maxMonth);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          aria-label="Mês anterior"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <h3 className="font-heading text-lg capitalize text-foreground">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h3>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={goToNextMonth}
          disabled={!canGoNext}
          aria-label="Próximo mês"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div
        className="rounded-2xl border border-border/60 bg-card/50 p-4 md:p-6"
        role="application"
        aria-label="Calendário de disponibilidade"
      >
        <div className="mb-2 grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium tracking-wide text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const key = toDateKey(day);
            const inMonth = isSameMonth(day, currentMonth);
            const isPast = isBefore(day, minDate);
            const isSelected = selectedSet.has(key);
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={key}
                type="button"
                disabled={!inMonth || isPast}
                onClick={() => toggleDate(day)}
                aria-label={`${format(day, "d 'de' MMMM", { locale: ptBR })}${isSelected ? ", selecionado" : ""}`}
                aria-pressed={isSelected}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-xl text-sm transition-all duration-200",
                  !inMonth && "invisible",
                  inMonth && isPast && "cursor-not-allowed text-muted-foreground/30",
                  inMonth &&
                    !isPast &&
                    !isSelected &&
                    "text-foreground hover:bg-sage/10",
                  isSelected &&
                    "bg-sage text-white shadow-sm hover:bg-sage/90",
                  isToday &&
                    !isSelected &&
                    "ring-1 ring-sage/40 ring-inset",
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {selectedDates.length === 0
            ? "Toque nos dias em que você poderia participar de um encontro."
            : `${selectedDates.length} ${selectedDates.length === 1 ? "dia selecionado" : "dias selecionados"}`}
        </p>

        {selectedDates.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((dateStr) => (
              <button
                key={dateStr}
                type="button"
                onClick={() =>
                  onChange(selectedDates.filter((d) => d !== dateStr))
                }
                className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage transition-colors hover:bg-sage/20"
                aria-label={`Remover ${format(new Date(`${dateStr}T12:00:00`), "d 'de' MMMM", { locale: ptBR })}`}
              >
                {format(new Date(`${dateStr}T12:00:00`), "d MMM", {
                  locale: ptBR,
                })}
                <span className="ml-1 opacity-60">×</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
