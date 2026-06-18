import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  carLabels,
  financialLabels,
  interestLabels,
  roomLabels,
} from "@/lib/validations/mini-retiro";
import type {
  CarAvailability,
  FinancialAvailability,
  MiniRetiroInterest,
  RoomSharing,
} from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type MiniRetiroDetailProps = {
  submission: {
    id: string;
    fullName: string;
    email: string;
    interest: MiniRetiroInterest;
    interestOther: string | null;
    dateRestrictions: string;
    carAvailability: CarAvailability;
    dietaryRestrictions: string;
    roomSharing: RoomSharing;
    financialAvailability: FinancialAvailability;
    observations: string | null;
    createdAt: Date;
  };
};

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="text-sm whitespace-pre-wrap text-foreground">{value}</dd>
    </div>
  );
}

export function MiniRetiroDetail({ submission }: MiniRetiroDetailProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{submission.fullName}</h1>
        <p className="text-sm text-muted-foreground">
          Resposta enviada em{" "}
          {format(new Date(submission.createdAt), "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
            locale: ptBR,
          })}
        </p>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-base font-semibold">Contato</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome" value={submission.fullName} />
          <Field label="E-mail" value={submission.email} />
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold">Interesse no retiro</h2>
        <dl className="grid gap-4">
          <div className="space-y-1">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Interesse
            </dt>
            <dd>
              <Badge>{interestLabels[submission.interest]}</Badge>
            </dd>
          </div>
          {submission.interestOther && (
            <Field label="Detalhe do interesse" value={submission.interestOther} />
          )}
          <Field label="Restrições de data" value={submission.dateRestrictions} />
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold">Logística</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Carro / carona" value={carLabels[submission.carAvailability]} />
          <Field
            label="Quarto compartilhado"
            value={roomLabels[submission.roomSharing]}
          />
          <Field
            label="Disponibilidade financeira"
            value={financialLabels[submission.financialAvailability]}
          />
          <Field label="Restrições alimentares" value={submission.dietaryRestrictions} />
        </dl>
      </section>

      {submission.observations && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold">Observações</h2>
          <Field label="Observações" value={submission.observations} />
        </section>
      )}
    </div>
  );
}
