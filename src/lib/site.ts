export const siteConfig = {
  name: "Deezaina Studios",
  tagline: "Diagnose Before Design.",
  subline: "We help businesses become easier to understand, trust, and choose.",
  pillars: ["Strategy", "Branding", "Web"],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.deezaina.pro",
  email: "hello@deezaina.pro", // TODO_CONTENT: Divine to confirm primary inbox
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/owo/15min",
  whatsappNumber: "+2348123456789", // TODO_CONTENT: confirm primary WhatsApp contact
  locations: ["Nigeria", "Canada", "United Kingdom"],
  socials: {
    behance: "https://behance.net/deezaina",
    instagram: "https://instagram.com/dee.designss",
    linkedin: "https://linkedin.com/company/deezaina",
  },
  navLinks: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ],
};
