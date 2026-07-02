import { type FormEvent, useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pageContent } from "../content/pages";
import { contactEmail } from "../content/site";
import "./Contact.css";

type ContactFormValues = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialFormValues: ContactFormValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const { contact } = pageContent;
const { form } = contact;

function getWordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function validateContactForm(values: ContactFormValues) {
  const errors: ContactFormErrors = {};
  const messageWordCount = getWordCount(values.message);

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
  } else if (messageWordCount < form.minimumMessageWordCount) {
    errors.message = form.errors.messageMinimumWords.replace(
      "{count}",
      String(form.minimumMessageWordCount),
    );
  }

  return errors;
}

function createContactMailto(values: ContactFormValues) {
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

export default function Contact() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

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

        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <label>
            <span>{form.labels.name}</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
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
          <button className="button-link" type="submit">
            {form.submitLabel}
          </button>
        </form>
      </section>
    </div>
  );
}
