"use client";

import { useActionState } from "react";
import {
  loginMaterialsAction,
  type MaterialsLoginState,
} from "@/actions/materials-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: MaterialsLoginState = {};

export function MaterialsLoginForm() {
  const [state, formAction, pending] = useActionState(
    loginMaterialsAction,
    initialState,
  );

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-2xl">Material de estudo</h1>
        <p className="text-sm text-muted-foreground">
          Esta área é reservada aos membros da sangha. Informe a senha de acesso.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" name="password" type="password" required disabled={pending} />
      </div>
      {state.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" className="w-full bg-brand hover:bg-brand/90" disabled={pending}>
        {pending ? "Verificando..." : "Entrar"}
      </Button>
    </form>
  );
}
