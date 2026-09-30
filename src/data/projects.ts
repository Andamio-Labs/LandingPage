export interface Project {
  name: string;
  description: { es: string; en: string };
  demoUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Reservas Cancha Central",
    description: {
      es: "Sistema de reservas en línea para una cancha sintética, con pagos y recordatorios automáticos.",
      en: "Online booking system for a turf field, with payments and automatic reminders.",
    },
    demoUrl: "https://ejemplo-canchas.andamio-labs.pages.dev",
    tags: ["Reservas", "Pagos"],
  },
  {
    name: "Agenda Barbería Norte",
    description: {
      es: "Agendamiento de citas para una barbería con varias sedes y varios barberos.",
      en: "Appointment scheduling for a multi-location barbershop with multiple barbers.",
    },
    demoUrl: "https://ejemplo-barberia.andamio-labs.pages.dev",
    tags: ["Citas", "Multisede"],
  },
  {
    name: "Panel Spa Aurora",
    description: {
      es: "Panel administrativo instalable para manejar citas, inventario de productos y caja.",
      en: "Installable admin panel to manage appointments, product inventory and cash flow.",
    },
    demoUrl: "https://ejemplo-spa.andamio-labs.pages.dev",
    tags: ["Panel", "Inventario"],
  },
];
