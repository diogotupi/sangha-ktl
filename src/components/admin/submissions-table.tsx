"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, Download } from "lucide-react";
import {
  buddhismLabels,
  meditationLabels,
  statusLabels,
} from "@/lib/constants";
import type { SubmissionStatus, MeditationLevel } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SubmissionRow = {
  id: string;
  protocol: string;
  fullName: string;
  email: string;
  city: string;
  meditationExperience: MeditationLevel;
  status: SubmissionStatus;
  createdAt: Date;
};

type SubmissionFiltersProps = {
  submissions: SubmissionRow[];
};

export function SubmissionsTable({ submissions }: SubmissionFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "ALL";
  const meditation = searchParams.get("meditation") ?? "ALL";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      startTransition(() => {
        router.push(`/admin/inscricoes?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  function handleExport() {
    const params = new URLSearchParams(searchParams.toString());
    window.location.href = `/admin/export?${params.toString()}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Buscar nome, e-mail, protocolo..."
            defaultValue={search}
            onChange={(e) => updateParams({ search: e.target.value })}
            aria-label="Buscar inscrições"
          />

          <Select
            value={status}
            onValueChange={(v) => updateParams({ status: v === "ALL" ? "" : v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os status</SelectItem>
              {(
                Object.entries(statusLabels) as [SubmissionStatus, string][]
              ).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={meditation}
            onValueChange={(v) => updateParams({ meditation: v === "ALL" ? "" : v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Meditação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Toda experiência</SelectItem>
              {(
                Object.entries(meditationLabels) as [MeditationLevel, string][]
              ).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              type="date"
              defaultValue={from}
              onChange={(e) => updateParams({ from: e.target.value })}
              aria-label="Data inicial"
            />
            <Input
              type="date"
              defaultValue={to}
              onChange={(e) => updateParams({ to: e.target.value })}
              aria-label="Data final"
            />
          </div>
        </div>

        <Button variant="outline" onClick={handleExport} className="shrink-0">
          <Download className="mr-2 size-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="rounded-xl border border-border/60 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocolo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Cidade</TableHead>
              <TableHead className="hidden lg:table-cell">Meditação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                  {isPending ? "Carregando..." : "Nenhuma inscrição encontrada."}
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-mono text-xs">{sub.protocol}</TableCell>
                  <TableCell className="font-medium">{sub.fullName}</TableCell>
                  <TableCell className="hidden md:table-cell">{sub.city}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {meditationLabels[sub.meditationExperience]}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{statusLabels[sub.status]}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {format(new Date(sub.createdAt), "d MMM yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/inscricoes/${sub.id}`}
                      aria-label={`Ver ${sub.fullName}`}
                      className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
                    >
                      <Eye className="size-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
