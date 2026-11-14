import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, FileText, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { FinalCta, Reveal, ScheduleButton } from "@/components/site/primitives";
import { SERVICE_GROUPS, services } from "@/data/services";
import { PROCESS } from "@/data/process";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Websites, GoHighLevel CRM & Automation | Leadvela" },
      { name: "description", content: "Website design, GoHighLevel CRM setup, workflow automation, sales funnels, appointment booking, and CRM troubleshooting by Leadvela." },
      { property: "og:title", content: "Leadvela Services" },
      { property: "og:description", content: "Six connected services that turn website visitors into organized, followed-up opportunities." },
    ],
  }),
  component: ServicesPage,
});

const TRUST = ["Free, no-obligation call", "Written quote before any work", "You own everything we build"];

const ALWAYS = [
  { icon: ShieldCheck, title: "You own it", text: "Built in your own accounts, under your own logins. If you ever stop working with us, the system stays with you and keeps running." },
  { icon: FileText, title: "A clear quote first", text: "You see exactly what we'll build, and the timeline, before any work starts. Nothing begins until you've approved it in writing." },
  { icon: MessageSquareQuote, title: "Your words", text: "Every automated message is written in your business's voice, and you read and approve it before a single one goes out." },
];

function ServicesPage() {
  const { play } = useHeartbeatSound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
        <div className="container-x relative pb-16 pt-14 md:pb-24 md:pt-24">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-7 bg-current" aria-hidden="true" />
              Services
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.03] sm:text-5xl lg:text-6xl">
              Everything between a visitor and a booked conversation.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/75">
              Capture every inquiry, answer it while it&rsquo;s still warm, and follow up without anyone remembering to. Start with the one piece that&rsquo;s costing you most, or build the whole system. We quote only what your process actually needs.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <ScheduleButton />
              <Link to="/demo" onClick={play} className="btn border border-navy-foreground/25 text-navy-foreground hover:border-navy-foreground">
                Try the live demo <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-navy-foreground/15 pt-7 text-xs font-bold uppercase tracking-[0.1em] text-navy-foreground/70">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                    <Check className="size-2.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Grouped services */}
      <section className="container-x py-20 md:py-28">
        {SERVICE_GROUPS.map((group) => {
          const inGroup = services.filter((s) => s.group === group);
          if (!inGroup.length) return null;
          return (
            <div key={group} className="mb-16 last:mb-0">
              <Reveal>
                <h2 className="flex items-center gap-5 text-xl font-extrabold text-navy sm:text-2xl">
                  <span className="whitespace-nowrap">{group}</span>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                </h2>
              </Reveal>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {inGroup.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.06}>
                    <article id={s.id} className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.5rem] border bg-card p-7 shadow-soft transition-colors duration-500 hover:border-navy hover:bg-navy">
                      <div className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-primary-deep transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                        <s.icon className="size-5" />
                      </div>
                      <h3 className="mt-6 text-lg font-bold leading-snug text-navy transition-colors duration-500 group-hover:text-navy-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-navy-foreground/70">
                        {s.solves}
                      </p>
                      <ul className="mt-5 grid gap-2.5 border-t border-dashed pt-5 transition-colors duration-500 group-hover:border-navy-foreground/20">
                        {s.builds.slice(0, 3).map((b) => (
                          <li key={b} className="flex gap-2.5 text-sm text-navy transition-colors duration-500 group-hover:text-navy-foreground/80">
                            <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <ScheduleButton
                        variant="link"
                        label={s.cta}
                        topic={`I'd like to talk about: ${s.title}.`}
                        className="mt-7 self-start transition-colors duration-500 group-hover:text-primary"
                      />
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}

        <Reveal>
          <p className="mt-4 rounded-2xl border border-l-4 border-l-primary bg-card p-6 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-bold text-navy">An honest note about GoHighLevel.</strong> Most of what we build runs on GoHighLevel, the platform a lot of agencies use. Its subscription is an ongoing cost on top of our setup fee, and it&rsquo;s separate from what you pay us. We&rsquo;ll confirm the exact monthly amount, and how it&rsquo;s billed, in your quote &mdash; so you&rsquo;re looking at the full running cost before you commit, not after.
          </p>
        </Reveal>
      </section>

      {/* How we work */}
      <section className="bg-secondary/60">
        <div className="container-x py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-5xl">No price lists. A plan built around your process.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every business routes inquiries differently, so we look first and quote second.
            </p>
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="h-full rounded-2xl border bg-card p-7 shadow-soft">
                  <span className="block text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--primary)]">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-bold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What you always get */}
      <section className="container-x py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Every service includes</p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-5xl">What you always get.</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ALWAYS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="h-full rounded-[1.5rem] border bg-card p-7 shadow-soft">
                <div className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-primary-deep">
                  <a.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta
        title="Not sure which service you need?"
        text="Tell us how inquiries reach you today. We'll recommend the smallest set of changes that makes a real difference, and say so if your current setup is already fine."
      />
    </>
  );
}
