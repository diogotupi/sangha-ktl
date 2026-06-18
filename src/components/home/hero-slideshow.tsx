"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/lib/community-photos";

const HERO_IMAGES = heroSlides.map((photo) => ({
  src: photo.src,
  desktopClass:
    photo.objectClass === "object-center"
      ? "md:object-center"
      : `md:[object-position:${photo.objectClass.slice(7, -1)}]`,
}));

const INTERVAL_MS = 6000;

export function HeroSlideshow() {
  const [slides, setSlides] = useState([...HERO_IMAGES]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageError = useCallback((src: string) => {
    setSlides((current) => {
      const next = current.filter((slide) => slide.src !== src);
      return next.length > 0 ? next : current;
    });
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  if (slides.length === 0) {
    return <div className="absolute inset-0 bg-brand" aria-hidden />;
  }

  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <div className="absolute inset-0 bg-brand" aria-hidden>
      <Image
        key={activeSlide.src}
        src={activeSlide.src}
        alt=""
        fill
        priority
        sizes="100vw"
        onError={() => handleImageError(activeSlide.src)}
        className={cn(
          "object-cover object-center animate-in fade-in duration-1000",
          activeSlide.desktopClass,
        )}
      />
      <div className="absolute inset-0 bg-brand/55" />
    </div>
  );
}
