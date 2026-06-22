import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Mail, Newspaper, GraduationCap, Briefcase, PenTool,
  ArrowUpRight, ArrowDownRight, Inbox, ChevronRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { useAdmin } from "@/hooks/useAdmin";
import { format, subDays, startOfDay } from "date-fns";

interface RecentRow { id: string; label: string; sub: string; created_at: string; href: string }
interface DailyPoint { date: string; cap: number; flip: number; gjp: number; contacts: number }
interface FunnelPoint { status: string; cap: number; flip: number; gjp: number }

const STATUS_ORDER = ["new", "review", "shortlisted", "accepted", "rejected"];

function changePct(curr: number, prev: number) {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 100);
}

export default function AdminDashboard() {
  const { isAdmin, canEditContent, canModerate, email } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({
    contacts7: 0, contacts7Prev: 0, contactsTotal: 0,
    subs: 0, subs7: 0,
    cap: 0, cap7: 0, cap7Prev: 0,
    flip: 0, flip7: 0, flip7Prev: 0,
    gjp: 0, gjp7: 0, gjp7Prev: 0,
    posts: 0, postsPublished: 0,
  });
  const [daily, setDaily] = useState<DailyPoint[]>([]);
  const [funnel, setFunnel] = useState<FunnelPoint[]>([]);
  const [topUnis, setTopUnis] = useState<{ name: string; count: number }[]>([]);
  const [recentContacts, setRecentContacts] = useState<RecentRow[]>([]);
  const [recentApps, setRecentApps] = useState<RecentRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const now = new Date();
      const d30 = subDays(now, 30).toISOString();
      const d7 = subDays(now, 7).toISOString();
      const d14 = subDays(now, 14).toISOString();

      const [
        contactsTotalRes, contacts7Res, contacts7PrevRes,
        subsRes, subs7Res,
        capTotalRes, cap7Res, cap7PrevRes, capRecentRes, capStatusRes, capUniRes,
        flipTotalRes, flip7Res, flip7PrevRes, flipRecentRes, flipStatusRes,
        gjpTotalRes, gjp7Res, gjp7PrevRes, gjpRecentRes, gjpStatusRes,
        contactRecentRes,
        postsTotalRes, postsPubRes,
      ] = await Promise.all([
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).gte("created_at", d7),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).gte("created_at", d14).lt("created_at", d7),
        supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).gte("created_at", d7),
        supabase.from("cap_applications").select("*", { count: "exact", head: true }),
        supabase.from("cap_applications").select("*", { count: "exact", head: true }).gte("created_at", d7),
        supabase.from("cap_applications").select("*", { count: "exact", head: true }).gte("created_at", d14).lt("created_at", d7),
        supabase.from("cap_applications").select("id, full_name, email, created_at").gte("created_at", d30).order("created_at", { ascending: true }),
        supabase.from("cap_applications").select("applicant_status"),
        supabase.from("cap_applications").select("university"),
        supabase.from("flip_applications").select("*", { count: "exact", head: true }),
        supabase.from("flip_applications").select("*", { count: "exact", head: true }).gte("created_at", d7),
        supabase.from("flip_applications").select("*", { count: "exact", head: true }).gte("created_at", d14).lt("created_at", d7),
        supabase.from("flip_applications").select("id, first_name, last_name, email, created_at").gte("created_at", d30).order("created_at", { ascending: true }),
        supabase.from("flip_applications").select("applicant_status"),
        supabase.from("gjp_applications").select("*", { count: "exact", head: true }),
        supabase.from("gjp_applications").select("*", { count: "exact", head: true }).gte("created_at", d7),
        supabase.from("gjp_applications").select("*", { count: "exact", head: true }).gte("created_at", d14).lt("created_at", d7),
        supabase.from("gjp_applications").select("id, full_name, email, created_at").gte("created_at", d30).order("created_at", { ascending: true }),
        supabase.from("gjp_applications").select("applicant_status"),
        supabase.from("contact_submissions").select("id, first_name, last_name, email, topic, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
      ]);

      setKpis({
        contactsTotal: contactsTotalRes.count ?? 0,
        contacts7: contacts7Res.count ?? 0,
        contacts7Prev: contacts7PrevRes.count ?? 0,
        subs: subsRes.count ?? 0,
        subs7: subs7Res.count ?? 0,
        cap: capTotalRes.count ?? 0, cap7: cap7Res.count ?? 0, cap7Prev: cap7PrevRes.count ?? 0,
        flip: flipTotalRes.count ?? 0, flip7: flip7Res.count ?? 0, flip7Prev: flip7PrevRes.count ?? 0,
        gjp: gjpTotalRes.count ?? 0, gjp7: gjp7Res.count ?? 0, gjp7Prev: gjp7PrevRes.count ?? 0,
        posts: postsTotalRes.count ?? 0,
        postsPublished: postsPubRes.count ?? 0,
      });

      // Build daily series for last 30 days
      const dayMap = new Map<string, DailyPoint>();
      for (let i = 29; i >= 0; i--) {
        const d = format(subDays(now, i), "MMM d");
        dayMap.set(d, { date: d, cap: 0, flip: 0, gjp: 0, contacts: 0 });
      }
      const addToDay = (rows: { created_at: string }[] | null, key: keyof DailyPoint) => {
        (rows ?? []).forEach((r) => {
          const k = format(startOfDay(new Date(r.created_at)), "MMM d");
          const p = dayMap.get(k);
          if (p) (p[key] as number) += 1;
        });
      };
      addToDay((capRecentRes.data ?? []) as { created_at: string }[], "cap");
      addToDay((flipRecentRes.data ?? []) as { created_at: string }[], "flip");
      addToDay((gjpRecentRes.data ?? []) as { created_at: string }[], "gjp");
      setDaily(Array.from(dayMap.values()));

      // Funnel by status
      const funnelMap = new Map<string, FunnelPoint>();
      STATUS_ORDER.forEach((s) => funnelMap.set(s, { status: s, cap: 0, flip: 0, gjp: 0 }));
      const tally = (rows: { applicant_status: string | null }[] | null, key: "cap" | "flip" | "gjp") => {
        (rows ?? []).forEach((r) => {
          const s = (r.applicant_status ?? "new").toLowerCase();
          const k = STATUS_ORDER.includes(s) ? s : "new";
          const p = funnelMap.get(k);
          if (p) p[key] += 1;
        });
      };
      tally(capStatusRes.data as { applicant_status: string | null }[] | null, "cap");
      tally(flipStatusRes.data as { applicant_status: string | null }[] | null, "flip");
      tally(gjpStatusRes.data as { applicant_status: string | null }[] | null, "gjp");
      setFunnel(Array.from(funnelMap.values()));

      // Top universities
      const uniCount = new Map<string, number>();
      (capUniRes.data ?? []).forEach((r: { university: string | null }) => {
        const u = (r.university ?? "").trim();
        if (!u || u.toLowerCase() === "not provided" || u.toLowerCase() === "n/a") return;
        uniCount.set(u, (uniCount.get(u) ?? 0) + 1);
      });
      setTopUnis(
        Array.from(uniCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }))
      );

      // Recent rows
      setRecentContacts(
        ((contactRecentRes.data ?? []) as { id: string; first_name: string; last_name: string; email: string; topic: string | null; created_at: string }[]).map((c) => ({
          id: c.id,
          label: `${c.first_name} ${c.last_name}`,
          sub: c.topic ?? c.email,
          created_at: c.created_at,
          href: "/admin/contacts",
        }))
      );
      const appRows: RecentRow[] = [];
      const pushApps = (
        rows: { id: string; name: string; email: string; created_at: string }[],
        type: string,
        href: string,
      ) => {
        rows.slice(-3).reverse().forEach((r) => appRows.push({
          id: `${type}-${r.id}`, label: r.name, sub: `${type} · ${r.email}`, created_at: r.created_at, href,
        }));
      };
      pushApps(
        ((capRecentRes.data ?? []) as { id: string; full_name: string; email: string; created_at: string }[]).map((r) => ({
          id: r.id, name: r.full_name, email: r.email, created_at: r.created_at,
        })),
        "CAP", "/admin/cap-applications"
      );
      pushApps(
        ((flipRecentRes.data ?? []) as { id: string; first_name: string; last_name: string; email: string; created_at: string }[]).map((r) => ({
          id: r.id, name: `${r.first_name} ${r.last_name}`, email: r.email, created_at: r.created_at,
        })),
        "FLIP", "/admin/flip-applications"
      );
      pushApps(
        ((gjpRecentRes.data ?? []) as { id: string; full_name: string; email: string; created_at: string }[]).map((r) => ({
          id: r.id, name: r.full_name, email: r.email, created_at: r.created_at,
        })),
        "GJP", "/admin/gjp-applications"
      );
      appRows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecentApps(appRows.slice(0, 6));

      setLoading(false);
    };
    load();
  }, []);

  const kpiCards = useMemo(() => [
    { label: "Contacts (7d)", value: kpis.contacts7, total: kpis.contactsTotal, change: changePct(kpis.contacts7, kpis.contacts7Prev), icon: Mail, color: "primary" },
    { label: "CAP Applications (7d)", value: kpis.cap7, total: kpis.cap, change: changePct(kpis.cap7, kpis.cap7Prev), icon: GraduationCap, color: "accent" },
    { label: "FLIP Applications (7d)", value: kpis.flip7, total: kpis.flip, change: changePct(kpis.flip7, kpis.flip7Prev), icon: GraduationCap, color: "success" },
    { label: "GJP Applications (7d)", value: kpis.gjp7, total: kpis.gjp, change: changePct(kpis.gjp7, kpis.gjp7Prev), icon: Briefcase, color: "primary" },
    { label: "Newsletter Subs", value: kpis.subs7, total: kpis.subs, change: 0, icon: Newspaper, color: "accent" },
    { label: "Posts Published", value: kpis.postsPublished, total: kpis.posts, change: 0, icon: PenTool, color: "success" },
  ], [kpis]);

  const colorClass = (c: string) =>
    c === "primary" ? "bg-primary/10 text-primary" :
    c === "accent" ? "bg-accent/10 text-accent" :
    "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]";

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Operations Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back{email ? `, ${email.split("@")[0]}` : ""}. Live overview of submissions, applications, and content.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {canModerate && <Link to="/admin/cap-applications" className="text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/15 font-medium">Review CAP queue</Link>}
          {canEditContent && <Link to="/admin/blog/new" className="text-xs px-3 py-1.5 rounded-md bg-accent/10 text-accent hover:bg-accent/15 font-medium">New blog post</Link>}
          {isAdmin && <Link to="/admin/users" className="text-xs px-3 py-1.5 rounded-md bg-secondary text-foreground hover:bg-secondary/70 font-medium">Manage users</Link>}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {kpiCards.map((k) => (
          <div key={k.label} className="card-modern p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass(k.color)}`}>
                <k.icon className="w-4 h-4" />
              </div>
              {k.change !== 0 && (
                <span className={`text-xs font-semibold flex items-center ${k.change > 0 ? "text-[hsl(var(--success))]" : "text-destructive"}`}>
                  {k.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(k.change)}%
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">{loading ? "—" : k.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Total: {k.total.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 card-modern p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-foreground text-sm">Applications · last 30 days</h3>
            <span className="text-xs text-muted-foreground">CAP · FLIP · GJP</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={daily}>
                <defs>
                  <linearGradient id="g-cap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-flip" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-gjp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="cap" name="CAP" stackId="1" stroke="hsl(var(--primary))" fill="url(#g-cap)" strokeWidth={2} />
                <Area type="monotone" dataKey="flip" name="FLIP" stackId="1" stroke="hsl(var(--accent))" fill="url(#g-flip)" strokeWidth={2} />
                <Area type="monotone" dataKey="gjp" name="GJP" stackId="1" stroke="hsl(var(--success))" fill="url(#g-gjp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-modern p-4 md:p-5">
          <h3 className="font-display font-bold text-foreground text-sm mb-4">Pipeline by status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="status" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="cap" name="CAP" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="flip" name="FLIP" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gjp" name="GJP" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card-modern overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-2"><Inbox className="w-4 h-4 text-primary" /> Latest Contacts</h3>
            <Link to="/admin/contacts" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {recentContacts.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">No messages yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {recentContacts.map((c) => (
                <Link key={c.id} to={c.href} className="flex items-center justify-between p-3 hover:bg-secondary/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="card-modern overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-2"><GraduationCap className="w-4 h-4 text-accent" /> Latest Applications</h3>
          </div>
          {recentApps.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">No applications yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {recentApps.map((r) => (
                <Link key={r.id} to={r.href} className="flex items-center justify-between p-3 hover:bg-secondary/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{r.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="card-modern overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-bold text-foreground text-sm">Top CAP universities</h3>
          </div>
          {topUnis.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">No data yet.</div>
          ) : (
            <div className="p-4 space-y-2">
              {topUnis.map((u) => {
                const max = topUnis[0]?.count || 1;
                return (
                  <div key={u.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-foreground font-medium truncate">{u.name}</span>
                      <span className="text-muted-foreground">{u.count}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="bg-primary rounded-full h-1.5" style={{ width: `${(u.count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
