import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type MiniRetiroWeekend = {
  id: string;
  label: string;
  monthKey: string;
  monthLabel: string;
};

function capitalizeMonth(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatWeekendLabel(friday: Date, sunday: Date) {
  const fridayDay = format(friday, "d");
  const sundayDay = format(sunday, "d");

  if (friday.getMonth() === sunday.getMonth()) {
    return `${fridayDay} a ${sundayDay} de ${format(friday, "MMMM", { locale: ptBR })}`;
  }

  return `${fridayDay} de ${format(friday, "MMMM", { locale: ptBR })} a ${sundayDay} de ${format(sunday, "MMMM", { locale: ptBR })}`;
}

export function getMiniRetiroWeekends(): MiniRetiroWeekend[] {
  const weekends: MiniRetiroWeekend[] = [];
  const rangeEnd = new Date(2026, 11, 31);

  let friday = new Date(2026, 6, 1);
  while (friday.getDay() !== 5) {
    friday = addDays(friday, 1);
  }

  while (friday <= rangeEnd) {
    const sunday = addDays(friday, 2);

    if (friday.getFullYear() === 2026 && friday.getMonth() >= 6) {
      const monthKey = format(friday, "yyyy-MM");
      const monthLabel = capitalizeMonth(
        format(friday, "MMMM yyyy", { locale: ptBR }),
      );

      weekends.push({
        id: format(friday, "yyyy-MM-dd"),
        label: formatWeekendLabel(friday, sunday),
        monthKey,
        monthLabel,
      });
    }

    friday = addDays(friday, 7);
  }

  return weekends;
}

export function groupWeekendsByMonth(weekends: MiniRetiroWeekend[]) {
  const map = new Map<
    string,
    { monthLabel: string; weekends: MiniRetiroWeekend[] }
  >();

  for (const weekend of weekends) {
    const group = map.get(weekend.monthKey);
    if (group) {
      group.weekends.push(weekend);
    } else {
      map.set(weekend.monthKey, {
        monthLabel: weekend.monthLabel,
        weekends: [weekend],
      });
    }
  }

  return Array.from(map.entries()).map(([monthKey, value]) => ({
    monthKey,
    ...value,
  }));
}

export function serializeUnavailableWeekends(unavailableWeekends: string[]) {
  if (unavailableWeekends.length === 0) {
    return "Nenhuma restrição";
  }

  const byId = new Map(getMiniRetiroWeekends().map((weekend) => [weekend.id, weekend]));
  const labels = unavailableWeekends
    .map((id) => byId.get(id)?.label)
    .filter(Boolean);

  return `Não disponível: ${labels.join("; ")}`;
}

export function parseUnavailableWeekends(dateRestrictions: string): string[] {
  const trimmed = dateRestrictions.trim();
  if (!trimmed || trimmed === "Nenhuma restrição") {
    return [];
  }

  if (!trimmed.startsWith("Não disponível: ")) {
    return [];
  }

  const labels = trimmed
    .slice("Não disponível: ".length)
    .split(";")
    .map((label) => label.trim())
    .filter(Boolean);

  const byLabel = new Map(
    getMiniRetiroWeekends().map((weekend) => [weekend.label, weekend.id]),
  );

  return labels
    .map((label) => byLabel.get(label))
    .filter((id): id is string => Boolean(id));
}

export type WeekendAvailabilityRow = {
  weekend: MiniRetiroWeekend;
  unavailableCount: number;
  unavailablePeople: string[];
};

export type MiniRetiroWeekendAnalysis = {
  participantCount: number;
  weekends: WeekendAvailabilityRow[];
  fullyAvailable: WeekendAvailabilityRow[];
};

export function analyzeMiniRetiroWeekends(
  submissions: {
    fullName: string;
    interest: "YES" | "NO" | "OTHER";
    dateRestrictions: string;
  }[],
): MiniRetiroWeekendAnalysis {
  const participants = submissions.filter(
    (submission) => submission.interest === "YES" || submission.interest === "OTHER",
  );

  const weekends = getMiniRetiroWeekends().map((weekend) => {
    const unavailablePeople = participants
      .filter((participant) =>
        parseUnavailableWeekends(participant.dateRestrictions).includes(weekend.id),
      )
      .map((participant) => participant.fullName);

    return {
      weekend,
      unavailableCount: unavailablePeople.length,
      unavailablePeople,
    };
  });

  const fullyAvailable = weekends.filter(
    (row) => row.unavailableCount === 0 && participants.length > 0,
  );

  return {
    participantCount: participants.length,
    weekends,
    fullyAvailable,
  };
}
