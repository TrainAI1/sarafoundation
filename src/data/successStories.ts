import capStoryThumb from "@/assets/success-stories/success-story-cap.jpg";
import flipStoryThumb from "@/assets/success-stories/success-story-flip.jpg";
import ejpStoryThumb from "@/assets/success-stories/success-story-ejp.jpg";
import capFinaleThumb from "@/assets/success-stories/linkedin/linkedin-1.jpg.asset.json";
import capShowcaseThumb from "@/assets/success-stories/linkedin/linkedin-2.jpg.asset.json";
import careerPathsThumb from "@/assets/success-stories/linkedin/linkedin-3.jpg.asset.json";
import harryZahaviThumb from "@/assets/success-stories/linkedin/linkedin-4.jpg.asset.json";
import flipGraduationThumb from "@/assets/success-stories/linkedin/linkedin-5.jpg.asset.json";
import scintillaShowcaseThumb from "@/assets/success-stories/linkedin/linkedin-6.jpg.asset.json";
import mercyMomahThumb from "@/assets/success-stories/linkedin/linkedin-7.jpg.asset.json";
import fisayoAdeyemiThumb from "@/assets/success-stories/linkedin/linkedin-8.jpg.asset.json";

export type StoryPathway = "CAP" | "FLIP" | "EJP" | "Foundation";

export type SuccessStory = {
  pathway: StoryPathway;
  name: string;
  headline: string;
  summary: string;
  evidence: string;
  link?: string;
  linkLabel: string;
  pathwayHref: string;
  image?: string;
};

export const fallbackStoryThumbs: Record<StoryPathway, string> = {
  CAP: capStoryThumb,
  FLIP: flipStoryThumb,
  EJP: ejpStoryThumb,
  Foundation: capStoryThumb,
};

export const successStories: SuccessStory[] = [
  {
    pathway: "CAP",
    name: "Akinlabi Isulameya",
    headline: "Building Campuslink with a project team",
    summary: "Akinlabi shares how hands-on teamwork while developing the Campuslink app shaped his product-management and technical learning at CAP Tech Hub.",
    evidence: "Learner project presented through CAP Tech Hub Cohort activity.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-cohortspotlight-activity-7462891845514219520-L8D4",
    linkLabel: "Watch project story",
    pathwayHref: "/programs/cap",
    image: "",
  },
  {
    pathway: "FLIP",
    name: "Odugbayi Olamide",
    headline: "Applying business intelligence to banking operations",
    summary: "For her FLIP capstone work, Olamide developed a BI-powered reconciliation performance tracker, applying business intelligence to day-to-day banking operations.",
    evidence: "One of five FLIP Fellowship Cohort 1 capstone projects.",
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-capstoneproject-fintech-activity-7399130514781233152-qsfI",
    linkLabel: "Read capstone story",
    pathwayHref: "/programs/flip",
    image: "",
  },
  {
    pathway: "EJP",
    name: "Eniola",
    headline: "Work-readiness learning through EJP",
    summary: "Eniola talks about the Government Jobs Placement initiative under EJP and how the work-readiness learning helped her build key skills for the workplace.",
    evidence: "Participant account of work-readiness learning. SFA does not guarantee employment.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-governmentjobplacementprogram-activity-7480888457888817152-IPj_",
    linkLabel: "Watch participant story",
    pathwayHref: "/programs/gjp",
    image: "",
  },
  {
    pathway: "CAP",
    name: "CAP Tech Hub Cohort 1",
    headline: "The Grand Finale: Demo Session & Graduation",
    summary: "Cohort 1 participants presented final projects through live demonstrations, followed by an industry panel and certificate presentation ceremony.",
    evidence: "CAP Tech Hub Cohort 1 Grand Finale, 18 April 2026.",
    link: "https://www.linkedin.com/posts/sara-foundation_cap-tech-hub-cohort-1-proudly-presents-the-activity-7451188125441228800-m91D",
    linkLabel: "Watch the grand finale",
    pathwayHref: "/programs/cap",
    image: capFinaleThumb.url,
  },
  {
    pathway: "CAP",
    name: "CAP Tech Hub Talent Showcase",
    headline: "Project teams pitch solutions built from scratch",
    summary: "CAP project groups pitched, demonstrated and defended web solutions, technology products and designs developed through intensive learning and collaboration.",
    evidence: "Live Talent Presentation Showcase, 23 May 2026.",
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-talentshowcase-techinnovation-activity-7463588941724536832-lYKz",
    linkLabel: "Watch the talent showcase",
    pathwayHref: "/programs/cap",
    image: capShowcaseThumb.url,
  },
  {
    pathway: "EJP",
    name: "Franklin Oladipo",
    headline: "Navigating career paths in 2026",
    summary: "Storipod co-founder Franklin Oladipo shared practical insights for people choosing their next step, finding career direction and staying relevant in a fast-changing world.",
    evidence: "Sara Foundation career session, 4 April 2026.",
    link: "https://www.linkedin.com/posts/sara-foundation_navigating-career-paths-in-2026-live-session-activity-7442479667288358912-Vbe2",
    linkLabel: "Watch the career session",
    pathwayHref: "/programs/gjp",
    image: careerPathsThumb.url,
  },
  {
    pathway: "EJP",
    name: "Harry Zahavi",
    headline: "Think like a pro: start out, stand out and thrive in tech",
    summary: "Software developer and founder Harry Zahavi discussed overcoming early career hurdles, combining technical depth with visionary thinking and building habits for long-term impact.",
    evidence: "Sara Foundation technology career session, December 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_techcareer-sarafoundation-harryzahavi-activity-7401871800164417536-9_0v",
    linkLabel: "Watch the career session",
    pathwayHref: "/programs/gjp",
    image: harryZahaviThumb.url,
  },
  {
    pathway: "FLIP",
    name: "FLIP Fellowship Cohort 1",
    headline: "Capstone presentations and graduation",
    summary: "FLIP Fellows completed months of leadership training, mentorship and hands-on project development before presenting projects addressing challenges in technology, business and social impact.",
    evidence: "FLIP Fellowship Capstone Presentation & Graduation, 31 October 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-womenintech-leadership-activity-7388585608623079424-zuPr",
    linkLabel: "Watch the graduation",
    pathwayHref: "/programs/flip",
    image: flipGraduationThumb.url,
  },
  {
    pathway: "CAP",
    name: "CAP Tech Hub with Scintilla Africa",
    headline: "Talent Presentation Showcase",
    summary: "CAP project groups demonstrated solutions from their six-month learning journey across front-end and back-end development, UI/UX, project management and business analysis.",
    evidence: "CAP Tech Hub Talent Presentation Showcase, 31 October 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-sarafoundation-scintillaafrica-activity-7388436773833678848-RaVv",
    linkLabel: "Watch the showcase",
    pathwayHref: "/programs/cap",
    image: scintillaShowcaseThumb.url,
  },
  {
    pathway: "FLIP",
    name: "Mercy Mosunmola Momah",
    headline: "Women in tech leadership: challenges and opportunities",
    summary: "Project coach, mentor and PMO consultant Mercy Mosunmola Momah shared insights on navigating leadership, overcoming barriers and opening opportunities for women in technology.",
    evidence: "FLIP Women in Tech Workshop panel session.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-womenintech-leadership-activity-7384999379415429120-cVtD",
    linkLabel: "Watch the workshop",
    pathwayHref: "/programs/flip",
    image: mercyMomahThumb.url,
  },
  {
    pathway: "FLIP",
    name: "Fisayo Adeyemi",
    headline: "Effective communication and personal branding in tech",
    summary: "Rayne Consults founder and lead coach Fisayo Adeyemi led a FLIP session on using communication and personal branding to strengthen influence, visibility and career growth in technology.",
    evidence: "FLIP Women in Tech Workshop, 10 October 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_flip-womenintech-sarafoundation-activity-7381988281527189506-W4cZ",
    linkLabel: "Watch the workshop",
    pathwayHref: "/programs/flip",
    image: fisayoAdeyemiThumb.url,
  },
];