import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const careerPaths = [
  "Tech / Software", "Data / Analytics", "Product / Design",
  "Finance / Accounting", "Marketing / Communications", "Operations / Admin",
  "Education / Training", "Engineering", "Health Sciences",
  "Law / Public Policy", "Other",
];

const referralSources = [
  "Sara Foundation Email", "WhatsApp Group", "LinkedIn", "Twitter / X",
  "Instagram", "Facebook", "Friend / Referral", "Other",
];

const currentStatuses = ["Unemployed", "Freelancing", "Part-time", "Self-employed", "Other"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  whatsapp: z.string().trim().min(7, "Enter a valid WhatsApp number").max(30),
  graduated: z.enum(["yes", "no"]),
  institution: z.string().trim().max(200).optional().or(z.literal("")),
  graduation_year: z.string().trim().max(10).optional().or(z.literal("")),
  nysc_completed: z.enum(["yes", "no"]),
  nysc_year: z.string().trim().max(10).optional().or(z.literal("")),
  career_path: z.string().min(1, "Select your career path").max(150),
  current_status: z.string().max(50).optional().or(z.literal("")),
  state_of_residence: z.string().trim().max(100).optional().or(z.literal("")),
  is_cap_flip_alumnus: z.enum(["yes", "no"]),
  cap_flip_cohort: z.string().trim().max(50).optional().or(z.literal("")),
  referral_source: z.string().max(150).optional().or(z.literal("")),
  additional_info: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  full_name: "", email: "", whatsapp: "",
  graduated: "yes", institution: "", graduation_year: "",
  nysc_completed: "yes", nysc_year: "",
  career_path: "", current_status: "", state_of_residence: "",
  is_cap_flip_alumnus: "no", cap_flip_cohort: "",
  referral_source: "", additional_info: "",
};

const stepFields: Record<number, (keyof FormState)[]> = {
  1: ["full_name", "email", "whatsapp", "state_of_residence"],
  2: ["graduated", "institution", "graduation_year", "nysc_completed", "nysc_year"],
  3: ["career_path", "current_status", "is_cap_flip_alumnus", "cap_flip_cohort", "referral_source", "additional_info"],
};

export default function GJPApply() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const total = 3;
  const progress = (step / total) * 100;
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const validateStep = (s: number) => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (s === 1) {
      if (!data.full_name.trim()) newErrors.full_name = "Required";
      if (!data.email.trim()) newErrors.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Enter a valid email";
      if (!data.whatsapp.trim()) newErrors.whatsapp = "Required";
    }
    if (s === 2) {
      if (data.graduated === "yes" && !data.institution?.trim()) newErrors.institution = "Required";
    }
    if (s === 3) {
      if (!data.career_path) newErrors.career_path = "Select a career path";
      if (data.is_cap_flip_alumnus === "yes" && !data.cap_flip_cohort?.trim()) {
        newErrors.cap_flip_cohort = "Tell us your cohort";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(total, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setSubmitting(false);
      toast.error("Please review your answers.");
      return;
    }
    const { data: row, error } = await supabase
      .from("gjp_applications")
      .insert({
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        whatsapp: data.whatsapp.trim(),
        graduated: data.graduated === "yes",
        institution: data.institution?.trim() || null,
        graduation_year: data.graduation_year?.trim() || null,
        nysc_completed: data.nysc_completed === "yes",
        nysc_year: data.nysc_year?.trim() || null,
        career_path: data.career_path,
        current_status: data.current_status || null,
        state_of_residence: data.state_of_residence?.trim() || null,
        is_cap_flip_alumnus: data.is_cap_flip_alumnus === "yes",
        cap_flip_cohort: data.cap_flip_cohort?.trim() || null,
        referral_source: data.referral_source || null,
        additional_info: data.additional_info?.trim() || null,
        payment_status: "pending",
      })
      .select("id")
      .single();
    setSubmitting(false);
    if (error || !row) {
      console.error(error);
      toast.error("Could not save your application. Please try again.");
      return;
    }
    navigate(`/programs/gjp/success?app=${row.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Apply – Govt Job Placement (GJP) | Sara Foundation</title>
        <meta name="description" content="Apply for the GJP 12-month government-backed placement opportunity for NYSC graduates. Only 500 priority slots available." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/gjp/apply" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-3xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-medium mb-4">
              <Briefcase className="w-3 h-3" /> GJP · 500 Slots Only
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Apply for Government Placement
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Step {step} of {total} — takes about 3 minutes.
            </p>
          </div>

          <Progress value={progress} className="mb-8 h-2" />

          <div className="card-modern p-5 md:p-8">
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Personal Information</h2>
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" value={data.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                    className="mt-1.5 rounded-xl" placeholder="Jane Doe" />
                  {errors.full_name && <p className="text-destructive text-xs mt-1">{errors.full_name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="mt-1.5 rounded-xl" placeholder="you@example.com" />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <Input id="whatsapp" value={data.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                      className="mt-1.5 rounded-xl" placeholder="+234 ..." />
                    {errors.whatsapp && <p className="text-destructive text-xs mt-1">{errors.whatsapp}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state_of_residence">State of Residence</Label>
                    <Input id="state_of_residence" value={data.state_of_residence}
                      onChange={(e) => set("state_of_residence", e.target.value)}
                      className="mt-1.5 rounded-xl" placeholder="Lagos" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Academic & NYSC</h2>
                <div>
                  <Label>Have you graduated? *</Label>
                  <RadioGroup value={data.graduated} onValueChange={(v) => set("graduated", v as "yes" | "no")}
                    className="mt-2 grid grid-cols-2 gap-2">
                    {[["yes", "Yes"], ["no", "No"]].map(([v, l]) => (
                      <Label key={v} htmlFor={`grad-${v}`}
                        className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary cursor-pointer">
                        <RadioGroupItem value={v} id={`grad-${v}`} />
                        <span className="text-sm font-normal">{l}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
                {data.graduated === "yes" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="institution">Institution *</Label>
                      <Input id="institution" value={data.institution}
                        onChange={(e) => set("institution", e.target.value)}
                        className="mt-1.5 rounded-xl" placeholder="University of Lagos" />
                      {errors.institution && <p className="text-destructive text-xs mt-1">{errors.institution}</p>}
                    </div>
                    <div>
                      <Label htmlFor="graduation_year">Graduation Year</Label>
                      <Input id="graduation_year" value={data.graduation_year}
                        onChange={(e) => set("graduation_year", e.target.value)}
                        className="mt-1.5 rounded-xl" placeholder="2023" />
                    </div>
                  </div>
                )}
                <div>
                  <Label>Have you completed NYSC? *</Label>
                  <RadioGroup value={data.nysc_completed} onValueChange={(v) => set("nysc_completed", v as "yes" | "no")}
                    className="mt-2 grid grid-cols-2 gap-2">
                    {[["yes", "Yes"], ["no", "No"]].map(([v, l]) => (
                      <Label key={v} htmlFor={`nysc-${v}`}
                        className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary cursor-pointer">
                        <RadioGroupItem value={v} id={`nysc-${v}`} />
                        <span className="text-sm font-normal">{l}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
                {data.nysc_completed === "yes" && (
                  <div>
                    <Label htmlFor="nysc_year">NYSC Pass-Out Year</Label>
                    <Input id="nysc_year" value={data.nysc_year}
                      onChange={(e) => set("nysc_year", e.target.value)}
                      className="mt-1.5 rounded-xl max-w-xs" placeholder="2024" />
                  </div>
                )}
                {data.nysc_completed === "no" && (
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-foreground">
                    NYSC completion is currently a requirement for placement. You may still apply, but priority will go to graduates who have completed NYSC.
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Career & Background</h2>
                <div>
                  <Label>Career Path *</Label>
                  <Select value={data.career_path} onValueChange={(v) => set("career_path", v)}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Choose your career path" /></SelectTrigger>
                    <SelectContent>
                      {careerPaths.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.career_path && <p className="text-destructive text-xs mt-1">{errors.career_path}</p>}
                </div>

                <div>
                  <Label>Current Employment Status</Label>
                  <Select value={data.current_status} onValueChange={(v) => set("current_status", v)}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      {currentStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Are you a Sara Foundation CAP or FLIP graduate? *</Label>
                  <RadioGroup value={data.is_cap_flip_alumnus} onValueChange={(v) => set("is_cap_flip_alumnus", v as "yes" | "no")}
                    className="mt-2 grid grid-cols-2 gap-2">
                    {[["yes", "Yes"], ["no", "No"]].map(([v, l]) => (
                      <Label key={v} htmlFor={`alum-${v}`}
                        className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary cursor-pointer">
                        <RadioGroupItem value={v} id={`alum-${v}`} />
                        <span className="text-sm font-normal">{l}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
                {data.is_cap_flip_alumnus === "yes" && (
                  <div>
                    <Label htmlFor="cap_flip_cohort">CAP / FLIP Cohort *</Label>
                    <Input id="cap_flip_cohort" value={data.cap_flip_cohort}
                      onChange={(e) => set("cap_flip_cohort", e.target.value)}
                      className="mt-1.5 rounded-xl max-w-xs" placeholder="e.g. CAP Cohort 2" />
                    {errors.cap_flip_cohort && <p className="text-destructive text-xs mt-1">{errors.cap_flip_cohort}</p>}
                  </div>
                )}

                <div>
                  <Label>How did you hear about this opportunity?</Label>
                  <Select value={data.referral_source} onValueChange={(v) => set("referral_source", v)}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select a source" /></SelectTrigger>
                    <SelectContent>
                      {referralSources.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="additional_info">Anything else we should know?</Label>
                  <Textarea id="additional_info" value={data.additional_info}
                    onChange={(e) => set("additional_info", e.target.value)}
                    className="mt-1.5 rounded-xl min-h-[100px]"
                    placeholder="Optional — share any relevant skills, certifications, or context." />
                </div>

                <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-semibold mb-1">Application is 100% free</p>
                    <p className="text-muted-foreground text-xs">
                      No payment required. Training and job referral are <strong>completely free</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={back} className="rounded-xl">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : (
                <Button variant="outline" asChild className="rounded-xl">
                  <Link to="/programs/gjp"><ArrowLeft className="w-4 h-4" /> Cancel</Link>
                </Button>
              )}
              {step < total ? (
                <Button onClick={next} className="rounded-xl glow-effect">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={submitting} className="rounded-xl glow-effect">
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <>Continue to Payment <ArrowRight className="w-4 h-4" /></>}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}