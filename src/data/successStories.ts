import capStoryThumb from "@/assets/success-stories/success-story-cap.jpg";
import flipStoryThumb from "@/assets/success-stories/success-story-flip.jpg";
import ejpStoryThumb from "@/assets/success-stories/success-story-ejp.jpg";
import trainAiThumb from "@/assets/success-stories/instagram/DXqrcQtiqTu.png.asset.json";
import regamosThumb from "@/assets/success-stories/instagram/DXJPfPcigxH.png.asset.json";
import yepThumb from "@/assets/success-stories/instagram/DW1V41xCiZc.png.asset.json";
import franklinThumb from "@/assets/success-stories/instagram/DWiouFAir60.png.asset.json";
import sponsorThumb from "@/assets/success-stories/instagram/DVkzEKbCpER.png.asset.json";
import impact2025Thumb from "@/assets/success-stories/instagram/DUzxg8hjZvN.png.asset.json";
import anniversaryThumb from "@/assets/success-stories/instagram/DUQCVHsisji.png.asset.json";
import nnanaadeThumb from "@/assets/success-stories/instagram/DSZ6pVbipdt.png.asset.json";
import farmilyThumb from "@/assets/success-stories/instagram/DSPd5x5igks.png.asset.json";

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
    pathway: "Foundation",
    name: "Sara Foundation Africa × Train AI",
    headline: "A 13-week blueprint from classroom to workforce",
    summary: "CAP × FLIP combines real-world project building and recruiter pitches through CAP Tech Hub with focused AI and technology support for women through FLIP.",
    evidence: "The programme announcement reports an 82% completion rate.",
    link: "https://www.instagram.com/reel/DXqrcQtiqTu/",
    linkLabel: "Watch on Instagram",
    pathwayHref: "/our-work",
    image: trainAiThumb.url,
  },
  {
    pathway: "Foundation",
    name: "Regamos Foundation Partnership",
    headline: "Expanding opportunity through partnership",
    summary: "Sara Foundation Africa announced a partnership with Regamos Foundation focused on expanding impact, creating opportunities and empowering more communities.",
    evidence: "Strategic partnership announcement shared by Sara Foundation Africa.",
    link: "https://www.instagram.com/p/DXJPfPcigxH/",
    linkLabel: "View on Instagram",
    pathwayHref: "/partnership",
    image: regamosThumb.url,
  },
  {
    pathway: "Foundation",
    name: "Youth Empowerment Program 2026",
    headline: "Future-ready AI and digital skills",
    summary: "The free three-day programme covers AI prompting, no-code automation and AI video editing, with practical learning designed to build productivity, creativity and confidence.",
    evidence: "Regamos Foundation Youth Empowerment Program, 20–22 April 2026.",
    link: "https://www.instagram.com/p/DW1V41xCiZc/",
    linkLabel: "View programme post",
    pathwayHref: "/our-work",
    image: yepThumb.url,
  },
  {
    pathway: "EJP",
    name: "Franklin Oladipo",
    headline: "Navigating career paths in 2026",
    summary: "Mobile developer and Storipod co-founder Franklin shared practical insights on breaking into technology and growing a career with greater direction.",
    evidence: "Sara Foundation Africa LinkedIn Live announcement, 4 April 2026.",
    link: "https://www.instagram.com/p/DWiouFAir60/",
    linkLabel: "View session post",
    pathwayHref: "/programs/gjp",
    image: franklinThumb.url,
  },
  {
    pathway: "CAP",
    name: "Sponsor an African Undergraduate",
    headline: "Opening access to practical technology skills",
    summary: "The campaign invites supporters to help African undergraduates access front-end and back-end development, UI/UX design, product management, business analysis and related skills.",
    evidence: "Sara Foundation Africa student-support campaign.",
    link: "https://www.instagram.com/p/DVkzEKbCpER/",
    linkLabel: "View campaign post",
    pathwayHref: "/donation",
    image: sponsorThumb.url,
  },
  {
    pathway: "Foundation",
    name: "Sara Foundation Africa 2025 Impact",
    headline: "A year of learning, inclusion and growth",
    summary: "The 2025 review highlights expansion to 35 universities, 763 learners supported through Learn–Build–Launch, the launch of FLIP Fellowship and recognition for leadership development.",
    evidence: "Figures and milestones stated in Sara Foundation Africa's 2025 impact post.",
    link: "https://www.instagram.com/p/DUzxg8hjZvN/",
    linkLabel: "View the impact post",
    pathwayHref: "/annual-reports",
    image: impact2025Thumb.url,
  },
  {
    pathway: "Foundation",
    name: "Sara Foundation Africa",
    headline: "Two years of expanding access across Africa",
    summary: "The second-anniversary update reflects on growth from one cohort in Nigeria to learners represented across 35 universities and eight African countries.",
    evidence: "Second-anniversary update published by Sara Foundation Africa.",
    link: "https://www.instagram.com/p/DUQCVHsisji/",
    linkLabel: "View anniversary post",
    pathwayHref: "/about",
    image: anniversaryThumb.url,
  },
  {
    pathway: "Foundation",
    name: "Nnanaade AI Partnership",
    headline: "Technology for community empowerment",
    summary: "Sara Foundation Africa and Nnanaade AI announced a collaboration focused on AI, education, youth initiatives, innovation and sustainable community growth.",
    evidence: "Strategic partnership announcement shared by Sara Foundation Africa.",
    link: "https://www.instagram.com/p/DSZ6pVbipdt/",
    linkLabel: "View on Instagram",
    pathwayHref: "/partnership",
    image: nnanaadeThumb.url,
  },
  {
    pathway: "Foundation",
    name: "Farmily Partnership",
    headline: "Connecting agriculture, technology and youth opportunity",
    summary: "Sara Foundation Africa and Farmily announced a partnership to support communities and create long-term opportunities across agriculture, technology and youth-focused programmes.",
    evidence: "Strategic partnership announcement shared by Sara Foundation Africa.",
    link: "https://www.instagram.com/p/DSPd5x5igks/",
    linkLabel: "View on Instagram",
    pathwayHref: "/partnership",
    image: farmilyThumb.url,
  },
];