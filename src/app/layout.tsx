import type { Metadata } from "next";
import { Suspense } from "react";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/shell/SmoothScroll";
import Grain from "@/components/shell/Grain";
import Cursor from "@/components/shell/Cursor";
import ScrollThread from "@/components/shell/ScrollThread";
import Navbar from "@/components/shell/Navbar";
import Footer from "@/components/shell/Footer";
import BookingModal from "@/components/shell/BookingModal";

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
    "A multidisciplinary strategy, branding and technology studio. We help businesses become easier to understand, trust, and choose.",
  metadataBase: new URL("https://www.deezaina.pro"),
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
      <body className="min-h-screen bg-[var(--K)] text-[var(--W)] flex flex-col font-sans selection:bg-[var(--R)] selection:text-[var(--W)]">
        <SmoothScroll>
          <Grain />
          <Cursor />
          <ScrollThread />
          <Navbar />
          <div className="flex-1 pt-20">{children}</div>
          <Footer />
          <Suspense fallback={null}>
            <BookingModal />
          </Suspense>
        </SmoothScroll>
      </body>
    </html>
  );
}
