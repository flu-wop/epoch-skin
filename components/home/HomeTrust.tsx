// components/home/HomeTrust.tsx

export function HomeTrust() {
  return (
    <section className="bg-[#1A1A18] py-10 px-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2A2A28]">
          {[
            { icon: "✦", label: "Certified Organic", sub: "USDA organic ingredients" },
            { icon: "◈", label: "Cruelty-Free",      sub: "Never tested on animals" },
            { icon: "◇", label: "Licensed Pros",     sub: "LA State Board certified" },
            { icon: "○", label: "Small Batch",       sub: "Cold-process formulated" },
          ].map((b) => (
            <div key={b.label}
              className="bg-[#1A1A18] px-6 py-8 flex flex-col items-center text-center
                         hover:bg-[#2A2A28] transition-colors duration-300 group">
              <span className="text-[#C9A96E] text-xl mb-3 group-hover:scale-110 transition-transform">
                {b.icon}
              </span>
              <p className="text-white text-[11px] tracking-[0.15em] uppercase font-sans mb-1">{b.label}</p>
              <p className="text-[#4A4A48] text-xs font-sans">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
