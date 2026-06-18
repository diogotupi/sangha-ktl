"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, Download } from "lucide-react";
import { DeleteMiniRetiroButton } from "@/components/admin/delete-mini-retiro-button";
import { interestLabels } from "@/lib/validations/mini-retiro";
import type { MiniRetiroInterest } from "@/generated/prisma/client";
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

type MiniRetiroRow = {
  id: string;
  fullName: string;
  email: string;
  interest: MiniRetiroInterest;
  dateRestrictions: string;
  createdAt: Date;
};

type MiniRetiroTableProps = {
  submissions: MiniRetiroRow[];
};

const interestBadgeVariant = {
  YES: "default",
  NO: "secondary",
  OTHER: "outline",
} as const;

export function MiniRetiroTable({ submissions }: MiniRetiroTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const interest = searchParams.get("interest") ?? "ALL";
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
        router.push(`/admin/retiros?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  function handleExport() {
    const params = new URLSearchParams(searchParams.toString());
    window.location.href = `/admin/retiros/export?${params.toString()}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            placeholder="Buscar nome ou e-mail..."
            defaultValue={search}
            onChange={(e) => updateParams({ search: e.target.value })}
            aria-label="Buscar respostas do retiro"
          />

          <Select
            value={interest}
            onValueChange={(v) => updateParams({ interest: v === "ALL" ? "" : v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Interesse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todo interesse</SelectItem>
              {(
                Object.entries(interestLabels) as [MiniRetiroInterest, string][]
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
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">E-mail</TableHead>
              <TableHead>Interesse</TableHead>
              <TableHead className="hidden lg:table-cell">Datas</TableHead>
              <TableHead className="hidden sm:table-cell">Enviado em</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  {isPending ? "Carregando..." : "Nenhuma resposta encontrada."}
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.fullName}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {sub.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={interestBadgeVariant[sub.interest]}>
                      {interestLabels[sub.interest]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-xs truncate text-sm text-muted-foreground">
                    {sub.dateRestrictions}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {format(new Date(sub.createdAt), "d MMM yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/retiros/${sub.id}`}
                        aria-label={`Ver ${sub.fullName}`}
                        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
                      >
                        <Eye className="size-4" />
                      </Link>
                      <DeleteMiniRetiroButton
                        id={sub.id}
                        fullName={sub.fullName}
                        variant="icon"
                      />
                    </div>
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
