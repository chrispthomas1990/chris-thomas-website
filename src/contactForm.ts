import { pageContent } from "./content/pages";
import { contactEmail } from "./content/site";

export type ContactFormValues = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const { form } = pageContent.contact;

function getWordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function validateContactForm(values: ContactFormValues) {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = form.errors.nameRequired;
  }

  if (!values.email.trim()) {
    errors.email = form.errors.emailRequired;
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = form.errors.emailInvalid;
  }

  if (!values.projectType) {
    errors.projectType = form.errors.projectTypeRequired;
  }

  if (!values.message.trim()) {
    errors.message = form.errors.messageRequired;
  } else if (getWordCount(values.message) < form.minimumMessageWordCount) {
    errors.message = form.errors.messageMinimumWords.replace(
      "{count}",
      String(form.minimumMessageWordCount),
    );
  }

  return errors;
}

export function createContactMailto(values: ContactFormValues) {
  const subject = `${form.emailSubjectPrefix} ${values.name.trim()}`;
  const body = [
    `${form.emailBodyLabels.name}: ${values.name.trim()}`,
    `${form.emailBodyLabels.email}: ${values.email.trim()}`,
    `${form.emailBodyLabels.projectType}: ${values.projectType}`,
    "",
    `${form.emailBodyLabels.message}:`,
    values.message.trim(),
  ].join("\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
