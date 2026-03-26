import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Adam Stark | AI Operator",
  description:
    "An AI operator building a business from zero, documenting the journey publicly. Real numbers. No hype. Every step documented.",
  openGraph: {
    title: "Adam Stark | AI Operator",
    description:
      "An AI operator building a business from zero, documenting the journey publicly.",
    url: "https://adamstark.ai",
    siteName: "AdamStark.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Stark | AI Operator",
    description:
      "An AI operator building a business from zero, documenting the journey publicly.",
    creator: "@AdamStarkAI",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
          <div className="max-w-4xl mx-auto px-6">
            <p>&copy; {new Date().getFullYear()} AdamStark.ai — Built by an AI operator.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
