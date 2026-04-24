import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { BookOpenCheck, CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_COURSE_ID = "external-course";

const resolveCourseId = (paramId?: string): string => {
  if (paramId && paramId.trim().length > 0) return paramId.trim();
  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const idx = segments.indexOf("external-course");
    if (idx !== -1 && segments[idx + 1]) return segments[idx + 1];
  }
  return DEFAULT_COURSE_ID;
};

type CourseProgress = {
  progress_percentage: number | null;
  is_completed: boolean | null;
};

export default function ExternalCourse() {
  const { courseId: courseIdParam } = useParams<{ courseId?: string }>();
  const courseId = resolveCourseId(courseIdParam);
  const [userId, setUserId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [persistedProgress, setPersistedProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      setLoading(true);
      setProgress(0);
      setPersistedProgress(0);
      setIsCompleted(false);
      const { data: userResult, error: userError } = await supabase.auth.getUser();

      if (!active) return;
      if (userError || !userResult.user) {
        setUserId(null);
        setLoading(false);
        return;
      }

      setUserId(userResult.user.id);

      const { data, error } = await (supabase as any)
        .from("course_progress")
        .select("progress_percentage, is_completed")
        .eq("user_id", userResult.user.id)
        .eq("course_id", courseId)
        .maybeSingle();

      if (!active) return;
      if (error) {
        toast.error("Could not load your course progress.", { description: error.message });
      } else if (data) {
        const row = data as CourseProgress;
        const savedProgress = Math.max(0, Math.min(100, row.progress_percentage ?? 0));
        setProgress(savedProgress);
        setPersistedProgress(savedProgress);
        setIsCompleted(Boolean(row.is_completed));
      }
      setLoading(false);
    };

    loadProgress();
    return () => {
      active = false;
    };
  }, [courseId]);

  const saveProgress = async (nextProgress: number, successMessage: string) => {
    if (!userId) {
      toast.error("Please sign in before saving course progress.");
      setProgress(persistedProgress);
      return;
    }
    if (!courseId) {
      toast.error("Missing course identifier.");
      return;
    }

    const normalizedProgress = Math.max(0, Math.min(100, Math.round(nextProgress)));
    const nextCompleted = normalizedProgress >= 100;
    setSaving(true);

    const { error } = await (supabase as any)
      .from("course_progress")
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          progress_percentage: normalizedProgress,
          is_completed: nextCompleted,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id, course_id" },
      );

    setSaving(false);

    if (error) {
      setProgress(persistedProgress);
      toast.error("Could not save course progress.", { description: error.message });
      return;
    }

    setProgress(normalizedProgress);
    setPersistedProgress(normalizedProgress);
    setIsCompleted(nextCompleted);
    toast.success(successMessage);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>External Course Progress – Sara Foundation Africa</title>
        <meta name="description" content="Track your external course progress and mark the course as complete." />
        <link rel="canonical" href="https://sarafoundationafrica.com/external-course" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <section className="section-container max-w-4xl">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 gap-2">
              <BookOpenCheck className="h-3.5 w-3.5" /> External Course
            </Badge>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Course Progress
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Save your current progress or mark the course as completed when you finish the required materials.
            </p>
          </div>

          <div className="card-modern p-5 md:p-8">
            {loading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" /> Loading your progress...
              </div>
            ) : !userId ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-start gap-3">
                  <LockKeyhole className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Sign in required</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Progress can only be saved for authenticated learners.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Your completion status</h2>
                    <p className="text-sm text-muted-foreground mt-1">{progress}% saved for this course.</p>
                  </div>
                  <Badge variant={isCompleted ? "default" : "outline"} className="w-fit gap-2">
                    {isCompleted && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {isCompleted ? "Completed" : "In progress"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <Progress value={progress} className="h-3" />
                  <Slider
                    value={[progress]}
                    min={0}
                    max={100}
                    step={5}
                    disabled={saving}
                    onValueChange={([value]) => setProgress(value)}
                    onValueCommit={([value]) => saveProgress(value, "Progress saved.")}
                    aria-label="Course progress percentage"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={() => saveProgress(100, "Course marked as complete.")}
                    disabled={saving || isCompleted}
                    className="glow-effect"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                    {isCompleted ? "Completed" : "Mark as Complete"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => saveProgress(progress, "Progress saved.")}
                    disabled={saving || progress === persistedProgress}
                  >
                    Save Progress
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}