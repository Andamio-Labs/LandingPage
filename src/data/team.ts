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
    id: "integrante-dos",
    name: "Nombre Apellido",
    initials: "NA",
    role: { es: "Rol por definir", en: "Role to be defined" },
    github: "usuario-github",
    linkedin: "usuario-linkedin",
  },
  {
    id: "integrante-tres",
    name: "Nombre Apellido",
    initials: "NA",
    role: { es: "Rol por definir", en: "Role to be defined" },
    github: "usuario-github",
    linkedin: "usuario-linkedin",
  },
];
