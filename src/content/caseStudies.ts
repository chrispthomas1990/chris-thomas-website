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
type CaseStudyMediaList = [CaseStudyMedia, ...CaseStudyMedia[]];

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
  media: CaseStudyMediaList;
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

const placeholderAsset = (file: string) => file;
const testCaseStudyAsset1 = (file: string) => `case-study-1/${file}`;
const testCaseStudyAsset2 = (file: string) => `case-study-2/${file}`;
const testCaseStudyAsset3 = (file: string) => `case-study-3/${file}`;
const testCaseStudyAsset4 = (file: string) => `case-study-4/${file}`;
const testCaseStudyAsset5 = (file: string) => `case-study-5/${file}`;
const testCaseStudyAsset6 = (file: string) => `case-study-6/${file}`;

const testCaseStudyMedia1 = [
  caseStudyMedia(
    testCaseStudyAsset1("test-image-1.webp"),
    "Test image 1.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
] satisfies CaseStudyMediaList;

const testCaseStudyMedia2 = [
  caseStudyMedia(
    testCaseStudyAsset2("test-image-2.webp"),
    "Test image 2.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
] satisfies CaseStudyMediaList;

const testCaseStudyMedia3 = [
  caseStudyMedia(
    testCaseStudyAsset3("test-image-3.webp"),
    "Test image 3.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
] satisfies CaseStudyMediaList;

const testCaseStudyMedia4 = [
  caseStudyMedia(
    testCaseStudyAsset4("test-image-4.webp"),
    "Test image 4.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
] satisfies CaseStudyMediaList;

const testCaseStudyMedia5 = [
  caseStudyMedia(
    testCaseStudyAsset5("test-image-5.webp"),
    "Test image 5.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
] satisfies CaseStudyMediaList;

const testCaseStudyMedia6 = [
  caseStudyMedia(
    testCaseStudyAsset6("test-image-6.webp"),
    "Test image 6.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
  caseStudyMedia(
    placeholderAsset("placeholder-image.webp"),
    "Placeholder image.",
  ),
] satisfies CaseStudyMediaList;


export const projectContent = {
  caseStudy: {
    navAriaLabel: "Case study navigation",
    previousAriaLabel: "Previous case study",
    homeAriaLabel: "Back to work",
    nextAriaLabel: "Next case study",
    gridAriaSuffix: "case study",
    overviewHeading: "Project context.",
    roleBody:
      "Placeholder copy for responsibilities, collaborators, constraints and outcomes.",
    resultHeading: "A concise case study area ready for final content.",
    resultBody:
      "Add process notes, metrics, client impact and links to live work here. The bento layout will adapt from desktop to mobile.",
  },
} as const;

const defaultCaseStudyCopy = {
  summary:
    "A placeholder case study page ready for project imagery, notes and outcomes.",
  contextHeading: "Project context.",
  context:
    "Use this space for project background, design process, constraints and the story behind the work.",
  role: "Brand design.",
  roleBody:
    "Placeholder copy for responsibilities, collaborators, constraints and outcomes.",
  resultHeading: "A concise case study area ready for final content.",
  resultBody:
    "Add process notes, key metrics, client impact and links to the live work here.",
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
    thumbnail: testCaseStudyMedia1[0],
    media: testCaseStudyMedia1,
  },
  {
    slug: "case-study-2",
    title: "Case Study 2.",
    ...defaultCaseStudyCopy,
    thumbnail: testCaseStudyMedia2[0],
    media: testCaseStudyMedia2,
  },
  {
    slug: "case-study-3",
    title: "Case Study 3.",
    ...defaultCaseStudyCopy,
    thumbnail: testCaseStudyMedia3[0],
    media: testCaseStudyMedia3,
  },
  {
    slug: "case-study-4",
    title: "Case Study 4.",
    ...defaultCaseStudyCopy,
    thumbnail: testCaseStudyMedia4[0],
    media: testCaseStudyMedia4,
  },
  {
    slug: "case-study-5",
    title: "Case Study 5.",
    ...defaultCaseStudyCopy,
    thumbnail: testCaseStudyMedia5[0],
    media: testCaseStudyMedia5,
  },
  {
    slug: "case-study-6",
    title: "Case Study 6.",
    ...defaultCaseStudyCopy,
    thumbnail: testCaseStudyMedia6[0],
    media: testCaseStudyMedia6,
  },
] satisfies CaseStudy[];

export const homepageCaseStudies = caseStudies;
export type Project = CaseStudy;
