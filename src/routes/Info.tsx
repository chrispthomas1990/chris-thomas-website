import { pageContent } from "../content/pages";
import "./Info.css";

export default function Info() {
  const { info } = pageContent;

  return (
    <div className="page-stack">
      <section className="info-page">
        <div className="content-main">
          {info.sections.map((section) => (
            <section className="content-section" key={section.heading}>
              {section.kicker ? <p className="kicker">{section.kicker}</p> : null}
              {section.heading ? (
                section.kicker ? (
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
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
