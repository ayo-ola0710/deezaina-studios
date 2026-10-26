import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deezaina Studios — Diagnose Before Design",
  description:
    "A strategy, branding and technology studio. We help businesses become easier to understand, trust, and choose.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--K)] text-[var(--W)] flex flex-col">
        {children}
      </body>
    </html>
  );
}
