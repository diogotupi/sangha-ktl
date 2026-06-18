"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  buddhismLabels,
  meditationLabels,
  statusLabels,
} from "@/lib/constants";
import {
  carLabels,
  financialLabels,
  interestLabels,
  roomLabels,
} from "@/lib/validations/mini-retiro";
import { analyzeMiniRetiroWeekends } from "@/lib/mini-retiro-weekends";
import type {
  BuddhismLevel,
  MeditationLevel,
  MiniRetiroInterest,
  Prisma,
  SubmissionStatus,
} from "@/generated/prisma/client";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const cause = error.cause as { code?: string } | undefined;
      if (cause?.code?.startsWith("P100")) {
        return {
          error:
            "Banco de dados indisponível. Execute: npx prisma dev && npm run db:setup",
        };
      }
      return { error: "E-mail ou senha incorretos." };
    }
    throw error;
  }

  return {};
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
}

export type SubmissionFilters = {
  search?: string;
  status?: SubmissionStatus | "ALL";
  meditation?: MeditationLevel | "ALL";
  from?: string;
  to?: string;
};

export async function getSubmissions(filters: SubmissionFilters = {}) {
  await requireAdmin();

  const where: Prisma.SubmissionWhereInput = {};

  if (filters.search) {
    where.OR = [
      { fullName: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
      { city: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.status && filters.status !== "ALL") {
    where.status = filters.status;
  }

  if (filters.meditation && filters.meditation !== "ALL") {
    where.meditationExperience = filters.meditation;
  }

  if (filters.from || filters.to) {
    where.createdAt = {};
    if (filters.from) {
      where.createdAt.gte = new Date(filters.from);
    }
    if (filters.to) {
      where.createdAt.lte = new Date(`${filters.to}T23:59:59`);
    }
  }

  return prisma.submission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getSubmissionById(id: string) {
  await requireAdmin();

  return prisma.submission.findUnique({
    where: { id },
  });
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
) {
  await requireAdmin();

  await prisma.submission.update({
    where: { id },
    data: { status },
  });
}

export async function getDashboardMetrics(periodDays = 30) {
  await requireAdmin();

  const now = new Date();
  const periodStart = new Date(now);
  periodStart.setDate(periodStart.getDate() - periodDays);

  const [total, periodCount, submissions, miniRetiroTotal, miniRetiroInterested] =
    await Promise.all([
      prisma.submission.count(),
      prisma.submission.count({
        where: { createdAt: { gte: periodStart } },
      }),
      prisma.submission.findMany({
        select: { createdAt: true },
        orderBy: { createdAt: "asc" },
      }),
      prisma.miniRetiroSubmission.count(),
      prisma.miniRetiroSubmission.count({
        where: { interest: "YES" },
      }),
    ]);

  const monthlyMap = new Map<string, number>();
  for (const sub of submissions) {
    const key = `${sub.createdAt.getFullYear()}-${String(sub.createdAt.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + 1);
  }

  const submissionsByMonth = Array.from(monthlyMap.entries())
    .map(([month, count]) => ({ month, count }))
    .slice(-12);

  return {
    total,
    periodCount,
    submissionsByMonth,
    miniRetiroTotal,
    miniRetiroInterested,
  };
}

function escapeCsv(value: string | null | undefined): string {
  if (!value) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function exportSubmissionsCsv(
  filters: SubmissionFilters = {},
): Promise<string> {
  const submissions = await getSubmissions(filters);

  const headers = [
    "Nome",
    "E-mail",
    "Telefone",
    "Cidade",
    "Meditação",
    "Budismo",
    "Status",
    "Motivação",
    "Como conheceu",
    "Observações",
    "Criado em",
  ];

  const rows = submissions.map((sub) => [
    sub.fullName,
    sub.email,
    sub.phone,
    sub.city,
    meditationLabels[sub.meditationExperience],
    buddhismLabels[sub.buddhismExperience],
    statusLabels[sub.status],
    sub.motivation,
    sub.howDidYouHear,
    sub.observations,
    sub.createdAt.toISOString(),
  ]);

  return [
    headers.join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");
}

export async function getSubmissionStats() {
  await requireAdmin();

  const byStatus = await prisma.submission.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const byMeditation = await prisma.submission.groupBy({
    by: ["meditationExperience"],
    _count: { meditationExperience: true },
  });

  return { byStatus, byMeditation };
}

export async function getMiniRetiroWeekendAnalysis() {
  await requireAdmin();

  const submissions = await prisma.miniRetiroSubmission.findMany({
    select: {
      fullName: true,
      interest: true,
      dateRestrictions: true,
    },
  });

  return analyzeMiniRetiroWeekends(submissions);
}

export type MiniRetiroFilters = {
  search?: string;
  interest?: MiniRetiroInterest | "ALL";
  from?: string;
  to?: string;
};

export async function getMiniRetiroSubmissions(
  filters: MiniRetiroFilters = {},
) {
  await requireAdmin();

  const where: Prisma.MiniRetiroSubmissionWhereInput = {};

  if (filters.search) {
    where.OR = [
      { fullName: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.interest && filters.interest !== "ALL") {
    where.interest = filters.interest;
  }

  if (filters.from || filters.to) {
    where.createdAt = {};
    if (filters.from) {
      where.createdAt.gte = new Date(filters.from);
    }
    if (filters.to) {
      where.createdAt.lte = new Date(`${filters.to}T23:59:59`);
    }
  }

  return prisma.miniRetiroSubmission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getMiniRetiroById(id: string) {
  await requireAdmin();

  return prisma.miniRetiroSubmission.findUnique({
    where: { id },
  });
}

export async function exportMiniRetiroCsv(
  filters: MiniRetiroFilters = {},
): Promise<string> {
  const submissions = await getMiniRetiroSubmissions(filters);

  const headers = [
    "Nome",
    "E-mail",
    "Interesse",
    "Interesse (outro)",
    "Restrições de data",
    "Carro / carona",
    "Restrições alimentares",
    "Quarto compartilhado",
    "Disponibilidade financeira",
    "Observações",
    "Criado em",
  ];

  const rows = submissions.map((sub) => [
    sub.fullName,
    sub.email,
    interestLabels[sub.interest],
    sub.interestOther,
    sub.dateRestrictions,
    carLabels[sub.carAvailability],
    sub.dietaryRestrictions,
    roomLabels[sub.roomSharing],
    financialLabels[sub.financialAvailability],
    sub.observations,
    sub.createdAt.toISOString(),
  ]);

  return [
    headers.join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");
}
