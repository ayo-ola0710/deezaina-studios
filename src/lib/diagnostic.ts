export type DiagnosticPillar = "strategy" | "branding" | "web";

export interface DiagnosticOption {
  id: string;
  label: string;
  description: string;
  scores: {
    strategy: number;
    branding: number;
    web: number;
  };
}

export interface DiagnosticQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: DiagnosticOption[];
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    title: "Where is the business experiencing the steepest friction?",
    subtitle: "Select the primary bottleneck currently stalling your momentum.",
    options: [
      {
        id: "q1_clarity",
        label: "People don't immediately get what we do or why we're different.",
        description: "Customers compare us to cheaper competitors or misunderstand our core offering.",
        scores: { strategy: 3, branding: 1, web: 0 },
      },
      {
        id: "q1_aesthetic",
        label: "Our visual presence looks outdated or doesn't match our actual caliber.",
        description: "We have outgrown our initial look and need to command premium market authority.",
        scores: { strategy: 1, branding: 3, web: 1 },
      },
      {
        id: "q1_conversion",
        label: "We get traffic and interest, but conversion into paying clients is sluggish.",
        description: "The digital journey drops visitors before they book or purchase.",
        scores: { strategy: 1, branding: 0, web: 3 },
      },
      {
        id: "q1_scale",
        label: "We are launching a completely new venture or pivot and need the full foundation.",
        description: "Zero legacy baggage; we need strategy, identity, and high-performance digital presence.",
        scores: { strategy: 2, branding: 2, web: 2 },
      },
    ],
  },
  {
    id: 2,
    title: "How clearly defined is your market positioning?",
    subtitle: "How confident is your team in articulating your unfair advantage?",
    options: [
      {
        id: "q2_unclear",
        label: "Fragmented. Different team members pitch the business differently.",
        description: "Internal alignment is loose; messaging varies across decks and channels.",
        scores: { strategy: 3, branding: 1, web: 0 },
      },
      {
        id: "q2_clear_bad_visual",
        label: "Crystal clear internally, but our external visual system doesn't reflect it.",
        description: "The logic is sound, but our brand presentation feels generic or incomplete.",
        scores: { strategy: 0, branding: 3, web: 1 },
      },
      {
        id: "q2_clear_bad_digital",
        label: "Clear on paper, but our digital touchpoints are clunky and hard to use.",
        description: "Users struggle to navigate our web application, booking, or catalog.",
        scores: { strategy: 0, branding: 1, web: 3 },
      },
      {
        id: "q2_all_tight",
        label: "Solid across the board, but we need to elevate to compete on an international tier.",
        description: "Ready to scale into Tier-1 markets and institutional partners.",
        scores: { strategy: 2, branding: 2, web: 2 },
      },
    ],
  },
  {
    id: 3,
    title: "How do potential clients first evaluate you?",
    subtitle: "Where does the crucial first impression happen?",
    options: [
      {
        id: "q3_web_first",
        label: "Directly on our website / web application.",
        description: "Our digital product or landing page is the sales team.",
        scores: { strategy: 1, branding: 1, web: 3 },
      },
      {
        id: "q3_decks",
        label: "Through sales proposals, pitch decks, and brand assets.",
        description: "Enterprise sales, B2B procurement, or investor reviews.",
        scores: { strategy: 2, branding: 3, web: 0 },
      },
      {
        id: "q3_referral",
        label: "Word-of-mouth referrals who look us up to verify credibility.",
        description: "When they Google us, what they see must instantly validate the referral.",
        scores: { strategy: 1, branding: 2, web: 2 },
      },
      {
        id: "q3_social",
        label: "Social media and marketing campaigns.",
        description: "Top-of-funnel discovery across digital feeds.",
        scores: { strategy: 1, branding: 2, web: 1 },
      },
    ],
  },
  {
    id: 4,
    title: "What is the health of your design and brand identity system?",
    subtitle: "How consistent are your touchpoints?",
    options: [
      {
        id: "q4_diy",
        label: "Haphazard. Fonts, colors, and layouts change across every new asset.",
        description: "No brand guidelines or design tokens exist yet.",
        scores: { strategy: 1, branding: 3, web: 1 },
      },
      {
        id: "q4_rigid",
        label: "We have basic logos, but lack a systematic design language for scale.",
        description: "No iconography, editorial rules, or interactive design components.",
        scores: { strategy: 1, branding: 3, web: 2 },
      },
      {
        id: "q4_web_disconnect",
        label: "Brand looks okay in print/social, but breaks down completely on web & mobile.",
        description: "Developers had to invent UI styles because design system was missing.",
        scores: { strategy: 0, branding: 2, web: 3 },
      },
      {
        id: "q4_premium_rebrand",
        label: "We need an authoritative, category-defining rebrand.",
        description: "Moving from utility brand to market leader.",
        scores: { strategy: 2, branding: 3, web: 1 },
      },
    ],
  },
  {
    id: 5,
    title: "What is the primary objective of your next digital platform?",
    subtitle: "What single commercial outcome must be achieved?",
    options: [
      {
        id: "q5_lead_gen",
        label: "High-intent lead generation and qualifying inquiries.",
        description: "Turn passive browsers into booked calls and qualified pipeline.",
        scores: { strategy: 2, branding: 1, web: 3 },
      },
      {
        id: "q5_speed_smooth",
        label: "Fluid, high-performance web experience that feels like a native app.",
        description: "Zero lag, fluid animations, instant page loads, and responsive finesse.",
        scores: { strategy: 0, branding: 1, web: 3 },
      },
      {
        id: "q5_storytelling",
        label: "Immersion and storytelling to justify premium pricing.",
        description: "Make potential customers feel the caliber before seeing the price.",
        scores: { strategy: 2, branding: 3, web: 1 },
      },
      {
        id: "q5_all_round",
        label: "A complete overhaul: positioning, visual identity, and modern web application.",
        description: "End-to-end transformation from strategy through launch.",
        scores: { strategy: 2, branding: 2, web: 2 },
      },
    ],
  },
  {
    id: 6,
    title: "What is your target timeline for this transformation?",
    subtitle: "Helps us assess team capacity and execution velocity.",
    options: [
      {
        id: "q6_urgent",
        label: "Immediate (< 4 weeks) — critical launch or funding milestone.",
        description: "Requires high-velocity sprint mode.",
        scores: { strategy: 1, branding: 1, web: 1 },
      },
      {
        id: "q6_planned",
        label: "1 to 2 months — deliberate, structured studio engagement.",
        description: "Standard deep-diagnostic and full design implementation cycle.",
        scores: { strategy: 2, branding: 2, web: 2 },
      },
      {
        id: "q6_quarter",
        label: "Next quarter (3+ months) — strategic planning phase.",
        description: "Aligning budgets and foundational requirements in advance.",
        scores: { strategy: 2, branding: 1, web: 1 },
      },
    ],
  },
];

export interface DiagnosticResult {
  primaryPillar: DiagnosticPillar;
  secondaryPillar: DiagnosticPillar;
  scores: {
    strategy: number;
    branding: number;
    web: number;
  };
  title: string;
  diagnosis: string;
  actionChecklist: string[];
  recommendedEngagement: string;
}

export function computeDiagnostic(selectedOptionIds: string[]): DiagnosticResult {
  const scores = { strategy: 0, branding: 0, web: 0 };

  for (const q of DIAGNOSTIC_QUESTIONS) {
    for (const opt of q.options) {
      if (selectedOptionIds.includes(opt.id)) {
        scores.strategy += opt.scores.strategy;
        scores.branding += opt.scores.branding;
        scores.web += opt.scores.web;
      }
    }
  }

  // Sort pillars by score
  const sorted = (Object.entries(scores) as [DiagnosticPillar, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const primaryPillar = sorted[0][0];
  const secondaryPillar = sorted[1][0];

  const pillarDetails: Record<
    DiagnosticPillar,
    {
      title: string;
      diagnosis: string;
      actionChecklist: string[];
      recommendedEngagement: string;
    }
  > = {
    strategy: {
      title: "Primary Gap: Market Positioning & Value Architecture",
      diagnosis:
        "Your core friction stems from how your value proposition is structured and communicated. Even the best visuals will underperform if buyers cannot immediately pinpoint why choosing you is the superior commercial decision.",
      actionChecklist: [
        "Audit existing customer discovery interviews and friction points.",
        "Synthesize a unified positioning thesis and competitive wedge.",
        "Refactor your service/product packaging to eliminate decision paralysis.",
      ],
      recommendedEngagement: "Diagnostic Strategy Sprint + Brand Architecture",
    },
    branding: {
      title: "Primary Gap: Brand Authority & Perceived Caliber",
      diagnosis:
        "Your capabilities have outpaced your visual presentation. Prospects are underestimating your actual tier because your visual assets, typography, and identity do not project commanding market confidence.",
      actionChecklist: [
        "Develop an authoritative visual identity system (typography, color, layout tokens).",
        "Build a scalable design guidelines manual for consistent digital and print execution.",
        "Redesign high-stakes trust assets (pitch decks, credential kits, key touchpoints).",
      ],
      recommendedEngagement: "Comprehensive Brand Identity & Visual Language System",
    },
    web: {
      title: "Primary Gap: Digital Platform Experience & Conversion Flow",
      diagnosis:
        "Your brand message is stalling at the digital interface. Visitors arrive with intent, but clunky UX, sluggish transitions, or ambiguous calls-to-action cause drop-off before they commit.",
      actionChecklist: [
        "Streamline the conversion architecture: clear paths from hero to inquiry in < 3 clicks.",
        "Rebuild on modern performance stack (Next.js, zero layout shift, smooth interactions).",
        "Implement interactive diagnostic hooks and instant booking workflows.",
      ],
      recommendedEngagement: "High-Performance Web Design & Full-Stack Development Sprint",
    },
  };

  const details = pillarDetails[primaryPillar];

  return {
    primaryPillar,
    secondaryPillar,
    scores,
    title: details.title,
    diagnosis: details.diagnosis,
    actionChecklist: details.actionChecklist,
    recommendedEngagement: details.recommendedEngagement,
  };
}
