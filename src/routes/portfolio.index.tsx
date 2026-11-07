import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FinalCta, ProjectCard, Reveal } from "@/components/site/primitives";
import { projects, type ProjectStatus } from "@/data/projects";
import { workCases, type WorkCase } from "@/data/work";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Client Work, Systems & Case Studies | Leadvela" },
      { name: "description", content: "Explore Leadvela's selected work across lead capture, sales funnels, CRM workflows, email journeys, and appointment systems." },
      { property: "og:title", content: "Leadvela Portfolio" },
      { property: "og:description", content: "Selected project work and clearly labeled demonstrations across websites, CRM, and automation." },
    ],
  }),
  component: PortfolioPage,
});

const FILTERS: ("All" | ProjectStatus)[] = ["All", "Completed Demo", "In Progress", "Concept"];

function WorkCard({ sample, featured }: { sample: WorkCase; featured?: boolean }) {
  return (
    <Link to="/portfolio/work/$slug" params={{ slug: sample.slug }} className={cn("card-lift group flex h-full flex-col overflow-hidden", featured && "lg:grid lg:grid-cols-[1.1fr_0.9fr]")}>
      <div className="flex min-h-64 items-center justify-center overflow-hidden bg-muted/50 p-4">
        <img src={sample.cover} alt={sample.coverAlt} loading="lazy" width={1600} height={900} className="max-h-80 w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="eyebrow">{sample.category}</p>
        <h3 className="mt-3 text-2xl font-extrabold text-navy">{sample.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{sample.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {sample.services.slice(0, 3).map((service) => <span key={service} className="rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">{service}</span>)}
        </div>
        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep">Explore case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.status === filter)), [filter]);
  const [featured, ...rest] = list;

  return (
    <>
      <section className="bg-hero">
        <div className="container-x pb-12 pt-16 md:pt-24">
          <Reveal><p className="eyebrow">Portfolio</p></Reveal>
          <Reveal delay={0.05}><h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight text-navy md:text-6xl">The work behind better customer journeys.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Explore the forms, funnels, email journeys, CRM pipelines, and automations behind our selected work. Open each case study to see the screens and the decisions they represent.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold text-navy md:text-4xl">Built across industries. Connected by a clear process.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">These case studies use supplied project screenshots. Each page explains the visible work and distinguishes implementation evidence from unverified business results.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {workCases.map((sample, index) => <div key={sample.slug} className={cn(index === 0 && "lg:col-span-2")}><WorkCard sample={sample} featured={index === 0} /></div>)}
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Concept lab</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">Demonstrations and ideas in progress.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">These are separate demonstration projects. Their fictional names, mockups, and status labels are shown clearly on each case study.</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter demonstration projects by status">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
                className={cn("rounded-full border px-4 py-2 text-sm font-bold transition-all active:scale-95", filter === f ? "border-navy bg-navy text-navy-foreground" : "bg-card text-muted-foreground hover:text-navy")}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <AnimatePresence mode="popLayout">
          {featured && (
            <motion.div key={featured.slug + filter} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-6">
              <ProjectCard project={featured} large />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {rest.map((p) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No projects with this status yet.</p>}
      </section>

      <FinalCta title="Have a customer journey that needs a better system?" text="Tell us what you are building. We can map the site, forms, CRM, and follow-up into one clear experience." />
    </>
  );
}
