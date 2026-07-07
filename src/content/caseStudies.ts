import leCreusetThumbnail from "../assets/case-studies/le-creuset-classic-kettle/le-creuset-classic-kettle-kitchen-set-a.mp4";
import softDrinkThumbnail from "../assets/case-studies/soft-drink-can/soft-drink-cans-animation.mp4";

export type CaseStudyMedia = {
  src: string;
  alt: string;
  className?: string;
  kind?: "image" | "video";
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  role: string;
  thumbnail: CaseStudyMedia;
};

const thumbnailMedia = {
  kettle: {
    src: leCreusetThumbnail,
    alt: "Animated render of the Le Creuset kettle in a kitchen scene.",
    kind: "video",
  },
  softDrink: {
    src: softDrinkThumbnail,
    alt: "Animated lineup of soft drink can renders.",
    kind: "video",
  },
} satisfies Record<string, CaseStudyMedia>;

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
} as const;

export const caseStudyMediaPanelCount = 8;

const homepageThumbnailOrder = [
  thumbnailMedia.kettle,
  thumbnailMedia.softDrink,
  thumbnailMedia.softDrink,
  thumbnailMedia.kettle,
  thumbnailMedia.kettle,
  thumbnailMedia.softDrink,
] as const;

export const caseStudies = Array.from({ length: 6 }, (_, index) => {
  const caseStudyNumber = index + 1;

  return {
    slug: `case-study-${caseStudyNumber}`,
    title: `Case Study ${caseStudyNumber}.`,
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design.",
    thumbnail: homepageThumbnailOrder[index],
  };
}) satisfies CaseStudy[];

export const homepageCaseStudies = caseStudies;
export type Project = CaseStudy;
