import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Layers3 } from "lucide-react";
import { FinalCta, Reveal } from "@/components/site/primitives";
import { getWorkCase, workCases } from "@/data/work";

export const Route = createFileRoute("/portfolio/work/$slug")({
  loader: ({ params }) => {
    const sample = getWorkCase(params.slug);
    if (!sample) throw notFound();
    return { sample };
  },
  head: ({ loaderData }) => {
    const sample = loaderData?.sample;
    if (!sample) return { meta: [{ title: "Case study unavailable | Leadvela" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${sample.title} — Selected Work | Leadvela` },
        { name: "description", content: sample.summary },
        { property: "og:title", content: `${sample.title} — Leadvela` },
        { property: "og:description", content: sample.summary },
      ],
    };
  },
  component: WorkCasePage,
});

function WorkCasePage() {
  const { sample } = Route.useLoaderData();
  const currentIndex = workCases.findIndex((work) => work.slug === sample.slug);
  const next = workCases[(currentIndex + 1) % workCases.length] ?? sample;

  return (
    <article>
      <section className="bg-navy-gradient text-navy-foreground">
        <div className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-foreground/70 hover:text-navy-foreground">
              <ArrowLeft className="size-4" /> All work
            </Link>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-primary">{sample.category}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">{sample.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-foreground/75">{sample.summary}</p>
            <p className="mt-5 text-sm font-semibold text-navy-foreground/60">Project: {sample.client}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {sample.services.map((service) => <span key={service} className="rounded-full border border-navy-foreground/20 px-3 py-1.5 text-xs font-semibold">{service}</span>)}
            </div>
            <a href="#evidence" className="btn btn-primary mt-8">Explore the evidence <ArrowRight className="size-4" /></a>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[1.75rem] border border-navy-foreground/15 bg-card/5 p-3 shadow-lift">
              <img src={sample.cover} alt={sample.coverAlt} width={1600} height={900} className="max-h-[30rem] w-full rounded-2xl object-contain" />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-x">
        <section className="grid gap-12 border-b py-20 md:grid-cols-[0.85fr_1.15fr] md:py-28">
          <Reveal>
            <p className="eyebrow">The challenge</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">What this system needed to solve</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{sample.challenge}</p>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="eyebrow">The approach</p>
            <ol className="mt-4 space-y-4">
              {sample.approach.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-soft">
                  <span className="text-sm font-extrabold text-accent">0{index + 1}</span>
                  <p className="text-sm leading-relaxed text-navy">{item}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="border-b py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">From first touch to next action</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-navy md:text-4xl">The journey behind the screens</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {sample.journey.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.04}>
                <div className="card-lift h-full p-5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-teal-tint text-xs font-extrabold text-primary-deep">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{item.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="evidence" className="scroll-mt-24 border-b py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">Project evidence</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">A closer look at the work</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Screenshots supplied from the project work. Open any image to inspect it at full size.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {sample.gallery.map((image, index) => (
              <Reveal key={image.src} delay={Math.min(index, 3) * 0.04}>
                <figure className="card-lift h-full overflow-hidden">
                  <a href={image.src} target="_blank" rel="noopener noreferrer" className="group block bg-muted/40 p-3" aria-label={`Open full-size image: ${image.title}`}>
                    <img src={image.src} alt={image.title} loading="lazy" width={1600} height={900} className="mx-auto max-h-[30rem] w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-[1.01]" />
                  </a>
                  <figcaption className="p-5">
                    <h3 className="font-bold text-navy">{image.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{image.caption}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary-deep">View full image <ArrowUpRight className="size-3.5" /></span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-10 py-20 md:grid-cols-[1fr_1fr] md:py-28">
          <Reveal>
            <p className="eyebrow">What it demonstrates</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">The experience behind the execution</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{sample.note}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="grid gap-3">
              {sample.demonstrates.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border bg-card p-4 font-semibold text-navy">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>

      <section className="bg-secondary/60">
        <div className="container-x grid items-center gap-6 py-12 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow"><Layers3 className="mr-2 inline size-4" /> Keep exploring</p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy">{next.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{next.summary}</p>
          </div>
          <Link to="/portfolio/work/$slug" params={{ slug: next.slug }} className="btn btn-outline w-fit">Next case study <ArrowRight className="size-4" /></Link>
        </div>
      </section>
      <FinalCta title="Have a similar project in mind?" text="Tell us where your customer journey needs more clarity, structure, or follow-up. We'll help map the next steps." />
    </article>
  );
}
