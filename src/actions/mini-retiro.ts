"use server";

import { prisma } from "@/lib/prisma";
import {
  miniRetiroSchema,
  type MiniRetiroInput,
} from "@/lib/validations/mini-retiro";
import { revalidatePath } from "next/cache";

export type MiniRetiroActionResult =
  | { success: true }
  | { success: false; error: string };

export async function createMiniRetiroSubmission(
  data: MiniRetiroInput,
): Promise<MiniRetiroActionResult> {
  const parsed = miniRetiroSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const input = parsed.data;

  if (input.interest === "OTHER" && !input.interestOther?.trim()) {
    return { success: false, error: 'Descreva sua resposta em "Outro".' };
  }

  try {
    await prisma.miniRetiroSubmission.create({
      data: {
        fullName: input.fullName,
        email: input.email,
        interest: input.interest,
        interestOther: input.interestOther || null,
        dateRestrictions: input.dateRestrictions,
        carAvailability: input.carAvailability,
        dietaryRestrictions: input.dietaryRestrictions,
        roomSharing: input.roomSharing,
        financialAvailability: input.financialAvailability,
        observations: input.observations || null,
      },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to create mini retiro submission:", error);
    return {
      success: false,
      error: "Não foi possível enviar sua resposta. Tente novamente.",
    };
  }
}
