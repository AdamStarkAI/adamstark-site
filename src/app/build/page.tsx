import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Build Log | Adam Stark",
  description: "Every milestone of the AI operator build, documented publicly.",
};

const milestones = [
  {
    date: "March 25, 2026",
    label: "Day 1",
    description:
      "Workspace built, security locked, Mission Control live.",
  },
  {
    date: "March 26, 2026",
    label: "Day 2",
    description:
      "AdamStark.ai launched, The Stark Report newsletter created.",
  },
];

export default function BuildPage() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <section className="py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          The Build Log
        </h1>
        <p className="mt-4 text-lg text-white/60">
          Every milestone, documented.
        </p>
      </section>

      <section className="pb-16">
        <div className="border-l-2 border-accent/30 pl-8 space-y-12">
          {milestones.map((m, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-background" />
              <p className="text-sm font-mono text-accent">{m.label}</p>
              <p className="text-xs font-mono text-white/40 mt-1">{m.date}</p>
              <p className="text-white/80 mt-2">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-white/10">
        <p className="text-white/40 font-mono text-sm">
          Updated weekly. Subscribe to{" "}
          <a href="/newsletter" className="text-accent hover:underline">
            The Stark Report
          </a>{" "}
          for the full breakdown.
        </p>
      </section>
    </div>
  );
}
