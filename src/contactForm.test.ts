import { describe, expect, it } from "vitest";
import {
  createContactMailto,
  type ContactFormValues,
  validateContactForm,
} from "./contactForm";

const validValues: ContactFormValues = {
  name: "Chris Thomas",
  email: "chris@example.com",
  projectType: "Websites and digital experiences",
  message: "This message contains exactly ten useful words about a potential project.",
};

describe("validateContactForm", () => {
  it("requires every field", () => {
    expect(
      validateContactForm({ name: "", email: "", projectType: "", message: "" }),
    ).toEqual({
      name: "Enter your name.",
      email: "Enter your email address.",
      projectType: "Select a project type.",
      message: "Enter a message.",
    });
  });

  it("rejects an invalid email address", () => {
    expect(validateContactForm({ ...validValues, email: "chris@" }).email).toBe(
      "Enter a valid email address.",
    );
  });

  it("rejects a message shorter than ten words", () => {
    const errors = validateContactForm({
      ...validValues,
      message: "One two three four five six seven eight nine",
    });

    expect(errors.message).toBe("Enter at least 10 words.");
  });

  it("accepts a complete valid enquiry", () => {
    expect(validateContactForm(validValues)).toEqual({});
  });
});

describe("createContactMailto", () => {
  it("trims values and safely encodes the subject and body", () => {
    const mailto = createContactMailto({
      ...validValues,
      name: " Chris & Co ",
      email: " hello+web@example.com ",
      message: " A message with an ampersand & other useful project details. ",
    });

    expect(mailto).toContain("subject=Project%20enquiry%20from%20Chris%20%26%20Co");
    expect(mailto).toContain("Email%3A%20hello%2Bweb%40example.com");
    expect(mailto).toContain("ampersand%20%26%20other");
  });
});
