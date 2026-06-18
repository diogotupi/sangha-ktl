import { z } from "zod";

export const miniRetiroSchema = z.object({
  fullName: z.string().min(2, "Informe seu nome").max(120),
  email: z.string().email("Informe um e-mail válido"),
  interest: z.enum(["YES", "NO", "OTHER"]),
  interestOther: z.string().max(500).optional(),
  dateRestrictions: z
    .string()
    .min(1, "Informe se há restrições de data ou escreva \"nenhuma\""),
  carAvailability: z.enum(["HAS_CAR", "NEEDS_RIDE"]),
  dietaryRestrictions: z
    .string()
    .min(1, "Informe restrições alimentares ou escreva \"nenhuma\""),
  roomSharing: z.enum(["INDIVIDUAL", "SAME_SEX", "ANY"]),
  financialAvailability: z.enum([
    "NONE",
    "UP_TO_300",
    "UP_TO_500",
    "MORE_THAN_500",
  ]),
  observations: z.string().max(2000).optional(),
});

export type MiniRetiroInput = z.infer<typeof miniRetiroSchema>;

export const interestLabels = {
  YES: "Sim",
  NO: "Não",
  OTHER: "Outro",
} as const;

export const carLabels = {
  HAS_CAR: "Tenho carro",
  NEEDS_RIDE: "Preciso de carona",
} as const;

export const roomLabels = {
  INDIVIDUAL: "Não, prefiro um quarto individual",
  SAME_SEX: "Sim, apenas com pessoas do mesmo sexo que eu",
  ANY: "Sim, independentemente do gênero",
} as const;

export const financialLabels = {
  NONE: "Não tenho recursos",
  UP_TO_300: "Até 300 reais",
  UP_TO_500: "Até 500 reais",
  MORE_THAN_500: "Mais de 500 reais",
} as const;
