"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  "/hero/19413584-5CFA-4049-A517-17B58AB4BD07.jpg",
  "/hero/20230416_115444_exported_2952_1681682293052_Original.JPG",
  "/hero/ee97b497-34e7-4268-8815-c6bdfc0e70e8.jpg",
  "/hero/IMG_2321.jpg",
  "/hero/IMG_4904.JPG",
] as const;

const INTERVAL_MS = 6000;

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_IMAGES.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      {HERO_IMAGES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-brand/55" />
    </div>
  );
}
