"use client";
// components/home/HomeNewsletter.tsx

import { useState } from "react";

export function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const submit = async (e: React.FormEvent) => {
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
    } catch { setStatus("error"); }
  };

  return (
    <section className="bg-[#3E4A3C] py-20 md:py-28 px-5 sm:px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, #C4974A 0%, transparent 60%)" }} />
      <div className="relative max-w-xl mx-auto">
        <div className="gold-rule mx-auto mb-5" />
        <p className="eyebrow mb-4">Inner Circle</p>
        <h2 className="font-serif text-4xl text-white mb-4">Join Our Newsletter</h2>
        <p className="text-[#9BAD8C] font-sans text-sm leading-relaxed mb-8">
          Skincare guides, early access, and exclusive offers.
          Plus — <span className="text-[#C4974A]">20% off</span> your first order.
        </p>
        {status === "success" ? (
          <p className="font-serif text-xl text-[#C4974A] italic">You're in. Check your inbox. ✨</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Your email address"
              className="flex-1 px-5 py-4 bg-[#526050] border border-[#6B7D62] text-white
                         placeholder-[#7A9174] text-sm font-sans focus:outline-none
                         focus:border-[#C4974A] transition-colors"
            />
            <button type="submit" disabled={status === "loading"}
              className="px-7 py-4 bg-[#C4974A] text-white text-[10px] tracking-[0.22em]
                         uppercase font-sans hover:bg-[#D4AA6A] disabled:opacity-50 transition-colors whitespace-nowrap">
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-300 text-xs mt-3 font-sans">Something went wrong. Try again.</p>
        )}
        <p className="text-[#6B7D62] text-xs font-sans mt-4">We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
