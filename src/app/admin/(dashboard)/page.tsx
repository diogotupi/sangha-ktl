import type { Metadata } from "next";
import Link from "next/link";
import { getDashboardMetrics, getMiniRetiroWeekendAnalysis } from "@/actions/admin";
import { DashboardMetrics } from "@/components/admin/dashboard-metrics";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const [metrics, weekendAnalysis] = await Promise.all([
    getDashboardMetrics(30),
    getMiniRetiroWeekendAnalysis(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Dashboard</h1>
          <p className="text-[15px] text-muted-foreground">
            Visão geral dos cadastros permanentes e das respostas ao mini-retiro.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/cadastros"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Ver cadastros
          </Link>
          <Link
            href="/admin/retiros"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Ver retiros
          </Link>
        </div>
      </div>

      <DashboardMetrics
        metrics={metrics}
        weekendAnalysis={weekendAnalysis}
        periodDays={30}
      />
    </div>
  );
}
