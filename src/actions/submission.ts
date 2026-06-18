"use server";

import { prisma } from "@/lib/prisma";
import { generateProtocol } from "@/lib/protocol";
import {
  submissionSchema,
  type SubmissionInput,
} from "@/lib/validations/submission";
import { revalidatePath } from "next/cache";

export type SubmissionActionResult =
  | { success: true }
  | { success: false; error: string };

export async function createSubmission(
  data: SubmissionInput,
): Promise<SubmissionActionResult> {
  const parsed = submissionSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const input = parsed.data;

  try {
    await prisma.submission.create({
      data: {
        protocol: generateProtocol(),
        fullName: input.fullName,
        birthDate: input.birthDate ? new Date(input.birthDate) : null,
        city: input.city,
        occupation: input.occupation || null,
        email: input.email,
        phone: input.phone || null,
        preferredContact: "EMAIL",
        meditationExperience: input.meditationExperience,
        buddhismExperience: input.buddhismExperience,
        tradition: input.tradition || null,
        motivation: input.motivation,
        observations: input.observations || null,
        howDidYouHear: input.howDidYouHear || null,
      },
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Failed to create submission:", error);
    return {
      success: false,
      error: "Não foi possível concluir o cadastro. Tente novamente.",
    };
  }
}
