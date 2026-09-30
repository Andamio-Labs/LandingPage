import type { ImageMetadata } from "astro";
import santiagoPhoto from "../assets/team/santiago-santofimio.svg";
import miembroDosPhoto from "../assets/team/miembro-dos.svg";
import miembroTresPhoto from "../assets/team/miembro-tres.svg";

export interface TeamMember {
  name: string;
  role: { es: string; en: string };
  photo: ImageMetadata;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export const team: TeamMember[] = [
  {
    name: "Santiago Santofimio",
    role: { es: "Desarrollador full-stack", en: "Full-stack developer" },
    photo: santiagoPhoto,
    github: "santiagosantofimio",
    linkedin: "santiagosantofimio",
    portfolio: "https://santofimiodev.pages.dev",
  },
  {
    name: "Nombre Apellido",
    role: { es: "Desarrollador full-stack", en: "Full-stack developer" },
    photo: miembroDosPhoto,
    github: "usuario-github",
    linkedin: "usuario-linkedin",
  },
  {
    name: "Nombre Apellido",
    role: { es: "Desarrollador full-stack", en: "Full-stack developer" },
    photo: miembroTresPhoto,
    github: "usuario-github",
    linkedin: "usuario-linkedin",
  },
];
