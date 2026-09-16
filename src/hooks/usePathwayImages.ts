import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";

export const pathwayFallbackImages: Record<"CAP" | "FLIP" | "EJP", string> = {
  CAP: studentsLabImg,
  FLIP: womenTechLeaders,
  EJP: graduatesCelebration,
};

/**
 * One source of truth for the CAP / FLIP / EJP photos so the same picture is
 * used everywhere the three pathways appear together (home, Our Work, About).
 * Editable in Pages > "Our Learning Pathways" (home-programs).
 */
export function usePathwayImages() {
  const { data } = usePageContent("home-programs", {
    cap_image: "",
    flip_image: "",
    ejp_image: "",
  });

  return {
    CAP: data.cap_image ? assetUrl(data.cap_image) : pathwayFallbackImages.CAP,
    FLIP: data.flip_image ? assetUrl(data.flip_image) : pathwayFallbackImages.FLIP,
    EJP: data.ejp_image ? assetUrl(data.ejp_image) : pathwayFallbackImages.EJP,
  } as Record<"CAP" | "FLIP" | "EJP", string>;
}
