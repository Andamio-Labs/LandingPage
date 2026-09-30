import type { IconName } from "../icons";

export type Lang = "es" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export type SolutionId = "web" | "booking" | "appointments" | "orders" | "inventory" | "pwa";

export interface SolutionPreviews {
  web: {
    inputLabel: string;
    defaultName: string;
    status: string;
    directions: string;
    message: string;
    caption: string;
  };
  booking: {
    days: string[];
    dayLabel: string;
    timeLabel: string;
    slotsMany: string;
    slotsOne: string;
    full: string;
    confirm: string;
    confirmed: string;
  };
  appointments: {
    servicesLabel: string;
    services: { name: string; minutes: number; next: string }[];
    nextLabel: string;
    durationLabel: string;
    minutesUnit: string;
    book: string;
    booked: string;
  };
  orders: {
    items: string[];
    add: string;
    remove: string;
    countMany: string;
    countOne: string;
    empty: string;
    send: string;
    sent: string;
  };
  inventory: {
    products: { name: string; stock: number }[];
    unit: string;
    sell: string;
    low: string;
    out: string;
    restock: string;
  };
  pwa: {
    appName: string;
    install: string;
    installed: string;
    reset: string;
  };
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
    ariaLabel: string;
  };
  theme: {
    toLight: string;
    toDark: string;
  };
  header: {
    navLabel: string;
    nav: NavLink[];
    cta: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    titleLines: string[];
    lead: string;
    secondaryCta: string;
    sceneHint: string;
  };
  problem: {
    title: string;
    lead: string;
    notes: { tag: string; text: string }[];
    next: string;
    counter: string;
    dragHint: string;
    doneTitle: string;
    doneText: string;
    doneCta: string;
    restart: string;
  };
  solutions: {
    title: string;
    lead: string;
    tabsLabel: string;
    items: { id: SolutionId; title: string; benefit: string; icon: IconName }[];
    previews: SolutionPreviews;
  };
  audiences: {
    title: string;
    items: { label: string; icon: IconName }[];
  };
  process: {
    title: string;
    lead: string;
    steps: { title: string; text: string; icon: IconName }[];
  };
  quote: {
    title: string;
    lead: string;
    businessLabel: string;
    otherOption: string;
    otherLabel: string;
    needsLabel: string;
    needsHelp: string;
    timingLabel: string;
    timingOptions: string[];
    nameLabel: string;
    detailsLabel: string;
    optional: string;
    previewLabel: string;
    greeting: string;
    businessLine: string;
    needsLine: string;
    timingLine: string;
    nameLine: string;
    detailsLine: string;
    pending: string;
    sendWhatsapp: string;
    sendEmail: string;
    emailSubject: string;
    error: string;
  };
  team: {
    title: string;
    lead: string;
    dragHint: string;
    badgeOrg: string;
    portfolio: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    title: string;
    lead: string;
    whatsappMessage: string;
    whatsappCta: string;
    copyEmail: string;
    copied: string;
    emailLabel: string;
    whatsappLabel: string;
    hoursLabel: string;
    hoursValue: string;
  };
  footer: {
    tagline: string;
  };
}
