import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/layout/page-header";
import { MaterialsLoginForm } from "@/components/materiais/materials-login-form";
import { MaterialsBrowser } from "@/components/materiais/materials-browser";
import { isMaterialsAuthenticated } from "@/actions/materials-auth";
import { getMaterialsCatalog } from "@/lib/materials";
import { logoutMaterialsAction } from "@/actions/materials-auth";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Material de Estudo",
  robots: { index: false, follow: false },
};

export default async function MaterialsPage() {
  const authenticated = await isMaterialsAuthenticated();

  if (!authenticated) {
    return (
      <SiteShell>
        <div className="flex min-h-[60vh] items-center px-6 py-20">
          <MaterialsLoginForm />
        </div>
      </SiteShell>
    );
  }

  const catalog = getMaterialsCatalog();

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Biblioteca"
        title="Material de estudo"
        description="Livros, sadhanas, gravações e imagens para apoiar sua prática."
      />
      <div className="mx-auto max-w-3xl px-6 pb-24">
        <form action={logoutMaterialsAction} className="mb-8 flex justify-end">
          <Button type="submit" variant="ghost" size="sm">
            Sair
          </Button>
        </form>
        {catalog.length === 0 ? (
          <p className="text-muted-foreground">Nenhum arquivo encontrado na pasta assets.</p>
        ) : (
          <MaterialsBrowser catalog={catalog} />
        )}
      </div>
    </SiteShell>
  );
}
