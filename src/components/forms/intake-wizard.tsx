"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Leaf } from "lucide-react";
import { createSubmission } from "@/actions/submission";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { buddhismLabels, meditationLabels } from "@/lib/constants";
import {
  WIZARD_STEPS,
  submissionSchema,
  personalStepSchema,
  contactStepSchema,
  experienceStepSchema,
  finalStepSchema,
  type SubmissionInput,
} from "@/lib/validations/submission";
import { cn } from "@/lib/utils";

const stepSchemas = [
  personalStepSchema,
  contactStepSchema,
  experienceStepSchema,
  finalStepSchema,
];

export function IntakeWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubmissionInput>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      city: "",
      occupation: "",
      email: "",
      phone: "",
      meditationExperience: undefined,
      buddhismExperience: undefined,
      tradition: "",
      motivation: "",
      observations: "",
      howDidYouHear: "",
    },
    mode: "onTouched",
  });

  const meditation = watch("meditationExperience");
  const buddhism = watch("buddhismExperience");
  const progress = ((step + 1) / WIZARD_STEPS.length) * 100;
  const currentStep = WIZARD_STEPS[step];

  async function goNext() {
    const fields = Object.keys(stepSchemas[step].shape) as (keyof SubmissionInput)[];
    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, WIZARD_STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: SubmissionInput) {
    setIsSubmitting(true);
    setSubmitError(null);
    const result = await createSubmission(data);
    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center animate-in fade-in duration-700">
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-brand/10">
          <Leaf className="size-7 text-brand" aria-hidden />
        </div>
        <h2 className="font-heading text-3xl text-foreground">Obrigado!</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Seu e-mail foi cadastrado em nossa lista. Nos próximos encontros
          quinzenais, você receberá por e-mail o link do Zoom e todas as
          informações necessárias — geralmente alguns dias antes de cada sessão.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Encontros aos sábados, online ou híbridos, a partir do Rio de Janeiro.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl px-6 pb-24"
      noValidate
    >
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Passo {step + 1} de {WIZARD_STEPS.length}
          </span>
          <span>{currentStep.title}</span>
        </div>
        <Progress value={progress} className="h-1 bg-muted" />
      </div>

      <div
        key={step}
        className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8"
      >
        {step === 0 && (
          <>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Como podemos te chamar?
              </h2>
              <p className="text-muted-foreground">
                Queremos te incluir na lista de encontros quinzenais da sangha.
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input id="fullName" {...register("fullName")} autoComplete="name" />
                {errors.fullName && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de nascimento (opcional)</Label>
                  <Input id="birthDate" type="date" {...register("birthDate")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" {...register("city")} autoComplete="address-level2" />
                  {errors.city && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Ocupação (opcional)</Label>
                <Input id="occupation" {...register("occupation")} />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Seu e-mail
              </h2>
              <p className="text-muted-foreground">
                É por e-mail que enviamos o link do Zoom e as informações de
                cada encontro.
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" {...register("email")} autoComplete="email" />
                {errors.email && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (opcional)</Label>
                <Input id="phone" type="tel" {...register("phone")} autoComplete="tel" />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Sua jornada até aqui
              </h2>
              <p className="text-muted-foreground">
                Não há resposta certa — queremos apenas te conhecer melhor.
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Experiência com meditação</Label>
                <Select
                  value={meditation ?? ""}
                  onValueChange={(v) =>
                    setValue(
                      "meditationExperience",
                      v as SubmissionInput["meditationExperience"],
                      { shouldValidate: true },
                    )
                  }
                >
                  <SelectTrigger>
                    <span className={cn(!meditation && "text-muted-foreground")}>
                      {meditation
                        ? meditationLabels[meditation]
                        : "Selecione..."}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      Object.entries(meditationLabels) as [
                        SubmissionInput["meditationExperience"],
                        string,
                      ][]
                    ).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.meditationExperience && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.meditationExperience.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Experiência com budismo</Label>
                <Select
                  value={buddhism ?? ""}
                  onValueChange={(v) =>
                    setValue(
                      "buddhismExperience",
                      v as SubmissionInput["buddhismExperience"],
                      { shouldValidate: true },
                    )
                  }
                >
                  <SelectTrigger>
                    <span className={cn(!buddhism && "text-muted-foreground")}>
                      {buddhism ? buddhismLabels[buddhism] : "Selecione..."}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      Object.entries(buddhismLabels) as [
                        SubmissionInput["buddhismExperience"],
                        string,
                      ][]
                    ).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.buddhismExperience && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.buddhismExperience.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradition">Tradição ou linhagem (opcional)</Label>
                <Input id="tradition" placeholder="Ex.: Kagyu, Zen..." {...register("tradition")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">O que te traz à sangha?</Label>
                <Textarea
                  id="motivation"
                  rows={4}
                  placeholder="Compartilhe o que te inspira a praticar conosco..."
                  {...register("motivation")}
                />
                {errors.motivation && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.motivation.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Há mais alguma coisa?
              </h2>
              <p className="text-muted-foreground">
                Este espaço é seu — use como quiser, ou deixe em branco.
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="howDidYouHear">Como conheceu a sangha? (opcional)</Label>
                <Input id="howDidYouHear" {...register("howDidYouHear")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observations">Observações (opcional)</Label>
                <Textarea id="observations" rows={4} {...register("observations")} />
              </div>
            </div>
          </>
        )}
      </div>

      {submitError && (
        <p className="mt-6 text-sm text-destructive" role="alert">
          {submitError}
        </p>
      )}

      <div className="mt-12 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Button>

        {step < WIZARD_STEPS.length - 1 ? (
          <Button type="button" onClick={goNext} className="bg-brand hover:bg-brand/90">
            Continuar
            <ArrowRight className="ml-2 size-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} className="bg-brand hover:bg-brand/90">
            {isSubmitting ? "Enviando..." : "Cadastrar"}
            <Check className="ml-2 size-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
