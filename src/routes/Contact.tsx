import { contactEmail, contactProjectTypes } from "../site";

export default function Contact() {
  return (
    <div className="page-stack">
      <section className="contact-page">
        <div className="intro-main">
          <p className="kicker">Contact</p>
          <h1>Have a project in mind or a role to discuss? Send over the details.</h1>
          <div className="info-content">
            <p>
              I am interested in thoughtful front-end work, design systems,
              portfolio sites, and digital products where visual craft and
              implementation need to move together.
            </p>
            <p>
              Share a little context, timeline, and what you are looking to make.
              I will get back to you as soon as I can.
            </p>
          </div>
        </div>

        <form
          className="contact-form"
          action={`mailto:${contactEmail}`}
          method="post"
          encType="text/plain"
        >
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Project type</span>
            <select name="project-type" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              {contactProjectTypes.map((projectType) => (
                <option key={projectType}>{projectType}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows={7}
              placeholder="Tell me about the project, timeline, and any useful links."
              required
            />
          </label>
          <button type="submit">Send enquiry</button>
        </form>
      </section>
    </div>
  );
}
