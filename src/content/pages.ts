export type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export const pageContent = {
  home: {
    hero: {
      heading: "Brand identity, digital and campaign work with a clear point of view.",
    },
    workAriaLabel: "Selected work",
  },
  info: {
    sections: [
      {
        heading:
          "UI Designer/Front-End Engineer creating interfaces, launches, and visual systems.",
        paragraphs: [
          "I work across digital products, brand systems, and campaign sites, bringing visual direction together with careful front-end execution.",
          "My work sits between design and engineering: taking visual ideas, product goals, and messy real-world constraints, then turning them into fast, maintainable interfaces.",
        ],
      },
      {
        heading: "What I do.",
        paragraphs: [
          "I design and build websites, portfolios, campaign pages, product interfaces, and front-end systems for teams that care about detail.",
        ],
        list: [
          "Responsive website design and front-end development.",
          "Design system implementation and component libraries.",
          "Portfolio, editorial, and launch pages with strong visual direction.",
          "Interface audits, prototyping, and front-end consulting.",
        ],
      },
      {
        heading: "How I work.",
        paragraphs: [
          "Projects usually start with a clear definition of the audience, the content, and the actions the interface needs to support. From there, I focus on a sharp visual system, strong interaction details, and code that can keep moving after launch.",
          "I can work independently, partner with designers and studios, or join an existing product team for focused front-end delivery.",
        ],
      },
      {
        heading: "Availability.",
        paragraphs: [
          "Based in London and available for selected freelance projects, collaborations, and front-end roles. I am especially interested in work where brand, motion, content, and implementation need to feel connected.",
        ],
      },
    ] satisfies ContentSection[],
  },
  contact: {
    sections: [
      {
        heading: "Have a project in mind or a role to discuss? Send over the details.",
        paragraphs: [
          "I am interested in thoughtful front-end work, design systems, portfolio sites, and digital products where visual craft and implementation need to move together.",
          "Share a little context, timeline, and what you are looking to make. I will get back to you as soon as I can.",
        ],
      },
      {
        heading: "Useful things to include.",
        list: [
          "The type of project and what needs to be delivered.",
          "Any existing brand, design, content, or technical constraints.",
          "Your preferred timeline and whether there is a fixed launch date.",
          "Links to references, live sites, prototypes, or a current codebase.",
        ],
      },
    ] satisfies ContentSection[],
    form: {
      labels: {
        name: "Name",
        email: "Email",
        projectType: "Project type",
        message: "Message",
      },
      placeholders: {
        projectType: "Select one",
        message: "Tell me about the project, timeline, and any useful links.",
      },
      projectTypes: [
        "Front-end build",
        "Website design and build",
        "Design system",
        "Consulting",
        "Other",
      ],
      submitLabel: "Send enquiry",
      emailSubjectPrefix: "Project enquiry from",
      emailBodyLabels: {
        name: "Name",
        email: "Email",
        projectType: "Project type",
        message: "Message",
      },
      errors: {
        nameRequired: "Enter your name.",
        emailRequired: "Enter your email address.",
        emailInvalid: "Enter a valid email address.",
        projectTypeRequired: "Select a project type.",
        messageRequired: "Enter a message.",
        messageMinimumWords: "Enter at least {count} words.",
      },
      minimumMessageWordCount: 10,
    },
  },
} as const;
