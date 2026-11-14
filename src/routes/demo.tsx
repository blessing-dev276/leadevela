import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, FileText, PhoneCall, Star } from "lucide-react";
import { FinalCta, Reveal } from "@/components/site/primitives";
import { EnquiryDemo } from "@/components/demo/EnquiryDemo";
import { BookingDemo } from "@/components/demo/BookingDemo";
import { MissedCallDemo } from "@/components/demo/MissedCallDemo";
import { ReviewDemo } from "@/components/demo/ReviewDemo";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live demo — Leadvela" },
      { name: "description", content: "Try Leadvela live: a sample inquiry form, booking flow, missed call text back and review request, and see what happens behind the scenes." },
      { property: "og:title", content: "Live demo — Leadvela" },
      { property: "og:description", content: "Try a sample inquiry form, booking flow, missed call text back and review request." },
    ],
  }),
  component: DemoPage,
});

const TABS = [
  { id: "enquiry", label: "Inquiry form", icon: FileText, panel: EnquiryDemo },
  { id: "booking", label: "Booking flow", icon: CalendarDays, panel: BookingDemo },
  { id: "missed", label: "Missed call text back", icon: PhoneCall, panel: MissedCallDemo },
  { id: "review", label: "Review request", icon: Star, panel: ReviewDemo },
] as const;

function DemoPage() {
  const [active, setActive] = useState<string>(TABS[0].id);
  const reduce = useReducedMotion();
  const current = TABS.find((t) => t.id === active) ?? TABS[0];
  const Panel = current.panel;

  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="container-x pb-14 pt-12 md:pb-20 md:pt-20">
          <Reveal><p className="eyebrow">Live demo</p></Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
              Try it before you talk to us.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Test a sample inquiry form, book a time, see a missed-call text back and send yourself a review request. Watch what your system would do behind the scenes, in real time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20 pt-10 md:pb-28">
        <div role="tablist" aria-label="Demos" className="flex flex-wrap gap-2.5">
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                onClick={() => setActive(t.id)}
                className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-colors sm:px-5 ${
                  on ? "border-navy text-navy-foreground" : "bg-card text-navy hover:border-primary"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="demo-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-navy"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <t.icon className="size-4" aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="mt-8">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Panel />
          </motion.div>
        </div>
      </section>

      <FinalCta
        title="Like what you see? We'll build yours."
        text="Every demo here is a simplified example. Your real system is written in your voice, built in your own account, and approved by you before it goes live."
      />
    </>
  );
}
