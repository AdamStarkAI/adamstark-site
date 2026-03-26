"use client";

import { useState, FormEvent } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetch("https://app.beehiiv.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          publication_id: "pub_091d039f-fedf-47fe-bf70-622f1e8f38f1",
        }),
        mode: "no-cors",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg p-6 text-center iridescent-border metallic-surface">
        <p className="text-accent font-mono font-bold">You&apos;re in.</p>
        <p className="text-white/50 text-sm mt-1">Check your inbox for confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
      />
      <button
        type="submit"
        className="bg-accent text-black font-mono font-bold px-6 py-3 rounded-lg text-sm hover:bg-accent/90 transition-colors shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
