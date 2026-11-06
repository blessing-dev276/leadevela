import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Circle, Globe, KanbanSquare, MailCheck, PlayCircle, RotateCcw, Zap, ClipboardList } from "lucide-react";
import { Reveal, StatusBadge } from "@/components/site/primitives";
import { getProject, projects, type Project } from "@/data/projects";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Case study unavailable | Leadvela" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — Case Study | Leadvela` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} — Leadvela Case Study` },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: CaseStudyPage,
});

function Block({ eyebrow, title, children, className }: { eyebrow: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={cn("py-12 md:py-16", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl border bg-card shadow-soft">
      <div className="flex items-center gap-1.5 border-b bg-muted/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 truncate text-xs font-semibold text-muted-foreground">{label}</span>
      </div>
      {children}
    </figure>
  );
}

function CaseStudyPage() {
  const { project: p } = Route.useLoaderData();
  const { play } = useHeartbeatSound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={p.cover} alt={p.coverAlt} width={1280} height={896} className="size-full object-cover" />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="container-x relative py-20 text-navy-foreground md:py-28">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-foreground/75 hover:text-navy-foreground"><ArrowLeft className="size-4" /> All projects</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} />
            <span className="rounded-full border border-navy-foreground/25 px-2.5 py-1 text-xs font-bold">{p.client} · {p.clientNote}</span>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">{p.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-navy-foreground/80">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.services.map((s) => <span key={s} className="rounded-full bg-navy-foreground/10 px-3 py-1 text-xs font-semibold">{s}</span>)}
          </div>
        </div>
      </section>

      <div className="container-x divide-y">
        <Block eyebrow="Project overview" title="About this project">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <p className="text-lg leading-relaxed text-muted-foreground">{p.overview}</p>
            <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-secondary/70 p-5 text-sm">
              <div><dt className="text-muted-foreground">Client</dt><dd className="font-bold text-navy">{p.client}</dd></div>
              <div><dt className="text-muted-foreground">Industry</dt><dd className="font-bold text-navy">{p.industry}</dd></div>
              <div><dt className="text-muted-foreground">Status</dt><dd className="font-bold text-navy">{p.status}</dd></div>
              <div><dt className="text-muted-foreground">Type</dt><dd className="font-bold text-navy">{p.clientNote}</dd></div>
            </dl>
          </div>
        </Block>

        <Block eyebrow="Business scenario" title="The problem being solved">
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{p.scenario}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fictional scenario for demonstration purposes</p>
        </Block>

        <Block eyebrow="Objectives" title="What the system needed to do">
          <ol className="grid gap-3 md:grid-cols-2">
            {p.objectives.map((o, i) => (
              <li key={o} className="flex gap-4 rounded-2xl border bg-card p-5">
                <span className="text-sm font-extrabold text-accent">0{i + 1}</span>
                <span className="text-sm font-medium text-navy">{o}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block eyebrow="Website screenshots" title="Website & inquiry experience">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Frame label={`${p.client.toLowerCase().replace(/\s+/g, "")}.demo — Home`}>
              <div className="relative aspect-[16/10]">
                <img src={p.cover} alt={`Website hero mockup for ${p.client}`} loading="lazy" width={1280} height={896} className="size-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-end bg-navy/40 p-6 text-navy-foreground">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">{p.industry}</p>
                  <p className="mt-1 max-w-xs text-xl font-extrabold">Plan with clarity. Travel with confidence.</p>
                  <span className="mt-3 w-fit rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">Start an inquiry</span>
                </div>
              </div>
            </Frame>
            <Frame label="Inquiry form">
              <div className="space-y-3 p-5">
                {p.formFields.map((f) => (
                  <div key={f}><p className="text-[11px] font-semibold text-muted-foreground">{f}</p><div className="mt-1 h-8 rounded-lg border bg-muted/40" /></div>
                ))}
                <div className="h-9 rounded-full bg-primary" />
              </div>
            </Frame>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Illustrative mockups. Final screenshots are added as each project is completed.</p>
        </Block>

        <Block eyebrow="Interactive demo" title="Walk through the journey">
          <InteractiveDemo project={p} />
        </Block>

        <Block eyebrow="CRM pipeline" title="Opportunity pipeline">
          <Frame label="GoHighLevel · Opportunities">
            <div className="grid gap-3 overflow-x-auto p-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.pipeline.map((stage, i) => (
                <div key={stage} className="rounded-xl bg-muted/60 p-3">
                  <div className="flex items-center justify-between"><p className="text-xs font-bold text-navy">{stage}</p><span className="text-[11px] text-muted-foreground">{Math.max(0, 3 - i)}</span></div>
                  <div className="mt-3 space-y-2">
                    {Array.from({ length: Math.max(1, 3 - i) }).map((_, j) => (
                      <div key={j} className="rounded-lg border bg-card p-2.5">
                        <div className="h-2 w-2/3 rounded bg-navy/70" /><div className="mt-2 h-1.5 w-1/2 rounded bg-border" />
                        <div className="mt-2 flex gap-1"><span className="h-1.5 w-6 rounded bg-primary/60" /><span className="h-1.5 w-4 rounded bg-accent/60" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Frame>
        </Block>

        <Block eyebrow="Workflow automation" title="Automation workflow">
          <Frame label="GoHighLevel · Workflow builder">
            <div className="flex flex-col items-center gap-0 p-6">
              <div className="flex items-center gap-2 rounded-xl border-2 border-accent bg-accent/10 px-4 py-2.5 text-sm font-bold text-navy"><Zap className="size-4 text-accent" />Trigger: {p.workflow.trigger}</div>
              {p.workflow.steps.map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div className="h-6 w-px bg-border" />
                  <div className="w-72 max-w-full rounded-xl border bg-card px-4 py-2.5 text-center text-sm font-semibold text-navy shadow-soft">{s}</div>
                </div>
              ))}
            </div>
          </Frame>
        </Block>

        <Block eyebrow="System architecture" title="How the pieces connect">
          <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {[{ i: Globe, t: "Website", d: "React front end" }, { i: ClipboardList, t: "Inquiry form", d: "Structured fields" }, { i: KanbanSquare, t: "GoHighLevel CRM", d: "Contact + pipeline" }, { i: MailCheck, t: "Automations", d: "Email, SMS, tasks" }].map((n, k, arr) => (
              <>
                <div key={n.t} className="rounded-2xl border bg-card p-5 text-center shadow-soft">
                  <n.i className="mx-auto size-6 text-primary" />
                  <p className="mt-2 font-bold text-navy">{n.t}</p>
                  <p className="text-xs text-muted-foreground">{n.d}</p>
                </div>
                {k < arr.length - 1 && <ArrowRight key={n.t + "a"} className="mx-auto size-5 rotate-90 text-muted-foreground md:rotate-0" />}
              </>
            ))}
          </div>
        </Block>

        <Block eyebrow="Test scenario" title="Test scenario & verified outcomes">
          <div className="rounded-2xl bg-secondary/70 p-5"><p className="text-sm font-semibold text-navy">{p.test.scenario}</p></div>
          <ul className="mt-4 divide-y rounded-2xl border bg-card">
            {p.test.checks.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-4 p-4 text-sm">
                <span className="text-navy">{c.label}</span>
                <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold", c.result === "Verified" ? "bg-teal-tint text-primary-deep" : "bg-muted text-muted-foreground")}>
                  {c.result === "Verified" ? <CheckCircle2 className="size-3.5" /> : <Circle className="size-3.5" />}{c.result}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">"Verified" means the step was confirmed in a test environment. No performance statistics are claimed.</p>
        </Block>

        <Block eyebrow="Technologies" title="Tools used">
          <div className="flex flex-wrap gap-2">
            {p.technologies.map((t) => <span key={t} className="rounded-full border bg-card px-4 py-2 text-sm font-semibold text-navy">{t}</span>)}
          </div>
        </Block>
      </div>

      <section className="container-x pb-20">
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[1.75rem] bg-navy-gradient p-8 text-navy-foreground md:p-12">
            <h2 className="text-3xl font-extrabold">Build Something Similar</h2>
            <p className="mt-3 max-w-md text-navy-foreground/75">Let's adapt this approach to your business, your tools, and your customer journey.</p>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener" onClick={play} className="btn btn-primary mt-7">Schedule a Call <ArrowUpRight className="size-4" /></a>
          </div>
          <Link to="/portfolio/$slug" params={{ slug: next.slug }} onClick={play} className="card-lift group flex flex-col justify-between p-8">
            <p className="eyebrow">Next case study</p>
            <div>
              <p className="mt-6 text-xl font-bold text-navy">{next.name}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep">View <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}

function InteractiveDemo({ project }: { project: Project }) {
  const { play } = useHeartbeatSound();
  const steps = [
    { title: "Inquiry submitted", text: `A visitor completes the ${project.formFields.length}-field inquiry form on the website.` },
    { title: "Contact created", text: "The CRM creates or updates the contact and maps every form field." },
    { title: `Pipeline: ${project.pipeline[0]}`, text: "An opportunity is added to the first pipeline stage." },
    { title: "Follow-up sent", text: project.workflow.steps[2] ?? project.workflow.steps.at(-1)! },
  ];
  const [done, setDone] = useState(0);
  const complete = done >= steps.length;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border bg-card p-6 shadow-soft">
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <motion.li key={s.title} animate={{ opacity: i <= done ? 1 : 0.45 }} className={cn("flex gap-3 rounded-xl p-3", i === done && "bg-teal-tint")}>
              {i < done ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" /> : <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />}
              <div><p className="text-sm font-bold text-navy">{s.title}</p><p className="text-xs text-muted-foreground">{s.text}</p></div>
            </motion.li>
          ))}
        </ol>
        <div className="mt-5 flex gap-2">
          {complete ? (
            <button onClick={() => setDone(0)} className="btn btn-outline"><RotateCcw className="size-4" /> Restart demo</button>
          ) : (
            <button onClick={() => { setDone((d) => d + 1); play(); }} className="btn btn-primary">{done === 0 ? "Start demo" : "Next step"} <ArrowRight className="size-4" /></button>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Frontend simulation — no data is sent.</p>
      </div>
      <div className="grid aspect-video place-items-center rounded-2xl border-2 border-dashed bg-muted/40 p-6 text-center">
        <div>
          <PlayCircle className="mx-auto size-12 text-primary" />
          <p className="mt-3 font-bold text-navy">Video walkthrough</p>
          <p className="text-sm text-muted-foreground">{project.status === "Completed Demo" ? "Recorded walkthrough coming soon." : "Available once the build is complete."}</p>
        </div>
      </div>
    </div>
  );
}
