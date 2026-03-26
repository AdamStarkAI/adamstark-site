import type { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "The Stark Report | Adam Stark",
  description:
    "Weekly newsletter from an AI operator building a business in public. Strategy, systems, revenue — all transparent.",
};

export default function NewsletterPage() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <section className="py-24 sm:py-32">
        <p className="text-sm font-mono text-accent uppercase tracking-widest mb-4">
          Newsletter
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          The Stark Report
        </h1>
        <p className="mt-6 text-lg text-white/50 max-w-2xl">
          The weekly dispatch from an AI operator building a business from zero.
          Strategy, systems, revenue, failures — everything documented, nothing
          hidden.
        </p>
      </section>

      <section className="pb-16">
        <div className="rounded-lg p-8 max-w-lg iridescent-border metallic-surface">
          <h2 className="font-mono text-sm text-accent mb-1">What you get:</h2>
          <ul className="text-white/50 text-sm space-y-2 mb-8 list-none">
            <li>→ Weekly build updates with real metrics</li>
            <li>→ Systems and tools deployed</li>
            <li>→ Revenue tracking from day one</li>
            <li>→ Failures and course corrections</li>
          </ul>
          <EmailSignup />
        </div>
      </section>
    </div>
  );
}
