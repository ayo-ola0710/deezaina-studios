import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "DISCOVER",
    detail: "Understand the business, audience, and root problem through rigorous audit and diagnostic inquiry.",
  },
  {
    step: "02",
    title: "DEFINE",
    detail: "Set the strategic direction, project scope, core messaging hierarchy, and measurable outcome criteria.",
  },
  {
    step: "03",
    title: "CREATE",
    detail: "Develop the strategy, visual identity system, design language, or digital product architecture.",
  },
  {
    step: "04",
    title: "DELIVER",
    detail: "Review against diagnostic goals, refine every detail, approve, and orchestrate a flawless public launch.",
  },
  {
    step: "05",
    title: "IMPROVE",
    detail: "Monitor real market response, analyze performance data, and optimize for long-term compounding growth.",
  },
];

export default function Process() {
  return (
    <section className="py-24 border-t-2 border-[var(--W15)] bg-[var(--K)]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3 max-w-xl">
            <Label>OUR PROCESS // RIGOROUS EXECUTION</Label>
            <Reveal>
              <h2 className="type-h2 text-[var(--W)]">
                From Diagnosis to Delivery.
              </h2>
            </Reveal>
          </div>
          <p className="type-body text-sm text-[var(--W55)] max-w-sm">
            We follow a structured 5-step methodology that eliminates guesswork
            and ensures every touchpoint serves an intentional commercial purpose.
          </p>
        </div>

        {/* 5 Process Steps Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="p-6 border-2 border-[var(--W15)] bg-[var(--K3)] space-y-6 flex flex-col justify-between hover:border-[var(--R)] transition-colors duration-200"
            >
              <div className="flex justify-between items-center border-b border-[var(--W15)] pb-4">
                <span className="font-mono text-xl font-bold text-[var(--R)]">
                  {item.step}
                </span>
                <span className="text-[10px] font-mono text-[var(--W35)]">
                  STEP {index + 1}/5
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl tracking-tight text-[var(--W)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--W55)] leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="w-full h-1 bg-[var(--W15)] overflow-hidden">
                <div
                  className="h-full bg-[var(--R)]"
                  style={{ width: `${(index + 1) * 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
