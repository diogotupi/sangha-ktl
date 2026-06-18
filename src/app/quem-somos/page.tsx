import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a história, a linhagem e os valores da nossa comunidade de prática budista.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Nossa comunidade"
        title="Quem somos"
        description="Centro de prática da tradição Kagyu — meditação, estudo e convivência no caminho do despertar."
      />

      <article className="mx-auto max-w-3xl space-y-12 px-6 pb-24">
        <section className="space-y-4">
          <h2 className="font-heading text-2xl">Nossa origem</h2>
          <p className="leading-relaxed text-muted-foreground">
            O Kagyu Ngedön Tcho Ling nasceu do encontro de praticantes que buscavam
            um espaço dedicado à tradição viva do budismo tibetano. Inspirados pela
            linhagem Kagyu e pelos mestres que a sustentam, cultivamos uma prática
            profunda e acessível.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl">Como praticamos</h2>
          <p className="leading-relaxed text-muted-foreground">
            Reunimo-nos semanalmente para meditação sentada e caminhada consciente.
            Nossos encontros de estudo exploram sutras, textos comentados e a
            aplicação prática dos ensinamentos na vida cotidiana. Não exigimos
            experiência prévia — apenas disposição para estar presente.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl">Nossos valores</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-brand">·</span>
              <span>Presença e atenção plena em cada momento</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand">·</span>
              <span>Compaixão consigo e com todos os seres</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand">·</span>
              <span>Simplicidade e não-apego</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand">·</span>
              <span>Inclusão e respeito a todas as jornadas</span>
            </li>
          </ul>
        </section>
      </article>
    </SiteShell>
  );
}
