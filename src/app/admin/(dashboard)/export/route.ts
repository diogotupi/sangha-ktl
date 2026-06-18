import { NextRequest, NextResponse } from "next/server";
import { exportSubmissionsCsv } from "@/actions/admin";
import type { SubmissionStatus, MeditationLevel } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const csv = await exportSubmissionsCsv({
    search: searchParams.get("search") ?? undefined,
    status: (searchParams.get("status") as SubmissionStatus | "ALL") ?? "ALL",
    meditation:
      (searchParams.get("meditation") as MeditationLevel | "ALL") ?? "ALL",
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
  });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscricoes-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
