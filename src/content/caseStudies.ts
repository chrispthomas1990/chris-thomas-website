const caseStudyAssetUrls = import.meta.glob(
  [
    "../assets/case-studies/**/*.{png,jpg,jpeg,webp}",
    "!../assets/case-studies/**/optimised/**",
  ],
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as Record<string, string>;

const caseStudyImageSrcSets = import.meta.glob(
  [
    "../assets/case-studies/**/*.webp",
    "!../assets/case-studies/**/optimised/**",
  ],
  {
    eager: true,
    import: "default",
    query: "?w=1280;1680;1920&format=webp&as=srcset",
  },
) as Record<string, string>;

const optimisedMediaUrls = import.meta.glob(
  "../assets/case-studies/**/optimised/*.{mp4,webm,webp}",
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

type CaseStudyMediaBase = {
  src: string;
  alt: string;
  aspectRatio?: string;
  layout?: "compact";
};

type CaseStudyVideoSources = {
  mp4: string;
  webm: string;
  poster: string;
};

type CaseStudyImageMedia = CaseStudyMediaBase & {
  kind: "image";
  srcSet?: string;
  videoSources?: never;
};

type CaseStudyVideoMedia = CaseStudyMediaBase & {
  kind: "video";
  srcSet?: never;
  videoSources: CaseStudyVideoSources;
};

export type CaseStudyMedia = CaseStudyImageMedia | CaseStudyVideoMedia;

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  contextHeading?: string;
  context: string;
  role: string;
  roleBody?: string;
  resultHeading?: string;
  resultBody?: string;
  thumbnail: CaseStudyMedia;
  media: CaseStudyMedia[];
};

function caseStudyMedia(
  path: string,
  alt: string,
  options: Pick<CaseStudyMedia, "aspectRatio" | "layout"> = {},
): CaseStudyMedia {
  const assetPath = `../assets/case-studies/${path}`;

  if (!path.endsWith(".mp4")) {
    return {
      src: caseStudyAsset(path),
      alt,
      aspectRatio: "16 / 9",
      ...options,
      kind: "image",
      srcSet: caseStudyImageSrcSets[assetPath],
    };
  }

  const videoStem = path.replace(/\.mp4$/, "");
  const optimisedVideoStem = videoStem.replace(
    /\/([^/]+)$/,
    "/optimised/$1",
  );
  const webm =
    optimisedMediaUrls[
      `../assets/case-studies/${optimisedVideoStem}-1280.webm`
    ];
  const mp4 =
    optimisedMediaUrls[
      `../assets/case-studies/${optimisedVideoStem}-1280.mp4`
    ];
  const poster =
    optimisedMediaUrls[
      `../assets/case-studies/${optimisedVideoStem}-poster-manual.webp`
    ];

  if (!webm || !mp4 || !poster) {
    throw new Error(`Optimised video assets or manual poster not found: ${path}`);
  }

  return {
    src: mp4,
    alt,
    aspectRatio: "16 / 9",
    ...options,
    kind: "video",
    videoSources: {
      webm,
      mp4,
      poster,
    },
  };
}

const leCreusetAsset = (file: string) => `le-creuset-classic-kettle/${file}`;
const softDrinkAsset = (file: string) => `soft-drink-can/${file}`;

const leCreusetMedia = [
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-a.webp"),
    "Render of the Le Creuset kettle in a kitchen scene.",
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-b.webp"),
    "Render of the Le Creuset kettle in a second kitchen scene.",
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-a.mp4"),
    "Animated render of the Le Creuset kettle in a kitchen scene.",
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-a-clay.webp"),
    "Clay render of the Le Creuset kettle kitchen scene.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-a-wire.webp"),
    "Wireframe render of the Le Creuset kettle kitchen scene.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-b-clay.webp"),
    "Clay render of the second Le Creuset kettle kitchen scene.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-b-wire.webp"),
    "Wireframe render of the second Le Creuset kettle kitchen scene.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-studio-set-c.mp4"),
    "Animated studio render of the Le Creuset kettle.",
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-studio-set-a.webp"),
    "Studio render of the Le Creuset kettle.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-studio-set-b.webp"),
    "Alternate studio render of the Le Creuset kettle.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-studio-set-c.webp"),
    "Third studio render of the Le Creuset kettle.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-studio-set-d.webp"),
    "Fourth studio render of the Le Creuset kettle.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    leCreusetAsset("le-creuset-classic-kettle-kitchen-set-b.mp4"),
    "Animated render of the Le Creuset kettle in a second kitchen scene.",
  ),
];

const softDrinkMedia = [
  caseStudyMedia(
    softDrinkAsset("soft-drink-cans-animation.mp4"),
    "Animated lineup of soft drink can renders.",
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-coca-cola.webp"),
    "Render of a Coca-Cola soft drink can.",
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-fanta-lemon.webp"),
    "Render of a Fanta lemon soft drink can.",
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-irn-bru.webp"),
    "Render of an Irn-Bru soft drink can.",
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-pepsi.webp"),
    "Render of a Pepsi soft drink can.",
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-geo-clay-1.webp"),
    "Clay geometry render of a soft drink can.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-geo-wire-1.webp"),
    "Wireframe geometry render of a soft drink can.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-geo-clay-2.webp"),
    "Second clay geometry render of a soft drink can.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-geo-wire-2.webp"),
    "Second wireframe geometry render of a soft drink can.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-geo-clay-3.webp"),
    "Third clay geometry render of a soft drink can.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-geo-wire-3.webp"),
    "Third wireframe geometry render of a soft drink can.",
    { layout: "compact" },
  ),
  caseStudyMedia(
    softDrinkAsset("soft-drink-can-sprite.webp"),
    "Render of a Sprite soft drink can.",
  ),
];

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

const defaultCaseStudyCopy = {
  summary:
    "A placeholder case study page ready for project imagery, notes, and outcomes.",
  contextHeading: "Project context.",
  context:
    "Use this space for project background, design process, constraints, and the story behind the work.",
  role: "Brand design.",
  roleBody:
    "Placeholder copy for responsibilities, collaborators, constraints, and outcomes.",
  resultHeading: "A concise case study area ready for final content.",
  resultBody:
    "Add process notes, metrics, client impact, and links to live work here. The bento layout will adapt from desktop to mobile.",
} satisfies Pick<
  CaseStudy,
  | "summary"
  | "contextHeading"
  | "context"
  | "role"
  | "roleBody"
  | "resultHeading"
  | "resultBody"
>;

export const caseStudies = [
  {
    slug: "case-study-1",
    title: "Case Study 1.",
    ...defaultCaseStudyCopy,
    thumbnail: leCreusetMedia[0],
    media: leCreusetMedia,
  },
  {
    slug: "case-study-2",
    title: "Case Study 2.",
    ...defaultCaseStudyCopy,
    thumbnail: softDrinkMedia[0],
    media: softDrinkMedia,
  },
  {
    slug: "case-study-3",
    title: "Case Study 3.",
    ...defaultCaseStudyCopy,
    thumbnail: softDrinkMedia[0],
    media: softDrinkMedia,
  },
  {
    slug: "case-study-4",
    title: "Case Study 4.",
    ...defaultCaseStudyCopy,
    thumbnail: leCreusetMedia[0],
    media: leCreusetMedia,
  },
  {
    slug: "case-study-5",
    title: "Case Study 5.",
    ...defaultCaseStudyCopy,
    thumbnail: leCreusetMedia[0],
    media: leCreusetMedia,
  },
  {
    slug: "case-study-6",
    title: "Case Study 6.",
    ...defaultCaseStudyCopy,
    thumbnail: softDrinkMedia[0],
    media: softDrinkMedia,
  },
] satisfies CaseStudy[];

export const homepageCaseStudies = caseStudies;
export type Project = CaseStudy;
