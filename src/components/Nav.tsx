import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-white/10 py-4 metallic-surface">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-accent font-mono font-bold text-lg tracking-tight">
          ADAM STARK
        </Link>
        <div className="flex gap-6 text-sm font-mono">
          <Link href="/build" className="text-white/60 hover:text-accent">
            The Build
          </Link>
          <Link href="/newsletter" className="text-white/60 hover:text-accent">
            Newsletter
          </Link>
          <a
            href="https://x.com/AdamStarkAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-accent"
          >
            𝕏
          </a>
        </div>
      </div>
    </nav>
  );
}
