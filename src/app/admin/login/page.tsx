import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Login Admin",
};

export default function AdminLoginPage() {
  return (
    <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-2xl">Área administrativa</h1>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais de administrador.
          </p>
        </div>
        <LoginForm />
      </div>
  );
}
