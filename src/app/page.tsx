import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Heart } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[min(85vh,720px)] items-center justify-center overflow-hidden">
        <HeroSlideshow />

        <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-24">
          <Link
            href="/ingresso"
            className={cn(
              buttonVariants({ size: "lg" }),
              "border border-coral bg-coral text-white shadow-lg hover:bg-coral/90",
            )}
          >
            Quero participar
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/quem-somos"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
            )}
          >
            Sobre a sangha
          </Link>
        </div>
      </section>

      <section className="border-t border-border/40 bg-gold/15">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Encontros quinzenais",
              text: "Meditação e estudo online, com encontros presenciais no Rio.",
            },
            {
              icon: BookOpen,
              title: "Estudo do Dhamma",
              text: "Leituras e diálogos sobre os ensinamentos da tradição Kagyu.",
            },
            {
              icon: Calendar,
              title: "Retiros e práticas",
              text: "Momentos de aprofundamento ao longo do ano.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="space-y-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand/10">
                <Icon className="size-5 text-brand" aria-hidden />
              </div>
              <h2 className="font-heading text-xl text-foreground">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <blockquote className="font-heading text-2xl leading-relaxed text-foreground md:text-3xl">
          &ldquo;Caminhamos juntos, passo a passo, com paciência e compaixão.&rdquo;
        </blockquote>
        <p className="mt-6 text-sm text-muted-foreground">— Tradição Kagyu</p>
      </section>
    </SiteShell>
  );
}
