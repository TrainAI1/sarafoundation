import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created! You can now log in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Check if admin
        const { data } = await supabase.rpc("is_admin");
        if (!data) {
          await supabase.auth.signOut();
          toast.error("Access denied. Admin only.");
          return;
        }

        toast.success("Welcome back!");
        navigate("/admin");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Sara Foundation</p>
        </div>

        <form onSubmit={handleAuth} className="card-modern p-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-xs text-muted-foreground hover:text-primary w-full text-center">
            {isSignUp ? "Already have an account? Sign in" : "First time? Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
