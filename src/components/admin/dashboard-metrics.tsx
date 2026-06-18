import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Users, TrendingUp, Mountain, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { RetiroWeekendAvailability } from "@/components/admin/retiro-weekend-availability";
import type { MiniRetiroWeekendAnalysis } from "@/lib/mini-retiro-weekends";
import { cn } from "@/lib/utils";

type DashboardMetricsProps = {
  metrics: {
    total: number;
    periodCount: number;
    submissionsByMonth: { month: string; count: number }[];
    miniRetiroTotal: number;
    miniRetiroInterested: number;
  };
  weekendAnalysis: MiniRetiroWeekendAnalysis;
  periodDays: number;
};

export function DashboardMetrics({
  metrics,
  weekendAnalysis,
  periodDays,
}: DashboardMetricsProps) {
  const maxMonthly = Math.max(...metrics.submissionsByMonth.map((m) => m.count), 1);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[15px] font-medium text-muted-foreground">
              Cadastros no site
            </CardTitle>
            <Users className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{metrics.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[15px] font-medium text-muted-foreground">
              Novos cadastros ({periodDays} dias)
            </CardTitle>
            <TrendingUp className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{metrics.periodCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[15px] font-medium text-muted-foreground">
              Respostas ao retiro
            </CardTitle>
            <Mountain className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{metrics.miniRetiroTotal}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[15px] font-medium text-muted-foreground">
              Interessados no retiro
            </CardTitle>
            <Heart className="size-4 text-sage" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">
              {metrics.miniRetiroInterested}
            </p>
          </CardContent>
        </Card>
      </div>

      <RetiroWeekendAvailability analysis={weekendAnalysis} compact />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Cadastros por mês</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.submissionsByMonth.length === 0 ? (
              <p className="text-[15px] text-muted-foreground">Sem dados ainda.</p>
            ) : (
              <div className="space-y-3">
                {metrics.submissionsByMonth.map(({ month, count }) => (
                  <div key={month} className="space-y-1">
                    <div className="flex justify-between text-[15px]">
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
            <CardTitle className="text-base font-semibold">Acesso rápido</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-[15px] text-muted-foreground">
              O cadastro no site é permanente. As respostas do mini-retiro ficam na aba
              Retiros enquanto o evento estiver aberto.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/cadastros" className={cn(buttonVariants({ variant: "outline" }))}>
                Ver cadastros
              </Link>
              <Link href="/admin/retiros" className={cn(buttonVariants({ variant: "outline" }))}>
                Ver retiros
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
