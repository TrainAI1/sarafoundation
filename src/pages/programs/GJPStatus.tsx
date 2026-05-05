import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Search, Loader2, CheckCircle2, Clock, XCircle, Award, GraduationCap, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";

type Status = {
  full_name: string;
  career_path: string;
  payment_status: string;
  applicant_status: string;
  status_notes: string | null;
  status_updated_at: string;
  created_at: string;
};

const stepsList = [
  { key: "submitted", label: "Submitted", icon: FileText },
  { key: "under_review", label: "Under Review", icon: Clock },
  { key: "shortlisted", label: "Shortlisted", icon: CheckCircle2 },
  { key: "training", label: "Training", icon: GraduationCap },
  { key: "placed", label: "Placed", icon: Award },
];

const stepIndex = (s: string) => stepsList.findIndex((x) => x.key === s);

export default function GJPStatus() {
  const [email, setEmail] = useState("");
  const [appId, setAppId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Status | null>(null);
  const [notFound, setNotFound] = useState(false);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !appId.trim()) {
      toast.error("Enter both your email and application ID.");
      return;
    }
    setLoading(true);
    setNotFound(false);
    setResult(null);
    const { data, error } = await supabase.rpc("get_gjp_status_by_email_appid", {
      _email: email.trim(),
      _app_id_prefix: appId.trim().toLowerCase().slice(0, 8),
    });
    setLoading(false);
    if (error) {
      console.error(error);
      toast.error("Could not check status. Try again.");
      return;
    }
    const row = (data as Status[] | null)?.[0];
    if (!row) {
      setNotFound(true);
      return;
    }
    setResult(row);
  };

  const isRejected = result?.applicant_status === "rejected";
  const isWithdrawn = result?.applicant_status === "withdrawn";
  const currentIdx = result ? stepIndex(result.applicant_status) : -1;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Check Application Status – GJP | Sara Foundation</title>
        <meta name="description" content="Check the status of your Government Job Placement (GJP) application using your email and payment reference." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/gjp/status" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-2xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-medium mb-4">
              <Briefcase className="w-3 h-3" /> GJP · Application Status
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Check Your Application Status
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Enter the email you applied with and your application ID (shown after submission).
            </p>
          </div>

          <form onSubmit={lookup} className="card-modern p-5 md:p-8 space-y-5">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 rounded-xl" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="appid">Application ID</Label>
              <Input id="appid" value={appId}
                onChange={(e) => setAppId(e.target.value)}
                className="mt-1.5 rounded-xl font-mono"
                placeholder="e.g. a1b2c3d4" maxLength={8} />
              <p className="text-xs text-muted-foreground mt-1">
                The 8-character ID shown on your application confirmation page.
              </p>
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full rounded-xl glow-effect">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</> : <><Search className="w-4 h-4" /> Check Status</>}
            </Button>
          </form>

          {notFound && (
            <div className="mt-6 card-modern p-5 text-center">
              <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="font-semibold text-foreground">No matching application found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Double-check your email and application ID and try again.
              </p>
            </div>
          )}

          {result && (
            <div className="mt-6 card-modern p-5 md:p-8">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Applicant</p>
                  <p className="font-semibold text-foreground">{result.full_name}</p>
                  <p className="text-xs text-muted-foreground">{result.career_path}</p>
                </div>
              </div>

              {isRejected || isWithdrawn ? (
                <div className={`rounded-xl p-5 text-center ${isRejected ? "bg-destructive/10 border border-destructive/30" : "bg-secondary/40"}`}>
                  <XCircle className={`w-8 h-8 mx-auto mb-2 ${isRejected ? "text-destructive" : "text-muted-foreground"}`} />
                  <p className="font-semibold text-foreground capitalize">{result.applicant_status}</p>
                  {result.status_notes && (
                    <p className="text-sm text-muted-foreground mt-2">{result.status_notes}</p>
                  )}
                </div>
              ) : (
                <>
                  <ol className="space-y-3 mb-5">
                    {stepsList.map((s, idx) => {
                      const Icon = s.icon;
                      const done = idx < currentIdx;
                      const active = idx === currentIdx;
                      return (
                        <li key={s.key} className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            done ? "bg-emerald-500 text-white" :
                            active ? "bg-primary text-primary-foreground glow-effect" :
                            "bg-secondary text-muted-foreground"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${active ? "text-foreground" : done ? "text-foreground" : "text-muted-foreground"}`}>
                              {s.label}
                              {active && <span className="ml-2 text-xs text-primary">· Current</span>}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  {result.status_notes && (
                    <div className="rounded-xl bg-primary/5 border border-primary/20 p-3 text-sm text-foreground">
                      <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Note from team</p>
                      {result.status_notes}
                    </div>
                  )}
                </>
              )}

              <p className="text-xs text-muted-foreground mt-5 text-center">
                Last updated {format(new Date(result.status_updated_at), "PPpp")}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
