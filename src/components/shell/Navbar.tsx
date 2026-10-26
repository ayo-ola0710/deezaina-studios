"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { useUI } from "@/store/useUI";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const pathname = usePathname();
  const { openBooking } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY && !isMobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 md:right-8 z-40 transition-transform duration-300 ease-[var(--e1)] border-b",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-[rgba(5,5,5,0.85)] backdrop-blur-xl border-[var(--glass-border)] shadow-lg"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="font-display font-extrabold text-2xl tracking-tighter text-[var(--R)] group-hover:scale-105 transition-transform duration-150">
              D.
            </span>
            <span className="font-display font-extrabold text-lg tracking-tight text-[var(--W)]">
              DEEZAINA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-body font-semibold text-sm tracking-wide py-1 text-[var(--W)] transition-colors hover:text-[var(--W)]",
                    isActive ? "text-[var(--W)] font-bold" : "text-[var(--W55)]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--R)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={openBooking}
              className="btn-r !py-2.5 !px-5 !text-xs"
            >
              Book a Diagnostic
            </button>
          </div>

          {/* Mobile Actions: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-3">

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border-2 border-[var(--W15)] bg-[var(--K3)] text-[var(--W)] focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={cn(
                    "h-0.5 w-full bg-[var(--W)] transition-transform duration-200",
                    isMobileMenuOpen && "rotate-45 translate-y-1.5 bg-[var(--R)]"
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-full bg-[var(--W)] transition-opacity duration-200",
                    isMobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-full bg-[var(--W)] transition-transform duration-200",
                    isMobileMenuOpen && "-rotate-45 -translate-y-1.5 bg-[var(--R)]"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Glass Menu */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-35 md:hidden bg-[rgba(5,5,5,0.95)] backdrop-blur-2xl flex flex-col justify-between px-6 pt-28 pb-12 animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <div className="type-label">MENU // NAVIGATION</div>
            <nav className="flex flex-col gap-6">
              {siteConfig.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-display font-bold text-4xl tracking-tight transition-colors flex items-center justify-between border-b border-[var(--W15)] pb-4",
                      isActive
                        ? "text-[var(--R)]"
                        : "text-[var(--W)] hover:text-[var(--R)]"
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="text-sm font-mono text-[var(--W35)]">
                      {isActive ? "ACTIVE" : "→"}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-6 pt-8 border-t-2 border-[var(--W15)]">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking();
              }}
              className="btn-r w-full py-4 text-center justify-center text-sm"
            >
              Book a Diagnostic
            </button>
            <div className="text-xs font-mono text-[var(--W35)] text-center">
              Nigeria · Canada · United Kingdom
            </div>
          </div>
        </div>
      )}
    </>
  );
}
