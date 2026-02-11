import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function usePageContent(slug: string, defaults: Record<string, string> = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["page-content", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data?.content as Record<string, string> | null;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  const merged = { ...defaults, ...(data || {}) };

  return { data: merged, loading: isLoading };
}
