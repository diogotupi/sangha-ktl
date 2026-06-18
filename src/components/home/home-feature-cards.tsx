"use client";

import { BookOpen, Calendar, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const features = [
  {
    icon: Heart,
    title: "Encontros quinzenais",
    text: "Meditação e estudo online, com encontros online e híbridos no Rio.",
  },
  {
    icon: BookOpen,
    title: "Estudo e prática do Dharma",
    text: "Leituras, estudo e prática sobre os ensinamentos da tradição Kagyu.",
  },
  {
    icon: Calendar,
    title: "Retiros e práticas",
    text: "Fique por dentro de quando teremos retiros e ensinamentos com os mestres.",
  },
] as const;

export function HomeFeatureCards() {
  return (
    <section className="border-t border-border/40 bg-gold/15">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }, index) => (
          <ScrollReveal key={title} delay={index * 110} variant="fade-up">
            <div className="space-y-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand/10">
                <Icon className="size-5 text-brand" aria-hidden />
              </div>
              <h2 className="font-heading text-xl text-foreground">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
