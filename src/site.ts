export const contactEmail = "hello@christhomas.design";

export const companyName = "Chris Thomas Creative Limited";

export const primaryNavigation = [
  { label: "Work", to: "/" },
  { label: "Info", to: "/info" },
  { label: "Contact", to: "/contact" },
] as const;

export const footerLinks = [
  { label: "Sitemap", to: "/sitemap" },
  { label: "Privacy policy", to: "/privacy-policy" },
  { label: "Cookie policy", to: "/cookie-policy" },
  { label: "Accessibility statement", to: "/accessibility-statement" },
] as const;

export const sitemapLinks = [
  ...primaryNavigation,
  ...footerLinks,
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/chrispthomas1990",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christhomas1990/",
  },
] as const;

export const caseStudyMediaPanelCount = 8;

export const contactProjectTypes = [
  "Front-end build",
  "Website design and build",
  "Design system",
  "Consulting",
  "Other",
];
