import { useState, useMemo } from "react";
import {
  BarChart3, TrendingUp, Users, Globe, Eye, Clock,
  MousePointerClick, ArrowUpRight, ArrowDownRight, Link2,
  Filter, Calendar, Download, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";

// Mock data generators
const generateDailyData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      pageViews: Math.floor(Math.random() * 400 + 150),
      sessions: Math.floor(Math.random() * 200 + 80),
      users: Math.floor(Math.random() * 150 + 50),
      bounceRate: Math.floor(Math.random() * 30 + 30),
    });
  }
  return data;
};

const trafficSources = [
  { name: "Organic Search", value: 42, color: "hsl(var(--primary))" },
  { name: "Direct", value: 28, color: "hsl(var(--accent))" },
  { name: "Social Media", value: 18, color: "hsl(var(--success))" },
  { name: "Referral", value: 8, color: "hsl(240,80%,50%)" },
  { name: "Email", value: 4, color: "hsl(30,90%,55%)" },
];

const topPages = [
  { path: "/", title: "Home", views: 1842, avgTime: "2:34" },
  { path: "/programs/cap", title: "CAP Tech Hub", views: 956, avgTime: "3:12" },
  { path: "/about", title: "About Us", views: 743, avgTime: "2:05" },
  { path: "/blog", title: "Blog", views: 621, avgTime: "1:48" },
  { path: "/programs/flip", title: "FLIP Program", views: 489, avgTime: "2:56" },
  { path: "/contact", title: "Contact", views: 312, avgTime: "1:22" },
  { path: "/donation", title: "Donation", views: 287, avgTime: "1:45" },
  { path: "/partnership", title: "Partnership", views: 198, avgTime: "2:10" },
];

const utmCampaigns = [
  { campaign: "cap_cohort3_launch", source: "linkedin", medium: "social", sessions: 342, conversions: 28, ctr: "8.2%" },
  { campaign: "flip_fellowship_2025", source: "twitter", medium: "social", sessions: 256, conversions: 19, ctr: "7.4%" },
  { campaign: "impact_report_2025", source: "newsletter", medium: "email", sessions: 198, conversions: 45, ctr: "22.7%" },
  { campaign: "prestige_award", source: "google", medium: "cpc", sessions: 167, conversions: 12, ctr: "7.2%" },
  { campaign: "partner_scintilla", source: "referral", medium: "partner", sessions: 134, conversions: 8, ctr: "6.0%" },
  { campaign: "summer_bootcamp", source: "instagram", medium: "social", sessions: 89, conversions: 6, ctr: "6.7%" },
];

const geoData = [
  { country: "Nigeria", flag: "🇳🇬", sessions: 2456, percentage: 48 },
  { country: "Ghana", flag: "🇬🇭", sessions: 534, percentage: 10 },
  { country: "Kenya", flag: "🇰🇪", sessions: 421, percentage: 8 },
  { country: "United Kingdom", flag: "🇬🇧", sessions: 389, percentage: 8 },
  { country: "Uganda", flag: "🇺🇬", sessions: 312, percentage: 6 },
  { country: "South Africa", flag: "🇿🇦", sessions: 267, percentage: 5 },
  { country: "United States", flag: "🇺🇸", sessions: 234, percentage: 5 },
  { country: "Togo", flag: "🇹🇬", sessions: 189, percentage: 4 },
  { country: "Zambia", flag: "🇿🇲", sessions: 156, percentage: 3 },
  { country: "Other", flag: "🌍", sessions: 167, percentage: 3 },
];

const deviceData = [
  { name: "Mobile", value: 62, color: "hsl(var(--primary))" },
  { name: "Desktop", value: 31, color: "hsl(var(--accent))" },
  { name: "Tablet", value: 7, color: "hsl(var(--success))" },
];

const realTimePages = [
  { path: "/programs/cap", active: 12 },
  { path: "/", active: 8 },
  { path: "/blog/cap-cohort-3", active: 5 },
  { path: "/about", active: 3 },
  { path: "/donation", active: 2 },
];

type DateRange = "7d" | "30d" | "90d";

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
  const dailyData = useMemo(() => generateDailyData(days), [days]);

  const totalPageViews = dailyData.reduce((s, d) => s + d.pageViews, 0);
  const totalSessions = dailyData.reduce((s, d) => s + d.sessions, 0);
  const totalUsers = dailyData.reduce((s, d) => s + d.users, 0);
  const avgBounce = Math.round(dailyData.reduce((s, d) => s + d.bounceRate, 0) / dailyData.length);

  const stats = [
    { label: "Page Views", value: totalPageViews.toLocaleString(), change: "+12.5%", up: true, icon: Eye },
    { label: "Sessions", value: totalSessions.toLocaleString(), change: "+8.3%", up: true, icon: BarChart3 },
    { label: "Unique Users", value: totalUsers.toLocaleString(), change: "+15.2%", up: true, icon: Users },
    { label: "Bounce Rate", value: `${avgBounce}%`, change: "-3.1%", up: false, icon: MousePointerClick },
    { label: "Avg. Session Duration", value: "2m 18s", change: "+5.7%", up: true, icon: Clock },
    { label: "Active Now", value: "30", change: "", up: true, icon: TrendingUp },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Website traffic, UTM campaigns, and audience insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary rounded-lg p-0.5">
            {(["7d", "30d", "90d"] as DateRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  dateRange === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card-modern p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              {stat.change && (
                <span className={`text-xs font-medium flex items-center ${stat.up ? "text-[hsl(var(--success))]" : "text-destructive"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Page Views & Sessions Chart */}
        <div className="lg:col-span-2 card-modern p-4 md:p-5">
          <h3 className="font-display font-bold text-foreground text-sm mb-4">Page Views & Sessions</h3>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="pageViews" stroke="hsl(var(--primary))" fill="url(#pvGrad)" strokeWidth={2} name="Page Views" />
                <Area type="monotone" dataKey="sessions" stroke="hsl(var(--accent))" fill="url(#sessGrad)" strokeWidth={2} name="Sessions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Pie */}
        <div className="card-modern p-4 md:p-5">
          <h3 className="font-display font-bold text-foreground text-sm mb-4">Traffic Sources</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {trafficSources.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {trafficSources.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-medium text-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UTM Campaigns */}
      <div className="card-modern overflow-hidden mb-6">
        <div className="p-4 md:p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-primary" />
            <h3 className="font-display font-bold text-foreground text-sm">UTM Campaign Tracking</h3>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5" /> Filter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Campaign</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Source</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Medium</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sessions</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversions</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {utmCampaigns.map((c) => (
                <tr key={c.campaign} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{c.campaign}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.source}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">{c.medium}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{c.sessions}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{c.conversions}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-[hsl(var(--success))] font-medium">{c.ctr}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Top Pages, Geography, Devices, Real-Time */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Top Pages */}
        <div className="card-modern overflow-hidden xl:col-span-1">
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-bold text-foreground text-sm">Top Pages</h3>
          </div>
          <div className="divide-y divide-border max-h-80 overflow-y-auto">
            {topPages.map((p) => (
              <div key={p.path} className="px-4 py-2.5 flex items-center justify-between hover:bg-secondary/30">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.path}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-sm font-bold text-foreground">{p.views.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{p.avgTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geography */}
        <div className="card-modern overflow-hidden xl:col-span-1">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-display font-bold text-foreground text-sm">Audience Geography</h3>
          </div>
          <div className="divide-y divide-border max-h-80 overflow-y-auto">
            {geoData.map((g) => (
              <div key={g.country} className="px-4 py-2.5 flex items-center gap-3">
                <span className="text-lg">{g.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{g.country}</span>
                    <span className="text-xs text-muted-foreground">{g.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${g.percentage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="card-modern p-4 xl:col-span-1">
          <h3 className="font-display font-bold text-foreground text-sm mb-4">Devices</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={3}>
                  {deviceData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {deviceData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-medium text-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time */}
        <div className="card-modern p-4 xl:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
            <h3 className="font-display font-bold text-foreground text-sm">Real-Time</h3>
          </div>
          <div className="text-center mb-4">
            <p className="text-4xl font-bold font-display text-foreground">30</p>
            <p className="text-xs text-muted-foreground">Active visitors right now</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Pages</p>
            {realTimePages.map((p) => (
              <div key={p.path} className="flex items-center justify-between text-xs py-1.5">
                <span className="text-muted-foreground truncate">{p.path}</span>
                <span className="flex items-center gap-1.5 text-foreground font-medium flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--success))]" />
                  {p.active}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note about demo data */}
      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground text-center">
          📊 This dashboard displays sample analytics data. To connect live Google Analytics, add your GA4 Measurement ID in Site Settings.
        </p>
      </div>
    </div>
  );
}
