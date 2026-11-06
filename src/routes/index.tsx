import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Compass, Hotel, Briefcase, Stethoscope, Home, GraduationCap } from "lucide-react";
import { FinalCta, ProjectCard, Reveal, ScheduleButton, SectionHeading } from "@/components/site/primitives";
import { FlowVisual } from "@/components/site/FlowVisual";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leadvela — Beautiful Websites. Smarter Systems. Better Business." },
      { name: "description", content: "Leadvela builds websites, GoHighLevel CRM systems, and automated customer journeys that help businesses capture and follow up on every inquiry." },
      { property: "og:title", content: "Leadvela — Beautiful Websites. Smarter Systems. Better Business." },
      { property: "og:description", content: "Websites, GoHighLevel CRM setup, sales funnels, and workflow automation for growing businesses." },
    ],
  }),
  component: HomePage,
});

const INDUSTRIES = [
  { icon: Compass, name: "Travel & Hospitality", text: "Advisors, cruise agencies, charters, and tour operators." },
  { icon: Briefcase, name: "Professional Services", text: "Consultants, coaches, and agencies that sell through calls." },
  { icon: Stethoscope, name: "Health & Wellness", text: "Clinics and practitioners managing appointments." },
  { icon: Home, name: "Real Estate", text: "Agents and teams handling property inquiries." },
  { icon: GraduationCap, name: "Education & Training", text: "Course creators and training providers." },
  { icon: Hotel, name: "Events & Weddings", text: "Planners coordinating guests and bookings." },
];

export const PROCESS = [
  { title: "Discover", text: "We map how customers find you, inquire, and move toward a decision today." },
  { title: "Design", text: "We design the website and journey around the actions that matter most." },
  { title: "Connect", text: "We set up the CRM, forms, calendars, and integrations behind the scenes." },
  { title: "Automate", text: "We automate acknowledgments, follow-ups, reminders, and internal tasks." },
  { title: "Test & Refine", text: "We run real test scenarios, verify each step, and hand over clear documentation." },
];

const WHY = [
  "Design and systems handled by one team, so nothing gets lost between them",
  "GoHighLevel expertise focused on practical, maintainable setups",
  "Every workflow tested with documented scenarios before launch",
  "Honest scoping — we recommend only what your process needs",
  "Plain-language handover so your team understands the system",
  "Ongoing improvements available as your business grows",
];

function HomePage() {
  const { play } = useHeartbeatSound();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container-x grid items-center gap-14 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal><p className="eyebrow">Digital solutions agency</p></Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
                Beautiful Websites. <span className="text-primary">Smarter Systems.</span> Better Business.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Leadvela builds websites, CRM systems, and automated customer journeys that help businesses capture opportunities, manage inquiries, and follow up more effectively.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ScheduleButton />
                <Link to="/portfolio" onClick={play} className="btn btn-outline">Explore Our Portfolio <ArrowRight className="size-4" /></Link>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground">
                {["Website design", "GoHighLevel CRM", "Automation"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="size-4 text-primary" />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}><FlowVisual /></Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What we do" title="Design and systems, built to work together." intro="From the first click on your website to the follow-up message after an inquiry, we build each piece so it connects to the next." />
          <Reveal><Link to="/services" onClick={play} className="btn btn-outline">All services <ArrowRight className="size-4" /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link to="/services" hash={s.id} onClick={play} className="card-lift group block h-full p-7">
                <div className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-primary-deep transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><s.icon className="size-5" /></div>
                <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-navy-gradient text-navy-foreground">
        <div className="container-x py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Industries we serve</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Built for businesses that run on inquiries and conversations.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-navy-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.04} className="bg-navy p-7">
                <ind.icon className="size-6 text-accent" />
                <h3 className="mt-4 text-lg font-bold">{ind.name}</h3>
                <p className="mt-1.5 text-sm text-navy-foreground/65">{ind.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured portfolio */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured portfolio" title="See the systems in action." intro="Demonstration projects showing how we connect websites, CRM pipelines, and automation. Each one is clearly labeled with its current status." />
          <Reveal><Link to="/portfolio" onClick={play} className="btn btn-outline">View portfolio <ArrowRight className="size-4" /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}><ProjectCard project={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/60">
        <div className="container-x py-20 md:py-28">
          <SectionHeading center eyebrow="Our process" title="A clear path from idea to working system." />
          <ol className="mt-14 grid gap-5 md:grid-cols-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="relative h-full rounded-2xl border bg-card p-6 shadow-soft">
                  <span className="text-sm font-extrabold text-accent">0{i + 1}</span>
                  <h3 className="mt-3 font-bold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why */}
      <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-2">
        <SectionHeading eyebrow="Why work with Leadvela" title="Thoughtful design, dependable systems." intro="We care about how your website looks and how your business runs after someone clicks 'Submit'." />
        <ul className="grid gap-3 sm:grid-cols-2">
          {WHY.map((w, i) => (
            <Reveal key={w} delay={i * 0.04}>
              <li className="flex h-full gap-3 rounded-2xl border bg-card p-5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3.5" /></span>
                <span className="text-sm font-medium leading-relaxed text-navy">{w}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  );
}
