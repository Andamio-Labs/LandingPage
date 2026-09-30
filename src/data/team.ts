import type { ImageMetadata } from "astro";

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: { es: string; en: string };
  photo?: ImageMetadata;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export const team: TeamMember[] = [
  {
    id: "santiago",
    name: "Santiago Santofimio",
    initials: "SS",
    role: { es: "Desarrollador full-stack", en: "Full-stack developer" },
    github: "santiagosantofimio",
    linkedin: "santiagosantofimio",
    portfolio: "https://santofimiodev.pages.dev",
  },
  {
    id: "david-parra",
    name: "David Parra",
    initials: "DP",
    role: { es: "Desarrollador", en: "Developer" },
    github: "PimPomUwU",
    linkedin: "david-alejandro-parra-l%C3%B3pez-63176432b",
  },
  {
    id: "santiago-fajardo",
    name: "Santiago Fajardo",
    initials: "SF",
    role: { es: "Desarrollador", en: "Developer" },
    github: "santiago123-dex",
    linkedin: "santiago-fajardo-morales-7a304b379",
  },
];
