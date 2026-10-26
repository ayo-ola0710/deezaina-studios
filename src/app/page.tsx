export default function Page() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-16 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <header className="border-b-2 border-[var(--W15)] pb-8 space-y-3">
        <div className="type-label">PHASE 0 // SYSTEM SPEC & TOKEN VERIFICATION</div>
        <h1 className="type-h1">DEEZAINA.</h1>
        <p className="type-body text-[var(--W55)]">
          Diagnostic testbed for brand tokens, typography scales, sharp Neo-Brutalist
          geometry, and interactive states.
        </p>
      </header>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-6">
        <div className="type-label">01 // COLOR TOKENS</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 border-2 border-[var(--W15)] bg-[var(--K)] space-y-2">
            <div className="text-xs uppercase tracking-widest text-[var(--W55)]">--K Carbon Void</div>
            <div className="font-mono text-sm font-bold">#050505</div>
            <div className="h-10 border border-[var(--W15)] bg-[var(--K)]" />
          </div>

          <div className="p-5 border-2 border-[var(--W15)] bg-[var(--K3)] space-y-2">
            <div className="text-xs uppercase tracking-widest text-[var(--W55)]">--K3 Charcoal</div>
            <div className="font-mono text-sm font-bold">#121212</div>
            <div className="h-10 border border-[var(--W15)] bg-[var(--K3)]" />
          </div>

          <div className="p-5 border-2 border-[var(--W15)] bg-[var(--K)] space-y-2">
            <div className="text-xs uppercase tracking-widest text-[var(--W55)]">--W Warm Bone</div>
            <div className="font-mono text-sm font-bold text-[var(--W)]">#F4F2EC</div>
            <div className="h-10 bg-[var(--W)]" />
          </div>

          <div className="p-5 border-2 border-[var(--W15)] bg-[var(--K)] space-y-2">
            <div className="text-xs uppercase tracking-widest text-[var(--W55)]">--R Deezaina Red</div>
            <div className="font-mono text-sm font-bold text-[var(--R)]">#E61515</div>
            <div className="h-10 bg-[var(--R)]" />
          </div>
        </div>

        {/* Tints & Opacities */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 pt-2">
          <div className="p-3 border border-[var(--W15)] bg-[var(--W4)] text-xs font-mono">--W4 (4%)</div>
          <div className="p-3 border border-[var(--W15)] bg-[var(--W8)] text-xs font-mono">--W8 (8%)</div>
          <div className="p-3 border border-[var(--W15)] bg-[var(--W15)] text-xs font-mono">--W15 (15%)</div>
          <div className="p-3 border border-[var(--W15)] bg-[var(--W35)] text-xs font-mono text-[var(--K)]">--W35 (35%)</div>
          <div className="p-3 border border-[var(--W15)] bg-[var(--W55)] text-xs font-mono text-[var(--K)]">--W55 (55%)</div>
          <div className="p-3 border border-[var(--R)] bg-[var(--R8)] text-xs font-mono text-[var(--R)]">--R8 (8%)</div>
          <div className="p-3 border border-[var(--R)] bg-[var(--R30)] text-xs font-mono text-[var(--W)]">--R30 (30%)</div>
        </div>
      </section>

      {/* 2. Typography Hierarchy */}
      <section className="space-y-6">
        <div className="type-label">02 // TYPOGRAPHY HIERARCHY</div>
        <div className="space-y-8 border-2 border-[var(--W15)] p-6 md:p-10 bg-[var(--K3)]">
          <div>
            <span className="text-xs font-mono text-[var(--W35)] block mb-1">
              HERO H1 (Bricolage Grotesque 800)
            </span>
            <h1 className="type-h1">DIAGNOSE BEFORE DESIGN.</h1>
          </div>

          <div>
            <span className="text-xs font-mono text-[var(--W35)] block mb-1">
              SECTION H2 (Bricolage Grotesque 700)
            </span>
            <h2 className="type-h2">STRATEGY · BRANDING · WEB</h2>
          </div>

          <div>
            <span className="text-xs font-mono text-[var(--W35)] block mb-1">
              CARD H3 (Bricolage Grotesque 600)
            </span>
            <h3 className="type-h3">Digital experiences that make the brand useful.</h3>
          </div>

          <div>
            <span className="text-xs font-mono text-[var(--W35)] block mb-1">
              BODY COPY (Plus Jakarta Sans 400 · Max 65ch)
            </span>
            <p className="type-body">
              Before we recommend a logo, campaign or website, we identify the real business
              problem and define what the work must achieve. We help businesses become easier to
              understand, trust, and choose.
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-[var(--W35)] block mb-1">
              MICRO LABEL (Plus Jakarta Sans 700 · Uppercase · 0.3em tracking)
            </span>
            <span className="type-label">01 STRATEGY — FIND THE RIGHT PROBLEM</span>
          </div>
        </div>
      </section>

      {/* 3. Component System & Buttons */}
      <section className="space-y-6">
        <div className="type-label">03 // COMPONENTS & HARD SHADOWS</div>
        <div className="flex flex-wrap gap-6 items-center">
          <button type="button" className="btn-r">
            Book a Diagnostic
          </button>
          <button type="button" className="btn-ghost">
            See Our Work
          </button>
          <button type="button" className="btn-r opacity-50 cursor-not-allowed" disabled>
            Disabled CTA
          </button>
        </div>

        {/* Neo-brutalist Cards & Glass Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="card-neo p-8 space-y-4">
            <span className="type-label">01 // STRATEGY</span>
            <h4 className="font-display font-bold text-2xl">Direction before execution</h4>
            <p className="text-sm text-[var(--W55)] leading-relaxed">
              Brand audits, positioning, market analysis and execution roadmaps.
            </p>
            <div className="text-xs font-mono text-[var(--W35)]">Hover to test hard red shadow</div>
          </div>

          <div className="card-neo p-8 space-y-4">
            <span className="type-label">02 // BRANDING</span>
            <h4 className="font-display font-bold text-2xl">Identity & communication</h4>
            <p className="text-sm text-[var(--W55)] leading-relaxed">
              Visual identity systems, typography, design systems, and brand guidelines.
            </p>
            <div className="text-xs font-mono text-[var(--W35)]">Hover to test hard red shadow</div>
          </div>

          <div className="glass-panel p-8 space-y-4">
            <span className="type-label text-[var(--W)]">03 // GLASS PANEL</span>
            <h4 className="font-display font-bold text-2xl">Frosted Glass Surface</h4>
            <p className="text-sm text-[var(--W55)] leading-relaxed">
              32px blur backdrop with 1px border. Used for the persistent Navbar and lead drawer.
            </p>
            <div className="text-xs font-mono text-[var(--W35)]">Backdrop blur active</div>
          </div>
        </div>
      </section>

      {/* Status Footer */}
      <footer className="border-t-2 border-[var(--W15)] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[var(--W35)]">
        <div>STATUS: PHASE 0 READY // ZERO TS ERRORS // TOKENS VERIFIED</div>
        <div>DEEZAINA STUDIOS (EST. 2018)</div>
      </footer>
    </main>
  );
}
