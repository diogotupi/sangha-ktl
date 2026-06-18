"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Leaf } from "lucide-react";
import { createMiniRetiroSubmission } from "@/actions/mini-retiro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  carLabels,
  financialLabels,
  interestLabels,
  miniRetiroSchema,
  roomLabels,
  type MiniRetiroInput,
} from "@/lib/validations/mini-retiro";
import { MiniRetiroWeekendPicker } from "@/components/forms/mini-retiro-weekend-picker";
import { cn } from "@/lib/utils";

export function MiniRetiroForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MiniRetiroInput>({
    resolver: zodResolver(miniRetiroSchema),
    defaultValues: {
      fullName: "",
      email: "",
      interest: undefined,
      interestOther: "",
      unavailableWeekends: [],
      carAvailability: undefined,
      dietaryRestrictions: "",
      roomSharing: undefined,
      financialAvailability: undefined,
      observations: "",
    },
  });

  const interest = watch("interest");

  async function onSubmit(data: MiniRetiroInput) {
    setIsSubmitting(true);
    setSubmitError(null);
    const result = await createMiniRetiroSubmission(data);
    setIsSubmitting(false);
    if (result.success) setSubmitted(true);
    else setSubmitError(result.error);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-brand/10">
          <Leaf className="size-6 text-brand" />
        </div>
        <h2 className="font-heading text-2xl">Obrigado pela resposta</h2>
        <p className="mt-3 text-muted-foreground">
          Recebemos suas informações. Entraremos em contato conforme formos
          organizando o mini-retiro.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-2 rounded-xl border border-border/60 bg-card/50 p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Estamos organizando um mini-retiro no Rio de Janeiro, sexta à noite
          até domingo antes do almoço. A proposta é práticas de meditação mais
          longas e conversas sobre os ensinamentos. Responda abaixo para
          planejarmos e estimarmos os custos.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Seu nome</Label>
        <Input id="fullName" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Você tem interesse em participar do mini-retiro? *
        </legend>
        <p className="text-sm text-muted-foreground">
          A proposta é fazermos práticas de meditações mais longas e termos
          conversas mais gerais sobre os ensinamentos.
        </p>
        <RadioGroup
          value={interest ?? ""}
          onValueChange={(v) =>
            setValue("interest", v as MiniRetiroInput["interest"], {
              shouldValidate: true,
            })
          }
          className="space-y-2"
        >
          {(Object.entries(interestLabels) as [MiniRetiroInput["interest"], string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 px-4 py-3",
                  interest === value && "border-brand bg-brand/5",
                )}
              >
                <RadioGroupItem value={value} />
                <span className="text-sm">{label}</span>
              </label>
            ),
          )}
        </RadioGroup>
        {interest === "OTHER" && (
          <Input placeholder="Descreva..." {...register("interestOther")} />
        )}
        {errors.interest && (
          <p className="text-sm text-destructive">{errors.interest.message}</p>
        )}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Restrição de datas nos próximos meses? *
        </legend>
        <p className="text-sm text-muted-foreground">
          Marque os fins de semana (sexta a domingo) em que você{" "}
          <strong>não</strong> pode participar. Se puder em todos, deixe em
          branco.
        </p>
        <MiniRetiroWeekendPicker
          value={watch("unavailableWeekends") ?? []}
          onChange={(weekends) =>
            setValue("unavailableWeekends", weekends, { shouldValidate: true })
          }
          error={errors.unavailableWeekends?.message}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Você tem carro ou precisaria de carona? *
        </legend>
        <RadioGroup
          value={watch("carAvailability") ?? ""}
          onValueChange={(v) =>
            setValue("carAvailability", v as MiniRetiroInput["carAvailability"], {
              shouldValidate: true,
            })
          }
          className="space-y-2"
        >
          {(Object.entries(carLabels) as [MiniRetiroInput["carAvailability"], string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 px-4 py-3"
              >
                <RadioGroupItem value={value} />
                <span className="text-sm">{label}</span>
              </label>
            ),
          )}
        </RadioGroup>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="dietaryRestrictions">
          Restrições alimentares (dieta, alergias, etc.)? *
        </Label>
        <Textarea id="dietaryRestrictions" rows={2} {...register("dietaryRestrictions")} />
        {errors.dietaryRestrictions && (
          <p className="text-sm text-destructive">{errors.dietaryRestrictions.message}</p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Você estaria disposto(a) a dividir quarto? *
        </legend>
        <RadioGroup
          value={watch("roomSharing") ?? ""}
          onValueChange={(v) =>
            setValue("roomSharing", v as MiniRetiroInput["roomSharing"], {
              shouldValidate: true,
            })
          }
          className="space-y-2"
        >
          {(Object.entries(roomLabels) as [MiniRetiroInput["roomSharing"], string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 px-4 py-3"
              >
                <RadioGroupItem value={value} />
                <span className="text-sm">{label}</span>
              </label>
            ),
          )}
        </RadioGroup>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Disponibilidade financeira estimada? *
        </legend>
        <p className="text-sm text-muted-foreground">
          Ainda vamos avaliar os custos. Qual seria sua disponibilidade?
        </p>
        <RadioGroup
          value={watch("financialAvailability") ?? ""}
          onValueChange={(v) =>
            setValue(
              "financialAvailability",
              v as MiniRetiroInput["financialAvailability"],
              { shouldValidate: true },
            )
          }
          className="space-y-2"
        >
          {(
            Object.entries(financialLabels) as [
              MiniRetiroInput["financialAvailability"],
              string,
            ][]
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 px-4 py-3"
            >
              <RadioGroupItem value={value} />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="observations">Algum outro comentário? (opcional)</Label>
        <Textarea id="observations" rows={3} {...register("observations")} />
      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} className="bg-brand hover:bg-brand/90">
        {isSubmitting ? "Enviando..." : "Enviar resposta"}
        <Check className="ml-2 size-4" />
      </Button>
    </form>
  );
}
