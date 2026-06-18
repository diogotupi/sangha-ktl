import type { Metadata } from "next";
import Link from "next/link";
import { getDashboardMetrics } from "@/actions/admin";
import { DashboardMetrics } from "@/components/admin/dashboard-metrics";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics(30);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das inscrições e disponibilidade.
          </p>
        </div>
        <Link
          href="/admin/inscricoes"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Ver inscrições
        </Link>
      </div>

      <DashboardMetrics metrics={metrics} periodDays={30} />
    </div>
  );
}
