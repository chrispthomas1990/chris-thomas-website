export type Project = {
  slug: string;
  title: string;
  category: string;
  thumbnailOrientation: "landscape" | "portrait";
  summary: string;
  context: string;
  role: string;
};

export const projects: Project[] = Array.from({ length: 6 }, (_, index) => {
  const caseStudyNumber = index + 1;
  const portraitCaseStudies = new Set([2, 5]);

  return {
    slug: `case-study-${caseStudyNumber}`,
    title: `Case Study ${caseStudyNumber}`,
    category: "Selected Work",
    thumbnailOrientation: portraitCaseStudies.has(caseStudyNumber)
      ? "portrait"
      : "landscape",
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design",
  };
});
