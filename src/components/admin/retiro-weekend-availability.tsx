import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MiniRetiroWeekendAnalysis } from "@/lib/mini-retiro-weekends";
import { cn } from "@/lib/utils";

type RetiroWeekendAvailabilityProps = {
  analysis: MiniRetiroWeekendAnalysis;
  compact?: boolean;
};

export function RetiroWeekendAvailability({
  analysis,
  compact = false,
}: RetiroWeekendAvailabilityProps) {
  const { participantCount, weekends, fullyAvailable } = analysis;

  if (participantCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Disponibilidade de datas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[15px] text-muted-foreground">
            Ainda não há interessados com respostas para cruzar as datas.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base font-semibold">
          Disponibilidade de datas
        </CardTitle>
        <p className="text-[15px] text-muted-foreground">
          Cruzamento entre {participantCount}{" "}
          {participantCount === 1 ? "interessado" : "interessados"} (Sim / Outro).
          Fins de semana que ninguém marcou como indisponível aparecem primeiro.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Todos podem ({fullyAvailable.length})
          </h3>
          {fullyAvailable.length === 0 ? (
            <p className="text-[15px] text-muted-foreground">
              Nenhum fim de semana ficou livre para todo mundo ainda.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {fullyAvailable.map(({ weekend }) => (
                <Badge
                  key={weekend.id}
                  className="bg-sage/15 px-3 py-1 text-[13px] font-medium text-sage hover:bg-sage/15"
                >
                  {weekend.label}
                </Badge>
              ))}
            </div>
          )}
        </section>

        {!compact ? (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Visão geral por fim de semana
            </h3>
            <ul className="divide-y divide-border/60 rounded-xl border border-border/60">
              {weekends.map(({ weekend, unavailableCount, unavailablePeople }) => (
                <li
                  key={weekend.id}
                  className="space-y-2 px-4 py-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium">{weekend.label}</p>
                      {unavailableCount === 0 ? (
                        <p className="text-[13px] text-sage">
                          Ninguém marcou indisponibilidade
                        </p>
                      ) : (
                        <p className="text-[13px] text-muted-foreground">
                          {unavailableCount}{" "}
                          {unavailableCount === 1
                            ? "pessoa indisponível"
                            : "pessoas indisponíveis"}
                          {unavailablePeople.length > 0
                            ? `: ${unavailablePeople.join(", ")}`
                            : ""}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={unavailableCount === 0 ? "default" : "secondary"}
                      className={cn(
                        "w-fit shrink-0",
                        unavailableCount === 0 && "bg-sage hover:bg-sage",
                      )}
                    >
                      {unavailableCount === 0
                        ? "Livre para todos"
                        : `${participantCount - unavailableCount}/${participantCount} podem`}
                    </Badge>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        unavailableCount === 0 ? "bg-sage" : "bg-brand/70",
                      )}
                      style={{
                        width: `${((participantCount - unavailableCount) / participantCount) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </CardContent>
    </Card>
  );
}
