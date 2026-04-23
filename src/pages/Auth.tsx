import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2, Lock, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export default function Auth() {
  const [params, setParams] = useSearchParams();
  const mode = params.get("mode") === "signin" ? "signin" : "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isSignup = mode === "signup";

  const handleEmailAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/external-course`;
      const { error } = isSignup
        ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      if (isSignup) {
        toast.success("Registration started", { description: "Check your email to confirm your account." });
      } else {
        toast.success("Welcome back!");
        navigate("/external-course");
      }
    } catch (err) {
      toast.error(isSignup ? "Registration failed" : "Sign in failed", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/external-course`,
    });
    setLoading(false);
    if (result?.error) {
      toast.error("Google sign in failed", { description: result.error.message });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>{isSignup ? "Register" : "Sign In"} – Sara Foundation Africa</title>
        <meta name="description" content="Register or sign in to access your Sara Foundation learning pathway." />
        <link rel="canonical" href="https://sarafoundationafrica.com/auth" />
      </Helmet>
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      <div className="w-full max-w-md relative z-10">
        <Button variant="ghost" asChild className="mb-5">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
        </Button>

        <div className="card-modern p-6 md:p-8 hover:translate-y-0">
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
              {isSignup ? <Sparkles className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {isSignup ? "Create your account" : "Sign in"}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {isSignup ? "Start your outcome-focused learning pathway." : "Continue your learning pathway."}
            </p>
          </div>

          <Button type="button" variant="outline" className="w-full mb-5" onClick={handleGoogleAuth} disabled={loading}>
            <Mail className="w-4 h-4" /> Continue with Google
          </Button>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1.5 rounded-xl" />
            </div>
            <Button type="submit" className="w-full glow-effect" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSignup ? "Register" : "Sign In"}
            </Button>
          </form>

          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-primary w-full text-center mt-5 transition-colors"
            onClick={() => setParams({ mode: isSignup ? "signin" : "signup" })}
          >
            {isSignup ? "Already have an account? Sign in" : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}