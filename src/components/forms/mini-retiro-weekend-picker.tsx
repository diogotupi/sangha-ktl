"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  getMiniRetiroWeekends,
  groupWeekendsByMonth,
} from "@/lib/mini-retiro-weekends";
import { cn } from "@/lib/utils";

const weekendGroups = groupWeekendsByMonth(getMiniRetiroWeekends());

type MiniRetiroWeekendPickerProps = {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

export function MiniRetiroWeekendPicker({
  value,
  onChange,
  error,
}: MiniRetiroWeekendPickerProps) {
  function toggleWeekend(id: string, checked: boolean) {
    onChange(checked ? [...value, id] : value.filter((item) => item !== id));
  }

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "max-h-96 overflow-y-auto rounded-xl border border-border/60 bg-card/50",
          error && "border-destructive",
        )}
      >
        {weekendGroups.map((group, index) => (
          <div
            key={group.monthKey}
            className={cn("p-4", index > 0 && "border-t border-border/60")}
          >
            <p className="mb-3 text-sm font-medium text-foreground">
              {group.monthLabel}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {group.weekends.map((weekend) => {
                const checked = value.includes(weekend.id);

                return (
                  <label
                    key={weekend.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 px-3 py-2.5 transition-colors",
                      checked && "border-brand bg-brand/5",
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(next) =>
                        toggleWeekend(weekend.id, next === true)
                      }
                    />
                    <span className="text-sm leading-snug">{weekend.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {value.length === 0
          ? "Nenhum fim de semana marcado, você pode em todos."
          : `${value.length} fim${value.length === 1 ? "" : "s"} de semana marcado${value.length === 1 ? "" : "s"}.`}
      </p>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
