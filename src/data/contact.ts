export const contact = {
  whatsappNumber: "573000000000",
  whatsappDisplay: "+57 300 000 0000",
  email: "contacto@andamiolabs.com",
  domain: "andamio-labs.pages.dev",
};

export const whatsappHref = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
