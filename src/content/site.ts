export const contactEmail = "hello@christhomas.design";

export const companyName = "Chris Thomas Creative Limited";

export const siteMetadata = {
  title: "Chris Thomas | UI Designer/Front-End Engineer",
  description:
    "Chris Thomas design portfolio showcasing selected brand, digital, and creative work.",
} as const;

export const brandContent = {
  name: "Chris Thomas",
  role: "UI Designer/Front-End Engineer",
  homeAriaLabel: "Chris Thomas UI Designer/Front-End Engineer home",
} as const;

export const navigationContent = {
  primaryNavId: "primary-navigation",
  primaryAriaLabel: "Primary navigation",
  socialAriaLabel: "Social links",
  openMenuLabel: "Open navigation menu",
  closeMenuLabel: "Close navigation menu",
  enableDarkModeLabel: "Switch to dark mode",
  enableLightModeLabel: "Switch to light mode",
  legalAriaLabel: "Legal links",
} as const;

export const utilityContent = {
  backToTopAriaLabel: "Return to top",
} as const;

export const primaryNavigation = [
  { label: "Work", to: "/" },
  { label: "Info", to: "/info" },
  { label: "Contact", to: "/contact" },
] as const;

export const footerLinks = [
  { label: "Privacy policy", to: "/privacy-policy" },
  { label: "Cookie policy", to: "/cookie-policy" },
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
