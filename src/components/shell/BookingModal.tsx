"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useUI } from "@/store/useUI";
import { siteConfig } from "@/lib/site";

export default function BookingModal() {
  const { isBookingOpen, closeBooking, openBooking, setReferralCode } = useUI();
  const searchParams = useSearchParams();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Check ?book=1 and ?ref=NAME
  useEffect(() => {
    const bookParam = searchParams.get("book");
    const refParam = searchParams.get("ref");

    if (refParam) {
      setReferralCode(refParam);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("deezaina-ref", refParam);
      }
    }

    if (bookParam === "1") {
      openBooking();
    }
  }, [searchParams, openBooking, setReferralCode]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isBookingOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBooking();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBookingOpen, closeBooking]);

  if (!isBookingOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Brand Diagnostic"
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div
        className="absolute inset-0 -z-10"
        onClick={closeBooking}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        ref={drawerRef}
        className="relative w-full max-w-xl h-full bg-[var(--K3)] border-l-2 border-[var(--W15)] flex flex-col justify-between p-6 sm:p-10 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 ease-[var(--e1)]"
      >
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--W15)] pb-6">
            <div>
              <span className="type-label block mb-1">BRAND DIAGNOSTIC</span>
              <h2 className="font-display font-extrabold text-2xl text-[var(--W)]">
                Diagnose Before Design.
              </h2>
            </div>

            <button
              type="button"
              onClick={closeBooking}
              className="p-2 border-2 border-[var(--W15)] hover:border-[var(--R)] text-[var(--W)] hover:text-[var(--R)] transition-colors focus-visible:outline-none"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Diagnostic Introduction / Callout */}
          <div className="space-y-4 pt-2">
            <p className="type-body text-sm text-[var(--W55)]">
              Before recommending a logo, campaign, or digital platform, we
              identify the root obstacle. Complete the 2-minute diagnostic or schedule
              a direct exploration call with our strategy leads.
            </p>

            <div className="p-4 bg-[var(--K)] border-2 border-[var(--W15)] space-y-2">
              <span className="type-label text-[10px]">DIRECT BOOKING OPTION</span>
              <p className="text-xs text-[var(--W)]">
                Need an immediate 15-minute alignment call with our founder?
              </p>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-r !py-2 !px-4 !text-xs inline-flex mt-2"
              >
                Open Studio Calendly →
              </a>
            </div>
          </div>
        </div>

        {/* Placeholder / Phase 4 notice */}
        <div className="my-8 p-6 border-2 border-[var(--R)] bg-[var(--R8)] space-y-2">
          <div className="type-label text-[var(--R)]">PHASE 1 SHELL ACTIVE</div>
          <p className="text-xs text-[var(--W55)] leading-relaxed">
            The 6-question Brand Diagnostic scoring engine and lead submission
            system will be connected here in Phase 4.
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[var(--W15)] flex justify-between items-center text-xs font-mono text-[var(--W35)]">
          <span>DEEZAINA STUDIOS</span>
          <button
            type="button"
            onClick={closeBooking}
            className="hover:text-[var(--W)] underline uppercase"
          >
            Close [Esc]
          </button>
        </div>
      </aside>
    </div>
  );
}
