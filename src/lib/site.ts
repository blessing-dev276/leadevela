/** Central site configuration. Replace bookingUrl with a calendar link when one is available. */
export const SITE = {
  name: "Leadvela",
  url: "https://leadvela.com",
  bookingUrl: "mailto:hello@leadvela.com?subject=Call%20request%20for%20Leadvela&body=Hello%20Leadvela%2C%0A%0AI%27d%20like%20to%20schedule%20a%20call.%0A%0AMy%20name%3A%20%0AWhat%20I%27d%20like%20to%20discuss%3A%20%0AMy%20preferred%20dates%20and%20times%20(with%20time%20zone)%3A%20%0A%0AThank%20you.",
  contactEmail: "hello@leadvela.com",
  companyEmail: "admin@leadvela.com",
  description:
    "Leadvela builds websites, CRM systems, and automated customer journeys that help businesses capture opportunities, manage inquiries, and follow up more effectively.",
} as const;
