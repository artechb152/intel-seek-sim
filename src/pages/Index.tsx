import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Layers,
  Lightbulb,
  Search,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type TeamName =
  | "All Teams"
  | "Design & 3D Modeling"
  | "Programming / Development"
  | "UX Characterization & Content Strategy"
  | "Courseware (E-learning) Development";

const teamHubs: Array<{ name: Exclude<TeamName, "All Teams">; accent: string; blurb: string }> = [
  {
    name: "Design & 3D Modeling",
    accent: "from-violet-500/30 to-fuchsia-500/20",
    blurb: "Asset pipelines, visual quality, rigging, animation polish.",
  },
  {
    name: "Programming / Development",
    accent: "from-blue-500/30 to-cyan-500/20",
    blurb: "Performance, tooling, integrations, security constraints.",
  },
  {
    name: "UX Characterization & Content Strategy",
    accent: "from-amber-500/30 to-orange-500/20",
    blurb: "Audience fit, learning outcomes, narrative structure.",
  },
  {
    name: "Courseware (E-learning) Development",
    accent: "from-emerald-500/30 to-teal-500/20",
    blurb: "LMS compatibility, SCORM packaging, multi-device delivery.",
  },
];

const feedItems = [
  {
    title: "Frame Optimization and Asset Weights for Mobile",
    solvedBy: "Programming / Development",
    impacts: "Courseware (E-learning) Development",
    tags: ["Mobile", "Animation", "Performance"],
    summary:
      "Reduced animation jitter by capping blend trees and moving oversized assets to streaming bundles.",
  },
  {
    title: "Client Approval Delays in Regulated Domains",
    solvedBy: "UX Characterization & Content Strategy",
    impacts: "Programming / Development",
    tags: ["Finance", "Compliance", "Stakeholder Sync"],
    summary: "Introduced security acceptance checklist during characterization to prevent sprint-level blockers.",
  },
  {
    title: "3D Asset LOD Naming Contract",
    solvedBy: "Design & 3D Modeling",
    impacts: "Programming / Development",
    tags: ["Pipeline", "Unity", "3D"],
    summary: "Standardized naming schema lowered import failures and reduced QA rework for course scenes.",
  },
] as const;

const screenToggle = ["Screen A · Landing", "Screen B · Dashboard"] as const;

type Screen = (typeof screenToggle)[number];

const Index = () => {
  const [screen, setScreen] = useState<Screen>("Screen A · Landing");
  const [selectedTeam, setSelectedTeam] = useState<TeamName>("All Teams");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [issueDraft, setIssueDraft] = useState("");

  const ragMatch = useMemo(() => {
    const normalized = searchQuery.toLowerCase();
    return (
      normalized.includes("animation") &&
      (normalized.includes("mobile") || normalized.includes("glitch") || normalized.includes("jump"))
    );
  }, [searchQuery]);

  const warningOfficer = useMemo(() => {
    const normalized = projectBrief.toLowerCase();
    return normalized.includes("financial") && normalized.includes("vr");
  }, [projectBrief]);

  const duplicateDetection = useMemo(() => {
    const normalized = issueDraft.toLowerCase();
    return normalized.includes("mobile") && (normalized.includes("jump") || normalized.includes("glitch"));
  }, [issueDraft]);

  const filteredFeed = useMemo(() => {
    if (selectedTeam === "All Teams") return feedItems;

    return feedItems.filter((item) => item.solvedBy === selectedTeam || item.impacts === selectedTeam);
  }, [selectedTeam]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
        <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-3 bg-slate-700/60 text-slate-100">
                Yesterday · Internal Knowledge + Retros Platform
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Turn yesterday&apos;s pain into today&apos;s advantage.
              </h1>
            </div>
            <div className="flex gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-1">
              {screenToggle.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setScreen(tab)}
                  className={`rounded-lg px-3 py-1.5 text-sm transition ${
                    screen === tab ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 max-w-4xl text-slate-300">
            Blame-free by design: insights focus on what was learned, what changed, and what teams can do next.
          </p>
        </header>

        {screen === "Screen A · Landing" ? (
          <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-slate-100">Screen A: Landing Page</h2>
            <p className="mt-2 text-sm text-slate-300">
              Google-style natural-language entry point + team hub portals + fast "share insight" action.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
              <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">
                <Search className="h-5 w-5 text-cyan-300" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="The character animation is jumping/glitching on mobile, what should I do?"
                  className="border-0 bg-transparent text-base text-slate-100 placeholder:text-slate-500 focus-visible:ring-0"
                />
              </div>
            </div>

            {ragMatch && (
              <Card className="mt-5 border-cyan-300/40 bg-cyan-500/10">
                <CardHeader>
                  <div className="flex items-center gap-2 text-cyan-200">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">Feature 1: Semantic Context-Based Search (RAG)</span>
                  </div>
                  <CardTitle className="text-xl text-cyan-50">Frame Optimization and Asset Weights for Mobile</CardTitle>
                  <CardDescription className="text-cyan-100/90">
                    Intent matched from context (animation instability + mobile constraints) even without exact keyword overlap.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-cyan-50">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-cyan-400/20 text-cyan-100">Solved by: Programming / Development</Badge>
                    <Badge className="bg-cyan-400/20 text-cyan-100">Relevant to: Courseware Development</Badge>
                  </div>
                  <p>
                    Suggested path: reduce rig complexity for mobile, cap animation blending layers, and profile texture
                    weights before packaging.
                  </p>
                  <Button size="sm" className="bg-cyan-300 text-slate-900 hover:bg-cyan-200">
                    Open lesson details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <button
                type="button"
                onClick={() => setSelectedTeam("Design & 3D Modeling")}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 p-4 text-left"
              >
                <p className="font-semibold">Design & 3D Modeling</p>
                <p className="mt-2 text-sm text-slate-200/90">Visual quality, rigs, and production-ready assets.</p>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTeam("Programming / Development")}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 p-4 text-left"
              >
                <p className="font-semibold">Programming / Development</p>
                <p className="mt-2 text-sm text-slate-200/90">Integrations, performance, tooling, and infra constraints.</p>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTeam("UX Characterization & Content Strategy")}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/30 to-orange-500/20 p-4 text-left"
              >
                <p className="font-semibold">UX Characterization & Content Strategy</p>
                <p className="mt-2 text-sm text-slate-200/90">Storyline, audience fit, learning pathways.</p>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTeam("Courseware (E-learning) Development")}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/30 to-teal-500/20 p-4 text-left"
              >
                <p className="font-semibold">Courseware Development</p>
                <p className="mt-2 text-sm text-slate-200/90">LMS packaging, cross-device delivery, content QA.</p>
              </button>
            </div>

            <Button className="mt-7 bg-cyan-300 text-slate-950 hover:bg-cyan-200">
              <Lightbulb className="mr-2 h-4 w-4" /> Log a Lesson / Share an Insight
            </Button>
          </section>
        ) : (
          <section className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Layers className="h-5 w-5 text-cyan-300" /> Screen B: Main Dashboard
              </h2>
              <Separator className="bg-white/10" />
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">Teams</p>
                <button
                  type="button"
                  onClick={() => setSelectedTeam("All Teams")}
                  className={`mb-2 w-full rounded-lg border px-3 py-2 text-left text-sm ${
                    selectedTeam === "All Teams" ? "border-cyan-300 bg-cyan-400/10" : "border-white/10"
                  }`}
                >
                  All Teams
                </button>
                <div className="space-y-2 text-sm text-slate-200">
                  {teamHubs.map((team) => (
                    <button
                      key={team.name}
                      type="button"
                      onClick={() => setSelectedTeam(team.name)}
                      className={`w-full rounded-lg border px-3 py-2 text-left ${
                        selectedTeam === team.name ? "border-cyan-300 bg-cyan-400/10" : "border-white/10"
                      }`}
                    >
                      {team.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">Projects</p>
                <div className="rounded-lg border border-white/10 px-3 py-2 text-sm">VR Academy 2026</div>
                <div className="mt-2 rounded-lg border border-white/10 px-3 py-2 text-sm">Finance Onboarding LMS</div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">Tags</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">#mobile</Badge>
                  <Badge variant="secondary">#compliance</Badge>
                  <Badge variant="secondary">#animation</Badge>
                  <Badge variant="secondary">#pipeline</Badge>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              <Card className="border-white/10 bg-slate-900/70 text-slate-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Users className="h-5 w-5 text-cyan-300" /> Recently Solved Problems Feed
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Feed cards show team that solved the issue and team most affected by the pattern.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredFeed.map((item) => (
                    <article key={item.title} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge className="bg-emerald-500/20 text-emerald-100">Solved by: {item.solvedBy}</Badge>
                        <Badge className="bg-violet-500/20 text-violet-100">Affected: {item.impacts}</Badge>
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </article>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-amber-400/30 bg-amber-400/5 text-slate-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShieldAlert className="h-5 w-5 text-amber-300" /> Feature 2: Warning Officer
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Predictive guidance appears during project setup without interrupting typing flow.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      value={projectBrief}
                      onChange={(event) => setProjectBrief(event.target.value)}
                      placeholder="VR Courseware for a Financial Client"
                      className="border-white/20 bg-slate-900"
                    />
                    {warningOfficer && (
                      <div className="rounded-xl border border-amber-300/40 bg-amber-300/10 p-4 text-sm">
                        <p className="font-medium text-amber-100">
                          ⚠️ Heads up: In 3 previous financial projects, we experienced delays due to strict information
                          security requirements with the Programming team.
                        </p>
                        <p className="mt-2 text-amber-50/90">
                          Apply now in characterization: run a security workshop, define data-handling boundaries, and align
                          with Programming before sprint planning.
                        </p>
                        <Button size="sm" variant="secondary" className="mt-3">
                          Open 3 relevant lessons
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-emerald-400/30 bg-emerald-400/5 text-slate-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bot className="h-5 w-5 text-emerald-300" /> Feature 3: Duplicate + Solution Detection
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Inline assist prevents duplicate problem entries and points to previously solved cases.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={issueDraft}
                      onChange={(event) => setIssueDraft(event.target.value)}
                      placeholder="Type a problem statement you are facing right now..."
                      className="min-h-32 border-white/20 bg-slate-900"
                    />
                    {duplicateDetection && (
                      <div className="rounded-xl border border-emerald-300/50 bg-emerald-300/10 p-4 text-sm shadow-xl">
                        <p className="flex items-center gap-2 font-medium text-emerald-100">
                          <CheckCircle2 className="h-4 w-4" /> Wait a second! We found an almost identical issue solved 2
                          months ago.
                        </p>
                        <p className="mt-2 text-emerald-50/90">
                          Someone from Programming resolved this by reducing animation state transitions on low-end mobile
                          devices. Does this solution help you?
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="bg-emerald-300 text-slate-900 hover:bg-emerald-200">
                            Yes, open solution
                          </Button>
                          <Button size="sm" variant="outline">
                            Keep writing
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        <footer className="pb-3 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            UX tone: clean SaaS (Notion/Linear inspired), high readability, calm color semantics, and low-friction actions.
          </p>
          <p className="mt-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Content policy: blame-free language and cross-team appreciation in all AI guidance copy.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
