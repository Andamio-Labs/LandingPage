import type { SiteContent } from "./types";
import { whatsappHref } from "../data/contact";

const whatsappMessage = "Hola, quiero contarles sobre mi negocio.";

export const es: SiteContent = {
  lang: "es",
  htmlLang: "es-CO",
  meta: {
    title: "Andamio Labs — Software a la medida para tu negocio",
    description:
      "Construimos reservas, agendamiento, pedidos e inventario a la medida para negocios en Colombia y Latinoamérica. Tu negocio funciona solo, tú te enfocas en crecerlo.",
  },
  skipLink: "Saltar al contenido",
  languageSwitch: { label: "EN", href: "/en/" },
  header: {
    nav: [
      { label: "Soluciones", href: "#solutions" },
      { label: "Proyectos", href: "#projects" },
      { label: "Proceso", href: "#process" },
      { label: "Equipo", href: "#team" },
      { label: "Contacto", href: "#contact" },
    ],
    ctaLabel: "Escríbenos",
  },
  hero: {
    title: "Software a la medida para que tu negocio funcione solo",
    subtitle:
      "Reservas, citas, pedidos e inventario en un sistema hecho para tu negocio, no una plantilla genérica.",
    ctaPrimary: {
      label: "Escríbenos por WhatsApp",
      href: whatsappHref(whatsappMessage),
    },
    ctaSecondary: { label: "Ver proyectos", href: "#projects" },
  },
  problem: {
    title: "Manejar todo por WhatsApp y cuadernos tiene un límite",
    intro:
      "Tu negocio crece, pero el cuaderno de citas y los chats de WhatsApp no dan abasto.",
    points: [
      "Clientes que agendan la misma hora dos veces porque nadie ve el cuaderno a tiempo.",
      "Horas respondiendo los mismos mensajes: '¿tienen cupo?', '¿cuánto cuesta?', '¿dónde quedan?'.",
      "Gente que busca tu negocio en Google y no encuentra nada, o encuentra la competencia primero.",
      "Inventario que se descuadra porque nadie lo actualiza a tiempo.",
    ],
  },
  solutions: {
    title: "Un sistema para cada parte de tu negocio",
    intro: "Elegimos y construimos solo lo que tu negocio necesita.",
    items: [
      {
        title: "Página web",
        description:
          "Tu negocio aparece en Google, con la información y las fotos que tus clientes buscan antes de llegar.",
      },
      {
        title: "Reservas en línea",
        description:
          "Tus clientes reservan cancha, mesa o cupo sin llamarte, y tú ves todo en un solo lugar.",
      },
      {
        title: "Agendamiento de citas",
        description:
          "Citas de barbería, spa o estudio organizadas solas, sin choques de horario ni dobles reservas.",
      },
      {
        title: "Pedidos",
        description:
          "Tus clientes piden y pagan en línea, y el pedido te llega organizado, no en veinte chats distintos.",
      },
      {
        title: "Inventario",
        description:
          "Sabes qué tienes, qué se agotó y qué pedir, sin abrir una hoja de cálculo distinta cada vez.",
      },
      {
        title: "Panel administrativo instalable",
        description:
          "Un panel que instalas como app en el computador o el celular para manejar todo desde un solo lugar.",
      },
    ],
  },
  audiences: {
    title: "Para negocios como el tuyo",
    intro: "Trabajamos con negocios que atienden gente todos los días.",
    items: [
      "Gimnasios",
      "Canchas sintéticas",
      "Barberías",
      "Spas",
      "Estudios de tatuaje",
      "Salas de videojuegos",
      "Estudios de yoga",
      "Floristerías",
    ],
  },
  projectsSection: {
    title: "Proyectos",
    intro: "Así se ve un sistema de reservas hecho por nosotros. Prueba cómo se sentiría el tuyo.",
    ctaLabel: "Ver demo en vivo",
    demo: {
      title: "Demo: reservas en línea",
      description: "Elige un día y una hora para ver cómo tus clientes reservarían un cupo.",
      dayLabel: "Día",
      timeLabel: "Hora",
      availableLabel: "cupos disponibles",
      availableLabelSingular: "cupo disponible",
      fullLabel: "Sin cupo",
      confirmLabel: "Reservar este cupo",
      confirmedMessage: "Reserva confirmada. Así de simple sería para tus clientes.",
      selectPrompt: "Elige un día para ver los horarios disponibles.",
      days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    },
  },
  process: {
    title: "Cómo trabajamos",
    intro: "Todo remoto, con avance visible desde el primer día.",
    steps: [
      {
        title: "Conversación",
        description: "Nos cuentas cómo funciona tu negocio hoy y qué te quita más tiempo.",
      },
      {
        title: "Propuesta",
        description: "Te proponemos qué construir primero y por qué, sin tecnicismos.",
      },
      {
        title: "Diseño",
        description: "Diseñamos cómo se ve y se siente tu sistema antes de escribir una línea de código.",
      },
      {
        title: "Desarrollo con avance visible",
        description: "Construimos por partes y te mostramos cada avance, no solo el resultado final.",
      },
      {
        title: "Entrega y acompañamiento",
        description: "Entregamos, te enseñamos a usarlo y seguimos disponibles después del lanzamiento.",
      },
    ],
  },
  team: {
    title: "Equipo",
    intro: "Tres programadores freelance en Colombia, trabajando 100 % remoto.",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Cuánto se demora un proyecto?",
        answer:
          "Depende del sistema, pero la mayoría de proyectos están listos entre 3 y 6 semanas desde la propuesta aprobada.",
      },
      {
        question: "¿Qué necesito tener antes de empezar?",
        answer:
          "Solo necesitas contarnos cómo funciona tu negocio hoy. El logo, los textos y las fotos los organizamos juntos en el camino.",
      },
      {
        question: "¿Quién paga el dominio y el hosting?",
        answer:
          "El dominio y el hosting quedan a tu nombre y los pagas tú directamente; nosotros te ayudamos a configurarlos.",
      },
      {
        question: "¿Trabajan con negocios fuera de Colombia?",
        answer:
          "Sí, trabajamos con negocios en toda Latinoamérica. Todo el proceso es remoto, por WhatsApp y videollamada.",
      },
    ],
  },
  contact: {
    title: "Hablemos.",
    intro: "Cuéntanos sobre tu negocio y te respondemos nosotros mismos.",
    whatsappMessage,
    whatsappLabel: "Escríbenos por WhatsApp",
    emailLabel: "Escríbenos un correo",
    copyLabel: "Copiar correo",
    copiedLabel: "Correo copiado",
    hours: "Respondemos de lunes a viernes, 8 a.m. a 6 p.m., hora de Colombia (UTC-5).",
  },
  footer: {
    tagline: "Software a la medida para negocios de Colombia y Latinoamérica.",
    rights: "Andamio Labs",
  },
};
