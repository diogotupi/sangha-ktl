import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/layout/page-header";
import { AboutPhotoGallery } from "@/components/about/about-photo-gallery";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Sobre a Sangha",
  description:
    "Comunidade de amigos e pesquisadores no Rio de Janeiro, inspirada pelas tradições do Budismo Tibetano e pela linhagem Kagyu.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Nossa comunidade" title="Sobre a Sangha" centered />

      <article className="mx-auto max-w-5xl space-y-12 px-6 pb-24">
        <ScrollReveal variant="fade-up" delay={100}>
          <p className="mx-auto max-w-3xl text-justify leading-relaxed text-muted-foreground">
          Somos uma comunidade de amigos e pesquisadores localizados principalmente
          no Rio de Janeiro. Temos como interesse e objetivos participar do melhor da
          condição humana com recursos e riquezas das tradições contemplativas, bem
          como dos conhecimentos contemporâneos. Estamos particularmente inspirados
          pelas tradições do Budismo Tibetano. Nossa afiliação à Tradição Viva é
          outorgada pelo Venerável Bokar Rinpoche, detentor das tradições Karma e
          Shangpa Kagyu. Bokar Rinpoche redigiu o nome para nosso centro e nos foi
          encaminhado pelo Lama Trinle, que nos ajuda e aconselha em nossas
          atividades.
          </p>
        </ScrollReveal>

        <AboutPhotoGallery />
      </article>
    </SiteShell>
  );
}
