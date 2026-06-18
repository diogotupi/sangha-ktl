import type { Metadata } from "next";
import { Suspense } from "react";
import { getSubmissions } from "@/actions/admin";
import { SubmissionsTable } from "@/components/admin/submissions-table";
import type { SubmissionStatus, MeditationLevel } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Inscrições",
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    meditation?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function SubmissionsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const submissions = await getSubmissions({
    search: params.search,
    status: (params.status as SubmissionStatus | "ALL") ?? "ALL",
    meditation: (params.meditation as MeditationLevel | "ALL") ?? "ALL",
    from: params.from,
    to: params.to,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl">Inscrições</h1>
        <p className="text-muted-foreground">
          {submissions.length}{" "}
          {submissions.length === 1 ? "inscrição encontrada" : "inscrições encontradas"}
        </p>
      </div>

      <Suspense fallback={<p className="text-muted-foreground">Carregando...</p>}>
        <SubmissionsTable submissions={submissions} />
      </Suspense>
    </div>
  );
}
