import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Users, TrendingUp, CalendarDays, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardMetricsProps = {
  metrics: {
    total: number;
    periodCount: number;
    submissionsByMonth: { month: string; count: number }[];
    topAvailability: { date: Date; count: number }[];
  };
  periodDays: number;
};

export function DashboardMetrics({ metrics, periodDays }: DashboardMetricsProps) {
  const maxMonthly = Math.max(...metrics.submissionsByMonth.map((m) => m.count), 1);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de inscrições
            </CardTitle>
            <Users className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-heading">{metrics.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Últimos {periodDays} dias
            </CardTitle>
            <TrendingUp className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-heading">{metrics.periodCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Meses com dados
            </CardTitle>
            <Sparkles className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-heading">
              {metrics.submissionsByMonth.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Datas populares
            </CardTitle>
            <CalendarDays className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-heading">
              {metrics.topAvailability.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Inscrições por mês</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.submissionsByMonth.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados ainda.</p>
            ) : (
              <div className="space-y-3">
                {metrics.submissionsByMonth.map(({ month, count }) => (
                  <div key={month} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {format(new Date(`${month}-01`), "MMM yyyy", { locale: ptBR })}
                      </span>
                      <span>{count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-sage transition-all"
                        style={{ width: `${(count / maxMonthly) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">
              Disponibilidade mais comum
            </CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.topAvailability.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados ainda.</p>
            ) : (
              <ul className="space-y-3">
                {metrics.topAvailability.map(({ date, count }) => (
                  <li
                    key={date.toISOString()}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>
                      {format(new Date(date), "EEEE, d 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </span>
                    <span className="rounded-full bg-sage/10 px-2.5 py-0.5 text-sage">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
