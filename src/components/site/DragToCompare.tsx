import { useId, useState } from "react";
import { ArrowLeftRight, BellRing, CalendarCheck, Clock, MessageSquare, PhoneMissed, UserMinus, Voicemail, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "./primitives";

type Step = { icon: LucideIcon; text: string };

const WITHOUT: Step[] = [
  { icon: PhoneMissed, text: "Call rings out" },
  { icon: Voicemail, text: "Goes to voicemail" },
  { icon: Clock, text: "No reply for hours" },
  { icon: UserMinus, text: "They call your competitor" },
];

const WITH: Step[] = [
  { icon: Zap, text: "Text back in seconds" },
  { icon: MessageSquare, text: "Questions answered" },
  { icon: CalendarCheck, text: "Appointment booked" },
  { icon: BellRing, text: "You get the details" },
];

/** The content of one side. Sized to half the container so the two sides sit either side of the divider. */
function Side({ steps, title, tone }: { steps: Step[]; title: string; tone: "before" | "after" }) {
  const after = tone === "after";
  return (
    <div className="p-7 sm:p-10 md:p-12">
      <h3 className="text-2xl font-extrabold whitespace-nowrap text-navy sm:text-3xl">{title}</h3>
      <ul className="mt-7 grid gap-3.5">
        {steps.map((step) => (
          <li key={step.text} className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3.5 shadow-soft">
            <step.icon className={`size-5 shrink-0 ${after ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true" />
            <span className="whitespace-nowrap text-sm font-semibold text-navy sm:text-base">{step.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Before/after comparison revealed by dragging a divider.
 *
 * Each side's content is laid out in its own half of the container, so at the
 * midpoint both read in full; dragging then reveals more of one. The "before"
 * layer sits on top and is clipped to the handle position.
 *
 * The control is a real range input stretched across the area, which gives
 * mouse, touch and keyboard for free with no custom pointer maths. Below `md`
 * the panels simply stack, since halving a phone screen leaves no room to read.
 */
export function DragToCompare() {
  const id = useId();
  const [pos, setPos] = useState(50);

  return (
    <section className="container-x py-20 md:py-28" aria-labelledby="compare-title">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 id="compare-title" className="max-w-xl text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl">
            The same missed call, handled two ways.
          </h2>
          <p className="text-lg text-muted-foreground lg:pb-2 lg:text-right">
            <span className="hidden md:inline">Drag to compare.</span>
            <span className="md:hidden">Two outcomes, same call.</span>
          </p>
        </div>
      </Reveal>

      {/* Stacked, for narrow screens. */}
      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-5 overflow-hidden md:hidden">
          <div className="rounded-[1.75rem] bg-rose-tint"><Side steps={WITHOUT} title="Without Leadvela" tone="before" /></div>
          <div className="rounded-[1.75rem] bg-mint-tint"><Side steps={WITH} title="With Leadvela" tone="after" /></div>
        </div>
      </Reveal>

      {/* Draggable, from md up. */}
      <Reveal delay={0.08}>
        <div className="relative mt-10 hidden select-none overflow-hidden rounded-[2rem] shadow-lift md:block">
          {/* Base layer: the outcome with the system, content in the right half. */}
          <div className="bg-mint-tint">
            <div className="grid grid-cols-2">
              <div aria-hidden="true" />
              <Side steps={WITH} title="With Leadvela" tone="after" />
            </div>
          </div>

          {/* Overlay: today's reality, content in the left half, clipped to the divider. */}
          <div
            className="absolute inset-0 bg-rose-tint"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            aria-hidden="true"
          >
            <div className="grid h-full grid-cols-2">
              <Side steps={WITHOUT} title="Without Leadvela" tone="before" />
              <div />
            </div>
          </div>

          {/* Divider line and grip. */}
          <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-navy" style={{ left: `${pos}%` }} aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent/35 p-1.5">
              <span className="grid size-full place-items-center rounded-full bg-navy text-navy-foreground shadow-lift">
                <ArrowLeftRight className="size-5" />
              </span>
            </div>
          </div>

          {/* The real control, invisible but fully operable. */}
          <label htmlFor={id} className="sr-only">Reveal more of the &ldquo;without Leadvela&rdquo; or &ldquo;with Leadvela&rdquo; side</label>
          <input
            id={id}
            type="range"
            min={0}
            max={100}
            step={1}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 z-20 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          />
        </div>
      </Reveal>
    </section>
  );
}
