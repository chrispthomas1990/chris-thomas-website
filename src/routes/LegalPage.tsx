import { legalContent, type LegalBlock, type LegalPageKey } from "../content/legal";
import { contactEmail } from "../content/site";
import "./LegalPage.css";

type LegalPageProps = {
  page: LegalPageKey;
};

function LegalContentBlock({ block }: { block: LegalBlock }) {
  if (block.type === "list") {
    return (
      <ul className="content-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "emailParagraph") {
    return (
      <p>
        {block.beforeEmail}{" "}
        <a className="text-link" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        {block.afterEmail}
      </p>
    );
  }

  return <p>{block.text}</p>;
}

export default function LegalPage({ page }: LegalPageProps) {
  const content = legalContent[page];

  return (
    <div className="page-stack">
      <section className="info-page legal-page">
        <div className="content-main">
          <p className="kicker">{content.kicker}</p>
          <h1>{content.title}</h1>
          <div className="info-content">
            {content.sections.map((section) => (
              <section className="content-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.blocks.map((block, index) => (
                  <LegalContentBlock block={block} key={`${section.heading}-${index}`} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
