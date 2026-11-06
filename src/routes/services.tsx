import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { FinalCta, Reveal } from "@/components/site/primitives";
import { services } from "@/data/services";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

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

function ServicesPage() {
  const { play } = useHeartbeatSound();
  const [active, setActive] = useState(services[0].id);
  const s = services.find((x) => x.id === active)!;

  const select = (id: string) => {
    if (id === active) return;
    setActive(id);
    play();
  };

  return (
    <>
      <section className="bg-hero">
        <div className="container-x pb-14 pt-16 md:pt-24">
          <Reveal><p className="eyebrow">Services</p></Reveal>
          <Reveal delay={0.05}><h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-6xl">Everything between a visitor and a booked conversation.</h1></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-muted-foreground">Choose a single service or combine them into one connected system. Select a service to see what it involves.</p></Reveal>
        </div>
      </section>

      {/* Interactive selector */}
      <section className="container-x pb-10">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <div role="tablist" aria-label="Services" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {services.map((x) => (
              <button key={x.id} role="tab" aria-selected={x.id === active} onClick={() => select(x.id)}
                className={cn("flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-bold transition-all active:scale-[0.98]",
                  x.id === active ? "border-primary bg-card text-navy shadow-soft" : "border-transparent text-muted-foreground hover:bg-card hover:text-navy")}>
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", x.id === active ? "bg-primary text-primary-foreground" : "bg-muted")}><x.icon className="size-4" /></span>
                {x.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={s.id} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="rounded-[1.75rem] border bg-card p-7 shadow-lift md:p-10">
              <ServiceDetail id={s.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* All services overview */}
      <section className="container-x py-20">
        <h2 className="text-2xl font-extrabold text-navy md:text-3xl">All six services at a glance</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {services.map((x, i) => (
            <Reveal key={x.id} delay={i * 0.04}>
              <article id={x.id} className="card-lift h-full scroll-mt-28 p-7">
                <div className="flex items-center gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal-gradient text-primary-foreground"><x.icon className="size-5" /></div>
                  <h3 className="text-lg font-bold text-navy">{x.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{x.short}</p>
                <button onClick={() => { select(x.id); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-5 text-sm font-bold text-primary-deep hover:underline">See details →</button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta title="Not sure which service you need?" text="Tell us how inquiries reach you today. We'll recommend the smallest set of changes that makes a real difference." />
    </>
  );
}

function ServiceDetail({ id }: { id: string }) {
  const { play } = useHeartbeatSound();
  const s = services.find((x) => x.id === id)!;
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <div className="grid size-14 place-items-center rounded-2xl bg-teal-gradient text-primary-foreground shadow-soft"><s.icon className="size-6" /></div>
        <h2 className="text-2xl font-extrabold text-navy md:text-3xl">{s.title}</h2>
      </div>
      <div className="mt-8 rounded-2xl bg-secondary/70 p-5">
        <p className="eyebrow">What it solves</p>
        <p className="mt-2 leading-relaxed text-navy">{s.solves}</p>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow">What Leadvela builds</p>
          <ul className="mt-4 space-y-3">
            {s.builds.map((b) => <li key={b} className="flex gap-3 text-sm text-navy"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{b}</li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Business benefits</p>
          <ul className="mt-4 space-y-3">
            {s.benefits.map((b) => <li key={b} className="flex gap-3 text-sm text-navy"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />{b}</li>)}
          </ul>
        </div>
      </div>
      <a href={SITE.bookingUrl} onClick={play} className="btn btn-primary mt-10">Request a Call <ArrowUpRight className="size-4" /></a>
    </>
  );
}
