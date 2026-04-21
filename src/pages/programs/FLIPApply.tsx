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
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55+"];
const educationLevels = [
  "Secondary School",
  "Diploma / OND",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
];
const experienceLevels = [
  "No experience yet",
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];
const tracks = [
  { value: "Tech Starter", label: "Tech Starter", desc: "Starting a career in tech or ideation-stage founder" },
  { value: "Professional", label: "Professional in Tech", desc: "Working in tech (early to mid-stage career)" },
  { value: "Entrepreneur", label: "Tech Entrepreneur", desc: "Building or scaling a tech startup" },
];

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  first_name: z.string().trim().min(1, "Required").max(100),
  last_name: z.string().trim().min(1, "Required").max(100),
  country: z.string().trim().min(1, "Required").max(100),
  state: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  age_range: z.string().min(1, "Select an age range"),
  education: z.string().min(1, "Select your education"),
  job_role: z.string().trim().max(200).optional().or(z.literal("")),
  experience: z.string().min(1, "Select your experience"),
  commitment: z.boolean(),
  interview_availability: z.string().trim().max(500).optional().or(z.literal("")),
  preferred_track: z.string().min(1, "Select a track"),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  email: "", first_name: "", last_name: "", country: "", state: "", phone: "",
  age_range: "", education: "", job_role: "", experience: "",
  commitment: false, interview_availability: "", preferred_track: "",
};

const stepFields: Record<number, (keyof FormState)[]> = {
  1: ["email", "first_name", "last_name", "country", "state", "phone"],
  2: ["age_range", "education", "job_role", "experience"],
  3: ["commitment", "interview_availability", "preferred_track"],
};

export default function FLIPApply() {
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
    const fields = stepFields[s];
    const partial: Partial<FormState> = {};
    fields.forEach((f) => ((partial as any)[f] = data[f]));
    const result = schema.partial().safeParse(partial);
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const k = issue.path[0] as keyof FormState;
        if (fields.includes(k)) newErrors[k] = issue.message;
      });
    }
    // Step-specific required checks (Zod partial skips required)
    fields.forEach((f) => {
      const val = data[f];
      if (f === "commitment") return; // boolean ok
      if (f === "state" || f === "job_role" || f === "interview_availability") return;
      if (!val || (typeof val === "string" && !val.trim())) {
        newErrors[f] = "Required";
      }
    });
    if (s === 1 && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email";
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
    if (!data.commitment) {
      toast.error("You must commit to 5 hours/week to enroll.");
      return;
    }
    setSubmitting(true);
    const { data: row, error } = await supabase
      .from("flip_applications")
      .insert({
        email: data.email.trim(),
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        country: data.country.trim(),
        state: data.state?.trim() || null,
        phone: data.phone.trim(),
        age_range: data.age_range,
        education: data.education,
        job_role: data.job_role?.trim() || null,
        experience: data.experience,
        commitment: data.commitment,
        interview_availability: data.interview_availability?.trim() || null,
        preferred_track: data.preferred_track,
        payment_status: "pending",
      })
      .select("id")
      .single();
    setSubmitting(false);
    if (error || !row) {
      toast.error("Could not save your application. Please try again.");
      return;
    }
    navigate(`/programs/flip/payment?app=${row.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Apply – FLIP Fellowship | Sara Foundation</title>
        <meta name="description" content="Apply to the FLIP Fellowship — a women-focused tech community by Sara Foundation Africa." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/flip/apply" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-3xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-accent text-xs font-medium mb-4">
              <Users className="w-3 h-3" /> FLIP Fellowship Application
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Join the FLIP Fellowship
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
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="mt-1.5 rounded-xl" placeholder="you@example.com" />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input id="first_name" value={data.first_name}
                      onChange={(e) => set("first_name", e.target.value)}
                      className="mt-1.5 rounded-xl" />
                    {errors.first_name && <p className="text-destructive text-xs mt-1">{errors.first_name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input id="last_name" value={data.last_name}
                      onChange={(e) => set("last_name", e.target.value)}
                      className="mt-1.5 rounded-xl" />
                    {errors.last_name && <p className="text-destructive text-xs mt-1">{errors.last_name}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" value={data.country}
                      onChange={(e) => set("country", e.target.value)}
                      className="mt-1.5 rounded-xl" placeholder="Nigeria" />
                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state">State / Region</Label>
                    <Input id="state" value={data.state}
                      onChange={(e) => set("state", e.target.value)}
                      className="mt-1.5 rounded-xl" placeholder="Lagos" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">WhatsApp Phone Number *</Label>
                  <Input id="phone" value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="mt-1.5 rounded-xl" placeholder="+234 ..." />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Background</h2>
                <div>
                  <Label>Age Range *</Label>
                  <Select value={data.age_range} onValueChange={(v) => set("age_range", v)}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select age range" /></SelectTrigger>
                    <SelectContent>
                      {ageRanges.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.age_range && <p className="text-destructive text-xs mt-1">{errors.age_range}</p>}
                </div>
                <div>
                  <Label>Highest Level of Education *</Label>
                  <RadioGroup value={data.education} onValueChange={(v) => set("education", v)} className="mt-2 grid sm:grid-cols-2 gap-2">
                    {educationLevels.map((e) => (
                      <Label key={e} htmlFor={`edu-${e}`}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent cursor-pointer">
                        <RadioGroupItem value={e} id={`edu-${e}`} />
                        <span className="text-sm font-normal">{e}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.education && <p className="text-destructive text-xs mt-1">{errors.education}</p>}
                </div>
                <div>
                  <Label htmlFor="job_role">Current Job Role / Field</Label>
                  <Input id="job_role" value={data.job_role}
                    onChange={(e) => set("job_role", e.target.value)}
                    className="mt-1.5 rounded-xl" placeholder="e.g. Software Engineer, Student" />
                </div>
                <div>
                  <Label>Years of Experience *</Label>
                  <RadioGroup value={data.experience} onValueChange={(v) => set("experience", v)} className="mt-2 grid sm:grid-cols-2 gap-2">
                    {experienceLevels.map((e) => (
                      <Label key={e} htmlFor={`exp-${e}`}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent cursor-pointer">
                        <RadioGroupItem value={e} id={`exp-${e}`} />
                        <span className="text-sm font-normal">{e}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.experience && <p className="text-destructive text-xs mt-1">{errors.experience}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Commitment & Track</h2>
                <div className="p-4 rounded-xl border border-border bg-secondary/30">
                  <Label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 accent-accent"
                      checked={data.commitment}
                      onChange={(e) => set("commitment", e.target.checked)} />
                    <span className="text-sm font-normal">
                      I commit to dedicating <strong>at least 5 hours per week</strong> to the FLIP Fellowship activities.
                    </span>
                  </Label>
                </div>
                <div>
                  <Label htmlFor="interview">Interview Availability</Label>
                  <Textarea id="interview" value={data.interview_availability}
                    onChange={(e) => set("interview_availability", e.target.value)}
                    className="mt-1.5 rounded-xl min-h-[80px]"
                    placeholder="e.g. Weekdays after 6pm WAT, weekends anytime" />
                </div>
                <div>
                  <Label>Preferred Track *</Label>
                  <RadioGroup value={data.preferred_track} onValueChange={(v) => set("preferred_track", v)} className="mt-2 space-y-2">
                    {tracks.map((t) => (
                      <Label key={t.value} htmlFor={`tr-${t.value}`}
                        className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-accent cursor-pointer">
                        <RadioGroupItem value={t.value} id={`tr-${t.value}`} className="mt-1" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">{t.label}</p>
                          <p className="text-xs text-muted-foreground">{t.desc}</p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.preferred_track && <p className="text-destructive text-xs mt-1">{errors.preferred_track}</p>}
                </div>

                <div className="rounded-xl bg-accent/10 border border-accent/30 p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Next: a one-time enrollment fee of <strong>₦1,000</strong> (Nigeria) or <strong>$1</strong> (Global) confirms your spot.
                  </p>
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
                  <Link to="/programs/flip"><ArrowLeft className="w-4 h-4" /> Cancel</Link>
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