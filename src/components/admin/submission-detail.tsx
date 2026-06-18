"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTransition } from "react";
import { updateSubmissionStatus } from "@/actions/admin";
import {
  buddhismLabels,
  meditationLabels,
  preferredContactLabels,
  statusLabels,
} from "@/lib/constants";
import type {
  BuddhismLevel,
  MeditationLevel,
  PreferredContact,
  SubmissionStatus,
} from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type SubmissionDetailProps = {
  submission: {
    id: string;
    protocol: string;
    fullName: string;
    birthDate: Date | null;
    city: string;
    occupation: string | null;
    email: string;
    phone: string | null;
    preferredContact: PreferredContact;
    meditationExperience: MeditationLevel;
    buddhismExperience: BuddhismLevel;
    tradition: string | null;
    motivation: string;
    observations: string | null;
    howDidYouHear: string | null;
    status: SubmissionStatus;
    createdAt: Date;
    availabilityDates: { date: Date }[];
  };
};

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function SubmissionDetail({ submission }: SubmissionDetailProps) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(status: SubmissionStatus) {
    startTransition(async () => {
      await updateSubmissionStatus(submission.id, status);
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm text-muted-foreground">{submission.protocol}</p>
          <h1 className="font-heading text-2xl text-foreground">{submission.fullName}</h1>
          <p className="text-sm text-muted-foreground">
            Inscrito em{" "}
            {format(new Date(submission.createdAt), "d 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        </div>

        <Select
          value={submission.status}
          onValueChange={(v) => handleStatusChange(v as SubmissionStatus)}
          disabled={isPending}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(statusLabels) as [SubmissionStatus, string][]).map(
              ([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-heading text-lg">Dados pessoais</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome" value={submission.fullName} />
          <Field
            label="Nascimento"
            value={
              submission.birthDate
                ? format(new Date(submission.birthDate), "d/MM/yyyy")
                : undefined
            }
          />
          <Field label="Cidade" value={submission.city} />
          <Field label="Ocupação" value={submission.occupation} />
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg">Contato</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="E-mail" value={submission.email} />
          <Field label="Telefone" value={submission.phone ?? undefined} />
          <Field
            label="Preferência"
            value={preferredContactLabels[submission.preferredContact]}
          />
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg">Experiência</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Meditação"
            value={meditationLabels[submission.meditationExperience]}
          />
          <Field
            label="Budismo"
            value={buddhismLabels[submission.buddhismExperience]}
          />
          <Field label="Tradição" value={submission.tradition} />
        </dl>
        <Field label="Motivação" value={submission.motivation} />
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg">Disponibilidade</h2>
        <div className="flex flex-wrap gap-2">
          {submission.availabilityDates.map(({ date }) => (
            <Badge key={date.toISOString()} variant="outline">
              {format(new Date(date), "d MMM yyyy", { locale: ptBR })}
            </Badge>
          ))}
        </div>
      </section>

      {(submission.howDidYouHear || submission.observations) && (
        <section className="space-y-4">
          <h2 className="font-heading text-lg">Observações</h2>
          <Field label="Como conheceu" value={submission.howDidYouHear} />
          <Field label="Observações" value={submission.observations} />
        </section>
      )}
    </div>
  );
}
