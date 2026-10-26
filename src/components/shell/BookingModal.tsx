"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUI } from "@/store/useUI";
import { siteConfig } from "@/lib/site";
import {
  DIAGNOSTIC_QUESTIONS,
  computeDiagnostic,
  DiagnosticResult,
} from "@/lib/diagnostic";

const formSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().min(1, "Company or project name is required"),
  phone: z.string().optional(),
  budget: z.string().min(1, "Please select an approximate budget range"),
  timeline: z.string().min(1, "Please select an estimated timeline"),
  notes: z.string().optional(),
  _hp: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingModal() {
  const { isBookingOpen, closeBooking, openBooking, setReferralCode, referralCode } =
    useUI();
  const searchParams = useSearchParams();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Modal Step State:
  // 0: Choice (Diagnostic vs Direct Brief)
  // 1-6: Diagnostic Questions
  // 7: Result + Contact Form
  // 8: Success & Calendly booking
  const [step, setStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: "$5k - $15k",
      timeline: "1 - 2 months",
      notes: "",
      _hp: "",
    },
  });

  // Handle URL query parameters ?book=1 and ?ref=...
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

  // Handle ESC key, Lenis pause, and scroll lock
  useEffect(() => {
    if (!isBookingOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBooking();
      }
    };

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      if (lenis) {
        lenis.start();
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBookingOpen, closeBooking]);

  // Handle option selection in question step
  const handleSelectOption = (questionId: number, optionId: string) => {
    const updated = { ...selectedAnswers, [questionId]: optionId };
    setSelectedAnswers(updated);

    if (step < DIAGNOSTIC_QUESTIONS.length) {
      // Advance to next question after brief moment
      setTimeout(() => {
        setStep(step + 1);
      }, 150);
    } else {
      // All questions completed: compute result and proceed to form
      const chosenIds = Object.values(updated);
      const res = computeDiagnostic(chosenIds);
      setDiagnosticResult(res);
      setStep(7);
    }
  };

  // Skip questions directly to brief
  const handleDirectBrief = () => {
    setDiagnosticResult(null);
    setStep(7);
  };

  // Submit form handler
  const onSubmit = (values: FormValues) => {
    setSubmitError(null);
    startTransition(async () => {
      try {
        const storedRef =
          typeof window !== "undefined"
            ? sessionStorage.getItem("deezaina-ref")
            : null;

        const payload = {
          ...values,
          answers: Object.values(selectedAnswers),
          diagnosticResult: diagnosticResult
            ? {
                primaryPillar: diagnosticResult.primaryPillar,
                title: diagnosticResult.title,
                recommendedEngagement: diagnosticResult.recommendedEngagement,
                scores: diagnosticResult.scores,
              }
            : undefined,
          referralCode: referralCode || storedRef || undefined,
        };

        const res = await fetch("/api/diagnostic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();
        if (json.success) {
          setLeadId(json.leadId);
          setStep(8);
        } else {
          setSubmitError(
            json.error || "Failed to submit diagnostic brief. Please try again."
          );
        }
      } catch (err) {
        console.error(err);
        setSubmitError("Network error. Please check connection and try again.");
      }
    });
  };

  const resetAll = () => {
    setStep(0);
    setSelectedAnswers({});
    setDiagnosticResult(null);
    setLeadId(null);
    setSubmitError(null);
    resetForm();
    closeBooking();
  };

  if (!isBookingOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Brand Diagnostic Drawer"
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
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
        data-lenis-prevent="true"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
        className="relative w-full max-w-2xl h-[100dvh] max-h-[100dvh] bg-[var(--K3)] border-l-2 border-[var(--W15)] flex flex-col justify-between p-6 sm:p-10 shadow-2xl overflow-y-auto overscroll-contain animate-in slide-in-from-right duration-300 ease-[var(--e1)]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[var(--W15)] pb-6 mb-6">
          <div>
            <span className="type-label block mb-1">
              {step === 0 && "STUDIO INTAKE"}
              {step >= 1 && step <= 6 && `DIAGNOSTIC QUESTION 0${step} / 06`}
              {step === 7 && "DIAGNOSTIC SYNTHESIS & BRIEF"}
              {step === 8 && "DIAGNOSTIC LOGGED"}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--W)]">
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

        {/* STEP 0: ENTRY CHOICE */}
        {step === 0 && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="type-body text-sm sm:text-base text-[var(--W)] leading-relaxed">
                Before recommending a visual system, campaign, or digital platform,
                we run a rigorous diagnosis. Choose how you would like to begin:
              </p>

              <div className="grid grid-cols-1 gap-4 pt-2">
                {/* Option 1: 2-minute diagnostic */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-left p-5 bg-[var(--K)] border-2 border-[var(--W15)] hover:border-[var(--R)] hover:shadow-[4px_4px_0_var(--R)] transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[var(--R)] font-bold">
                      [ RECOMMENDED — 2 MINS ]
                    </span>
                    <span className="text-[var(--W)] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--W)] mb-1">
                    Run the 6-Question Brand Diagnostic
                  </h3>
                  <p className="text-xs text-[var(--W55)] leading-relaxed">
                    Identify whether your primary bottleneck is Strategic Positioning,
                    Brand Authority, or Digital Platform Conversion.
                  </p>
                </button>

                {/* Option 2: Direct Project Brief */}
                <button
                  type="button"
                  onClick={handleDirectBrief}
                  className="text-left p-5 bg-[var(--K)] border-2 border-[var(--W15)] hover:border-[var(--W)] transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[var(--W55)] font-bold">
                      [ DIRECT BRIEF ]
                    </span>
                    <span className="text-[var(--W)] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--W)] mb-1">
                    Submit Project Requirements Directly
                  </h3>
                  <p className="text-xs text-[var(--W55)] leading-relaxed">
                    Skip the questionnaire if you already have a finalized brief,
                    scope, and timeline.
                  </p>
                </button>
              </div>
            </div>

            {/* Direct Calendly Quick Action */}
            <div className="p-4 bg-[var(--K2)] border-2 border-[var(--W15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="type-label text-[10px]">DIRECT FOUNDER ACCESS</span>
                <p className="text-xs text-[var(--W)] mt-0.5">
                  Need an immediate 15-minute alignment call?
                </p>
              </div>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-r !py-2 !px-4 !text-xs whitespace-nowrap"
              >
                Open Studio Calendly ↗
              </a>
            </div>
          </div>
        )}

        {/* STEPS 1-6: QUESTIONNAIRE */}
        {step >= 1 && step <= 6 && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[11px] text-[var(--W55)]">
                  <span>PHASE {step} OF 6</span>
                  <span>{Math.round((step / 6) * 100)}% COMPLETE</span>
                </div>
                <div className="w-full h-1 bg-[var(--W15)]">
                  <div
                    className="h-full bg-[var(--R)] transition-all duration-300"
                    style={{ width: `${(step / 6) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Headline */}
              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--W)] mb-2">
                  {DIAGNOSTIC_QUESTIONS[step - 1].title}
                </h3>
                <p className="type-body text-xs sm:text-sm text-[var(--W55)]">
                  {DIAGNOSTIC_QUESTIONS[step - 1].subtitle}
                </p>
              </div>

              {/* Question Options */}
              <div className="space-y-3">
                {DIAGNOSTIC_QUESTIONS[step - 1].options.map((opt) => {
                  const isSelected = selectedAnswers[step] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(step, opt.id)}
                      className={`w-full text-left p-4 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[var(--R)] bg-[var(--R8)] shadow-[3px_3px_0_var(--R)]"
                          : "border-[var(--W15)] bg-[var(--K)] hover:border-[var(--W35)] hover:bg-[var(--K2)]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-4 h-4 rounded-none border flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected
                              ? "border-[var(--R)] bg-[var(--R)] text-[var(--W)]"
                              : "border-[var(--W35)]"
                          }`}
                        >
                          {isSelected && "✓"}
                        </span>
                        <div>
                          <p className="font-bold text-sm text-[var(--W)] mb-1">
                            {opt.label}
                          </p>
                          <p className="text-xs text-[var(--W55)] leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation footer */}
            <div className="pt-4 border-t border-[var(--W15)] flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-xs font-mono text-[var(--W55)] hover:text-[var(--W)] uppercase"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleDirectBrief}
                className="text-xs font-mono text-[var(--W35)] hover:text-[var(--W)] underline uppercase"
              >
                Skip to Brief
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: DIAGNOSTIC RESULT + CONTACT BRIEF FORM */}
        {step === 7 && (
          <div className="flex-1 space-y-6">
            {/* If diagnostic was run, show result box */}
            {diagnosticResult && (
              <div className="p-5 bg-[var(--K)] border-2 border-[var(--R)] shadow-[4px_4px_0_var(--R)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="type-label text-[10px] text-[var(--R)]">
                    DIAGNOSTIC FINDING
                  </span>
                  <span className="font-mono text-[10px] text-[var(--W55)] uppercase">
                    GAP: {diagnosticResult.primaryPillar}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-[var(--W)]">
                  {diagnosticResult.title}
                </h3>

                <p className="text-xs text-[var(--W55)] leading-relaxed">
                  {diagnosticResult.diagnosis}
                </p>

                <div className="pt-2 border-t border-[var(--W15)] space-y-1.5">
                  <span className="font-mono text-[10px] text-[var(--W)] font-bold tracking-wider">
                    WHAT WE WOULD AUDIT FIRST:
                  </span>
                  <ul className="text-xs text-[var(--W55)] space-y-1">
                    {diagnosticResult.actionChecklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--R)] font-mono">0{idx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Brief Capture Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-display font-bold text-lg text-[var(--W)]">
                  Contact & Project Parameters
                </h4>
                <p className="text-xs text-[var(--W55)]">
                  Enter your details so our team can review your diagnosis before our
                  strategy call.
                </p>
              </div>

              {/* Honeypot anti-spam field */}
              <input
                type="text"
                {...register("_hp")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--W)] uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    {...register("name")}
                    className="w-full p-2.5 bg-[var(--K)] border border-[var(--W15)] focus:border-[var(--R)] text-sm text-[var(--W)] focus:outline-none"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-[var(--R)] font-mono mt-0.5 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--W)] uppercase mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    {...register("email")}
                    className="w-full p-2.5 bg-[var(--K)] border border-[var(--W15)] focus:border-[var(--R)] text-sm text-[var(--W)] focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-[var(--R)] font-mono mt-0.5 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--W)] uppercase mb-1">
                    Company / Venture *
                  </label>
                  <input
                    type="text"
                    placeholder="Company or Brand Name"
                    {...register("company")}
                    className="w-full p-2.5 bg-[var(--K)] border border-[var(--W15)] focus:border-[var(--R)] text-sm text-[var(--W)] focus:outline-none"
                  />
                  {errors.company && (
                    <span className="text-[10px] text-[var(--R)] font-mono mt-0.5 block">
                      {errors.company.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--W)] uppercase mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    {...register("phone")}
                    className="w-full p-2.5 bg-[var(--K)] border border-[var(--W15)] focus:border-[var(--R)] text-sm text-[var(--W)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--W)] uppercase mb-1">
                    Estimated Budget Tier
                  </label>
                  <select
                    {...register("budget")}
                    className="w-full p-2.5 bg-[var(--K)] border border-[var(--W15)] focus:border-[var(--R)] text-sm text-[var(--W)] focus:outline-none cursor-pointer"
                  >
                    <option value="< $5k">&lt; $5,000 (Focused Sprint)</option>
                    <option value="$5k - $15k">$5,000 – $15,000 (Standard Tier)</option>
                    <option value="$15k - $30k">$15,000 – $30,000 (Transformation)</option>
                    <option value="$30k+">$30,000+ (Institutional / Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--W)] uppercase mb-1">
                    Target Execution Horizon
                  </label>
                  <select
                    {...register("timeline")}
                    className="w-full p-2.5 bg-[var(--K)] border border-[var(--W15)] focus:border-[var(--R)] text-sm text-[var(--W)] focus:outline-none cursor-pointer"
                  >
                    <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                    <option value="1 - 2 months">1 – 2 Months (Recommended)</option>
                    <option value="Quarter ahead">Next Quarter (Advance Planning)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--W)] uppercase mb-1">
                  Project Notes / Specific Obstacles (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about existing links, specific competitors, or deadlines..."
                  {...register("notes")}
                  className="w-full p-2.5 bg-[var(--K)] border border-[var(--W15)] focus:border-[var(--R)] text-sm text-[var(--W)] focus:outline-none resize-none"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-[var(--R15)] border border-[var(--R)] text-xs text-[var(--R)] font-mono">
                  {submitError}
                </div>
              )}

              <div className="pt-3 border-t border-[var(--W15)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(diagnosticResult ? 6 : 0)}
                  className="text-xs font-mono text-[var(--W55)] hover:text-[var(--W)] uppercase"
                >
                  ← Edit Responses
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-r !py-3 !px-6 !text-xs cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Transmitting Diagnosis..." : "Submit Diagnostic Brief →"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 8: SUCCESS CONFIRMATION & CALENDLY */}
        {step === 8 && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="p-6 bg-[var(--K)] border-2 border-[var(--R)] shadow-[4px_4px_0_var(--R)] space-y-3">
                <span className="type-label text-[10px] text-[var(--R)]">
                  BRIEF LOGGED
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[var(--W)]">
                  Diagnosis Received.
                </h3>
                <p className="text-xs font-mono text-[var(--W55)]">
                  REFERENCE CODE: <span className="text-[var(--W)] font-bold">{leadId}</span>
                </p>
                <p className="text-xs text-[var(--W55)] leading-relaxed">
                  Our team has recorded your diagnostic parameters. Next, lock in
                  your 15-minute diagnostic review call directly on our founder&apos;s
                  schedule to discuss the recommended roadmap.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-r w-full !py-3.5 !text-xs flex items-center justify-center gap-2"
                >
                  <span>Lock in Strategy Call on Calendly</span>
                  <span>↗</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(
                    /[^0-9]/g,
                    ""
                  )}?text=${encodeURIComponent(
                    `Hello Deezaina Studios, I just completed the diagnostic brief with reference ${leadId}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full !py-3 !text-xs flex items-center justify-center gap-2"
                >
                  <span>Connect Directly via WhatsApp</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--W15)] flex justify-between items-center text-xs font-mono text-[var(--W35)]">
              <span>DEEZAINA STUDIOS</span>
              <button
                type="button"
                onClick={resetAll}
                className="hover:text-[var(--W)] underline uppercase"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}

        {/* Footer info (Step 0 - 6) */}
        {step < 8 && (
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
        )}
      </aside>
    </div>
  );
}
