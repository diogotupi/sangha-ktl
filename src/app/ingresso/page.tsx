import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/layout/page-header";
import { IntakeWizard } from "@/components/forms/intake-wizard";

export const metadata: Metadata = {
  title: "Cadastro",
  description:
    "Cadastre-se para receber informações e o link dos encontros quinzenais da sangha.",
};

export default function IntakePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Encontros quinzenais"
        title="Quero conhecer a sangha"
        description="Preencha com calma. Seu e-mail entrará em nossa lista e você receberá o link do Zoom antes de cada encontro."
        centered
      />
      <IntakeWizard />
    </SiteShell>
  );
}
