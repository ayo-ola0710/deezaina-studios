"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { useUI } from "@/store/useUI";

export default function Footer() {
  const { openBooking } = useUI();
  const currentYear = 2026;

  return (
    <footer className="relative border-t-2 border-[var(--W15)] bg-[var(--K)] pt-16 pb-12 overflow-hidden z-20">
      {/* Giant Outline Text Banner: Perfectly fit to container without cutoff */}
      <div className="max-w-7xl mx-auto px-6 mb-16 select-none pointer-events-none w-full">
        <svg
          viewBox="0 0 1380 95"
          className="w-full h-auto select-none"
          aria-label="Diagnose Before Design."
        >
          <text
            x="20"
            y="72"
            fill="none"
            stroke="var(--W15)"
            strokeWidth="1.75"
            textLength="1390"
            lengthAdjust="spacing"
            className="font-display font-extrabold uppercase"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "72px",
            }}
          >
            DIAGNOSE BEFORE DESIGN.
          </text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[var(--W15)]">
        {/* Left Column: Brand & Tagline */}
        <div className="md:col-span-5 space-y-6">
          <Link href="/" className="inline-block group">
            <span className="font-display font-extrabold text-3xl tracking-tighter text-[var(--R)]">
              D.
            </span>
            <span className="font-display font-extrabold text-2xl tracking-tight text-[var(--W)] ml-2">
              DEEZAINA
            </span>
          </Link>
          <p className="type-body text-[var(--W55)] max-w-sm text-sm">
            {siteConfig.subline}
          </p>
          <div>
            <button
              type="button"
              onClick={openBooking}
              className="btn-r !py-3 !px-6 text-xs"
            >
              Book a Diagnostic
            </button>
          </div>
        </div>

        {/* Center Column: Navigation */}
        <div className="md:col-span-3 space-y-4">
          <div className="type-label">NAVIGATION</div>
          <ul className="space-y-3 font-body font-semibold text-sm">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--W55)] hover:text-[var(--W)] transition-colors hover:translate-x-1 inline-block duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Global Presence & Contact */}
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-2">
            <div className="type-label">GLOBAL PRESENCE</div>
            <p className="font-body text-sm text-[var(--W)] font-semibold">
              {siteConfig.locations.join(" · ")}
            </p>
          </div>

          <div className="space-y-2">
            <div className="type-label">INQUIRIES</div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-sm text-[var(--W)] hover:text-[var(--R)] transition-colors block"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="space-y-2">
            <div className="type-label">CONNECT</div>
            <div className="flex gap-4 font-mono text-xs text-[var(--W55)]">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--R)] transition-colors"
              >
                Instagram
              </a>
              <span>/</span>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--R)] transition-colors"
              >
                LinkedIn
              </a>
              <span>/</span>
              <a
                href={siteConfig.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--R)] transition-colors"
              >
                Behance
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[var(--W35)]">
        <div>© {currentYear} Deezaina Studios. All rights reserved.</div>
        <div>STRATEGY · BRANDING · WEB</div>
      </div>
    </footer>
  );
}
