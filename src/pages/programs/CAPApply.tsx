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

const undergradYears = [
  "100 Level", "200 Level", "300 Level", "400 Level",
  "500 Level", "600 Level", "700 Level",
];
const educationLevels = [
  "Undergraduate",
  "Postgraduate (Masters)",
  "PhD",
  "Recent Graduate",
];
const genders = ["Female", "Male", "Non-binary", "Prefer not to say"];

const tracks = [
  { value: "No-Code Track", label: "No-Code Track", desc: "Cybersecurity, Data Analysis, Product Management, Product Marketing, UI/UX Design" },
  { value: "Code Track", label: "Code Track", desc: "Full Stack, Front End, Back End Development" },
  { value: "Founders Program", label: "Founders Program", desc: "For aspiring tech entrepreneurs building their own venture" },
];

const codeSpecs = ["Full Stack Development", "Front End Development", "Back End Development"];
const noCodeSpecs = ["Cybersecurity", "Data Analysis", "Product Management", "Product Marketing", "UI/UX Design"];
const referralSources = ["Student Leads", "LinkedIn", "Twitter", "Facebook", "Instagram", "Friend / Alumni", "Other"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  country: z.string().trim().min(1, "Required").max(100),
  gender: z.string().min(1, "Required").max(50),
  date_of_birth: z.string().min(1, "Required"),
  education_level: z.string().min(1, "Required").max(100),
  university: z.string().trim().min(2, "Required").max(200),
  course_of_study: z.string().trim().min(2, "Required").max(200),
  year_of_study: z.string().min(1, "Required"),
  preferred_track: z.string().min(1, "Select a track"),
  specialization: z.string().trim().max(100).optional().or(z.literal("")),
  motivation: z.string().trim().max(2000).optional().or(z.literal("")),
  referral_source: z.string().trim().max(100).optional().or(z.literal("")),
  referral_source_other: z.string().trim().max(200).optional().or(z.literal("")),
  partner_code: z.string().trim().max(50).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  full_name: "", email: "", phone: "", country: "",
  gender: "", date_of_birth: "", education_level: "",
  university: "", course_of_study: "", year_of_study: "",
  preferred_track: "", specialization: "", motivation: "",
  referral_source: "", referral_source_other: "",
  partner_code: "",
};

const stepFields: Record<number, (keyof FormState)[]> = {
  1: ["full_name", "email", "phone", "country", "gender", "date_of_birth"],
  2: ["education_level", "university", "course_of_study", "year_of_study"],
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
    data.preferred_track === "No-Code Track" ? noCodeSpecs : [];

  const validateStep = (s: number) => {
    const fields = stepFields[s];
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    fields.forEach((f) => {
      const val = data[f];
      if (f === "specialization" || f === "motivation" || f === "referral_source") return;
      if (f === "year_of_study" && data.education_level !== "Undergraduate") return;
      if (!val || (typeof val === "string" && !val.trim())) newErrors[f] = "Required";
    });
    if (s === 1 && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (s === 1 && data.date_of_birth) {
      const d = new Date(data.date_of_birth);
      if (isNaN(d.getTime()) || d > new Date()) newErrors.date_of_birth = "Enter a valid date";
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
    // Consolidate referral source if "Other" was selected
    const finalReferral = data.referral_source === "Other" && data.referral_source_other?.trim()
      ? `Other: ${data.referral_source_other.trim()}`
      : (data.referral_source || null);
    // Partner waiver code — full fee waived, skip payment entirely
    const WAIVER_CODE = "TRAINFREE456";
    const isWaiver = (data.partner_code || "").trim().toUpperCase() === WAIVER_CODE;
    if (isWaiver) {
      const { data: resp, error: fnErr } = await supabase.functions.invoke("submit-cap-waiver", {
        body: {
          waiver_code: data.partner_code,
          full_name: data.full_name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          country: data.country.trim(),
          gender: data.gender,
          date_of_birth: data.date_of_birth,
          education_level: data.education_level,
          university: data.university.trim(),
          course_of_study: data.course_of_study.trim(),
          year_of_study: data.year_of_study || null,
          preferred_track: data.preferred_track,
          specialization: data.specialization?.trim() || null,
          motivation: data.motivation?.trim() || null,
          referral_source: finalReferral,
        },
      });
      setSubmitting(false);
      if (fnErr || (resp as any)?.error) {
        console.error("waiver submit error:", fnErr || resp);
        toast.error(((resp as any)?.error) || fnErr?.message || "Could not submit waiver application.");
        return;
      }
      toast.success("Waiver code accepted — your spot is confirmed!");
      navigate(`/programs/cap/success?app=${(resp as any)?.id || ""}`);
      return;
    }
    // Validate partner reference code if supplied
    let partnerCodeId: string | null = null;
    let partnerCodeNormalized: string | null = null;
    if (data.partner_code && data.partner_code.trim()) {
      const { data: codeRows, error: codeErr } = await supabase
        .rpc("validate_partner_code", {
          _code: data.partner_code.trim(),
          _program: "cap",
        });
      if (codeErr || !codeRows || (Array.isArray(codeRows) && codeRows.length === 0)) {
        setSubmitting(false);
        toast.error("That reference code is invalid or expired.");
        return;
      }
      const row = Array.isArray(codeRows) ? codeRows[0] : codeRows;
      partnerCodeId = row.id;
      partnerCodeNormalized = row.code;
    }
    const newId = (typeof crypto !== "undefined" && "randomUUID" in crypto)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const { error } = await supabase
      .from("cap_applications")
      .insert({
        id: newId,
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        country: data.country.trim(),
        gender: data.gender,
        date_of_birth: data.date_of_birth,
        education_level: data.education_level,
        university: data.university.trim(),
        course_of_study: data.course_of_study.trim(),
        year_of_study: data.year_of_study || null,
        preferred_track: data.preferred_track,
        specialization: data.specialization?.trim() || null,
        motivation: data.motivation?.trim() || null,
        referral_source: finalReferral,
        payment_plan: "full",
        payment_status: "pending",
        paid_amount: 0,
        partner_code: partnerCodeNormalized,
        partner_code_id: partnerCodeId,
        status_notes: null,
      } as any);
    setSubmitting(false);
    if (error) {
      console.error("CAP submit error:", error);
      toast.error(error.message || "Could not save your application. Please try again.");
      return;
    }
    navigate(`/programs/cap/payment?app=${newId}`);
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

                <div className="rounded-xl border border-dashed border-primary/40 p-4 bg-primary/5">
                  <Label htmlFor="partner_code" className="text-foreground">
                    Partner Reference Code <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="partner_code"
                    value={data.partner_code}
                    onChange={(e) => set("partner_code", e.target.value.toUpperCase())}
                    className="mt-1.5 rounded-xl uppercase"
                    placeholder="e.g. PARTNER2025"
                    maxLength={50}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Have a code from one of our partners? Enter it to unlock subsidised partner pricing
                    (₦90,000 full, or ₦30,000 upfront with a ₦60,000 commitment).
                  </p>
                </div>

                <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-semibold mb-1">Next: Choose your payment plan</p>
                    <p className="text-muted-foreground text-xs">
                      Standard program fee is <strong>₦1,000,000 / £500</strong>. Subsidised partner pricing
                      (₦90,000 full or ₦30,000 + ₦60,000 commitment) is unlocked with a valid partner code.
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