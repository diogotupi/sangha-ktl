import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Heart } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { HeroCta } from "@/components/home/hero-cta";
import { HomeFeatureCards } from "@/components/home/home-feature-cards";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[min(85vh,720px)] items-end justify-center overflow-hidden">
        <HeroSlideshow />
        <HeroCta />
      </section>

      <HomeFeatureCards />
    </SiteShell>
  );
}
