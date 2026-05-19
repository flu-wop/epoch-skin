"use client";
// components/ScrollReveal.tsx
// Lightweight IntersectionObserver-based fade-up animation.
// Replaces Framer Motion for simple scroll reveals — no bundle cost.

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;       // ms stagger
  className?: string;
  threshold?: number;   // 0–1
  once?: boolean;       // animate only once (default true)
}

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.12,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove("visible");
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}
