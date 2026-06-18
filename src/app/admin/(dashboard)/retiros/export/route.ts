import { NextRequest, NextResponse } from "next/server";
import { exportMiniRetiroCsv } from "@/actions/admin";
import type { MiniRetiroInterest } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const csv = await exportMiniRetiroCsv({
    search: searchParams.get("search") ?? undefined,
    interest: (searchParams.get("interest") as MiniRetiroInterest | "ALL") ?? "ALL",
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
  });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="retiros-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
