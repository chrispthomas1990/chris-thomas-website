export type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export const pageContent = {
  home: {
    hero: {
      heading: "Distinctive brand, digital and campaign work built to make an impact.",
    },
    workAriaLabel: "Selected work",
  },
  info: {
    sections: [
      {
        heading:
          "I create distinctive brand, digital and campaign work built to make an impact.",
        paragraphs: [
          "I help turn ideas into clear, memorable creative that connects with the right audience and feels consistent wherever it appears.",
          "My work spans visual identities, digital experiences, campaigns, and the systems that bring them together—from early thinking and creative direction through to final delivery.",
        ],
      },
      {
        heading: "What I do.",
        paragraphs: [
          "I work with businesses, agencies, and creative teams on projects that need a strong idea, a distinctive visual approach, and thoughtful execution.",
        ],
        list: [
          "Brand identities and flexible visual systems.",
          "Websites and digital experiences.",
          "Campaign concepts, content, and launch materials.",
          "Creative direction, design support, and production.",
        ],
      },
      {
        heading: "How I work.",
        paragraphs: [
          "Projects begin by getting clear on the audience, the message, and what the work needs to achieve. From there, I develop a focused creative direction and carry it through with care across every relevant touchpoint.",
          "I can lead a project independently, collaborate with agencies and studios, or join an existing team wherever extra creative thinking and hands-on support are needed.",
        ],
      },
      {
        heading: "Availability.",
        paragraphs: [
          "Based in London and available for selected freelance projects, collaborations, and roles. I am especially interested in ambitious work where brand, digital, content, and campaign thinking need to feel connected.",
        ],
      },
    ] satisfies ContentSection[],
  },
  contact: {
    sections: [
      {
        heading: "Have a project in mind or a role to discuss? Let’s talk.",
        paragraphs: [
          "I am always interested in distinctive brand, digital, and campaign projects with a clear purpose and the ambition to make an impact.",
          "Share a little context, what you are hoping to create, and any timings you have in mind. I will get back to you as soon as I can.",
        ],
      },
      {
        heading: "Useful things to include.",
        list: [
          "The type of project and what needs to be delivered.",
          "Any existing brand, audience, content, or practical considerations.",
          "Your preferred timeline and whether there is a fixed launch date.",
          "Links to references, existing work, or anything else that provides useful context.",
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
        "Brand identity",
        "Digital project",
        "Campaign",
        "Creative support or consulting",
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
