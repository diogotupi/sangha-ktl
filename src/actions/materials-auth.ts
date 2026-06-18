"use server";

import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";
import { redirect } from "next/navigation";
import { MATERIALS_COOKIE } from "@/lib/materials";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

function expectedToken(): string {
  const password = process.env.MATERIALS_PASSWORD ?? "ktl-materiais";
  const secret = process.env.AUTH_SECRET ?? "dev-secret";
  return createHash("sha256")
    .update(`${password}:${secret}:materials`)
    .digest("hex");
}

export async function isMaterialsAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(MATERIALS_COOKIE)?.value;
  if (!token) return false;

  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expectedToken());
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export type MaterialsLoginState = { error?: string };

export async function loginMaterialsAction(
  _prev: MaterialsLoginState,
  formData: FormData,
): Promise<MaterialsLoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.MATERIALS_PASSWORD ?? "ktl-materiais";

  if (password !== expected) {
    return { error: "Senha incorreta." };
  }

  const cookieStore = await cookies();
  cookieStore.set(MATERIALS_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  redirect("/materiais");
}

export async function logoutMaterialsAction() {
  const cookieStore = await cookies();
  cookieStore.delete(MATERIALS_COOKIE);
  redirect("/materiais");
}
