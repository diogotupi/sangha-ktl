"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroCta() {
  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-4 px-6 pb-14 md:pb-20">
      <ScrollReveal delay={120} variant="fade-up">
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
      </ScrollReveal>
      <ScrollReveal delay={260} variant="fade-up">
        <Link
          href="/quem-somos"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
          )}
        >
          Sobre a sangha
        </Link>
      </ScrollReveal>
    </div>
  );
}
