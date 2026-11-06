import { createFileRoute } from "@tanstack/react-router";
import { Compass, Palette, Plug, Repeat, FlaskConical } from "lucide-react";
import portrait from "@/assets/founder-portrait.png.asset.json";
import { FinalCta, Reveal, SectionHeading } from "@/components/site/primitives";
import { PROCESS } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Leadvela — Design Meets Smarter Business Systems" },
      { name: "description", content: "Leadvela is a digital solutions agency connecting great design with practical CRM systems and automation." },
      { property: "og:title", content: "About Leadvela" },
      { property: "og:description", content: "We connect great design with smarter business systems." },
    ],
  }),
  component: AboutPage,
});

const APPROACH = [
  { icon: Compass, title: "Understand the customer's journey", text: "We start with how people discover, evaluate, and contact your business." },
  { icon: Palette, title: "Design the right digital experience", text: "Websites and funnels shaped around clarity and the next meaningful action." },
  { icon: Plug, title: "Connect the necessary tools", text: "Forms, calendars, and CRM connected so information flows without copy-paste." },
  { icon: Repeat, title: "Automate repetitive processes", text: "Acknowledgments, reminders, and tasks handled consistently in the background." },
  { icon: FlaskConical, title: "Test and refine the system", text: "Each workflow is tested with real scenarios, then improved where needed." },
];

const INDUSTRIES = ["Travel & Hospitality", "Professional Services", "Health & Wellness", "Real Estate", "Education & Training", "Events & Weddings"];

function AboutPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="container-x grid items-center gap-12 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal><p className="eyebrow">About Leadvela</p></Reveal>
            <Reveal delay={0.05}><h1 className="mt-4 text-4xl font-extrabold leading-tight text-navy md:text-6xl">We Connect Great Design with Smarter Business Systems.</h1></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Leadvela is a digital solutions agency. We design websites and build the CRM systems and automations behind them, so the experience your customers see and the process your team runs work as one.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <figure className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-teal-gradient opacity-90" />
              <img src={portrait.url} alt="Portrait of the Leadvela founder" width={1086} height={1448} className="relative aspect-[3/4] w-full rounded-[1.75rem] object-cover shadow-lift" />
              <figcaption className="relative -mt-8 ml-6 w-fit rounded-2xl bg-card px-4 py-3 shadow-lift">
                <p className="text-sm font-bold text-navy">Founder, Leadvela</p>
                <p className="text-xs text-muted-foreground">Design & GoHighLevel systems</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <SectionHeading eyebrow="Our approach" title="Five steps, applied to every project." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {APPROACH.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="card-lift h-full p-6">
                <a.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-bold text-navy">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-gradient text-navy-foreground">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Our philosophy</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">A beautiful website is only half the job.</h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-lg leading-relaxed text-navy-foreground/75">
            <p>What happens after a visitor reaches out matters just as much as how they found you. A fast, personal response and a clear next step build trust.</p>
            <p>We favor simple, well-documented systems over complicated ones, and we only recommend tools your business will actually use.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Industries served" title="Where our systems fit best." intro="Businesses that depend on inquiries, consultations, and timely follow-up." />
          <div className="mt-8 flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => <span key={i} className="rounded-full border bg-card px-4 py-2 text-sm font-semibold text-navy">{i}</span>)}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Working process" title="How we work together." />
          <ol className="mt-8 space-y-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <li className="flex gap-4 rounded-2xl border bg-card p-5">
                  <span className="text-sm font-extrabold text-accent">0{i + 1}</span>
                  <div><p className="font-bold text-navy">{p.title}</p><p className="text-sm text-muted-foreground">{p.text}</p></div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
