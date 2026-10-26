import Hero from "@/components/home/Hero";
import PurposeBanner from "@/components/home/PurposeBanner";
import Pillars from "@/components/home/Pillars";
import Process from "@/components/home/Process";
import SelectedWorks from "@/components/home/SelectedWorks";
import Marquee from "@/components/ui/Marquee";
import CtaBand from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 01 Hero */}
      <Hero />

      {/* 02 Purpose Banner */}
      <PurposeBanner />

      {/* 03 Three Pillars */}
      <Pillars />

      {/* 04 Our Process */}
      <Process />

      {/* 05 Selected Works */}
      <SelectedWorks />

      {/* 06 Client Sectors Marquee */}
      <div className="py-12 bg-[var(--K)]">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <span className="font-body font-bold text-xs uppercase tracking-[0.3em] text-[var(--R)]">
            CLIENT SECTORS // WHO WE BUILD FOR
          </span>
        </div>
        <Marquee
          items={[
            "Startups",
            "Technology Companies",
            "Finance & Fintech",
            "Hospitality & Travel",
            "Lifestyle Brands",
            "Institutions & NGOs",
            "Founders & Executives",
          ]}
        />
      </div>

      {/* 07 CTA Band */}
      <CtaBand />
    </div>
  );
}
