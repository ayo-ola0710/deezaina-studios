import Card from "@/components/ui/Card";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";

export const PILLARS_DATA = [
  {
    number: "01",
    title: "STRATEGY",
    subtitle: "Find the right problem, direction and plan.",
    description:
      "Market diagnosis, positioning, and core narrative. We ensure your business is aimed at the right audience with an undeniable value proposition before a single pixel is moved.",
    deliverables: [
      "Brand Audits & Research",
      "Positioning & Messaging",
      "Market Diagnosis",
      "Go-to-Market Roadmaps",
    ],
  },
  {
    number: "02",
    title: "BRANDING",
    subtitle: "Create a clear identity and communication system.",
    description:
      "A cohesive visual and verbal language. We design logos, typography hierarchies, colour systems, and design guidelines that build instant credibility and recognition.",
    deliverables: [
      "Visual Identity Systems",
      "Brand Guidelines & Manuals",
      "Typography & Color Systems",
      "Marketing Collateral & Decks",
    ],
  },
  {
    number: "03",
    title: "WEB",
    subtitle: "Build useful digital experiences and products.",
    description:
      "High-performance websites and digital interfaces designed to convert qualified traffic into committed clients. Fast, modern, and accessible across every viewport.",
    deliverables: [
      "Bespoke Website Design",
      "Modern Web Development",
      "Interactive Digital Products",
      "Conversion & SEO Architecture",
    ],
  },
];

export default function Pillars() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="space-y-4 max-w-2xl">
        <Label>THREE PILLARS // HOW WE DELIVER</Label>
        <Reveal>
          <h2 className="type-h2 text-[var(--W)]">
            One Connected System.
          </h2>
        </Reveal>
        <p className="type-body text-[var(--W55)]">
          Each pillar strengthens the others. Together, they create one complete,
          trustworthy brand experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PILLARS_DATA.map((pillar) => (
          <Card
            key={pillar.number}
            className="flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-[var(--R)] hover:shadow-[4px_4px_0_var(--R)]"
          >
            {/* Top Red Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(230,21,21,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-[var(--W15)] pb-4">
                <span className="font-mono text-2xl font-bold text-[var(--R)]">
                  {pillar.number}
                </span>
                <span className="text-xs font-mono tracking-widest text-[var(--W35)] uppercase">
                  Pillar
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-3xl tracking-tight text-[var(--W)]">
                  {pillar.title}
                </h3>
                <p className="text-sm font-semibold text-[var(--W)]">
                  {pillar.subtitle}
                </p>
              </div>

              <p className="text-sm text-[var(--W55)] leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--W15)] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--W35)] block mb-2">
                Deliverables Included
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--W55)] font-mono">
                {pillar.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--R)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
