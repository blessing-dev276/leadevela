import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";
import type { Project, ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow: string; title: ReactNode; intro?: string; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

/** Primary call request CTA. Destination is configured in SITE.bookingUrl. */
export function ScheduleButton({ variant = "primary", label = "Request a Call", className }: { variant?: "primary" | "navy" | "light"; label?: string; className?: string }) {
  const { play } = useHeartbeatSound();
  return (
    <a href={SITE.bookingUrl} onClick={play} className={cn("btn", `btn-${variant}`, className)}>
      {label} <ArrowUpRight className="size-4" />
    </a>
  );
}

export function SoundToggle() {
  const { enabled, toggle } = useHeartbeatSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn interaction sound off" : "Turn interaction sound on"}
      title={enabled ? "Sound on" : "Sound off"}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
        enabled ? "border-primary bg-teal-tint text-primary-deep" : "border-border text-muted-foreground hover:text-navy",
      )}
    >
      {enabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
    </button>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    "Completed Demo": "bg-teal-tint text-primary-deep",
    "In Progress": "bg-accent/20 text-navy",
    Concept: "bg-muted text-muted-foreground",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold", styles[status])}>
      <span className={cn("size-1.5 rounded-full", status === "Completed Demo" ? "bg-primary" : status === "In Progress" ? "bg-accent" : "bg-muted-foreground")} />
      {status}
    </span>
  );
}

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const { play } = useHeartbeatSound();
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      onClick={play}
      className="card-lift group flex h-full flex-col overflow-hidden"
    >
      <div className={cn("relative overflow-hidden bg-muted", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <img src={project.cover} alt={project.coverAlt} loading="lazy" width={1280} height={896} className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div className="absolute left-4 top-4"><StatusBadge status={project.status} /></div>
        <div className="absolute right-4 top-4 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">Sample project</div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{project.industry}</p>
        <h3 className="mt-2 text-xl font-bold text-navy">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.services.map((s) => (
            <span key={s} className="rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">{s}</span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep">
          View Case Study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function FinalCta({ title = "Let's map out the system your business needs.", text = "Request a discovery call. Tell us when you're available, and we'll follow up to confirm a time." }: { title?: string; text?: string }) {
  return (
    <section className="container-x py-20 md:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-gradient px-6 py-16 text-center text-navy-foreground md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-accent/20 blur-3xl" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold md:text-5xl">{title}</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-navy-foreground/75">{text}</p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <ScheduleButton />
            <a href={`mailto:${SITE.contactEmail}`} className="btn border border-navy-foreground/25 text-navy-foreground hover:border-navy-foreground">Email {SITE.contactEmail}</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
