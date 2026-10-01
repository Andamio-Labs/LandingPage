import { contact } from "./contact";
import { team } from "./team";

export const organizationProfiles = ["https://github.com/Andamio-Labs"];

export const buildStructuredData = (description: string, inLanguage: string) => {
  const organizationId = `${contact.siteUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Andamio Labs",
        url: `${contact.siteUrl}/`,
        logo: `${contact.siteUrl}/brand/andamio-labs-logo.png`,
        description,
        email: contact.email,
        telephone: `+${contact.whatsappNumber}`,
        areaServed: ["CO", "Latin America"],
        sameAs: organizationProfiles,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: contact.email,
          telephone: `+${contact.whatsappNumber}`,
          availableLanguage: ["es", "en"],
        },
        member: team.map((member) => ({
          "@type": "Person",
          name: member.name,
          sameAs: [
            member.github && `https://github.com/${member.github}`,
            member.linkedin && `https://www.linkedin.com/in/${member.linkedin}`,
            member.portfolio,
          ].filter(Boolean),
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${contact.siteUrl}/#website`,
        url: `${contact.siteUrl}/`,
        name: "Andamio Labs",
        inLanguage,
        publisher: { "@id": organizationId },
      },
    ],
  };
};
