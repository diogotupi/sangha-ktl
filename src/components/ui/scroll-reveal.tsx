"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ScrollRevealVariant = "fade-up" | "fade-in" | "fade-right" | "scale";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
  /** Percentage of element visible before triggering (0–1) */
  threshold?: number;
};

const hiddenStyles: Record<ScrollRevealVariant, string> = {
  "fade-up": "translate-y-7 opacity-0",
  "fade-in": "opacity-0",
  "fade-right": "translate-x-5 opacity-0",
  scale: "scale-[0.98] opacity-0",
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-[transform,opacity] transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : hiddenStyles[variant],
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
