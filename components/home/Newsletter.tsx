"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#1A1A18] overflow-hidden">

      {/* Subtle gold gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* Decorative text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[20vw] text-white/[0.02] leading-none">Epoch</span>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <div className="w-8 h-px bg-[#C9A84C] mx-auto mb-6" />
        <p className="text-[11px] tracking-[0.25em] uppercase text-[#C9A84C] font-sans mb-5">
          Inner Circle
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-5">
          Join Our Newsletter
        </h2>
        <p className="text-[#8A8580] font-sans leading-relaxed mb-10 max-w-md mx-auto">
          Skincare guides, early access to new formulas, and exclusive offers.
          Plus — <span className="text-[#C9A84C]">15% off</span> your first order.
        </p>

        {status === "success" ? (
          <p className="font-serif text-xl text-[#C9A84C] italic">
            You're in. Check your inbox. ✨
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
              className="flex-1 px-5 py-4 bg-[#2C2C2A] border border-[#3A3A38] text-white
                         placeholder-[#5A5A58] text-sm font-sans focus:outline-none
                         focus:border-[#C9A84C] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-4 bg-[#C9A84C] text-[#1A1A18] text-[11px] tracking-[0.2em]
                         uppercase font-sans font-medium hover:bg-[#D4AF77] transition-colors
                         disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-xs mt-3 font-sans">Something went wrong. Please try again.</p>
        )}

        <p className="text-[#5A5A58] text-xs font-sans mt-5">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
    </section>
  );
}
