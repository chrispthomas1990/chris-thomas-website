const caseStudyAssetUrls = import.meta.glob(
  "../assets/case-studies/**/*.{png,jpg,jpeg,webp,mp4}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as Record<string, string>;

function caseStudyAsset(path: string) {
  const src = caseStudyAssetUrls[`../assets/case-studies/${path}`];

  if (!src) {
    throw new Error(`Case study asset not found: ${path}`);
  }

  return src;
}

export type CaseStudyMedia = {
  src: string;
  alt: string;
  aspectRatio?: string;
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
  image1?: CaseStudyMedia;
  image2?: CaseStudyMedia;
};

const thumbnailMedia: Record<"kettle" | "softDrink", CaseStudyMedia> = {
  kettle: {
    src: caseStudyAsset(
      "le-creuset-classic-kettle/le-creuset-classic-kettle-kitchen-set-a.png",
    ),
    alt: "Render of the Le Creuset kettle in a kitchen scene.",
    aspectRatio: "16 / 9",
  },
  softDrink: {
    src: caseStudyAsset("soft-drink-can/soft-drink-cans-animation.mp4"),
    alt: "Animated lineup of soft drink can renders.",
    aspectRatio: "16 / 9",
    kind: "video",
  },
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
} as const;

export const caseStudyMediaPanelCount = 8;

export const caseStudies = [
  {
    slug: "case-study-1",
    title: "Case Study 1.",
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design.",
    thumbnail: thumbnailMedia.kettle,
    image1: thumbnailMedia.kettle,
    image2: thumbnailMedia.kettle,
  },
  {
    slug: "case-study-2",
    title: "Case Study 2.",
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design.",
    thumbnail: thumbnailMedia.softDrink,
    image1: thumbnailMedia.softDrink,
  },
  {
    slug: "case-study-3",
    title: "Case Study 3.",
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design.",
    thumbnail: thumbnailMedia.softDrink,
  },
  {
    slug: "case-study-4",
    title: "Case Study 4.",
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design.",
    thumbnail: thumbnailMedia.kettle,
  },
  {
    slug: "case-study-5",
    title: "Case Study 5.",
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design.",
    thumbnail: thumbnailMedia.kettle,
  },
  {
    slug: "case-study-6",
    title: "Case Study 6.",
    summary:
      "A placeholder case study page ready for project imagery, notes, and outcomes.",
    context:
      "Use this space for project background, design process, constraints, and the story behind the work.",
    role: "Brand design.",
    thumbnail: thumbnailMedia.softDrink,
  },
] satisfies CaseStudy[];

export const homepageCaseStudies = caseStudies;
export type Project = CaseStudy;
