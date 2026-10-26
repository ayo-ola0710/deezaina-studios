import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";

export default function PurposeBanner() {
  return (
    <section className="py-24 border-y-2 border-[var(--W15)] bg-[var(--K2)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-3">
          <Label>OUR PURPOSE // CORE PHILOSOPHY</Label>
          <Reveal>
            <h2 className="type-h2 text-[var(--W)]">
              Clarity Before Execution.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-7 space-y-6">
          <Reveal delay={0.1}>
            <p className="type-body text-lg sm:text-xl text-[var(--W55)] leading-relaxed">
              Before we recommend a logo, marketing campaign or website, we identify the
              real business problem and define what the work must achieve.
            </p>
          </Reveal>
          <p className="type-body text-sm text-[var(--W35)]">
            A logo is not a brand. We spot what others walk past — the disconnect
            between what an ambitious business says it is and what its touchpoints communicate.
          </p>
        </div>
      </div>
    </section>
  );
}
