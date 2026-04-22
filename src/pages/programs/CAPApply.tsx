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
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const yearLevels = [
  "100 Level", "200 Level", "300 Level", "400 Level",
  "500 Level", "600 Level", "700 Level", "Other",
];

const tracks = [
  { value: "No Code Track", label: "No Code Track", desc: "Product Management, UI/UX, Business Analysis" },
  { value: "Code Track", label: "Code Track", desc: "Full Stack, Front End, Back End Development" },
  { value: "Tech-preneur", label: "Tech-preneur Track", desc: "Venture Capital Analyst or Founders Program" },
];

const codeSpecs = ["Full Stack Development", "Front End Development", "Back End Development"];
const noCodeSpecs = ["Product Management", "UI/UX Design", "Business Analysis"];
const techpreneurSpecs = ["Venture Capital Analyst Program", "Founders Program"];
const referralSources = ["Students Leads", "LinkedIn", "Twitter", "Facebook", "Instagram", "Other"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  country: z.string().trim().min(1, "Required").max(100),
  university: z.string().trim().min(2, "Required").max(200),
  year_of_study: z.string().min(1, "Select your year"),
  preferred_track: z.string().min(1, "Select a track"),
  specialization: z.string().trim().max(100).optional().or(z.literal("")),
  motivation: z.string().trim().max(2000).optional().or(z.literal("")),
  referral_source: z.string().trim().max(100).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  full_name: "", email: "", phone: "", country: "",
  university: "", year_of_study: "",
  preferred_track: "", specialization: "", motivation: "", referral_source: "",
};

const stepFields: Record<number, (keyof FormState)[]> = {
  1: ["full_name", "email", "phone", "country"],
  2: ["university", "year_of_study"],
  3: ["preferred_track", "specialization", "motivation", "referral_source"],
};

export default function CAPApply() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const total = 3;
  const progress = (step / total) * 100;
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const specOptions =
    data.preferred_track === "Code Track" ? codeSpecs :
    data.preferred_track === "No Code Track" ? noCodeSpecs :
    data.preferred_track === "Tech-preneur" ? techpreneurSpecs : [];

  const validateStep = (s: number) => {
    const fields = stepFields[s];
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    fields.forEach((f) => {
      const val = data[f];
      if (f === "specialization" || f === "motivation" || f === "referral_source") return;
      if (!val || (typeof val === "string" && !val.trim())) newErrors[f] = "Required";
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
    setSubmitting(true);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setSubmitting(false);
      toast.error("Please review your answers.");
      return;
    }
    const { data: row, error } = await supabase
      .from("cap_applications")
      .insert({
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        country: data.country.trim(),
        university: data.university.trim(),
        year_of_study: data.year_of_study,
        preferred_track: data.preferred_track,
        specialization: data.specialization?.trim() || null,
        motivation: data.motivation?.trim() || null,
        referral_source: data.referral_source?.trim() || null,
        payment_plan: "full",
        payment_status: "pending",
      })
      .select("id")
      .single();
    setSubmitting(false);
    if (error || !row) {
      toast.error("Could not save your application. Please try again.");
      return;
    }
    navigate(`/programs/cap/payment?app=${row.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Apply – CAP Tech Hub Cohort 3 | Sara Foundation</title>
        <meta name="description" content="Apply to join CAP Tech Hub Cohort 3 — a 3-month tech career program for African undergraduates." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/cap/apply" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-3xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-medium mb-4">
              <GraduationCap className="w-3 h-3" /> CAP Tech Hub · Cohort 3
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Join Cohort 3
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
                    <Label htmlFor="phone">Phone (WhatsApp) *</Label>
                    <Input id="phone" value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="mt-1.5 rounded-xl" placeholder="+234 ..." />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" value={data.country}
                      onChange={(e) => set("country", e.target.value)}
                      className="mt-1.5 rounded-xl" placeholder="Nigeria" />
                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Academic Background</h2>
                <div>
                  <Label htmlFor="university">Name of University *</Label>
                  <Input id="university" value={data.university}
                    onChange={(e) => set("university", e.target.value)}
                    className="mt-1.5 rounded-xl" placeholder="University of Lagos" />
                  {errors.university && <p className="text-destructive text-xs mt-1">{errors.university}</p>}
                </div>
                <div>
                  <Label>Current Year of Study *</Label>
                  <RadioGroup value={data.year_of_study} onValueChange={(v) => set("year_of_study", v)}
                    className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {yearLevels.map((y) => (
                      <Label key={y} htmlFor={`yr-${y}`}
                        className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary cursor-pointer">
                        <RadioGroupItem value={y} id={`yr-${y}`} />
                        <span className="text-sm font-normal">{y}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.year_of_study && <p className="text-destructive text-xs mt-1">{errors.year_of_study}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Track & Motivation</h2>
                <div>
                  <Label>Preferred Track *</Label>
                  <RadioGroup value={data.preferred_track}
                    onValueChange={(v) => { set("preferred_track", v); set("specialization", ""); }}
                    className="mt-2 space-y-2">
                    {tracks.map((t) => (
                      <Label key={t.value} htmlFor={`tr-${t.value}`}
                        className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary cursor-pointer">
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

                {specOptions.length > 0 && (
                  <div>
                    <Label>Specialization</Label>
                    <Select value={data.specialization} onValueChange={(v) => set("specialization", v)}>
                      <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Choose a specialization" /></SelectTrigger>
                      <SelectContent>
                        {specOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="motivation">Why are you interested in joining CAP Tech Hub?</Label>
                  <Textarea id="motivation" value={data.motivation}
                    onChange={(e) => set("motivation", e.target.value)}
                    className="mt-1.5 rounded-xl min-h-[100px]"
                    placeholder="Share what drives you..." />
                </div>

                <div>
                  <Label>How did you hear about us?</Label>
                  <Select value={data.referral_source} onValueChange={(v) => set("referral_source", v)}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select a source" /></SelectTrigger>
                    <SelectContent>
                      {referralSources.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-semibold mb-1">Next: Choose your payment plan</p>
                    <p className="text-muted-foreground text-xs">
                      Pay in full <strong>₦90,000 / $60</strong>, or in 3 monthly installments of <strong>₦30,000 / $20</strong>.
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
                  <Link to="/programs/cap"><ArrowLeft className="w-4 h-4" /> Cancel</Link>
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