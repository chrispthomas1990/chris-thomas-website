export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  role: string;
};

export const projectContent = {
  caseStudy: {
    navAriaLabel: "Case study navigation",
    previousAriaLabel: "Previous case study",
    homeAriaLabel: "Back to work",
    nextAriaLabel: "Next case study",
    gridAriaSuffix: "case study",
    overviewHeading: "Project context.",
    roleBody:
      "Placeholder copy for responsibilities, collaborators, constraints, and outcomes.",
    resultHeading: "A concise case study area ready for final content.",
    resultBody:
      "Add process notes, metrics, client impact, and links to live work here. The bento layout will adapt from desktop to mobile.",
  },
  projects: Array.from({ length: 6 }, (_, index) => {
    const caseStudyNumber = index + 1;

    return {
      slug: `case-study-${caseStudyNumber}`,
      title: `Case Study ${caseStudyNumber}.`,
      summary:
        "A placeholder case study page ready for project imagery, notes, and outcomes.",
      context:
        "Use this space for project background, design process, constraints, and the story behind the work.",
      role: "Brand design.",
    };
  }) satisfies Project[],
} as const;

export const projects = projectContent.projects;
