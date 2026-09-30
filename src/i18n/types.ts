export type Lang = "es" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  lang: Lang;
  htmlLang: string;
  meta: {
    title: string;
    description: string;
  };
  skipLink: string;
  languageSwitch: {
    label: string;
    href: string;
  };
  header: {
    nav: NavLink[];
    ctaLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  problem: {
    title: string;
    intro: string;
    points: string[];
  };
  solutions: {
    title: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  audiences: {
    title: string;
    intro: string;
    items: string[];
  };
  projectsSection: {
    title: string;
    intro: string;
    ctaLabel: string;
    demo: {
      title: string;
      description: string;
      dayLabel: string;
      timeLabel: string;
      availableLabel: string;
      availableLabelSingular: string;
      fullLabel: string;
      confirmLabel: string;
      confirmedMessage: string;
      selectPrompt: string;
      days: string[];
    };
  };
  process: {
    title: string;
    intro: string;
    steps: { title: string; description: string }[];
  };
  team: {
    title: string;
    intro: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    title: string;
    intro: string;
    whatsappMessage: string;
    whatsappLabel: string;
    emailLabel: string;
    copyLabel: string;
    copiedLabel: string;
    hours: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
}
