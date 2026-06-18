import { z } from "zod";

export const meditationLevelSchema = z.enum(
  ["NONE", "BEGINNER", "INTERMEDIATE", "ADVANCED"],
  { error: "Selecione sua experiência com meditação" },
);

export const buddhismLevelSchema = z.enum(
  ["NEW", "SOME_KNOWLEDGE", "PRACTITIONER", "LONG_TERM"],
  { error: "Selecione sua experiência com budismo" },
);

export const personalStepSchema = z.object({
  fullName: z
    .string()
    .min(2, "Por favor, informe seu nome completo")
    .max(120, "Nome muito longo"),
  birthDate: z.string().optional(),
  city: z
    .string()
    .min(2, "Informe sua cidade")
    .max(100, "Nome da cidade muito longo"),
  occupation: z.string().max(100, "Ocupação muito longa").optional(),
});

export const contactStepSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  phone: z.string().max(20, "Telefone muito longo").optional(),
});

export const experienceStepSchema = z.object({
  meditationExperience: meditationLevelSchema,
  buddhismExperience: buddhismLevelSchema,
  tradition: z.string().max(120).optional(),
  motivation: z
    .string()
    .min(10, "Conte-nos um pouco sobre o que te traz aqui")
    .max(2000, "Texto muito longo"),
});

export const finalStepSchema = z.object({
  observations: z.string().max(2000).optional(),
  howDidYouHear: z.string().max(200).optional(),
});

export const submissionSchema = personalStepSchema
  .merge(contactStepSchema)
  .merge(experienceStepSchema)
  .merge(finalStepSchema);

export type PersonalStepInput = z.infer<typeof personalStepSchema>;
export type ContactStepInput = z.infer<typeof contactStepSchema>;
export type ExperienceStepInput = z.infer<typeof experienceStepSchema>;
export type FinalStepInput = z.infer<typeof finalStepSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;

export const WIZARD_STEPS = [
  { id: 1, title: "Quem é você", key: "personal" },
  { id: 2, title: "Seu e-mail", key: "contact" },
  { id: 3, title: "Só pra gente te conhecer", key: "experience" },
  { id: 4, title: "Mais alguma coisa", key: "final" },
] as const;
