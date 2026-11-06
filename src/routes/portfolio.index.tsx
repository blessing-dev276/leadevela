import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FinalCta, ProjectCard, Reveal } from "@/components/site/primitives";
import { projects, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Demo Projects & Case Studies | Leadvela" },
      { name: "description", content: "Explore Leadvela's demonstration projects: websites, GoHighLevel pipelines, and automated workflows for travel and service businesses." },
      { property: "og:title", content: "Leadvela Portfolio" },
      { property: "og:description", content: "Clearly labeled demo projects showing how we connect websites, CRM, and automation." },
    ],
  }),
  component: PortfolioPage,
});

const FILTERS: ("All" | ProjectStatus)[] = ["All", "Completed Demo", "In Progress", "Concept"];

function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.status === filter)), [filter]);
  const [featured, ...rest] = list;

  return (
    <>
      <section className="bg-hero">
        <div className="container-x pb-12 pt-16 md:pt-24">
          <Reveal><p className="eyebrow">Portfolio</p></Reveal>
          <Reveal delay={0.05}><h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-6xl">Systems you can explore, step by step.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              These are demonstration projects built to show our approach. Client names are fictional, and each project shows its honest status: Concept, In Progress, or Completed Demo.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
                className={cn("rounded-full border px-4 py-2 text-sm font-bold transition-all active:scale-95", filter === f ? "border-navy bg-navy text-navy-foreground" : "bg-card text-muted-foreground hover:text-navy")}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-10">
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

      <FinalCta title="Have a process that needs a better system?" text="We can build something similar for your business. Book a call to talk through your inquiry and follow-up process." />
    </>
  );
}
