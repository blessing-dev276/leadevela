import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Compass, Hotel, Briefcase, Stethoscope, Home, GraduationCap } from "lucide-react";
import { FinalCta, Reveal, ScheduleButton, SectionHeading } from "@/components/site/primitives";
import { FlowVisual } from "@/components/site/FlowVisual";
import { TestimonialVideo } from "@/components/site/TestimonialVideo";
import { MissedEnquiryCalculator } from "@/components/site/MissedEnquiryCalculator";
import { DragToCompare } from "@/components/site/DragToCompare";
import { Faq, FAQS } from "@/components/site/Faq";
import { services } from "@/data/services";
import { workCases } from "@/data/work";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leadvela — Beautiful Websites. Smarter Systems. Better Business." },
      { name: "description", content: "Leadvela builds websites, GoHighLevel CRM systems, and automated customer journeys that help businesses capture and follow up on every inquiry." },
      { property: "og:title", content: "Leadvela — Beautiful Websites. Smarter Systems. Better Business." },
      { property: "og:description", content: "Websites, GoHighLevel CRM setup, sales funnels, and workflow automation for growing businesses." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
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
        <div className="container-x grid items-center gap-10 pb-16 pt-12 sm:gap-14 md:pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal><p className="eyebrow">Websites &amp; GoHighLevel systems</p></Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
                Every inquiry answered. <span className="text-primary">Even the ones you&rsquo;d miss.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                The message that arrives while you&rsquo;re with a client. The form filled in at 11pm. The follow-up you meant to send on Tuesday. Leadvela builds the website and GoHighLevel system that catches all three, so the work you already paid to attract doesn&rsquo;t quietly go to someone else.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ScheduleButton />
                <Link to="/portfolio" onClick={play} className="btn btn-outline">See real client work <ArrowRight className="size-4" /></Link>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground">
                {["Free, no-obligation call", "Written quote before any work", "You own everything we build"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="size-4 text-primary" />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}><FlowVisual /></Reveal>
        </div>
      </section>

      {/* Client video testimonial */}
      <section className="container-x py-16 md:py-24" aria-labelledby="client-stories-title">
        <div className="grid items-center gap-8 rounded-[2rem] border bg-card p-5 shadow-soft sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:p-12">
          <Reveal>
            <p className="eyebrow">Real client, real system</p>
            <h2 id="client-stories-title" className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">The experience, in their own words.</h2>
            <blockquote className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              &ldquo;Their team set up GoHighLevel for me, and now I can see who&rsquo;s waiting for a reply as soon as I log in. That&rsquo;s made my mornings a lot easier.&rdquo;
            </blockquote>
            <div className="mt-8 h-px w-16 bg-primary" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold text-primary-deep">Gia &middot; Leadvela client</p>
          </Reveal>
          <Reveal delay={0.08} className="w-full">
            <TestimonialVideo />
          </Reveal>
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

      {/* Before / after */}
      <DragToCompare />

      {/* Cost of missed inquiries */}
      <MissedEnquiryCalculator />

      {/* Featured portfolio */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured portfolio" title="See the systems in action." intro="Explore selected project work across forms, email journeys, CRM, and automation, with screenshots and a clear account of what each system does." />
          <Reveal><Link to="/portfolio" onClick={play} className="btn btn-outline">View portfolio <ArrowRight className="size-4" /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {workCases.slice(0, 3).map((sample, i) => (
            <Reveal key={sample.slug} delay={i * 0.06}>
              <Link to="/portfolio/work/$slug" params={{ slug: sample.slug }} className="card-lift group flex h-full flex-col overflow-hidden">
                <div className="flex aspect-[4/3] items-center justify-center bg-muted/50 p-4">
                  <img src={sample.cover} alt={sample.coverAlt} loading="lazy" width={1600} height={900} className="max-h-full w-full rounded-xl object-contain" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow">{sample.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-navy">{sample.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{sample.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep">View case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
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

      <Faq />

      <FinalCta />
    </>
  );
}
