import { type FormEvent, useRef, useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createContactMailto,
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from "../contactForm";
import { pageContent } from "../content/pages";
import "./Contact.css";

const initialFormValues: ContactFormValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

const { contact } = pageContent;
const { form } = contact;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const formErrorCount = Object.keys(formErrors).length;

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setFormErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const { [field]: _removedError, ...remainingErrors } = currentErrors;
      return remainingErrors;
    });
  };

  const validateField = (field: keyof ContactFormValues) => {
    const nextErrors = validateContactForm(formValues);

    setFormErrors((currentErrors) => {
      const { [field]: _removedError, ...remainingErrors } = currentErrors;

      if (!nextErrors[field]) {
        return remainingErrors;
      }

      return {
        ...remainingErrors,
        [field]: nextErrors[field],
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(formValues);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => {
        const firstInvalidField = formRef.current?.querySelector<HTMLElement>(
          '[aria-invalid="true"]',
        );

        firstInvalidField?.focus({ preventScroll: true });
        firstInvalidField?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "center",
        });
      });
      return;
    }

    window.location.href = createContactMailto(formValues);
  };

  return (
    <div className="page-stack">
      <section className="contact-page">
        <div className="content-main">
          {contact.sections.map((section, index) => (
            <div className="content-section" key={section.heading}>
              {section.heading ? (
                index === 0 ? (
                  <h1>{section.heading}</h1>
                ) : (
                  <h2>{section.heading}</h2>
                )
              ) : null}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="content-list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        <form
          ref={formRef}
          className="contact-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <label>
            <span>{form.labels.name}</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder={form.placeholders.name}
              value={formValues.name}
              aria-describedby={formErrors.name ? "name-error" : undefined}
              aria-invalid={Boolean(formErrors.name)}
              onBlur={() => validateField("name")}
              onChange={(event) => updateField("name", event.target.value)}
            />
            {formErrors.name ? (
              <span className="field-error" id="name-error">
                {formErrors.name}
              </span>
            ) : null}
          </label>
          <label>
            <span>{form.labels.email}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder={form.placeholders.email}
              value={formValues.email}
              aria-describedby={formErrors.email ? "email-error" : undefined}
              aria-invalid={Boolean(formErrors.email)}
              onBlur={() => validateField("email")}
              onChange={(event) => updateField("email", event.target.value)}
            />
            {formErrors.email ? (
              <span className="field-error" id="email-error">
                {formErrors.email}
              </span>
            ) : null}
          </label>
          <label>
            <span>{form.labels.projectType}</span>
            <span className="select-field">
              <select
                name="project-type"
                value={formValues.projectType}
                aria-describedby={
                  formErrors.projectType ? "project-type-error" : undefined
                }
                aria-invalid={Boolean(formErrors.projectType)}
                onBlur={() => validateField("projectType")}
                onChange={(event) => updateField("projectType", event.target.value)}
              >
                <option value="" disabled>
                  {form.placeholders.projectType}
                </option>
                {form.projectTypes.map((projectType) => (
                  <option key={projectType}>{projectType}</option>
                ))}
              </select>
              <FontAwesomeIcon icon={faAngleDown} aria-hidden="true" />
            </span>
            {formErrors.projectType ? (
              <span className="field-error" id="project-type-error">
                {formErrors.projectType}
              </span>
            ) : null}
          </label>
          <label>
            <span>{form.labels.message}</span>
            <textarea
              name="message"
              rows={7}
              placeholder={form.placeholders.message}
              value={formValues.message}
              aria-describedby={formErrors.message ? "message-error" : undefined}
              aria-invalid={Boolean(formErrors.message)}
              onBlur={() => validateField("message")}
              onChange={(event) => updateField("message", event.target.value)}
            />
            {formErrors.message ? (
              <span className="field-error" id="message-error">
                {formErrors.message}
              </span>
            ) : null}
          </label>
          <button className="button" type="submit">
            {form.submitLabel}
          </button>
          <p className="sr-only" aria-live="polite">
            {formErrorCount > 0 ? "Please check the highlighted fields." : ""}
          </p>
        </form>
      </section>
    </div>
  );
}
