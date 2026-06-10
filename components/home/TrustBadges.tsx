// components/home/TrustBadges.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const BADGES = [
  { icon: "🌿", name: "Certified Organic", desc: "USDA organic ingredients" },
  { icon: "🐰", name: "Cruelty-Free", desc: "Never tested on animals" },
  { icon: "✦", name: "Licensed Pros", desc: "LA State Board certified" },
  { icon: "◈", name: "Small Batch", desc: "Cold-process formulated" },
];

export function TrustBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#3E4A3C] py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#526050]">
          {BADGES.map((b, i) => (
            <div
              key={b.name}
              className="bg-[#3E4A3C] px-8 py-10 flex flex-col items-center text-center gap-3 group
                         hover:bg-[#526050] transition-colors duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <span className="text-[#C4974A] text-2xl group-hover:scale-110 transition-transform duration-300">
                {b.icon}
              </span>
              <div>
                <p className="text-white text-[11px] tracking-[0.15em] uppercase font-sans mb-1">{b.name}</p>
                <p className="text-[#9BAD8C] text-xs font-sans">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
