import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Save, ChevronDown, ChevronUp, Globe, Layout, BarChart3, Info, Phone, Handshake, Image, Users, MessageSquare, GraduationCap, Heart, Search, ExternalLink, Plus, Trash2, ListChecks, ArrowUp, ArrowDown } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { assetUrl } from "@/lib/assetUrl";
import eventGroupPhoto from "@/assets/events/DSC_3409.jpg.asset.json";
import eventStudentMic from "@/assets/events/DSC_3253.jpg.asset.json";
import eventSpeaker from "@/assets/events/DSC_3240.jpg.asset.json";
import capClassroom from "@/assets/events/DSC_3133-3.jpg.asset.json";
import capHappyCoder from "@/assets/cap-happy-coder.jpg";
import capWomenGroup from "@/assets/cap-women-group.jpg";
import capWomanBraids from "@/assets/cap-woman-braids.jpg";
import capWomanLaptop from "@/assets/cap-woman-laptop.jpg";
import youngDeveloper from "@/assets/young-developer.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import womanFounderPitch from "@/assets/woman-founder-pitch.jpg";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";
import communityWorkshop from "@/assets/community-workshop.jpg";
import womenCoworking from "@/assets/women-coworking.jpg";
import mentorshipSession from "@/assets/mentorship-session.jpg";
import partnershipMeeting from "@/assets/partnership-meeting.jpg";

type Page = Tables<"pages">;

interface SimpleField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
  placeholder: string;
  helperText?: string;
}

interface ListField {
  key: string;
  label: string;
  type: "list";
  itemLabel: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemFields: SimpleField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultItem: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultItems: Record<string, any>[];
}

type PageField = SimpleField | ListField;

function isListField(f: PageField): f is ListField {
  return f.type === "list";
}

function isSimpleField(f: PageField): f is SimpleField {
  return f.type !== "list";
}

export type PageCategory = "home" | "about" | "cap" | "flip" | "gjp" | "partnership" | "projects" | "other";

export interface PageDef {
  slug: string;
  title: string;
  category: PageCategory;
  categoryLabel: string;
  icon: typeof Layout;
  previewPath: string;
  fields: PageField[];
}

const defaultPages: PageDef[] = [
  {
    slug: "home-hero",
    category: "home",
    categoryLabel: "Home Page", title: "Hero Section & Headlines", icon: Layout, previewPath: "/", fields: [
    { key: "headline_1", label: "Headline (part 1)", type: "text", placeholder: "Expanding Access to Digital Learning." },
    { key: "headline_2", label: "Headline (part 2, italic accent)", type: "text", placeholder: "Building Inclusive Communities." },
    { key: "headline_3", label: "Headline (part 3)", type: "text", placeholder: "Supporting Tech Innovation." },
    { key: "subheadline", label: "Subheadline", type: "textarea", placeholder: "Sara Foundation Africa is an NGO widening access to digital inclusion, tech learning and innovation..." },
    { key: "cta_primary", label: "Primary Button (Donate link)", type: "text", placeholder: "Donate" },
    { key: "cta_secondary", label: "Secondary Button (Our Work link)", type: "text", placeholder: "Explore Our Work" },
    { key: "cta_tertiary", label: "Tertiary Button (Partnership link)", type: "text", placeholder: "Partner with Us" },
  ]},

  {
    slug: "home-hero-marquee",
    category: "home",
    categoryLabel: "Home Page", title: "Hero Marquee Photo Cards", icon: Image, previewPath: "/#hero", fields: [
    { key: "marquee_cards", label: "Marquee Cards", type: "list", itemLabel: "Card", itemFields: [
      { key: "src", label: "Image (leave blank to keep the current photo)", type: "image", placeholder: "" },
      { key: "name", label: "Name / Stat Number", type: "text", placeholder: "" },
      { key: "role", label: "Role / Caption", type: "text", placeholder: "" },
      { key: "tone", label: "Tone (light/dark/accent)", type: "text", placeholder: "light" },
    ], defaultItem: { src: "", name: "", role: "", tone: "light" }, defaultItems: [
      { src: capHappyCoder, name: "CAP Tech Hub", role: "Practical learning session", tone: "light" },
      { src: "", name: "57", role: "Women across FLIP fellowship & mentorship", tone: "accent" },
      { src: assetUrl(eventGroupPhoto), name: "CAP Tech Hub", role: "Cohort group photo", tone: "dark" },
      { src: youngDeveloper, name: "CAP learner", role: "Learner-led project build", tone: "light" },
      { src: "", name: "11", role: "African countries reached", tone: "accent" },
      { src: techEntrepreneurs, name: "Demo Day", role: "CAP Cohort 1 project showcase", tone: "dark" },
      { src: assetUrl(eventStudentMic), name: "CAP learner", role: "Q&A during a live session", tone: "light" },
      { src: capWomenGroup, name: "FLIP community", role: "Peer learning and mentoring", tone: "dark" },
      { src: womanFounderPitch, name: "Talent Showcase", role: "Presenting learner projects", tone: "light" },
      { src: assetUrl(eventSpeaker), name: "Expert session", role: "Speaker at a CAP Tech Hub event", tone: "dark" },
      { src: "", name: "763", role: "CAP learners fully funded", tone: "accent" },
      { src: capWomanBraids, name: "FLIP workshop", role: "Inclusive learning activity", tone: "light" },
    ]},
  ]},

  {
    slug: "home-mission",
    category: "home",
    categoryLabel: "Home Page", title: "Mission Section (Why We Exist)", icon: Globe, previewPath: "/#mission", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Why We Exist" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Access to digital education and lifelong learning is not equal" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Sara Foundation Africa is dedicated to..." },
  ]},

  {
    slug: "home-impact",
    category: "home",
    categoryLabel: "Home Page", title: "Impact Statistics Numbers", icon: BarChart3, previewPath: "/#impact", fields: [
    { key: "reach_value", label: "Community Reach (value)", type: "text", placeholder: "6,000+" },
    { key: "reach_desc", label: "Community Reach (description)", type: "textarea", placeholder: "People reached through our channels, events and community activity." },
    { key: "scholarships_value", label: "Scholarships Provided (value)", type: "text", placeholder: "1,600" },
    { key: "scholarships_desc", label: "Scholarships Provided (description)", type: "textarea", placeholder: "Fully funded and subsidised places provided across our pathways." },
    { key: "universities_value", label: "Universities Represented (value)", type: "text", placeholder: "35+" },
    { key: "universities_desc", label: "Universities Represented (description)", type: "textarea", placeholder: "Universities represented across our CAP learning activity." },
    { key: "countries_value", label: "African Countries (value)", type: "text", placeholder: "11" },
    { key: "countries_desc", label: "African Countries (description)", type: "textarea", placeholder: "Unique African countries reached across our pathways." },
  ]},

  {
    slug: "home-programs",
    category: "home",
    categoryLabel: "Home Page", title: "Pathways Cards (CAP, FLIP, EJP)", icon: Layout, previewPath: "/#programs", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Programs" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Programs That Transform..." },
    { key: "description", label: "Description", type: "textarea", placeholder: "From campus tech hubs to women's leadership..." },
    { key: "cap_title", label: "CAP Program Title", type: "text", placeholder: "Community Access & Participation Pathway" },
    { key: "cap_description", label: "CAP Description", type: "textarea", placeholder: "A 9-month rotational tech program..." },
    { key: "cap_image", label: "CAP Image", type: "image", placeholder: studentsLabImg },
    { key: "flip_title", label: "FLIP Program Title", type: "text", placeholder: "Female Learning & Inclusion Pathway" },
    { key: "flip_description", label: "FLIP Description", type: "textarea", placeholder: "Empowering women in tech through..." },
    { key: "flip_image", label: "FLIP Image", type: "image", placeholder: womenTechLeaders },
    { key: "ejp_title", label: "EJP Program Title", type: "text", placeholder: "Education Journey Pathway" },
    { key: "ejp_description", label: "EJP Description", type: "textarea", placeholder: "Supports continued learning through..." },
    { key: "ejp_image", label: "EJP Image", type: "image", placeholder: graduatesCelebration },
  ]},

  {
    slug: "home-sdg",
    category: "home",
    categoryLabel: "Home Page", title: "SDG Goals (SDG 4, 5, 8)", icon: Globe, previewPath: "/#sdg", fields: [
    { key: "sdg_goals", label: "SDG Goals", type: "list", itemLabel: "Goal", itemFields: [
      { key: "number", label: "SDG Number (4/5/8 — controls icon)", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
      { key: "color", label: "Background Color Class", type: "text", placeholder: "" },
    ], defaultItem: { number: "", title: "", description: "", color: "bg-primary" }, defaultItems: [
      { number: "4", title: "Quality Education", description: "To ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.", color: "bg-primary" },
      { number: "5", title: "Gender Equality", description: "To empower and uplift women entrepreneurs and professionals in technology, fostering a supportive community.", color: "bg-[hsl(240,80%,50%)]" },
      { number: "8", title: "Decent Work & Economic Growth", description: "To foster a vibrant and collaborative tech community within African universities, driving innovation.", color: "bg-primary" },
    ]},
  ]},

  {
    slug: "home-success-stories",
    category: "home",
    categoryLabel: "Home Page", title: "Featured Success Stories", icon: MessageSquare, previewPath: "/#success-stories", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Featured Stories" },
    { key: "headline_pre", label: "Headline (before accent)", type: "text", placeholder: "Real Learners." },
    { key: "headline_accent", label: "Headline (accent)", type: "text", placeholder: "Real Journeys." },
    { key: "description", label: "Description", type: "textarea", placeholder: "Behind every number is a learner, mentor or community member moving forward." },
    { key: "stories", label: "Stories", type: "list", itemLabel: "Story", itemFields: [
      { key: "pathway", label: "Pathway (CAP/FLIP/EJP)", type: "text", placeholder: "" },
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "headline", label: "Headline", type: "text", placeholder: "" },
      { key: "summary", label: "Summary", type: "textarea", placeholder: "" },
      { key: "evidence", label: "Evidence", type: "text", placeholder: "" },
      { key: "link", label: "Link URL (optional)", type: "text", placeholder: "" },
      { key: "linkLabel", label: "Link Label", type: "text", placeholder: "" },
      { key: "pathwayHref", label: "Pathway Page URL", type: "text", placeholder: "" },
    ], defaultItem: { pathway: "CAP", name: "", headline: "", summary: "", evidence: "", link: "", linkLabel: "", pathwayHref: "" }, defaultItems: [
      { pathway: "CAP", name: "Akinlabi Isulameya", headline: "Building Campuslink with a project team", summary: "Akinlabi shares how hands-on teamwork while developing the Campuslink app shaped his learning at CAP Tech Hub.", evidence: "Learner project presented through CAP Tech Hub Cohort activity.", link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-cohortspotlight-activity-7462891845514219520-L8D4", linkLabel: "Watch project story", pathwayHref: "/programs/cap" },
      { pathway: "FLIP", name: "Odugbayi Olamide", headline: "Applying business intelligence to banking operations", summary: "For her FLIP capstone work, Olamide developed a BI-powered reconciliation performance tracker.", evidence: "One of five FLIP Fellowship Cohort 1 capstone projects.", link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-capstoneproject-fintech-activity-7399130514781233152-qsfI", linkLabel: "Read capstone story", pathwayHref: "/programs/flip" },
      { pathway: "EJP", name: "Eniola", headline: "Work-readiness learning through EJP", summary: "Eniola talks about the Government Jobs Placement initiative under EJP and how it helped her build key workplace skills.", evidence: "Participant account of work-readiness learning. SFA does not guarantee employment.", link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-governmentjobplacementprogram-activity-7480888457888817152-IPj_", linkLabel: "Watch participant story", pathwayHref: "/programs/gjp" },
    ]},
  ]},

  {
    slug: "home-partners-universities",
    category: "home",
    categoryLabel: "Home Page", title: "University Partners Carousel", icon: GraduationCap, previewPath: "/#partners", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our University Partners" },
    { key: "headline_pre", label: "Headline (before accent)", type: "text", placeholder: "Present in" },
    { key: "headline_accent", label: "Headline (accent)", type: "text", placeholder: "35 African Universities" },
    { key: "description", label: "Description", type: "textarea", placeholder: "We have established CAP Tech Hubs across 8 African countries, supporting young people on campus." },
    { key: "countries_line", label: "Countries Line (footer text)", type: "text", placeholder: "Across Nigeria 🇳🇬 · Ghana 🇬🇭 · Kenya 🇰🇪 · South Africa 🇿🇦 · Uganda 🇺🇬 · Zambia 🇿🇲 · Togo 🇹🇬" },
    { key: "universities", label: "Universities", type: "list", itemLabel: "University", itemFields: [
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "country", label: "Country", type: "text", placeholder: "" },
      { key: "flag", label: "Flag Emoji", type: "text", placeholder: "" },
    ], defaultItem: { name: "", country: "", flag: "" }, defaultItems: [
      { name: "University of Ilorin", country: "Nigeria", flag: "🇳🇬" }, { name: "University of Lagos", country: "Nigeria", flag: "🇳🇬" },
      { name: "University of Abuja", country: "Nigeria", flag: "🇳🇬" }, { name: "University of Ibadan", country: "Nigeria", flag: "🇳🇬" },
      { name: "Federal University of Technology, Akure", country: "Nigeria", flag: "🇳🇬" }, { name: "Ajayi Crowther University", country: "Nigeria", flag: "🇳🇬" },
      { name: "Ahmadu Bello University, Zaria", country: "Nigeria", flag: "🇳🇬" }, { name: "Adeniran Ogunsanya College of Education", country: "Nigeria", flag: "🇳🇬" },
      { name: "American Caregiving University", country: "South Africa", flag: "🇿🇦" }, { name: "Babcock University", country: "Nigeria", flag: "🇳🇬" },
      { name: "Benue State University", country: "Nigeria", flag: "🇳🇬" }, { name: "Cavendish University", country: "Zambia", flag: "🇿🇲" },
      { name: "Evans University", country: "Uganda", flag: "🇺🇬" }, { name: "Federal Polytechnic Ilaro", country: "Nigeria", flag: "🇳🇬" },
      { name: "Federal University Lokoja", country: "Nigeria", flag: "🇳🇬" }, { name: "Federal University of Oye Ekiti", country: "Nigeria", flag: "🇳🇬" },
      { name: "Gateway Polytechnic Saapade", country: "Nigeria", flag: "🇳🇬" }, { name: "Kumasi Technical University", country: "Ghana", flag: "🇬🇭" },
      { name: "Ladoke Akintola University of Technology", country: "Nigeria", flag: "🇳🇬" }, { name: "Lagos State University", country: "Nigeria", flag: "🇳🇬" },
      { name: "Makerere University", country: "Uganda", flag: "🇺🇬" }, { name: "Micheal Okpara University of Agriculture", country: "Nigeria", flag: "🇳🇬" },
      { name: "Modibbo Adama University, Yola", country: "Nigeria", flag: "🇳🇬" }, { name: "Mutesal Royal University", country: "Uganda", flag: "🇺🇬" },
      { name: "Narok University", country: "Kenya", flag: "🇰🇪" }, { name: "National Open University of Nigeria", country: "Nigeria", flag: "🇳🇬" },
      { name: "Obafemi Awolowo University", country: "Nigeria", flag: "🇳🇬" }, { name: "Polytechnic of Ibadan", country: "Nigeria", flag: "🇳🇬" },
      { name: "Global Wealth University", country: "Togo", flag: "🇹🇬" }, { name: "University of Maiduguri", country: "Nigeria", flag: "🇳🇬" },
      { name: "University of Nigeria, Nsukka", country: "Nigeria", flag: "🇳🇬" }, { name: "Asteven Energy Institute", country: "Nigeria", flag: "🇳🇬" },
    ]},
  ]},

  {
    slug: "home-testimonials",
    category: "home",
    categoryLabel: "Home Page", title: "Community Testimonials", icon: MessageSquare, previewPath: "/#testimonials", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Success Stories" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Hear from Our Community" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Real stories from real people..." },
  ]},

  {
    slug: "home-donation",
    category: "home",
    categoryLabel: "Home Page", title: "Donation Methods & Bank Details", icon: Handshake, previewPath: "/#donation", fields: [
    { key: "donation_methods", label: "Donation Methods", type: "list", itemLabel: "Method", itemFields: [
      { key: "id", label: "ID (bank/usdt/eth/gofundme — controls icon)", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "provider", label: "Provider", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "text", placeholder: "" },
      { key: "action", label: "Button Label", type: "text", placeholder: "" },
      { key: "copyValue", label: "Copy Value (leave blank if using Link)", type: "text", placeholder: "" },
      { key: "link", label: "External Link (leave blank if using Copy Value)", type: "text", placeholder: "" },
      { key: "gradient", label: "Background Class", type: "text", placeholder: "" },
    ], defaultItem: { id: "", title: "", provider: "", description: "", action: "", copyValue: "", link: "", gradient: "bg-primary" }, defaultItems: [
      { id: "bank", title: "Bank Transfer (Naira)", provider: "MoniePoint", description: "Account Number: 9076 664049", action: "Copy Account", copyValue: "9076664049", link: "", gradient: "bg-primary" },
      { id: "usdt", title: "USDT", provider: "TRC20", description: "TMdq8t9WYCvgJA9aftXDzA3XUNX9V4MMG6", action: "Copy Address", copyValue: "TMdq8t9WYCvgJA9aftXDzA3XUNX9V4MMG6", link: "", gradient: "bg-accent" },
      { id: "eth", title: "Ethereum", provider: "BEP20", description: "0xe7dae2ef9740beacde6d9f584f67ecf2b8f396365", action: "Copy Address", copyValue: "0xe7dae2ef9740beacde6d9f584f67ecf2b8f396365", link: "", gradient: "bg-primary" },
      { id: "gofundme", title: "Crowdfunding", provider: "GoFundMe", description: "Support us through our GoFundMe campaign", action: "Donate on GoFundMe", copyValue: "", link: "https://gofund.me/9559a00e", gradient: "bg-[hsl(var(--success))]" },
    ]},
  ]},

  {
    slug: "home-impact-reports",
    category: "home",
    categoryLabel: "Home Page", title: "Impact Reports Download Links", icon: BarChart3, previewPath: "/#impact-reports", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Annual Impact Reports" },
    { key: "headline_pre", label: "Headline (before accent)", type: "text", placeholder: "Read our" },
    { key: "headline_accent", label: "Headline (accent)", type: "text", placeholder: "impact reports" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Our annual reports set out what we delivered, who benefited and what we learned." },
    { key: "reports", label: "Reports", type: "list", itemLabel: "Report", itemFields: [
      { key: "year", label: "Year", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "summary", label: "Summary", type: "textarea", placeholder: "" },
      { key: "href", label: "Link URL", type: "text", placeholder: "" },
    ], defaultItem: { year: "", title: "", summary: "", href: "" }, defaultItems: [
      { year: "2025", title: "2025 Annual Impact Report", summary: "763 CAP learners given fully funded access across Cohorts 1 and 2, the launch of the FLIP Fellowship and our first FLIP and CAP conferences.", href: "https://drive.google.com/file/d/1Ex55tpVH_RPB0VJygsUyw9Hp74RyPKR_/view?usp=drivesdk" },
      { year: "2024", title: "2024 Annual Impact Report", summary: "Our first full year: the inaugural CAP cohort, the start of our knowledge and expert sessions, and the leadership, governance and operating model behind the work.", href: "https://drive.google.com/file/d/1DjVw-vTf6ugcp75rFVCUCKM4zictzDKN/view?usp=drivesdk" },
    ]},
    { key: "image_caption_title", label: "Image Caption Title", type: "text", placeholder: "CAP learners, Class of 2025" },
    { key: "image_caption_subtitle", label: "Image Caption Subtitle", type: "text", placeholder: "Celebrating our second cohort" },
  ]},

  {
    slug: "home-faq",
    category: "home",
    categoryLabel: "Home Page", title: "Frequently Asked Questions (FAQ)", icon: Info, previewPath: "/#faq", fields: [
    { key: "headline", label: "Section Headline", type: "text", placeholder: "Frequently Asked Questions" },
    { key: "description", label: "Section Description", type: "textarea", placeholder: "Have questions? We've got answers..." },
  ]},

  {
    slug: "home-work-with-us",
    category: "home",
    categoryLabel: "Home Page", title: "Work With Us CTA", icon: Heart, previewPath: "/#work-with-us", fields: [
    { key: "badge", label: "Small Label", type: "text", placeholder: "Work with Us" },
    { key: "headline", label: "Headline", type: "textarea", placeholder: "Empowering people through tech learning, inclusion and opportunity to build stronger communities." },
    { key: "subheadline", label: "Subheadline", type: "text", placeholder: "Join Us, Partner with Us, and Donate for Africa's Future." },
  ]},

  {
    slug: "home-cta",
    category: "home",
    categoryLabel: "Home Page", title: "Bottom Call To Action (CTA)", icon: Layout, previewPath: "/#cta", fields: [
    { key: "headline", label: "CTA Headline", type: "text", placeholder: "Ready to Make a Difference?" },
    { key: "description", label: "CTA Description", type: "textarea", placeholder: "Whether you're a student looking to start..." },
    { key: "cta_primary", label: "Primary Button Text", type: "text", placeholder: "Join as a Student" },
    { key: "cta_secondary", label: "Secondary Button Text", type: "text", placeholder: "Become a Partner" },
    { key: "bg_image", label: "Background Image (Optional)", type: "image", placeholder: "", helperText: "Optional: Section currently uses the default solid primary brand background. Upload a photo or paste a URL if you want a custom background image." },
  ]},

  {
    slug: "home-newsletter",
    category: "home",
    categoryLabel: "Home Page", title: "Newsletter Subscription Section", icon: MessageSquare, previewPath: "/#newsletter", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Stay Updated" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Subscribe to get the latest news..." },
  ]},

  {
    slug: "about-hero",
    category: "about",
    categoryLabel: "About Us", title: "Hero Section & Header", icon: Info, previewPath: "/about", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Transforming Africa's Tech Landscape" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Sara Foundation is a Non-Profit Organization..." },
    { key: "hero_image", label: "Hero Background Image (Optional)", type: "image", placeholder: "", helperText: "Optional: The about page hero currently displays the solid primary brand theme. Upload an image to overlay." },
  ]},

  {
    slug: "about-story",
    category: "about",
    categoryLabel: "About Us", title: "Our Story, Mission & Vision", icon: Info, previewPath: "/about", fields: [
    { key: "paragraph1", label: "Paragraph 1", type: "textarea", placeholder: "Sara Foundation Africa was born from..." },
    { key: "paragraph2", label: "Paragraph 2", type: "textarea", placeholder: "We promote Sustainable Development Goals..." },
    { key: "paragraph3", label: "Paragraph 3", type: "textarea", placeholder: "Today, we operate across 7 African countries..." },
    { key: "mission_text", label: "Mission Statement", type: "textarea", placeholder: "To foster Diversity, Equity, and Inclusion..." },
    { key: "vision_text", label: "Vision Statement", type: "textarea", placeholder: "An Africa where every young person..." },
    { key: "story_image1", label: "Story Image 1", type: "image", placeholder: communityWorkshop },
    { key: "story_image2", label: "Story Image 2", type: "image", placeholder: techEntrepreneurs },
  ]},

  {
    slug: "about-team",
    category: "about",
    categoryLabel: "About Us", title: "Team Section Header", icon: Users, previewPath: "/about", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Team" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Meet the People Behind..." },
    { key: "description", label: "Description", type: "textarea", placeholder: "Our passionate team is dedicated..." },
  ]},

  {
    slug: "programs-cap",
    category: "cap",
    categoryLabel: "CAP Program", title: "Overview & Hero Headline", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Community Access & Participation Pathway" },
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Expanding Access. Building Confidence. Supporting Participation." },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "CAP helps young people from underserved and underrepresented communities access structured digital education, mentoring and practical learning." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: assetUrl(capClassroom) },
    { key: "cta_primary_text", label: "Primary Button Text", type: "text", placeholder: "Apply to CAP" },
    { key: "cta_secondary_text", label: "Secondary Button Text", type: "text", placeholder: "See our impact evidence" },
    { key: "stats", label: "Hero Stats", type: "list", itemLabel: "Stat", itemFields: [
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
    ], defaultItem: { value: "", label: "" }, defaultItems: [
      { value: "763", label: "CAP learners, fully funded" },
      { value: "35+", label: "Universities represented" },
      { value: "8", label: "African countries (CAP)" },
    ]},
    { key: "stats_caption", label: "Stats Caption", type: "text", placeholder: "Figures cover CAP Cohorts 1 and 2 (2024–2025)." },
  ]},

  {
    slug: "cap-benefits",
    category: "cap",
    categoryLabel: "CAP Program", title: "Key Benefits & Outcomes", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Benefits to Participants" },
    { key: "headline", label: "Headline", type: "text", placeholder: "What CAP provides" },
    { key: "benefits", label: "Benefits", type: "list", itemLabel: "Benefit", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Structured digital learning", description: "Sessions and resources that build digital literacy and practical skills." },
      { title: "Mentoring and guided project support", description: "Mentors supporting learners through project work and reflection." },
      { title: "Workshops and expert sessions", description: "Practitioners sharing knowledge and current practice with learners." },
      { title: "Demo days and talent showcases", description: "Opportunities to present learning to peers and invited guests." },
      { title: "Practical activities", description: "Applied exercises that turn taught content into working knowledge." },
      { title: "Peer learning", description: "Learning alongside others facing similar barriers and questions." },
      { title: "Presentations", description: "Practice explaining work clearly to an audience." },
      { title: "Knowledge-sharing", description: "Learners passing on what they know within the community." },
      { title: "Community participation", description: "Learner-led projects and contribution back to local communities." },
    ]},
  ]},

  {
    slug: "cap-tracks",
    category: "cap",
    categoryLabel: "CAP Program", title: "Learning Tracks", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Three Tracks" },
    { key: "headline_main", label: "Headline (main)", type: "text", placeholder: "Choose Your Path." },
    { key: "headline_highlight", label: "Headline (highlighted)", type: "text", placeholder: "Build Your Future." },
    { key: "description", label: "Description", type: "textarea", placeholder: "All tracks converge in the BUILD phase, collaborating as one project team to build a real product." },
    { key: "tracks", label: "Tracks", type: "list", itemLabel: "Track", itemFields: [
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "specializations_text", label: "Specializations (one per line)", type: "textarea", placeholder: "" },
      { key: "outcome", label: "Outcome", type: "text", placeholder: "" },
    ], defaultItem: { name: "", specializations_text: "", outcome: "" }, defaultItems: [
      { name: "Code Track", specializations_text: "Full-Stack Development\nFront-End Development\nBack-End Development", outcome: "Job-ready software developer with a real project portfolio" },
      { name: "No-Code Track", specializations_text: "Product Management\nProduct Marketing\nData Analysis\nUI/UX Design\nCybersecurity", outcome: "Industry-ready exposure with hands-on case studies and live projects" },
      { name: "Tech Innovation Track", specializations_text: "Innovators Program", outcome: "Develop your innovation while you learn, with mentor support" },
    ]},
  ]},

  {
    slug: "cap-solutions",
    category: "cap",
    categoryLabel: "CAP Program", title: "Solutions & Vision", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "About CAP" },
    { key: "headline_main", label: "Headline (main)", type: "text", placeholder: "What is the" },
    { key: "headline_highlight", label: "Headline (highlighted)", type: "text", placeholder: "Community Access & Participation Pathway?" },
    { key: "description", label: "Description", type: "textarea", placeholder: "CAP is a 6-week intensive, learner-led tech hub programme delivered with African universities." },
    { key: "image", label: "Image", type: "image", placeholder: capWomanLaptop },
    { key: "features", label: "Feature List", type: "list", itemLabel: "Feature", itemFields: [
      { key: "text", label: "Text", type: "text", placeholder: "" },
    ], defaultItem: { text: "" }, defaultItems: [
      { text: "Structured Learn → Build → Launch curriculum" }, { text: "3 specialist tracks: Code, No-Code, Tech-preneurship" },
      { text: "Industry-expert-led weekly sessions" }, { text: "Real startup projects solving African problems" },
      { text: "Internship pathways on completion" }, { text: "Part of a network across 35 universities in 8 African countries" },
    ]},
    { key: "vision_text", label: "Vision", type: "textarea", placeholder: "Empowering young people across Africa through technology to drive innovation." },
    { key: "mission_text", label: "Mission", type: "textarea", placeholder: "Provide a platform for young people across Africa to explore, learn and apply technology." },
    { key: "values_text", label: "Core Values", type: "text", placeholder: "Innovation · Collaboration · Diversity, Equity & Inclusion · Do Well and Do Good" },
  ]},

  {
    slug: "cap-problems",
    category: "cap",
    categoryLabel: "CAP Program", title: "Challenges & Problems Solved", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "The Challenge" },
    { key: "headline_main", label: "Headline (main)", type: "text", placeholder: "Africa Tech Learning is" },
    { key: "headline_highlight", label: "Headline (highlighted)", type: "text", placeholder: "Broken" },
    { key: "description", label: "Description", type: "textarea", placeholder: "We see a critical gap in the African Education Sector and Tech Ecosystem." },
    { key: "problems", label: "Problems", type: "list", itemLabel: "Problem", itemFields: [
      { key: "stat", label: "Stat", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { stat: "", title: "", description: "" }, defaultItems: [
      { stat: "47%", title: "Limited ICT Programs", description: "African universities do not offer ICT-related programmes." },
      { stat: "70%", title: "Outdated Curriculums", description: "African universities offer IT programmes based on outdated curriculums." },
      { stat: "4%", title: "Low Tech Skills", description: "In Sub-Saharan Africa, only 4% of university graduates possess tech-related skills." },
    ]},
    { key: "banner_text", label: "Banner Text", type: "text", placeholder: "23 Million — the number of additional tech workers the continent needs by 2025" },
  ]},

  {
    slug: "cap-phases",
    category: "cap",
    categoryLabel: "CAP Program", title: "3-Phase Delivery Structure", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Program Structure" },
    { key: "headline_main", label: "Headline (main)", type: "text", placeholder: "Learn." },
    { key: "headline_highlight", label: "Headline (highlighted)", type: "text", placeholder: "Build. Launch." },
    { key: "description", label: "Description", type: "textarea", placeholder: "A full 6-week CAP experience built on an 80/20 balance of practice to taught learning." },
    { key: "program_label", label: "Program Label", type: "text", placeholder: "CAP Program" },
    { key: "program_title", label: "Program Title", type: "text", placeholder: "6-Week Program for CAP" },
    { key: "program_subtitle", label: "Program Subtitle", type: "text", placeholder: "Community Access & Participation Pathway — learn, build, and launch." },
    { key: "program_total_duration", label: "Total Duration", type: "text", placeholder: "6 Weeks" },
    { key: "phases", label: "Phases", type: "list", itemLabel: "Phase", itemFields: [
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "number", label: "Number", type: "text", placeholder: "" },
      { key: "duration", label: "Duration", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
      { key: "outcomes_text", label: "Outcomes (one per line)", type: "textarea", placeholder: "" },
    ], defaultItem: { name: "", number: "", duration: "", description: "", outcomes_text: "" }, defaultItems: [
      { name: "Exclusive Learning", number: "01", duration: "2 Weeks", description: "Immersive expert-led sessions across coding, no-code, product management, product marketing, cybersecurity, data, UI/UX and tech innovation.", outcomes_text: "Industry-expert sessions\nAI-powered curriculum\nPractical frameworks\nCommunity & peer learning" },
      { name: "Build While Learning", number: "02", duration: "4 Weeks", description: "Apply skills in real time — participants collaborate as a team, working on real African problems through mentored sprints.", outcomes_text: "Cross-track startup simulation\nReal-life project exposure\nIndustry mentor oversight\nPortfolio-ready projects" },
      { name: "Launch", number: "03", duration: "1 Week", description: "Learners present their work and are referred to suitable further learning or experience opportunities where available.", outcomes_text: "Referrals to further learning and experience opportunities\nCertificate of completion and alumni community access\nCAP Talent Showcase\nContinued mentoring and peer support" },
    ]},
  ]},

  {
    slug: "cap-for-students",
    category: "cap",
    categoryLabel: "CAP Program", title: "For Students & Young People", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "For Young People" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Everything you need to build practical tech skills and keep learning." },
    { key: "image", label: "Sidebar Image", type: "image", placeholder: capHappyCoder },
    { key: "quote_text", label: "Quote Text", type: "textarea", placeholder: "CAP has given me a solid foundation in both front-end and back-end development." },
    { key: "quote_author", label: "Quote Author", type: "text", placeholder: "— Taiwo, FUOYE, Nigeria" },
    { key: "benefits", label: "Benefits", type: "list", itemLabel: "Benefit", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Real-World Skills", description: "Coding, product management, UI/UX, business analysis grounded in hands-on practice." },
      { title: "Industry Mentorship", description: "Weekly sessions with experienced practitioners who guide each participant's learning journey." },
      { title: "Referrals to Further Learning & Experience", description: "Some CAP participants have continued through internships and roles with organisations in our network. Employment is not guaranteed." },
      { title: "Build a Real Project", description: "Launch phase teams have built working projects such as ArtifyPro and Campuslink." },
      { title: "Pan-African Network", description: "Join a community spanning 35 universities across the 8 African countries CAP reaches." },
      { title: "Free Learning Resources", description: "Access course materials, certifications, and partner discounts from ALX Africa and more." },
    ]},
  ]},

  {
    slug: "cap-for-schools",
    category: "cap",
    categoryLabel: "CAP Program", title: "For Universities & Schools", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "For School Associations" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Partner with CAP to become a hub for Africa's next wave of tech innovators." },
    { key: "image", label: "Sidebar Image", type: "image", placeholder: capWomenGroup },
    { key: "quote_text", label: "Quote Text", type: "textarea", placeholder: "These weekly expert sessions have made my experience with CAP excellent so far." },
    { key: "quote_author", label: "Quote Author", type: "text", placeholder: "— Ridwan, 300 level, University of Lagos CAP Tech Hub member" },
    { key: "benefits", label: "Benefits", type: "list", itemLabel: "Benefit", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Best Way to Learn and Practice Tech Skills", description: "Our program's practical exposure makes CAP Alumni stand out, positioning your institution as a leading centre of tech innovation." },
      { title: "Community Engagement & Retention", description: "CAP-run hubs create vibrant multi-university learning communities across 8 African countries and 35 universities." },
      { title: "Unlock Scholarships", description: "Partnering associations unlock scholarships and subsidised places for their student members." },
      { title: "Continued Learning Journeys", description: "CAP participants have gone on to internships, further learning and project work with organisations in our network." },
      { title: "Pan-African Visibility", description: "Join a network of 35 universities across 8 African countries, within a foundation working across 11 countries." },
      { title: "Award-Winning Programme", description: "Sara Foundation is a 2025/26 London & South East England Prestige Award winner in Leadership Development." },
    ]},
  ]},

  {
    slug: "cap-recognition",
    category: "cap",
    categoryLabel: "CAP Program", title: "Recognition & Prestige Awards", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Recognition & Partners" },
    { key: "headline_main", label: "Headline (main)", type: "text", placeholder: "Trusted. Recognised." },
    { key: "headline_highlight", label: "Headline (highlighted)", type: "text", placeholder: "Growing." },
    { key: "award_title", label: "Award Title", type: "text", placeholder: "Prestige Award Winner 2025/26" },
    { key: "award_category", label: "Award Category", type: "text", placeholder: "London & South East England — Leadership Development Category" },
    { key: "award_quote", label: "Award Quote", type: "textarea", placeholder: "This recognition honours organisations making meaningful impact within their communities." },
    { key: "partners_title", label: "Partners Title", type: "text", placeholder: "Strategic Partners" },
    { key: "partners", label: "Partners", type: "list", itemLabel: "Partner", itemFields: [
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "role", label: "Role", type: "text", placeholder: "" },
    ], defaultItem: { name: "", role: "" }, defaultItems: [
      { name: "Scintilla Africa", role: "Industry exposure and experiential learning opportunities" },
      { name: "Farmily", role: "Host organisation for continued learning journeys" },
      { name: "Train AI", role: "EdTech platform supporting learners' journeys" },
      { name: "Nanaade AI", role: "Work-readiness education support" },
    ]},
    { key: "footer_text", label: "Footer Text", type: "textarea", placeholder: "Sara Foundation is a London based Non-Profit Organization established by Africans to drive technology focused impact in Africa." },
  ]},

  {
    slug: "cap-project-showcase",
    category: "cap",
    categoryLabel: "CAP Program", title: "Project Showcase", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Project Showcase" },
    { key: "headline_main", label: "Headline (main)", type: "text", placeholder: "Evidence of" },
    { key: "headline_highlight", label: "Headline (highlighted)", type: "text", placeholder: "applied learning" },
    { key: "description", label: "Description", type: "textarea", placeholder: "These are learner projects created during CAP activity, presented as evidence of applied learning." },
    { key: "projects", label: "Projects", type: "list", itemLabel: "Project", itemFields: [
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "context", label: "Context", type: "text", placeholder: "" },
      { key: "need", label: "Problem / Learning Need", type: "textarea", placeholder: "" },
      { key: "skills", label: "Skills Applied", type: "textarea", placeholder: "" },
      { key: "output", label: "Project Created", type: "textarea", placeholder: "" },
      { key: "support", label: "Mentor / Programme Support", type: "textarea", placeholder: "" },
      { key: "nextStep", label: "Next Learning Step", type: "textarea", placeholder: "" },
      { key: "link", label: "External Link", type: "text", placeholder: "" },
      { key: "linkLabel", label: "Link Label", type: "text", placeholder: "" },
    ], defaultItem: { name: "", context: "", need: "", skills: "", output: "", support: "", nextStep: "", link: "", linkLabel: "" }, defaultItems: [
      { name: "ArtifyPro", context: "CAP Tech Hub project", need: "", skills: "", output: "Learner project presented through CAP Tech Hub activity.", support: "Supported by CAP project mentors.", nextStep: "", link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-artifypro-activity-7452626779514732544-0BcX", linkLabel: "Watch project" },
      { name: "Campuslink", context: "CAP Tech Hub project", need: "", skills: "Product management and technical collaboration practised in a team setting.", output: "Campuslink app developed by a CAP learner project team.", support: "Team-based project work with CAP mentor oversight.", nextStep: "Continued product and technical learning.", link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-cohortspotlight-activity-7462891845514219520-L8D4", linkLabel: "Watch story" },
      { name: "StudyPath AI", context: "CAP Tech Hub project", need: "", skills: "", output: "Learner project developed during CAP activity.", support: "Supported by CAP project mentors.", nextStep: "", link: "", linkLabel: "" },
      { name: "Oracle Traffic AI", context: "CAP Conference project", need: "", skills: "", output: "Project presented at CAP Conference.", support: "Presented through CAP Conference activity.", nextStep: "", link: "", linkLabel: "" },
      { name: "Echonav", context: "CAP Conference project", need: "", skills: "", output: "Project presented at CAP Conference 2025.", support: "Presented through CAP Conference activity.", nextStep: "", link: "https://www.linkedin.com/posts/sara-foundation_captechhubconference2025-techforgood-innovation-activity-7300539568489984000-gC-e", linkLabel: "See project" },
      { name: "Carpool AI", context: "CAP Conference project", need: "", skills: "", output: "Project presented at CAP Conference.", support: "Presented through CAP Conference activity.", nextStep: "", link: "", linkLabel: "" },
      { name: "Hexcars", context: "CAP learner project", need: "", skills: "Full-stack web development.", output: "Web application built by a CAP learner.", support: "Developed through CAP Tech Hub learning activity.", nextStep: "", link: "https://www.linkedin.com/posts/sara-foundation_captechhub-webdevelopment-fullstackdeveloper-activity-7244363803411279873-AW6B", linkLabel: "See project" },
      { name: "Shopping Cart", context: "CAP learner project", need: "", skills: "Full-stack development applied to an e-commerce use case.", output: "Shopping cart application built by a CAP learner.", support: "Developed through CAP Tech Hub learning activity.", nextStep: "", link: "https://www.linkedin.com/posts/sara-foundation_fullstackdevelopment-captechhub-ecommercesolutions-activity-7247641276110557184-52gy", linkLabel: "See project" },
      { name: "Famconnect", context: "CAP learner project", need: "", skills: "", output: "Learner project developed during CAP activity.", support: "Supported by CAP project mentors.", nextStep: "", link: "", linkLabel: "" },
      { name: "To-do List App", context: "CAP learner project", need: "", skills: "Web application development fundamentals.", output: "To-do list web app built by a CAP learner.", support: "Developed through CAP Tech Hub learning activity.", nextStep: "", link: "https://www.linkedin.com/posts/sara-foundation_project-spotlight-to-do-list-web-app-by-activity-7250183374852546561-x_vO", linkLabel: "See project" },
    ]},
  ]},

  {
    slug: "cap-impact",
    category: "cap",
    categoryLabel: "CAP Program", title: "Impact Evidence & Numbers", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "CAP Impact" },
    { key: "headline_main", label: "Headline (main)", type: "text", placeholder: "Access provided." },
    { key: "headline_highlight", label: "Headline (highlighted)", type: "text", placeholder: "Learning delivered." },
    { key: "description", label: "Description", type: "textarea", placeholder: "Each figure measures a different thing. Learners, sessions, attendances and projects are counted separately." },
    { key: "stats", label: "Stats", type: "list", itemLabel: "Stat", itemFields: [
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
      { key: "sub", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { value: "", label: "", sub: "" }, defaultItems: [
      { value: "763", label: "CAP learners", sub: "Received fully funded access to practical digital learning across Cohorts 1 and 2." },
      { value: "35+", label: "Universities represented", sub: "Across the 8 African countries reached by CAP activity." },
      { value: "23", label: "CAP expert sessions", sub: "Delivered during 2024 and 2025." },
      { value: "100", label: "CAP Conference 1.0 attendees", sub: "People who attended in person." },
      { value: "2", label: "Talent Showcases", sub: "Learners presenting their project work." },
      { value: "1", label: "Demo Day", sub: "CAP Cohort 1 project presentations." },
      { value: "3", label: "Project mentors", sub: "Supporting active learner projects." },
      { value: "10", label: "Learner projects", sub: "Documented outputs of applied learning." },
    ]},
  ]},

  {
    slug: "cap-program-fee",
    category: "cap",
    categoryLabel: "CAP Program", title: "Program Fee & Scholarship FAQ", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Program Fee" },
    { key: "headline_prefix", label: "Headline Prefix", type: "text", placeholder: "Sara Foundation covers" },
    { key: "headline_highlight", label: "Headline Highlight", type: "text", placeholder: "92%" },
    { key: "headline_suffix", label: "Headline Suffix", type: "text", placeholder: "of the cost for you." },
    { key: "cost_amount", label: "Full Cost Amount", type: "text", placeholder: "£500" },
    { key: "cost_local", label: "Full Cost (local currency)", type: "text", placeholder: "(₦1,000,000)" },
    { key: "pay_amount", label: "What You Pay", type: "text", placeholder: "£45" },
    { key: "pay_local", label: "What You Pay (local currency)", type: "text", placeholder: "(₦90,000)" },
    { key: "installment_note", label: "Installment Note", type: "textarea", placeholder: "To make our program even more accessible, we also accept three installmental monthly payments" },
    { key: "installment_amount", label: "Installment Amount", type: "text", placeholder: "£15" },
    { key: "installment_period", label: "Installment Period", type: "text", placeholder: "/month" },
    { key: "installment_local", label: "Installment (local currency)", type: "text", placeholder: "(₦30,000/month)" },
    { key: "breakdown_title", label: "Breakdown Title", type: "text", placeholder: "Cost Breakdown" },
    { key: "included", label: "What's Included", type: "list", itemLabel: "Item", itemFields: [
      { key: "item", label: "Item", type: "text", placeholder: "" },
    ], defaultItem: { item: "" }, defaultItems: [
      { item: "3 Months Program + Alumni access" }, { item: "Internship Prep Support" },
      { item: "Train AI access" }, { item: "Nanaade AI access" }, { item: "Other Strategic Partners access" },
    ]},
    { key: "cta_text", label: "Button Text", type: "text", placeholder: "Apply for Cohort 3" },
    { key: "global_note", label: "Global Participants Note", type: "text", placeholder: "Global participants: pay $60 once or $20/month for 3 months" },
  ]},

  {
    slug: "cap-cta",
    category: "cap",
    categoryLabel: "CAP Program", title: "Call to Action (CTA)", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Ready to Build Africa's Tech Future?" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Partner with CAP Tech Hub. Support young people in your community. Widen access to learning." },
    { key: "actions", label: "Action Cards", type: "list", itemLabel: "Action", itemFields: [
      { key: "label", label: "Label", type: "text", placeholder: "" },
      { key: "sublabel", label: "Sublabel", type: "text", placeholder: "" },
      { key: "to", label: "Link (path)", type: "text", placeholder: "" },
    ], defaultItem: { label: "", sublabel: "", to: "" }, defaultItems: [
      { label: "Enrol Your Hub", sublabel: "School Associations", to: "/partnership/school-community" },
      { label: "Become a CAP Member", sublabel: "Young people & women", to: "/programs/cap/apply" },
      { label: "Get in Touch", sublabel: "Individuals & learners", to: "/contact" },
    ]},
    { key: "contact_line1", label: "Contact Line 1", type: "text", placeholder: "info@sarafoundationafrica.com  sarafoundationafrica.com" },
    { key: "contact_line2", label: "Contact Line 2", type: "text", placeholder: "+44 7435 126104 (UK) | +234 9076 66404 (NG)" },
  ]},

  {
    slug: "programs-flip",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Overview & Hero Headline", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Female Learning & Inclusion Pathway" },
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Creating More Inclusive Access to Digital Learning for Women" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "FLIP creates targeted opportunities for women where barriers or underrepresentation in tech learning have been identified." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: womenTechLeaders },
    { key: "apply_cta_label", label: "Primary CTA Label", type: "text", placeholder: "Apply to FLIP" },
    { key: "explore_cta_label", label: "Secondary CTA Label", type: "text", placeholder: "Explore Our Initiatives" },
    { key: "stats", label: "Hero Stats", type: "list", itemLabel: "Stat", itemFields: [
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
    ], defaultItem: { value: "", label: "" }, defaultItems: [
      { value: "57", label: "Women across fellowship & mentorship" },
      { value: "93", label: "FLIP Conference 1.0 attendees" },
      { value: "108", label: "Recorded workshop attendances" },
      { value: "6", label: "African countries" },
    ]},
    { key: "mission_heading", label: "Mission Heading", type: "text", placeholder: "Our Mission" },
    { key: "mission", label: "Mission", type: "textarea", placeholder: "To empower women..." },
    { key: "vision_heading", label: "Vision Heading", type: "text", placeholder: "Our Vision" },
    { key: "vision", label: "Vision", type: "textarea", placeholder: "A world where women lead..." },
    { key: "countries", label: "Countries Reached", type: "list", itemLabel: "Country", itemFields: [
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "flag", label: "Flag Emoji", type: "text", placeholder: "" },
    ], defaultItem: { name: "", flag: "" }, defaultItems: [
      { name: "Nigeria", flag: "🇳🇬" }, { name: "Ghana", flag: "🇬🇭" }, { name: "Kenya", flag: "🇰🇪" },
      { name: "South Africa", flag: "🇿🇦" }, { name: "Uganda", flag: "🇺🇬" }, { name: "Zambia", flag: "🇿🇲" }, { name: "Togo", flag: "🇹🇬" },
    ]},
  ]},

  {
    slug: "flip-initiatives",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Key Initiatives & Structure", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Our Initiatives" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "Three ways to" },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "take part in FLIP" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Take part in our initiatives and join our FLIP alumni network." },
    { key: "initiatives", label: "Initiatives", type: "list", itemLabel: "Initiative", itemFields: [
      { key: "id", label: "ID (fellowship/workshops/conferences — controls icon)", type: "text", placeholder: "" },
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
      { key: "evidence", label: "Evidence", type: "text", placeholder: "" },
      { key: "image", label: "Image", type: "image", placeholder: "" },
      { key: "imageAlt", label: "Image Alt Text", type: "text", placeholder: "" },
    ], defaultItem: { id: "", name: "", description: "", evidence: "", image: "", imageAlt: "" }, defaultItems: [
      { id: "fellowship", name: "FLIP Fellowship", description: "A structured fellowship combining tailored learning, mentoring and a capstone project.", evidence: "57 women across fellowship and mentorship activity · 5 Cohort 1 capstone projects", image: womenTechLeaders, imageAlt: "Women taking part in a FLIP fellowship learning session" },
      { id: "workshops", name: "FLIP Workshops", description: "Practical sessions on personal brand, leadership and career progression, led by women working in technology.", evidence: "3 workshops · 108 recorded attendances", image: womenCoworking, imageAlt: "Participants at a FLIP workshop" },
      { id: "conferences", name: "FLIP Conferences", description: "Community gatherings that bring participants, speakers and panellists together to share knowledge.", evidence: "FLIP Conference 1.0 · 93 women attended · 2 speakers and 4 panellists", image: capWomenGroup, imageAlt: "Attendees at FLIP Conference 1.0" },
    ]},
    { key: "alumni_headline", label: "Alumni Section Headline", type: "text", placeholder: "Join our FLIP alumni network" },
    { key: "alumni_description", label: "Alumni Section Description", type: "textarea", placeholder: "Women who have taken part in a FLIP initiative stay connected through our alumni network." },
    { key: "alumni_cta_primary", label: "Alumni Primary CTA", type: "text", placeholder: "Apply to FLIP" },
    { key: "alumni_cta_secondary", label: "Alumni Secondary CTA", type: "text", placeholder: "Mentor with FLIP" },
  ]},

  {
    slug: "flip-benefits",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Program Benefits", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Membership Benefits" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "What You'll" },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "Gain" },
    { key: "description", label: "Description", type: "textarea", placeholder: "We provide comprehensive support and access to benefits that empower women to succeed in tech." },
    { key: "benefits", label: "Benefits", type: "list", itemLabel: "Benefit", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Skill Development and Capacity Building", description: "Access to training and resources to enhance your technical and business skills." },
      { title: "Leadership Development and Empowerment", description: "Programs designed to prepare women for leadership roles in the tech industry." },
      { title: "Networking and Community Access", description: "Connect with a vibrant network of women in tech and industry experts." },
      { title: "Mentorship and Development Resources", description: "Pair with experienced mentors and access curated development materials." },
      { title: "Access to Funding and Investment", description: "Support opportunities for women building tech innovations to connect with funders." },
      { title: "Advocacy, Visibility and Policy Impact", description: "Amplify your voice and contribute to policy changes for women in tech." },
    ]},
  ]},

  {
    slug: "flip-gender-gap",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Gender Gap Approach", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Our Approach" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "How FLIP Tackles the" },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "Tech Gender Gap" },
    { key: "description", label: "Description", type: "textarea", placeholder: "The Female Learning & Inclusion Pathway addresses identified gaps for women in African tech." },
    { key: "image", label: "Featured Image", type: "image", placeholder: womenCoworking },
    { key: "approaches", label: "Approaches", type: "list", itemLabel: "Approach", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Increase Representation", description: "FLIP workshops and mentoring inspire more women to pursue leadership roles and tech innovation." },
      { title: "Improve Access to Resources", description: "FLIP's community and investor education sessions make it easier for women to secure funding for their ideas." },
      { title: "Empowerment Through Community", description: "The FLIP community provides the support system women need to overcome barriers and keep progressing." },
    ]},
  ]},

  {
    slug: "flip-impact",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Impact Numbers", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "FLIP Impact" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "Participation, learning and" },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "community" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Each figure measures a different thing. Participants, attendances, sessions and projects are counted separately." },
    { key: "stats", label: "Stats", type: "list", itemLabel: "Stat", itemFields: [
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
      { key: "sub", label: "Sub Text", type: "textarea", placeholder: "" },
    ], defaultItem: { value: "", label: "", sub: "" }, defaultItems: [
      { value: "57", label: "Women", sub: "Participated across FLIP fellowship and mentorship programmes during 2024–2026, supported by 57 scholarships." },
      { value: "3", label: "Workshops", sub: "Delivered on personal brand, tech women leadership and career progression." },
      { value: "108", label: "Recorded attendances", sub: "Across the three FLIP workshops. Attendances are not unique individuals." },
      { value: "93", label: "FLIP Conference 1.0", sub: "Women who attended the conference." },
      { value: "2 + 4", label: "Speakers and panellists", sub: "Contributors to FLIP Conference 1.0." },
      { value: "4", label: "Mentors", sub: "Supporting FLIP participants." },
      { value: "6", label: "African countries", sub: "Countries reached by FLIP, widening the Foundation's reach to 11 unique countries." },
      { value: "5", label: "Cohort 1 capstone projects", sub: "Completed as part of FLIP Fellowship 1.0." },
    ]},
  ]},

  {
    slug: "flip-capstone-showcase",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Capstone Project Showcase", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "FLIP Fellowship 1.0 Capstones" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "Five capstone projects," },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "five learning journeys" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Capstone work completed by FLIP Cohort 1 fellows." },
    { key: "footer_note", label: "Footer Note", type: "text", placeholder: "Use the arrows or swipe to see all five capstone projects." },
    { key: "capstones", label: "Capstone Projects", type: "list", itemLabel: "Capstone", itemFields: [
      { key: "number", label: "Number", type: "text", placeholder: "" },
      { key: "category", label: "Category", type: "text", placeholder: "" },
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "project", label: "Project", type: "text", placeholder: "" },
      { key: "angle", label: "Angle/Summary", type: "textarea", placeholder: "" },
      { key: "link", label: "External Link (optional)", type: "text", placeholder: "" },
    ], defaultItem: { number: "", category: "", name: "", project: "", angle: "", link: "" }, defaultItems: [
      { number: "01", category: "Fintech", name: "Odugbayi Olamide", project: "BI-powered reconciliation performance tracker", angle: "Applying business intelligence to banking operations.", link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-capstoneproject-fintech-activity-7399130514781233152-qsfI" },
      { number: "02", category: "Fashion AI", name: "Anita Olang", project: "Personal AI stylist", angle: "Using AI to make wardrobe recommendations based on individual preferences.", link: "" },
      { number: "03", category: "EdTech", name: "Ann Eberechuku", project: "Schoollink Global", angle: "Designing a tracking solution for school marketing.", link: "" },
      { number: "04", category: "Creative AI", name: "Happiness Stephen", project: "Style Pick App", angle: "Supporting designers and tailors through AI-assisted style selection.", link: "" },
      { number: "05", category: "Customer Intelligence", name: "Stella Adetoyese", project: "AI-powered customer feedback intelligence system", angle: "Turning customer feedback into actionable service insights.", link: "" },
    ]},
  ]},

  {
    slug: "flip-wfta",
    category: "flip",
    categoryLabel: "FLIP Program", title: "WFTA Community (Women in Tech)", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Community 2" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "Women Founders In Tech Africa" },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "(WFTA)" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Our initiative plays a pivotal role in closing gender gaps and fostering a thriving ecosystem of female entrepreneurs." },
    { key: "image", label: "Image", type: "image", placeholder: womanFounderPitch },
    { key: "features", label: "Features", type: "list", itemLabel: "Feature", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Membership", description: "Open to women entrepreneurs in the tech space across Africa, tiered based on business stage." },
      { title: "Capacity Building & Funding", description: "Facilitate connections with investors and support pitch decks, business models and fundraising strategies." },
      { title: "Community Support & Visibility", description: "A platform for women founders to network with peers, partners, and industry experts." },
      { title: "Events & Resources", description: "Organize events and share resources to help founders accelerate their tech startup." },
    ]},
  ]},

  {
    slug: "flip-wpta",
    category: "flip",
    categoryLabel: "FLIP Program", title: "WPTA Community (Tech Professionals)", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Community 1" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "Women Professionals In Tech Africa" },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "(WPTA)" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Our initiative fosters a vibrant community that empowers women professionals in African tech." },
    { key: "image", label: "Image", type: "image", placeholder: womenTechLeaders },
    { key: "features", label: "Features", type: "list", itemLabel: "Feature", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Mentor-Mentee Programs", description: "Members are paired with senior professionals for career guidance and support." },
      { title: "Membership", description: "Open to Women Professionals working in code and no-code roles." },
      { title: "Networking Opportunities", description: "Join a vibrant network with regular meetups, conferences, and workshops." },
      { title: "Women Advocacy", description: "We promote the voices of women leaders in tech and advocate for reduced gender bias." },
      { title: "Access to Resources & Jobs", description: "Access materials and get connected to employers and job prospects in technology in Africa." },
    ]},
  ]},

  {
    slug: "flip-membership",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Membership Tiers", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "badge", label: "Badge", type: "text", placeholder: "Membership Structure" },
    { key: "headline_pre", label: "Headline (before highlight)", type: "text", placeholder: "Find Your" },
    { key: "headline_accent", label: "Headline (highlighted)", type: "text", placeholder: "Membership Tier" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Insights on our membership status for women taking part in FLIP learning, mentoring and community activities." },
    { key: "tiers", label: "Membership Tiers", type: "list", itemLabel: "Tier", itemFields: [
      { key: "category", label: "Category Name", type: "text", placeholder: "" },
      { key: "item1", label: "Item 1", type: "text", placeholder: "" },
      { key: "item2", label: "Item 2", type: "text", placeholder: "" },
    ], defaultItem: { category: "", item1: "", item2: "" }, defaultItems: [
      { category: "Tech Starter Members", item1: "Members seeking to start a career in tech", item2: "Founders with startups in ideation stage" },
      { category: "Professional Members", item1: "Tier 1: Early stage careers (1-5 years experience)", item2: "Tier 2: Mid stage careers (5-10 years experience)" },
      { category: "Entrepreneur Members", item1: "Tier 1: Pre-seed or seed stage startups", item2: "Tier 2: Series A+ and growth phase" },
      { category: "Honorary & Ally Members", item1: "Honorary: 10+ years experience or led major African startups", item2: "Ally: Non-female members promoting women-based initiatives" },
    ]},
  ]},

  {
    slug: "flip-cta",
    category: "flip",
    categoryLabel: "FLIP Program", title: "Call to Action (CTA)", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Register Today and Be Part of This Initiative" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Connect with inspiring women who are shaping the future of tech in Africa." },
    { key: "cta_primary_label", label: "Primary CTA Label", type: "text", placeholder: "Become a Member" },
    { key: "cta_secondary_label", label: "Secondary CTA Label", type: "text", placeholder: "Learn About Sara Foundation" },
  ]},

  {
    slug: "programs-gjp",
    category: "gjp",
    categoryLabel: "EJP Pathway", title: "Overview & Referral Pathway", icon: Info, previewPath: "/programs/gjp", fields: [
    { key: "hero_badge", label: "Hero Badge", type: "text", placeholder: "Education Journey Pathway" },
    { key: "hero_headline_prefix", label: "Hero Headline (plain part)", type: "text", placeholder: "Learning Beyond the" },
    { key: "hero_headline_highlight", label: "Hero Headline (highlighted word)", type: "text", placeholder: "Sessions" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "EJP supports continued learning through practical and experiential opportunities." },
    { key: "no_guarantee_text", label: "No-Guarantee Statement", type: "textarea", placeholder: "Sara Foundation Africa does not guarantee or promise employment through EJP." },
    { key: "activities", label: "Activities", type: "list", itemLabel: "Activity", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "desc", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", desc: "" }, defaultItems: [
      { title: "Insight sessions", desc: "Sessions that help participants understand roles, sectors and how organisations work." },
      { title: "Work-readiness education", desc: "Learning that builds the practical knowledge and habits participants need in a workplace setting." },
      { title: "Mentoring", desc: "Guidance, feedback and reflection with experienced practitioners." },
      { title: "Educational exposure", desc: "Experiential opportunities that complement a participant's wider educational journey." },
      { title: "Knowledge sessions", desc: "Expert-led sessions that deepen understanding of technology and professional practice." },
      { title: "Referrals", desc: "Referrals to suitable external opportunities where these provide genuine further learning." },
    ]},
    { key: "evidence", label: "Impact Evidence", type: "list", itemLabel: "Stat", itemFields: [
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
      { key: "sub", label: "Context / Caveat", type: "textarea", placeholder: "" },
    ], defaultItem: { value: "", label: "", sub: "" }, defaultItems: [
      { value: "696", label: "Candidates prepared and referred", sub: "Prepared and referred into the Nigerian Jubilee Fellows Programme candidate pool for 12-month paid placements. Referral into a pool is not a guaranteed placement." },
      { value: "705", label: "Referrals across historical activity", sub: "Total referrals for placement opportunities recorded across relevant historical activities. Referrals are not confirmed placements." },
      { value: "23", label: "Knowledge sessions", sub: "Knowledge and insight sessions delivered to participants." },
      { value: "170", label: "AI training places", sub: "Delivered with partner organisations: 100 with Regamos Foundation and 70 through ALX Africa AI Essentials training." },
    ]},
    { key: "continued_journeys_text", label: "Continued Journeys Text", type: "textarea", placeholder: "Some participants have continued their journeys through internships and roles with organisations in our network." },
  ]},

  {
    slug: "partnership-page",
    category: "partnership",
    categoryLabel: "Partnerships", title: "Partnership Overview & Hero", icon: Handshake, previewPath: "/partnership", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Partner with Sara Foundation Africa" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "We work with universities, community organisations, educators, funders, employers and other suitable partners." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: partnershipMeeting },
    { key: "image_break_text", label: "Image Break Quote", type: "text", placeholder: "Together, we create lasting impact across Africa" },
    { key: "impact_areas", label: "Collective Impact Stats", type: "list", itemLabel: "Stat", itemFields: [
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
    ], defaultItem: { value: "", label: "" }, defaultItems: [
      { value: "763", label: "CAP learners" }, { value: "11", label: "African countries" },
      { value: "35+", label: "Universities represented" }, { value: "1,600", label: "Scholarships provided" },
    ]},
    { key: "partner_types", label: "Partnership Types", type: "list", itemLabel: "Type", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
      { key: "benefits", label: "Benefits (one per line)", type: "textarea", placeholder: "" },
      { key: "stats_value", label: "Stat Value", type: "text", placeholder: "" },
      { key: "stats_label", label: "Stat Label", type: "text", placeholder: "" },
    ], defaultItem: { title: "", description: "", benefits: "", stats_value: "", stats_label: "" }, defaultItems: [
      { title: "School Community", description: "Partner with us to bring tech education and CAP Tech Clubs to your institution.", benefits: "CAP Tech Club establishment\nTraining for young people and women\nCurriculum integration support\nIndustry exposure for participants\nFaculty development workshops\nAccess to Sara Foundation network", stats_value: "35+", stats_label: "Universities represented" },
      { title: "Organizations", description: "Organisational partnerships that widen access to digital education, inclusion and community learning.", benefits: "Support for structured learning activity\nCSR impact reporting\nBrand visibility across Africa\nCo-branded programs\nEmployee volunteer opportunities\nVolunteer and mentoring opportunities", stats_value: "11", stats_label: "African countries reached" },
      { title: "Sponsors", description: "Support our mission through sponsorship and funding opportunities.", benefits: "Direct impact on access to learning\nRecognition across platforms\nEvent sponsorship options\nScholarship naming rights\nExclusive networking events\nImpact dashboard access", stats_value: "1,600", stats_label: "Scholarships provided" },
    ]},
    { key: "process", label: "Partnership Process", type: "list", itemLabel: "Step", itemFields: [
      { key: "step", label: "Step Number", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { step: "", title: "", description: "" }, defaultItems: [
      { step: "01", title: "Initial Contact", description: "Reach out to discuss partnership opportunities" },
      { step: "02", title: "Alignment Meeting", description: "We explore mutual goals and partnership models" },
      { step: "03", title: "Proposal & Agreement", description: "Formalize the partnership with clear objectives" },
      { step: "04", title: "Launch & Execute", description: "Begin implementation with dedicated support" },
    ]},
  ]},

  {
    slug: "partnership-school-community",
    category: "partnership",
    categoryLabel: "Partnerships", title: "School & University Community", icon: GraduationCap, previewPath: "/partnership/school-community", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Partner with Sara Foundation Africa" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "Partnering with Sara Foundation Africa can provide universities with access to talent pools and networking opportunities." },
    { key: "hero_description2", label: "Hero Sub-description", type: "textarea", placeholder: "CAP is an initiative aimed at establishing tech clubs across African universities." },
    { key: "benefits", label: "Benefits", type: "list", itemLabel: "Benefit", itemFields: [
      { key: "number", label: "Number", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { number: "", title: "", description: "" }, defaultItems: [
      { number: "01", title: "Access to Resources", description: "Partnering can provide universities with access to research, reports, and data." },
      { number: "02", title: "Networking Opportunities", description: "Universities connect with a network of tech professionals, entrepreneurs, and innovators across Africa." },
      { number: "03", title: "Social Impact", description: "Universities can make a positive social impact and promote Diversity, Equity and Inclusion in technology." },
      { number: "04", title: "Institution Visibility", description: "Partnering enhances your institution's visibility across the African tech ecosystem." },
    ]},
    { key: "what_you_get", label: "What You Get", type: "list", itemLabel: "Item", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "CAP Tech Hub", description: "A fully equipped tech club on your campus with curated curriculum and resources." },
      { title: "Student Training", description: "Structured programs in software engineering, product management, data science, and more." },
      { title: "Mentorship Access", description: "Connect your students with industry professionals across Africa and beyond." },
      { title: "Faculty Development", description: "Workshops and resources for faculty to stay current with industry practices." },
      { title: "Career Support", description: "Internship placements, job readiness training, and employer introductions for students." },
      { title: "Community Events", description: "Hackathons, demo days, and networking events hosted at your institution." },
    ]},
    { key: "eligibility_criteria", label: "Eligibility Criteria", type: "list", itemLabel: "Criterion", itemFields: [
      { key: "text", label: "Criterion", type: "text", placeholder: "" },
    ], defaultItem: { text: "" }, defaultItems: [
      { text: "Accredited university or higher education institution in Africa" },
      { text: "Dedicated faculty sponsor or liaison for the partnership" },
      { text: "Space available on campus for tech club meetings and workshops" },
      { text: "Commitment to promoting Diversity, Equity, and Inclusion" },
      { text: "Willingness to share impact data and participate in reporting" },
    ]},
    { key: "application_steps", label: "Application Steps", type: "list", itemLabel: "Step", itemFields: [
      { key: "step", label: "Step Number", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { step: "", title: "", description: "" }, defaultItems: [
      { step: "01", title: "Express Interest", description: "Fill out the partnership interest form on our website or contact us directly." },
      { step: "02", title: "Alignment Meeting", description: "We schedule a meeting to understand your institution's goals." },
      { step: "03", title: "MOU Signing", description: "Both parties sign a Memorandum of Understanding outlining roles and expectations." },
      { step: "04", title: "Hub Setup & Launch", description: "We work with your institution to set up the CAP Tech Hub and onboard students." },
    ]},
    { key: "faqs", label: "FAQs", type: "list", itemLabel: "FAQ", itemFields: [
      { key: "q", label: "Question", type: "text", placeholder: "" },
      { key: "a", label: "Answer", type: "textarea", placeholder: "" },
    ], defaultItem: { q: "", a: "" }, defaultItems: [
      { q: "How long does the partnership process take?", a: "The process typically takes 4–6 weeks depending on institutional readiness and logistics." },
      { q: "Is there a cost for the university?", a: "No, there is no cost. We only require institutional support such as a liaison and meeting space." },
      { q: "Can multiple departments participate?", a: "Yes! CAP is designed for young people from any academic background who are interested in tech." },
      { q: "What is the minimum student count?", a: "We recommend a minimum of 20 students, but we are flexible based on institutional context." },
      { q: "Does the partnership include online programs?", a: "Yes, many of our resources and sessions are available online for hybrid participation." },
    ]},
  ]},

  {
    slug: "partnership-organizations",
    category: "partnership",
    categoryLabel: "Partnerships", title: "Corporate & Non-Profit Organizations", icon: Handshake, previewPath: "/partnership/organizations", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Partner with Sara Foundation Africa" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "We are a non-profit organization established to promote SDG 4, SDG 5 and SDG 8 in Africa." },
    { key: "what_we_offer", label: "What We Offer", type: "list", itemLabel: "Item", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Co-branded Programs", description: "Joint initiatives that carry your brand alongside ours for maximum visibility." },
      { title: "Talent Pipeline", description: "Direct access to trained, vetted tech professionals from our programs." },
      { title: "Impact Reporting", description: "Quarterly reports detailing the impact of your partnership contribution." },
      { title: "Event Partnerships", description: "Speaking slots, sponsorship recognition, and networking at our events." },
      { title: "CSR Integration", description: "Structured programs that align with your corporate social responsibility goals." },
      { title: "Thought Leadership", description: "Joint publications, webinars, and speaking engagements on key topics." },
    ]},
    { key: "partner_categories", label: "Partnership Tracks", type: "list", itemLabel: "Track", itemFields: [
      { key: "number", label: "Number", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "benefits", label: "Benefits (one per line)", type: "textarea", placeholder: "" },
    ], defaultItem: { number: "", title: "", benefits: "" }, defaultItems: [
      { number: "01", title: "Corporates", benefits: "Enhanced Brand Reputation\nTalent Acquisition\nGain valuable market insights\nPromote CSR in an impact-driven way\nInclusion and Innovation Boost" },
      { number: "02", title: "Government", benefits: "Access to data and insights for policymaking\nSkill Development for women\nContribute to job creation\nAdvance gender equality goals" },
      { number: "03", title: "Foundations", benefits: "Provide Resources for widened impact\nEnhance organizational capabilities\nExpand reach through collaborations with FLIP\nContribute to shared empowerment goals" },
    ]},
    { key: "process", label: "Partnership Process", type: "list", itemLabel: "Step", itemFields: [
      { key: "step", label: "Step Number", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { step: "", title: "", description: "" }, defaultItems: [
      { step: "01", title: "Reach Out", description: "Contact us to express your interest in partnering." },
      { step: "02", title: "Discovery Call", description: "We discuss your organization's goals and how we can align." },
      { step: "03", title: "Partnership Proposal", description: "We create a tailored proposal with clear objectives and KPIs." },
      { step: "04", title: "Launch & Report", description: "We execute and provide regular impact reports." },
    ]},
    { key: "faqs", label: "FAQs", type: "list", itemLabel: "FAQ", itemFields: [
      { key: "q", label: "Question", type: "text", placeholder: "" },
      { key: "a", label: "Answer", type: "textarea", placeholder: "" },
    ], defaultItem: { q: "", a: "" }, defaultItems: [
      { q: "What types of organizations can partner with you?", a: "We welcome partnerships from corporates, government agencies, foundations, NGOs, and international development organizations." },
      { q: "Is there a minimum commitment period?", a: "We recommend a 12-month partnership, but we can customize the duration based on your objectives." },
      { q: "How is impact measured?", a: "We track key metrics including learners trained, women supported, and projects completed. Partners receive quarterly dashboards." },
      { q: "Can we customize the partnership?", a: "Absolutely. Every partnership is tailored to align with your organization's strategic goals." },
    ]},
  ]},

  {
    slug: "partnership-sponsors",
    category: "partnership",
    categoryLabel: "Partnerships", title: "Sponsors & CSR Partners", icon: Handshake, previewPath: "/partnership/sponsors", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Sponsor Our Mission" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "We are a non-profit organization established to promote SDG 5 and SDG 8 in Africa." },
    { key: "hero_description2", label: "Hero Sub-description", type: "textarea", placeholder: "Through CAP, we establish tech hubs. Through FLIP, we empower women tech professionals." },
    { key: "sponsor_benefits", label: "Sponsor Benefits", type: "list", itemLabel: "Benefit", itemFields: [
      { key: "number", label: "Number", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "subtitle", label: "Subtitle", type: "text", placeholder: "" },
      { key: "benefits", label: "Benefits (one per line)", type: "textarea", placeholder: "" },
    ], defaultItem: { number: "", title: "", subtitle: "", benefits: "" }, defaultItems: [
      { number: "01", title: "Enhanced Brand Reputation", subtitle: "Demonstrates Corporate Social Responsibility", benefits: "Position your organization by sponsoring students\nBe recognized as a supporter of women's empowerment\nShowcase your commitment to diversity and inclusion" },
      { number: "02", title: "Talent Acquisition and Development", subtitle: "Access to Skilled and Diverse Workforce", benefits: "Position yourself as an attractive employer or investor\nContribute to skilled tech workforce development\nCollaborate and fund women-led startups\nOffer internships or mentorships" },
      { number: "03", title: "Market Access and Business Growth", subtitle: "Expand Your Reach in Africa", benefits: "Reach a new market segment of women consumers\nNetwork with influential individuals in the African tech ecosystem\nGain insights into African tech landscape\nIdentify new suppliers and partners\nGenerate new business opportunities" },
    ]},
    { key: "sponsorship_tiers", label: "Sponsorship Tiers", type: "list", itemLabel: "Tier", itemFields: [
      { key: "name", label: "Name", type: "text", placeholder: "" },
      { key: "amount", label: "Amount", type: "text", placeholder: "" },
      { key: "perks", label: "Perks (one per line)", type: "textarea", placeholder: "" },
      { key: "featured", label: "Featured (\"true\" or \"false\")", type: "text", placeholder: "false" },
    ], defaultItem: { name: "", amount: "", perks: "", featured: "false" }, defaultItems: [
      { name: "Platinum", amount: "$10,000+", perks: "Logo on all event materials and website\nSpeaking slot at annual summit\nExclusive talent pipeline access\nQuarterly impact report with your branding\n5 scholarship naming rights\nVIP access to all events", featured: "true" },
      { name: "Gold", amount: "$5,000 – $9,999", perks: "Logo on event materials and website\nEarly sight of learner project showcases\nBi-annual impact report\n2 scholarship naming rights\nInvitations to networking events", featured: "false" },
      { name: "Silver", amount: "$1,000 – $4,999", perks: "Logo on website\nAnnual impact report\nRecognition at events\nNewsletter mentions", featured: "false" },
    ]},
    { key: "process", label: "Sponsorship Process", type: "list", itemLabel: "Step", itemFields: [
      { key: "step", label: "Step Number", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { step: "", title: "", description: "" }, defaultItems: [
      { step: "01", title: "Choose Your Tier", description: "Select a sponsorship level that aligns with your budget and goals." },
      { step: "02", title: "Discuss Goals", description: "We meet to understand what you want to achieve through sponsorship." },
      { step: "03", title: "Agreement & Payment", description: "Formalize sponsorship with clear deliverables and timelines." },
      { step: "04", title: "Activation & Reporting", description: "We activate your sponsorship and provide regular impact reports." },
    ]},
    { key: "faqs", label: "FAQs", type: "list", itemLabel: "FAQ", itemFields: [
      { key: "q", label: "Question", type: "text", placeholder: "" },
      { key: "a", label: "Answer", type: "textarea", placeholder: "" },
    ], defaultItem: { q: "", a: "" }, defaultItems: [
      { q: "Can I sponsor a specific program?", a: "Yes! You can sponsor CAP, FLIP, or specific events like hackathons and workshops." },
      { q: "How will my sponsorship be recognized?", a: "Recognition includes logo placement, social media mentions, speaking slots, and impact reports with your branding." },
      { q: "Is my sponsorship tax-deductible?", a: "Sara Foundation Africa is a registered non-profit. We provide official receipts for tax purposes." },
      { q: "Can I sponsor individual students?", a: "Yes, we offer scholarship sponsorships where you can directly fund student training and development." },
      { q: "What is the minimum sponsorship amount?", a: "While our structured tiers start at $1,000, we welcome contributions of any size." },
    ]},
  ]},

  {
    slug: "projects-hero",
    category: "projects",
    categoryLabel: "Projects & Impact", title: "Hero & Introduction", icon: BarChart3, previewPath: "/projects", fields: [
    { key: "badge", label: "Hero Badge", type: "text", placeholder: "Our Impact" },
    { key: "headline", label: "Hero Headline", type: "text", placeholder: "Measuring What Changes" },
    { key: "description", label: "Hero Description", type: "textarea", placeholder: "We measure more than reach. We look at who benefits, what people learn and how barriers are reduced." },
  ]},

  {
    slug: "projects-levels",
    category: "projects",
    categoryLabel: "Projects & Impact", title: "Key Impact Metrics & Proof", icon: BarChart3, previewPath: "/projects", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Impact Hierarchy" },
    { key: "headline", label: "Section Headline", type: "text", placeholder: "Five levels of evidence" },
    { key: "levels", label: "Impact Levels", type: "list", itemLabel: "Level", itemFields: [
      { key: "number", label: "Number", type: "text", placeholder: "" },
      { key: "title", label: "Title (1 Access, 2 Learning Activity, 3 Learning Outcomes, 4 Inclusion & Community, 5 Continued Journey — order controls icon)", type: "text", placeholder: "" },
      { key: "question", label: "Question", type: "text", placeholder: "" },
      { key: "items_text", label: "Evidence Items (one per line)", type: "textarea", placeholder: "" },
    ], defaultItem: { number: "", title: "", question: "", items_text: "" }, defaultItems: [
      { number: "01", title: "Access", question: "Who participated and what barrier was reduced?", items_text: "763 CAP learners received fully funded access across Cohorts 1 and 2\n1,600 scholarships provided across pathways\n57 scholarships supporting women across FLIP fellowship and mentorship\nBursaries, subsidised places and fee waivers where funding allows" },
      { number: "02", title: "Learning Activity", question: "What did Sara Foundation Africa provide?", items_text: "47 knowledge and expert sessions across CAP and general programming\n3 FLIP workshops with 108 recorded attendances\n170 AI training places delivered with partner organisations\n2 Talent Showcases and 1 Demo Day\nMentoring, guided project support and learning resources" },
      { number: "03", title: "Learning Outcomes", question: "What changed?", items_text: "10 CAP learner projects completed and presented\n5 FLIP Fellowship Cohort 1 capstone projects completed\nMentor observations of project quality and progression\n[DATA TO CONFIRM: completion rates, assessment results and participant-reported confidence]" },
      { number: "04", title: "Inclusion & Community", question: "Did participation, connection or contribution grow?", items_text: "Network of 60+ speakers, trainers, facilitators, mentors and volunteers\n3 CAP project mentors and 4 FLIP mentors supporting learners\nPeer learning, learner-led projects and knowledge-sharing\n[DATA TO CONFIRM: retention and repeat-participation figures]" },
      { number: "05", title: "Continued Journey", question: "What happened following the learning activity?", items_text: "705 referrals for placement opportunities across relevant historical activities and pathways\n696 candidates prepared and referred into the Nigerian Jubilee Fellows Programme candidate pool\nAlumni engagement, further learning and mentoring\nReferrals are not confirmed placements, and employment is never guaranteed" },
    ]},
  ]},

  {
    slug: "projects-dashboard",
    category: "projects",
    categoryLabel: "Projects & Impact", title: "Impact Dashboard & Map Data", icon: BarChart3, previewPath: "/projects", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Impact Dashboard" },
    { key: "headline", label: "Section Headline", type: "text", placeholder: "Evidence by pathway" },
    { key: "description", label: "Section Description", type: "textarea", placeholder: "Different metrics mean different things. Counted separately and not unique individuals." },
    { key: "dashboard_groups", label: "Pathway Groups", type: "list", itemLabel: "Pathway Group", itemFields: [
      { key: "key", label: "Key (cap/flip/ejp — links metrics below)", type: "text", placeholder: "" },
      { key: "pathway", label: "Pathway Heading", type: "text", placeholder: "" },
      { key: "blurb", label: "Blurb", type: "textarea", placeholder: "" },
      { key: "href", label: "Link", type: "text", placeholder: "" },
    ], defaultItem: { key: "", pathway: "", blurb: "", href: "" }, defaultItems: [
      { key: "cap", pathway: "CAP: Community Access & Participation Pathway", blurb: "Structured digital education, mentoring and practical learning for young people from underserved communities.", href: "/programs/cap" },
      { key: "flip", pathway: "FLIP: Female Learning & Inclusion Pathway", blurb: "Inclusive access to tech learning, mentoring and community for women.", href: "/programs/flip" },
      { key: "ejp", pathway: "EJP: Education Journey Pathway", blurb: "Continued learning through insight, work-readiness education, mentoring and referrals.", href: "/programs/gjp" },
    ]},
    { key: "dashboard_metrics", label: "Pathway Metrics", type: "list", itemLabel: "Metric", itemFields: [
      { key: "pathway_key", label: "Pathway Key (cap/flip/ejp — must match a Pathway Group key)", type: "text", placeholder: "" },
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
      { key: "definition", label: "Definition", type: "textarea", placeholder: "" },
    ], defaultItem: { pathway_key: "", value: "", label: "", definition: "" }, defaultItems: [
      { pathway_key: "cap", value: "763", label: "CAP learners", definition: "Individuals who received fully funded access to practical digital learning across Cohorts 1 and 2." },
      { pathway_key: "cap", value: "35+", label: "Universities represented", definition: "Institutions represented among CAP learners. Not partnership agreements." },
      { pathway_key: "cap", value: "8", label: "African countries (CAP)", definition: "Countries reached by CAP activity." },
      { pathway_key: "cap", value: "23", label: "CAP expert sessions", definition: "Expert-led sessions delivered during 2024 and 2025." },
      { pathway_key: "cap", value: "100", label: "CAP Conference attendees", definition: "People who attended CAP Conference 1.0 in person." },
      { pathway_key: "cap", value: "10", label: "Learner projects", definition: "Projects created by learners as evidence of applied learning." },
      { pathway_key: "cap", value: "2 + 1", label: "Talent Showcases and Demo Day", definition: "Events at which learners presented their project work." },
      { pathway_key: "cap", value: "3", label: "Project mentors", definition: "Mentors supporting active learner projects." },
      { pathway_key: "flip", value: "57", label: "Women participants", definition: "Women who participated across FLIP fellowship and mentorship programmes during 2024–2026." },
      { pathway_key: "flip", value: "57", label: "Scholarships", definition: "Scholarships supporting women's participation in FLIP activity." },
      { pathway_key: "flip", value: "108", label: "Workshop attendances", definition: "Recorded attendances across 3 workshops." },
      { pathway_key: "flip", value: "93", label: "FLIP Conference attendees", definition: "Women who attended FLIP Conference 1.0." },
      { pathway_key: "flip", value: "5", label: "Capstone projects", definition: "Capstone learning projects completed by FLIP Cohort 1 fellows." },
      { pathway_key: "flip", value: "4", label: "FLIP mentors", definition: "Mentors supporting FLIP participants." },
      { pathway_key: "flip", value: "6", label: "African countries (FLIP)", definition: "Countries reached by FLIP activity." },
      { pathway_key: "ejp", value: "705", label: "Referrals for placement opportunities", definition: "Referrals recorded across relevant historical activities and pathways." },
      { pathway_key: "ejp", value: "696", label: "Candidates referred to NJFP pool", definition: "Qualified candidates prepared and referred into the Nigerian Jubilee Fellows Programme candidate pool." },
      { pathway_key: "ejp", value: "23", label: "Knowledge sessions", definition: "Knowledge and insight sessions delivered to participants." },
      { pathway_key: "ejp", value: "170", label: "AI training places", definition: "Training places delivered with partner organisations." },
    ]},
    { key: "cross_cutting_headline", label: "Cross-Cutting Metrics Headline", type: "text", placeholder: "Across all pathways" },
    { key: "cross_cutting", label: "Cross-Cutting Metrics", type: "list", itemLabel: "Metric", itemFields: [
      { key: "value", label: "Value", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
      { key: "definition", label: "Definition", type: "textarea", placeholder: "" },
    ], defaultItem: { value: "", label: "", definition: "" }, defaultItems: [
      { value: "6,000+", label: "Community reach", definition: "People reached through our channels, events and community activity." },
      { value: "11", label: "Unique African countries", definition: "Unique countries reached across all pathways." },
      { value: "1,600", label: "Scholarships provided", definition: "Fully funded and subsidised places provided across pathways." },
      { value: "47", label: "Knowledge and expert sessions", definition: "Total sessions delivered across CAP and general programming." },
      { value: "60+", label: "Speakers, trainers, facilitators, mentors and volunteers", definition: "People in our contributor and volunteer network." },
    ]},
  ]},

  {
    slug: "projects-reporting",
    category: "projects",
    categoryLabel: "Projects & Impact", title: "Annual Impact Reporting & Archives", icon: BarChart3, previewPath: "/projects", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Annual impact reporting" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Our annual reports set out what we delivered, who benefited and what we learned." },
    { key: "report_2025_title", label: "2025 Report Title", type: "text", placeholder: "2025 Impact Report" },
    { key: "report_2025_link_text", label: "2025 Report Link Text", type: "text", placeholder: "Read the 2025 Impact Report" },
    { key: "report_2025_href", label: "2025 Report URL", type: "text", placeholder: "https://drive.google.com/file/d/1Ex55tpVH_RPB0VJygsUyw9Hp74RyPKR_/view?usp=drivesdk" },
    { key: "report_2024_title", label: "2024 Report Title", type: "text", placeholder: "2024 Impact Report" },
    { key: "report_2024_link_text", label: "2024 Report Link Text", type: "text", placeholder: "Read the 2024 Impact Report" },
    { key: "report_2024_href", label: "2024 Report URL", type: "text", placeholder: "https://drive.google.com/file/d/1DjVw-vTf6ugcp75rFVCUCKM4zictzDKN/view?usp=drivesdk" },
    { key: "future_reports_title", label: "Future Reports Title", type: "text", placeholder: "Future reports" },
    { key: "future_reports_placeholder", label: "Future Reports Placeholder", type: "text", placeholder: "[CONTENT REQUIRED: link to future annual and impact reports]" },
    { key: "cta_headline", label: "CTA Headline", type: "text", placeholder: "Help us reduce more barriers to learning" },
  ]},

  {
    slug: "our-work-page",
    category: "other",
    categoryLabel: "Other Pages", title: "Our Work Page (/our-work)", icon: Layout, previewPath: "/our-work", fields: [
    { key: "hero_badge", label: "Hero Badge", type: "text", placeholder: "Our Work" },
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "How We Turn Our Tech Learning, Inclusion and Community Purpose Into Action" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "We design structured learning and community activities around the needs of the people and communities we support." },
    { key: "delivery_badge", label: "Delivery Model Badge", type: "text", placeholder: "Our Delivery Model" },
    { key: "delivery_headline", label: "Delivery Model Headline", type: "text", placeholder: "From understanding need to measuring public benefit" },
    { key: "delivery_model", label: "Delivery Model Steps", type: "list", itemLabel: "Step", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Understand need", description: "Identify educational, inclusion and participation barriers through evidence, partner knowledge and participant feedback." },
      { title: "Design a charitable activity", description: "Link every activity to an approved purpose and an intended public benefit." },
      { title: "Deliver through pathways", description: "Use CAP, FLIP and EJP as structured routes for learning, inclusion and continued development." },
      { title: "Support participation", description: "Use mentoring, resources, scholarships, bursaries, peer support and community activity to reduce barriers." },
      { title: "Measure public benefit", description: "Review access, learning, inclusion and community evidence, then improve, pause or discontinue where needed." },
    ]},
    { key: "access_support_headline", label: "Access Support Headline", type: "text", placeholder: "Access support" },
    { key: "access_support_description", label: "Access Support Description", type: "textarea", placeholder: "Where a programme has a participation fee, Sara Foundation Africa provides scholarships, bursaries, subsidised places or full fee waivers where funding allows." },
    { key: "pathways_badge", label: "Pathways Badge", type: "text", placeholder: "Our Learning Pathways" },
    { key: "pathways_headline", label: "Pathways Headline", type: "text", placeholder: "CAP, FLIP and EJP" },
    { key: "pathways_description", label: "Pathways Description", type: "textarea", placeholder: "Three connected routes into learning, inclusion and continued development." },
    { key: "pathways", label: "Pathway Cards", type: "list", itemLabel: "Pathway", itemFields: [
      { key: "code", label: "Code (CAP / FLIP / EJP — controls icon)", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
      { key: "image", label: "Image", type: "image", placeholder: "" },
      { key: "imageAlt", label: "Image Alt Text", type: "text", placeholder: "" },
      { key: "href", label: "Link", type: "text", placeholder: "" },
      { key: "cta", label: "Button Text", type: "text", placeholder: "" },
    ], defaultItem: { code: "", title: "", description: "", image: "", imageAlt: "", href: "", cta: "" }, defaultItems: [
      { code: "CAP", title: "Community Access & Participation Pathway", description: "Expands access to practical tech education through CAP Tech Hubs, structured learning, mentoring and projects.", image: studentsLabImg, imageAlt: "CAP learners working together during a practical learning session", href: "/programs/cap", cta: "Explore CAP" },
      { code: "FLIP", title: "Female Learning & Inclusion Pathway", description: "Increases women's participation in tech learning through mentoring, inclusive opportunities and supportive communities.", image: womenTechLeaders, imageAlt: "Women participating in a FLIP learning and mentoring session", href: "/programs/flip", cta: "Explore FLIP" },
      { code: "EJP", title: "Education Journey Pathway", description: "Supports continued learning through insight, work-readiness education, mentoring and referrals.", image: graduatesCelebration, imageAlt: "Participants at a Sara Foundation Africa work-readiness session", href: "/programs/gjp", cta: "Explore EJP" },
    ]},
    { key: "cta_headline", label: "CTA Headline", type: "text", placeholder: "Help widen access to learning" },
    { key: "cta_description", label: "CTA Description", type: "textarea", placeholder: "Give, partner, mentor or volunteer to help more people learn, participate and contribute." },
  ]},

  {
    slug: "get-involved-page",
    category: "other",
    categoryLabel: "Other Pages", title: "Get Involved Page (/get-involved)", icon: Heart, previewPath: "/get-involved", fields: [
    { key: "hero_badge", label: "Hero Badge", type: "text", placeholder: "Get Involved" },
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Help Widen Access to Learning" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "There are many ways to support Sara Foundation Africa through funding, partnership, volunteering, mentoring or knowledge-sharing." },
    { key: "routes", label: "Ways to Get Involved", type: "list", itemLabel: "Route", itemFields: [
      { key: "title", label: "Title (controls icon: Donate / Partner with Us / Volunteer / Mentor)", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
      { key: "cta", label: "Button Text", type: "text", placeholder: "" },
      { key: "href", label: "Link", type: "text", placeholder: "" },
      { key: "variant", label: "Button Style (default or outline)", type: "text", placeholder: "outline" },
    ], defaultItem: { title: "", description: "", cta: "", href: "", variant: "outline" }, defaultItems: [
      { title: "Donate", description: "Donations help reduce barriers to learning through scholarships, bursaries, subsidised participation and mentoring.", cta: "Donate Now", href: "/donation", variant: "default" },
      { title: "Partner with Us", description: "We work with organisations where collaboration furthers our charitable purposes.", cta: "Partner with Us", href: "/partnership", variant: "outline" },
      { title: "Volunteer / Mentor", description: "Join our community of 60+ volunteers, speakers, trainers, facilitators and mentors.", cta: "Become a Volunteer", href: "/volunteer", variant: "outline" },
    ]},
    { key: "public_benefit_statement", label: "Public Benefit Statement", type: "textarea", placeholder: "Every donation helps us reduce barriers to education and participation." },
    { key: "donation_uses_heading", label: "Donation Uses Heading", type: "text", placeholder: "What donations can support" },
    { key: "donation_uses", label: "Donation Uses", type: "list", itemLabel: "Item", itemFields: [
      { key: "text", label: "Text", type: "text", placeholder: "" },
    ], defaultItem: { text: "" }, defaultItems: [
      { text: "Scholarships" }, { text: "Bursaries" }, { text: "Subsidised participation" },
      { text: "Educational resources" }, { text: "Mentoring" }, { text: "Community learning activities" },
    ]},
    { key: "partner_types_heading", label: "Partner Types Heading", type: "text", placeholder: "Who we work with" },
    { key: "partner_types", label: "Partner Types", type: "list", itemLabel: "Item", itemFields: [
      { key: "text", label: "Text", type: "text", placeholder: "" },
    ], defaultItem: { text: "" }, defaultItems: [
      { text: "Universities" }, { text: "Community organisations" }, { text: "Educators" },
      { text: "Funders" }, { text: "Employers" }, { text: "Technology organisations" }, { text: "Programme and delivery partners" },
    ]},
    { key: "closing_image", label: "Closing Section Image", type: "image", placeholder: mentorshipSession },
    { key: "closing_headline", label: "Closing Headline", type: "text", placeholder: "Share what you know" },
    { key: "closing_description", label: "Closing Description", type: "textarea", placeholder: "Mentors, trainers, facilitators, speakers and expert session contributors make our learning pathways possible." },
  ]},

  {
    slug: "transparency-page",
    category: "other",
    categoryLabel: "Other Pages", title: "Transparency & Governance (/transparency)", icon: Info, previewPath: "/transparency", fields: [
    { key: "hero_badge", label: "Hero Badge", type: "text", placeholder: "Transparency & Governance" },
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "How we are governed and held to account" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "We are committed to public benefit, responsible stewardship and evidence-led learning." },
    { key: "nigeria_registration", label: "Nigeria Registration Text", type: "textarea", placeholder: "Registered as Princess Sara Foundation with CAC charity number 7980056." },
    { key: "uk_legal_form_placeholder", label: "UK Legal Form", type: "text", placeholder: "[CONTENT REQUIRED: UK legal form and registration status]" },
    { key: "charity_reg_number_placeholder", label: "Charity Registration Number", type: "text", placeholder: "[CONTENT REQUIRED: Charity registration number]" },
    { key: "public_register_link_placeholder", label: "Public Register Link", type: "text", placeholder: "[CONTENT REQUIRED: Public register link]" },
    { key: "purposes", label: "Charitable Purposes", type: "list", itemLabel: "Purpose", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Digital Education", description: "Advancing education by providing structured digital learning that builds digital literacy and practical skills." },
      { title: "Social Inclusion", description: "Promoting inclusion by providing access to mentoring, supportive networks and development opportunities." },
      { title: "Community Capacity Building", description: "Strengthening communities through mentoring, volunteering, peer support and knowledge-sharing." },
    ]},
    { key: "trustees_description", label: "Trustees Description", type: "textarea", placeholder: "Trustees are responsible for the Foundation's charitable purposes, safeguarding, partner due diligence and beneficiary selection." },
    { key: "trustees_placeholder", label: "Trustees List", type: "textarea", placeholder: "[CONTENT REQUIRED: Trustee names, roles, relevant experience and governance responsibilities]" },
    { key: "policies_description", label: "Policies Description", type: "textarea", placeholder: "Safeguarding applies to all learning activity, mentoring, volunteering and events." },
    { key: "policies", label: "Policy List", type: "list", itemLabel: "Policy", itemFields: [
      { key: "text", label: "Text", type: "text", placeholder: "" },
    ], defaultItem: { text: "" }, defaultItems: [
      { text: "Safeguarding Policy" }, { text: "Conflicts of Interest Policy" }, { text: "Financial Controls / Anti-Fraud Policy" },
      { text: "Complaints Policy" }, { text: "Privacy Policy" }, { text: "Cookies Policy" },
      { text: "Accessibility Statement" }, { text: "Volunteer Code of Conduct" },
    ]},
    { key: "international_description", label: "International Delivery Description", type: "textarea", placeholder: "Much of our learning activity is delivered outside the United Kingdom." },
    { key: "international_controls", label: "International Controls", type: "list", itemLabel: "Control", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Due diligence", description: "Checks on delivery partners before funds or activities are approved." },
      { title: "Written agreements", description: "Documented terms setting out the purpose, use of funds, reporting and safeguarding expectations." },
      { title: "Monitoring", description: "Ongoing review of activity, spend and outcomes against the agreed charitable purpose." },
      { title: "Safeguarding", description: "Safeguarding expectations applied to all activity involving participants, volunteers and partners." },
      { title: "Financial controls", description: "Controls over the transfer, use and reconciliation of charitable funds used overseas." },
      { title: "Trustee oversight", description: "Trustees retain responsibility for approving, reviewing and, where needed, pausing overseas activity." },
    ]},
    { key: "international_partner_placeholder", label: "International Partner Description", type: "textarea", placeholder: "[CONTENT REQUIRED: Description of Nigeria operating / delivery partner relationship]" },
    { key: "accounts_placeholder", label: "Annual Accounts", type: "text", placeholder: "[CONTENT REQUIRED: Annual accounts]" },
  ]},

  {
    slug: "annual-reports-page",
    category: "other",
    categoryLabel: "Other Pages", title: "Annual Reports Archive (/annual-reports)", icon: BarChart3, previewPath: "/annual-reports", fields: [
    { key: "hero_badge", label: "Hero Badge", type: "text", placeholder: "Annual Reports" },
    { key: "hero_headline_part1", label: "Hero Headline (part 1)", type: "text", placeholder: "Transparency &" },
    { key: "hero_headline_gradient", label: "Hero Headline (gradient part)", type: "text", placeholder: "accountability." },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "We publish annual impact reports covering programmes delivered, learners reached, and financial stewardship." },
    { key: "reports", label: "Reports", type: "list", itemLabel: "Report", itemFields: [
      { key: "year", label: "Year", type: "text", placeholder: "" },
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "summary", label: "Summary", type: "textarea", placeholder: "" },
      { key: "href", label: "Link (PDF / Drive URL)", type: "text", placeholder: "" },
      { key: "status", label: "Status (available or coming)", type: "text", placeholder: "available" },
    ], defaultItem: { year: "", title: "", summary: "", href: "", status: "available" }, defaultItems: [
      { year: "2025", title: "Sara Foundation Africa — 2025 Impact Report", summary: "763 learners trained across 35 universities in 8 African countries, the launch of the FLIP Fellowship and our first CAP and FLIP conferences.", href: "https://drive.google.com/file/d/1Ex55tpVH_RPB0VJygsUyw9Hp74RyPKR_/view?usp=drivesdk", status: "available" },
      { year: "2024", title: "Sara Foundation Africa — 2024 Impact Report", summary: "Our first full year: the inaugural CAP cohort, the start of our knowledge sessions, and our governance and operating model.", href: "https://drive.google.com/file/d/1DjVw-vTf6ugcp75rFVCUCKM4zictzDKN/view?usp=drivesdk", status: "available" },
    ]},
    { key: "closing_headline", label: "Closing Headline", type: "text", placeholder: "Questions about our reports?" },
    { key: "closing_description", label: "Closing Description", type: "textarea", placeholder: "Registered as Princess Sara Foundation in Nigeria (CAC charity number 7980056)." },
  ]},

  {
    slug: "volunteer-page",
    category: "other",
    categoryLabel: "Other Pages", title: "Volunteer Page (/volunteer)", icon: Users, previewPath: "/volunteer", fields: [
    { key: "hero_badge", label: "Hero Badge", type: "text", placeholder: "Volunteer" },
    { key: "hero_headline_part1", label: "Hero Headline (part 1)", type: "text", placeholder: "Join Our Community of 60+ Volunteers, Speakers, Trainers," },
    { key: "hero_headline_part2", label: "Hero Headline (gradient part)", type: "text", placeholder: "Facilitators and Mentors" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "Volunteers make our learning pathways possible." },
    { key: "roles_headline", label: "Roles Section Headline", type: "text", placeholder: "Volunteer roles" },
    { key: "roles", label: "Volunteer Roles", type: "list", itemLabel: "Role", itemFields: [
      { key: "title", label: "Title (controls icon and form dropdown value)", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", description: "" }, defaultItems: [
      { title: "Mentor", description: "Support learners through structured mentoring, feedback and reflection. Typically 2–4 hours per month, fully virtual." },
      { title: "Tech Trainer / Facilitator", description: "Support educational resources, digital learning activities and workshops for CAP and FLIP participants." },
      { title: "Panellist / Speaker", description: "Share professional knowledge and experience through our events, conferences and sessions." },
      { title: "Knowledge & Expert Session Contributor", description: "Host educational sessions and share technology expertise with learners." },
      { title: "Student Ambassador", description: "Be a Sara Foundation ambassador at your university under our CAP Tech Hub initiative." },
      { title: "General Volunteer", description: "Not sure which role fits yet? Tell us what you can offer and we will find a way for you to contribute." },
    ]},
    { key: "benefits", label: "Volunteer Benefits", type: "list", itemLabel: "Benefit", itemFields: [
      { key: "title", label: "Title (controls icon)", type: "text", placeholder: "" },
      { key: "text", label: "Text", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", text: "" }, defaultItems: [
      { title: "Reduce barriers to learning", text: "Help someone access education and participation they would otherwise miss." },
      { title: "Pan-African community", text: "Join volunteers and contributors supporting learners across 11 African countries." },
      { title: "Recognition", text: "Volunteer certificates, references and recognition at our showcases and conferences." },
    ]},
    { key: "form_headline", label: "Application Form Headline", type: "text", placeholder: "Become a volunteer" },
    { key: "form_description", label: "Application Form Description", type: "text", placeholder: "We review applications weekly and reply within 7 business days." },
  ]},

  {
    slug: "donation-page",
    category: "other",
    categoryLabel: "Other Pages", title: "Donation Page (/donation)", icon: Handshake, previewPath: "/donation", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Help Widen Access to Learning" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Donations help reduce barriers to learning." },
    { key: "impact_text", label: "Impact Description", type: "textarea", placeholder: "Every donation helps us reduce barriers to education and participation." },
    { key: "hero_image", label: "Hero Background Image (Optional)", type: "image", placeholder: "", helperText: "Optional: The donation page hero uses the brand primary gradient. Upload an image to add a background photo overlay." },
    { key: "impact_numbers", label: "Impact Numbers", type: "list", itemLabel: "Stat", itemFields: [
      { key: "number", label: "Number", type: "text", placeholder: "" },
      { key: "label", label: "Label", type: "text", placeholder: "" },
    ], defaultItem: { number: "", label: "" }, defaultItems: [
      { number: "763", label: "CAP learners fully funded" },
      { number: "57", label: "Women supported through FLIP" },
      { number: "1,600", label: "Scholarships provided" },
      { number: "11", label: "African countries reached" },
    ]},
    { key: "where_it_goes", label: "Where Your Money Goes", type: "list", itemLabel: "Item", itemFields: [
      { key: "title", label: "Title", type: "text", placeholder: "" },
      { key: "percentage", label: "Percentage", type: "text", placeholder: "" },
      { key: "description", label: "Description", type: "textarea", placeholder: "" },
    ], defaultItem: { title: "", percentage: "", description: "" }, defaultItems: [
      { title: "Technology & Infrastructure", percentage: "50%", description: "This covers course platforms, learning infrastructure and assessment management." },
      { title: "Programme Operations", percentage: "40%", description: "This covers cohort management, impact reporting and the Foundation's operations." },
      { title: "Growth & Outreach", percentage: "10%", description: "This covers publicity campaigns, promotion and online engagements." },
    ]},
    { key: "faqs", label: "Donation FAQs", type: "list", itemLabel: "FAQ", itemFields: [
      { key: "question", label: "Question", type: "text", placeholder: "" },
      { key: "answer", label: "Answer", type: "textarea", placeholder: "" },
    ], defaultItem: { question: "", answer: "" }, defaultItems: [
      { question: "Is my donation tax-deductible?", answer: "Sara Foundation Africa is a registered non-profit organization. We provide official donation receipts." },
      { question: "Can I donate in currencies other than USD?", answer: "Yes! We accept donations in multiple currencies." },
      { question: "Can I set up a recurring donation?", answer: "Yes. You can donate weekly, monthly, or in any rhythm that works for you." },
      { question: "How much does it cost to sponsor a learner?", answer: "£500 fully sponsors a beneficiary (or the equivalent in your currency)." },
      { question: "How will I know my donation made an impact?", answer: "All donors receive an annual impact report showing exactly how funds were used." },
      { question: "Can I donate to a specific program?", answer: "Yes, you can specify whether your donation goes to CAP or FLIP. Contact us to earmark your donation." },
    ]},
  ]},

  {
    slug: "contact-info",
    category: "other",
    categoryLabel: "Other Pages", title: "Contact & Office Locations (/contact)", icon: Phone, previewPath: "/contact", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Let's Start a Conversation" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Have questions about our programs or want to partner with us? We'd love to hear from you." },
    { key: "email", label: "Contact Email", type: "text", placeholder: "info@sarafoundationafrica.com" },
    { key: "phone", label: "Phone Number (UK)", type: "text", placeholder: "+44 7435 126104" },
    { key: "phone_ng", label: "Phone Number (NG)", type: "text", placeholder: "+234 9076 664049" },
    { key: "office_hours", label: "Office Hours", type: "text", placeholder: "Mon - Fri, 9am - 5pm" },
    { key: "address", label: "Address (short form)", type: "text", placeholder: "E14 8AT, London, UK" },
    { key: "offices", label: "Office Locations", type: "list", itemLabel: "Office", itemFields: [
      { key: "city", label: "City", type: "text", placeholder: "" },
      { key: "country", label: "Country", type: "text", placeholder: "" },
      { key: "address", label: "Address", type: "text", placeholder: "" },
    ], defaultItem: { city: "", country: "", address: "" }, defaultItems: [
      { city: "London", country: "United Kingdom", address: "E14 8AT, London" },
      { city: "Lagos", country: "Nigeria", address: "Bafaj Crescent, Awoyaya-Eputu, Ibeju Lekki" },
    ]},
  ]},
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValue = string | Record<string, any>[];

const PAGE_CATEGORIES: { id: "all" | PageCategory; label: string; icon: typeof Layout; route?: string }[] = [
  { id: "all", label: "All Sections", icon: Layout },
  { id: "home", label: "Home Page", icon: Layout, route: "/" },
  { id: "about", label: "About Us", icon: Info, route: "/about" },
  { id: "cap", label: "CAP Program", icon: GraduationCap, route: "/programs/cap" },
  { id: "flip", label: "FLIP Program", icon: Heart, route: "/programs/flip" },
  { id: "gjp", label: "EJP Pathway", icon: Info, route: "/programs/gjp" },
  { id: "partnership", label: "Partnerships", icon: Handshake, route: "/partnership" },
  { id: "projects", label: "Projects & Impact", icon: BarChart3, route: "/projects" },
  { id: "other", label: "Other Pages", icon: Globe },
];

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"all" | PageCategory>("all");
  const [editValues, setEditValues] = useState<Record<string, Record<string, FieldValue>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Build the default (pre-fill) values for a page from its field config,
  // so the admin editor shows the site's current live copy even before anything is saved.
  const defaultsForPage = (pageDef: (typeof defaultPages)[number]) => {
    const vals: Record<string, FieldValue> = {};
    pageDef.fields.forEach((field) => {
      if (field.type === "list") {
        vals[field.key] = field.defaultItems as Record<string, any>[];
      } else {
        vals[field.key] = field.placeholder || "";
      }
    });
    return vals;
  };

  const fetchPages = async () => {
    const { data } = await supabase.from("pages").select("*");
    setPages(data || []);
    const vals: Record<string, Record<string, FieldValue>> = {};
    defaultPages.forEach((pageDef) => {
      const saved = data?.find((p) => p.slug === pageDef.slug);
      const savedContent = saved && typeof saved.content === "object" && saved.content !== null ? (saved.content as Record<string, FieldValue>) : {};
      vals[pageDef.slug] = { ...defaultsForPage(pageDef), ...savedContent };
    });
    setEditValues(vals);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const savePage = async (slug: string, title: string) => {
    setSaving(slug);
    const content = editValues[slug] || {};
    const existing = pages.find((p) => p.slug === slug);

    if (existing) {
      const { error } = await supabase.from("pages").update({ content }).eq("slug", slug);
      if (error) { toast.error(error.message); setSaving(null); return; }
    } else {
      const { error } = await supabase.from("pages").insert({ slug, title, content });
      if (error) { toast.error(error.message); setSaving(null); return; }
    }

    toast.success(`"${title}" saved!`);
    fetchPages();
    setSaving(null);
  };

  const updateField = (slug: string, key: string, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], [key]: value },
    }));
  };

  const updateListItem = (slug: string, key: string, index: number, itemKey: string, value: string) => {
    setEditValues((prev) => {
      const list = [...((prev[slug]?.[key] as Record<string, any>[]) || [])];
      list[index] = { ...list[index], [itemKey]: value };
      return { ...prev, [slug]: { ...prev[slug], [key]: list } };
    });
  };

  const addListItem = (slug: string, key: string, template: Record<string, any>) => {
    setEditValues((prev) => {
      const list = [...((prev[slug]?.[key] as Record<string, any>[]) || [])];
      list.push({ ...template });
      return { ...prev, [slug]: { ...prev[slug], [key]: list } };
    });
  };

  const removeListItem = (slug: string, key: string, index: number) => {
    setEditValues((prev) => {
      const list = [...((prev[slug]?.[key] as Record<string, any>[]) || [])];
      list.splice(index, 1);
      return { ...prev, [slug]: { ...prev[slug], [key]: list } };
    });
  };

  const moveListItem = (slug: string, key: string, index: number, direction: -1 | 1) => {
    setEditValues((prev) => {
      const list = [...((prev[slug]?.[key] as Record<string, any>[]) || [])];
      const target = index + direction;
      if (target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...prev, [slug]: { ...prev[slug], [key]: list } };
    });
  };

  const filteredPages = defaultPages.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <div className="animate-pulse text-muted-foreground p-8 text-center">Loading page sections...</div>;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-2xl font-bold text-foreground">Content Management</h1>
            <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full">
              {defaultPages.length} Editable Sections
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Organized by page and section. Edits save to Supabase and reflect live on the website.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search section or keyword..."
            className="pl-9 text-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide border-b border-border/60">
        {PAGE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = cat.id === "all"
            ? defaultPages.length
            : defaultPages.filter((p) => p.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-foreground hover:bg-secondary border-border"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {filteredPages.length === 0 ? (
          <div className="card-modern p-12 text-center text-muted-foreground">
            <Layout className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-foreground">No sections match your search or filter.</p>
            <p className="text-xs text-muted-foreground mt-1">Try clearing the search box or selecting "All Sections".</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredPages.map((pageDef, idx) => {
            const exists = pages.find((p) => p.slug === pageDef.slug);
            const isExpanded = expandedSlug === pageDef.slug;
            const Icon = pageDef.icon;
            const imageFields = pageDef.fields.filter((f) => f.type === "image").length;
            const listFields = pageDef.fields.filter(isListField).length;

            // Show group divider when the category changes in "all" mode
            const prevPage = filteredPages[idx - 1];
            const isNewCategory = selectedCategory === "all" && (!prevPage || prevPage.category !== pageDef.category);
            const currentCatInfo = PAGE_CATEGORIES.find((c) => c.id === pageDef.category);

            return (
              <div key={pageDef.slug} className="space-y-2">
                {isNewCategory && (
                  <div className="pt-6 pb-2 first:pt-0">
                    <div className="flex items-center justify-between border-b border-border/70 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                          {pageDef.categoryLabel}
                        </span>
                        <span className="text-[11px] bg-secondary text-muted-foreground font-medium px-2 py-0.5 rounded-full">
                          {defaultPages.filter((p) => p.category === pageDef.category).length} sections
                        </span>
                      </div>
                      {currentCatInfo?.route && (
                        <a
                          href={currentCatInfo.route}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-medium"
                        >
                          Visit page <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="card-modern overflow-hidden border border-border/80 hover:border-primary/40 transition-colors">
                  <button
                    type="button"
                    onClick={() => setExpandedSlug(isExpanded ? null : pageDef.slug)}
                    className="w-full flex items-center justify-between p-3.5 md:p-4 hover:bg-secondary/40 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="font-semibold text-foreground text-sm md:text-base">
                            {pageDef.title}
                          </span>
                          <span className="text-[11px] font-mono bg-secondary/80 text-muted-foreground px-1.5 py-0.5 rounded border border-border">
                            {pageDef.slug}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                          <span className="text-primary font-medium">{pageDef.previewPath}</span>
                          <span>•</span>
                          <span>{pageDef.fields.length} field{pageDef.fields.length > 1 ? "s" : ""}</span>
                          {imageFields > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Image className="w-3 h-3" /> {imageFields} image{imageFields > 1 ? "s" : ""}
                              </span>
                            </>
                          )}
                          {listFields > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <ListChecks className="w-3 h-3" /> {listFields} list{listFields > 1 ? "s" : ""}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      {exists && (
                        <span className="text-xs bg-success/15 text-success px-2.5 py-0.5 rounded-full hidden sm:inline-block font-medium">
                          Customized
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 md:p-6 border-t border-border space-y-6 bg-card">
                      {/* Image fields */}
                      {pageDef.fields.filter((f) => f.type === "image").length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Image className="w-3.5 h-3.5 text-primary" /> Images
                          </p>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {pageDef.fields.filter((f) => f.type === "image").map((field) => (
                              <div key={field.key} className="space-y-1.5">
                                <Label className="text-xs font-medium">{field.label}</Label>
                                <ImageUpload
                                  value={(editValues[pageDef.slug]?.[field.key] as string) || ""}
                                  onChange={(url) => updateField(pageDef.slug, field.key, url)}
                                  placeholder={field.placeholder || ""}
                                  helperText={field.helperText}
                                  folder={pageDef.slug}
                                  label={`Upload ${field.label}`}
                                  aspectRatio="landscape"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Text fields */}
                      {pageDef.fields.filter(isSimpleField).filter((f) => f.type !== "image").length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Layout className="w-3.5 h-3.5 text-primary" /> Content & Text
                          </p>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {pageDef.fields
                              .filter(isSimpleField)
                              .filter((f) => f.type !== "image")
                              .map((field) => (
                                <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
                                  <Label className="text-xs font-medium">{field.label}</Label>
                                  {field.type === "textarea" ? (
                                    <Textarea
                                      value={(editValues[pageDef.slug]?.[field.key] as string) || ""}
                                      onChange={(e) => updateField(pageDef.slug, field.key, e.target.value)}
                                      placeholder={field.placeholder}
                                      rows={3}
                                      className="text-sm"
                                    />
                                  ) : (
                                    <Input
                                      value={(editValues[pageDef.slug]?.[field.key] as string) || ""}
                                      onChange={(e) => updateField(pageDef.slug, field.key, e.target.value)}
                                      placeholder={field.placeholder}
                                      className="text-sm"
                                    />
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* List fields (repeatable items) */}
                      {pageDef.fields.filter(isListField).map((field) => {
                        const items = (editValues[pageDef.slug]?.[field.key] as Record<string, any>[]) || [];
                        return (
                          <div key={field.key} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <ListChecks className="w-3.5 h-3.5 text-primary" /> {field.label} ({items.length} items)
                              </p>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                                onClick={() => addListItem(pageDef.slug, field.key, field.defaultItem)}
                              >
                                <Plus className="w-3 h-3 mr-1" /> Add {field.itemLabel}
                              </Button>
                            </div>

                            <div className="space-y-3">
                              {items.map((item, index) => (
                                <div key={index} className="rounded-xl border border-border p-3.5 space-y-3 bg-secondary/30">
                                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                                    <span className="text-xs font-bold text-foreground">
                                      {field.itemLabel} #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="w-7 h-7"
                                        disabled={index === 0}
                                        onClick={() => moveListItem(pageDef.slug, field.key, index, -1)}
                                        title="Move up"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="w-7 h-7"
                                        disabled={index === items.length - 1}
                                        onClick={() => moveListItem(pageDef.slug, field.key, index, 1)}
                                        title="Move down"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="w-7 h-7 hover:text-destructive text-muted-foreground"
                                        onClick={() => removeListItem(pageDef.slug, field.key, index)}
                                        title="Delete item"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="grid gap-3 sm:grid-cols-2">
                                    {field.itemFields.map((itemField) => (
                                      <div key={itemField.key} className={itemField.type === "textarea" ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
                                        <Label className="text-xs">{itemField.label}</Label>
                                        {itemField.type === "image" ? (
                                          <ImageUpload
                                            value={item[itemField.key] || ""}
                                            onChange={(url) => updateListItem(pageDef.slug, field.key, index, itemField.key, url)}
                                            placeholder={itemField.placeholder || ""}
                                            helperText={itemField.helperText}
                                            folder={`${pageDef.slug}-${field.key}`}
                                            label={`Upload ${itemField.label}`}
                                            aspectRatio="landscape"
                                          />
                                        ) : itemField.type === "textarea" ? (
                                          <Textarea
                                            value={item[itemField.key] || ""}
                                            onChange={(e) => updateListItem(pageDef.slug, field.key, index, itemField.key, e.target.value)}
                                            placeholder={itemField.placeholder}
                                            rows={2}
                                            className="text-sm"
                                          />
                                        ) : (
                                          <Input
                                            value={item[itemField.key] || ""}
                                            onChange={(e) => updateListItem(pageDef.slug, field.key, index, itemField.key, e.target.value)}
                                            placeholder={itemField.placeholder}
                                            className="text-sm"
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              {items.length === 0 && (
                                <p className="text-xs text-muted-foreground italic p-3 text-center border border-dashed border-border rounded-xl">
                                  No items yet — click "Add {field.itemLabel}" to create one.
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <Button
                          onClick={() => savePage(pageDef.slug, pageDef.title)}
                          size="sm"
                          disabled={saving === pageDef.slug}
                          className="px-5"
                        >
                          <Save className="w-3.5 h-3.5 mr-2" />
                          {saving === pageDef.slug ? "Saving to Database..." : "Save Changes"}
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={pageDef.previewPath} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1.5" /> Preview on Website
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
