import type { Metadata } from "next";
import { Suspense } from "react";
import { getMiniRetiroSubmissions, getMiniRetiroWeekendAnalysis } from "@/actions/admin";
import { MiniRetiroTable } from "@/components/admin/mini-retiro-table";
import { RetiroWeekendAvailability } from "@/components/admin/retiro-weekend-availability";
import type { MiniRetiroInterest } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Retiros",
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    interest?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function RetirosPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const [submissions, weekendAnalysis] = await Promise.all([
    getMiniRetiroSubmissions({
      search: params.search,
      interest: (params.interest as MiniRetiroInterest | "ALL") ?? "ALL",
      from: params.from,
      to: params.to,
    }),
    getMiniRetiroWeekendAnalysis(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Retiros</h1>
        <p className="text-[15px] text-muted-foreground">
          Respostas do formulário do mini-retiro (evento temporário).{" "}
          {submissions.length}{" "}
          {submissions.length === 1 ? "resposta encontrada" : "respostas encontradas"}.
        </p>
      </div>

      <RetiroWeekendAvailability analysis={weekendAnalysis} />

      <Suspense fallback={<p className="text-muted-foreground">Carregando...</p>}>
        <MiniRetiroTable submissions={submissions} />
      </Suspense>
    </div>
  );
}
