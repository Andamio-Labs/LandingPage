import type { SiteContent } from "./types";
import { whatsappHref } from "../data/contact";

const whatsappMessage = "Hi, I'd like to tell you about my business.";

export const en: SiteContent = {
  lang: "en",
  htmlLang: "en-US",
  meta: {
    title: "Andamio Labs — Custom software for your business",
    description:
      "We build custom booking, scheduling, ordering and inventory systems for businesses in Colombia and Latin America. Your business runs itself, so you can focus on growing it.",
  },
  skipLink: "Skip to content",
  languageSwitch: { label: "ES", href: "/" },
  header: {
    nav: [
      { label: "Solutions", href: "#solutions" },
      { label: "Projects", href: "#projects" },
      { label: "Process", href: "#process" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Message us",
  },
  hero: {
    title: "Custom software so your business runs itself",
    subtitle:
      "Bookings, appointments, orders and inventory in one system built for your business, not a generic template.",
    ctaPrimary: {
      label: "Message us on WhatsApp",
      href: whatsappHref(whatsappMessage),
    },
    ctaSecondary: { label: "See projects", href: "#projects" },
  },
  problem: {
    title: "WhatsApp and notebooks only take you so far",
    intro: "Your business is growing, but the booking notebook and WhatsApp chats can't keep up.",
    points: [
      "Customers double-booking the same slot because no one checked the notebook in time.",
      "Hours spent answering the same messages: 'do you have space?', 'how much does it cost?', 'where are you located?'.",
      "People searching for your business on Google and finding nothing, or finding a competitor first.",
      "Inventory going out of sync because no one updates it on time.",
    ],
  },
  solutions: {
    title: "A system for every part of your business",
    intro: "We choose and build only what your business actually needs.",
    items: [
      {
        title: "Website",
        description:
          "Your business shows up on Google, with the information and photos customers look for before they arrive.",
      },
      {
        title: "Online booking",
        description:
          "Customers book a court, table or slot without calling you, and you see everything in one place.",
      },
      {
        title: "Appointment scheduling",
        description:
          "Barbershop, spa or studio appointments organize themselves, with no scheduling conflicts or double bookings.",
      },
      {
        title: "Orders",
        description:
          "Customers order and pay online, and the order reaches you organized, not scattered across twenty chats.",
      },
      {
        title: "Inventory",
        description:
          "You know what you have, what ran out and what to reorder, without opening a different spreadsheet every time.",
      },
      {
        title: "Installable admin panel",
        description:
          "A panel you install like an app on your computer or phone to run everything from one place.",
      },
    ],
  },
  audiences: {
    title: "For businesses like yours",
    intro: "We work with businesses that serve people every day.",
    items: [
      "Gyms",
      "Turf fields",
      "Barbershops",
      "Spas",
      "Tattoo studios",
      "Gaming lounges",
      "Yoga studios",
      "Flower shops",
    ],
  },
  projectsSection: {
    title: "Projects",
    intro: "This is what a booking system built by us looks like. Try what yours would feel like.",
    ctaLabel: "See live demo",
    demo: {
      title: "Demo: online booking",
      description: "Pick a day and a time to see how your customers would book a slot.",
      dayLabel: "Day",
      timeLabel: "Time",
      availableLabel: "slots available",
      availableLabelSingular: "slot available",
      fullLabel: "Fully booked",
      confirmLabel: "Book this slot",
      confirmedMessage: "Booking confirmed. That's how simple it would be for your customers.",
      selectPrompt: "Pick a day to see the available times.",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
  },
  process: {
    title: "How we work",
    intro: "Fully remote, with visible progress from day one.",
    steps: [
      {
        title: "Conversation",
        description: "You tell us how your business runs today and what takes up most of your time.",
      },
      {
        title: "Proposal",
        description: "We propose what to build first and why, in plain language.",
      },
      {
        title: "Design",
        description: "We design how your system looks and feels before writing a single line of code.",
      },
      {
        title: "Development with visible progress",
        description: "We build in stages and show you every step, not just the final result.",
      },
      {
        title: "Delivery and support",
        description: "We hand it over, teach you how to use it, and stay available after launch.",
      },
    ],
  },
  team: {
    title: "Team",
    intro: "Three freelance developers in Colombia, working 100% remote.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How long does a project take?",
        answer:
          "It depends on the system, but most projects are ready between 3 and 6 weeks after the proposal is approved.",
      },
      {
        question: "What do I need to have before we start?",
        answer:
          "Just tell us how your business runs today. We'll sort out the logo, copy and photos together along the way.",
      },
      {
        question: "Who pays for the domain and hosting?",
        answer:
          "The domain and hosting stay in your name and you pay for them directly; we help you set them up.",
      },
      {
        question: "Do you work with businesses outside Colombia?",
        answer:
          "Yes, we work with businesses across Latin America. The whole process is remote, over WhatsApp and video calls.",
      },
    ],
  },
  contact: {
    title: "Let's talk.",
    intro: "Tell us about your business and we'll get back to you ourselves.",
    whatsappMessage,
    whatsappLabel: "Message us on WhatsApp",
    emailLabel: "Email us",
    copyLabel: "Copy email",
    copiedLabel: "Email copied",
    hours: "We reply Monday to Friday, 8 a.m. to 6 p.m., Colombia time (UTC-5).",
  },
  footer: {
    tagline: "Custom software for businesses in Colombia and Latin America.",
    rights: "Andamio Labs",
  },
};
