"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      {status === "success" ? (
        <p className="text-sage-300 text-sm py-2">
          ✓ You're subscribed! Thanks for joining.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-3 py-2 rounded text-sm bg-sage-800 border border-sage-700 text-white placeholder-sage-400 focus:outline-none focus:border-sage-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 bg-clay-500 hover:bg-clay-600 disabled:opacity-50 rounded text-sm font-medium transition-colors whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs mt-1">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
