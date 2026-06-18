import type { Metadata } from "next";
import { MiniRetiroForm } from "@/components/forms/mini-retiro-form";

export const metadata: Metadata = {
  title: "Mini-retiro KTL",
  robots: { index: false, follow: false },
};

export default function MiniRetiroPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-10 space-y-2 text-center">
          <p className="font-accent text-sm tracking-[0.15em] text-brand uppercase">
            ☸️ Mini-retiro KTL
          </p>
          <h1 className="font-heading text-3xl text-foreground md:text-4xl">
            Rio de Janeiro
          </h1>
          <p className="text-muted-foreground">
            Formulário exclusivo para membros da sangha, link enviado diretamente.
          </p>
        </div>
        <MiniRetiroForm />
      </div>
    </div>
  );
}
