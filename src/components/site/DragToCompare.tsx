import { useId, useState } from "react";
import { BellRing, CalendarCheck, Clock, Inbox, MessageSquare, PhoneMissed, UserMinus, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "./primitives";

type Step = { icon: LucideIcon; text: string };

const WITHOUT: Step[] = [
  { icon: PhoneMissed, text: "An inquiry arrives while you’re with a client" },
  { icon: Inbox, text: "It lands in an inbox nobody owns" },
  { icon: Clock, text: "Hours pass. No reply goes out." },
  { icon: UserMinus, text: "They book with whoever answered first" },
];

const WITH: Step[] = [
  { icon: Zap, text: "An acknowledgment goes out within seconds" },
  { icon: MessageSquare, text: "Their first questions get answered" },
  { icon: CalendarCheck, text: "They book straight into your calendar" },
  { icon: BellRing, text: "You get the details, already in your CRM" },
];

function Panel({ steps, tone }: { steps: Step[]; tone: "without" | "with" }) {
  const dark = tone === "with";
  return (
    <div className={`flex h-full flex-col gap-5 p-7 sm:p-10 ${dark ? "bg-navy-gradient text-navy-foreground" : "bg-secondary/70 text-navy"}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-primary" : "text-muted-foreground"}`}>
        {dark ? "With Leadvela" : "Without Leadvela"}
      </p>
      <ul className="grid gap-4">
        {steps.map((step) => (
          <li key={step.text} className="flex items-start gap-3.5">
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-xl ${dark ? "bg-primary/20 text-primary" : "bg-card text-muted-foreground"}`}
              aria-hidden="true"
            >
              <step.icon className="size-4" />
            </span>
            <span className={`pt-1.5 text-base font-medium leading-snug ${dark ? "text-navy-foreground/90" : "text-muted-foreground"}`}>
              {step.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Before/after comparison revealed by dragging a divider.
 *
 * The control is a real range input stretched across the whole area: that gives
 * mouse, touch and keyboard (arrow keys) for free, so there is no custom
 * pointer maths to get wrong. It is transparent, and the visible handle is
 * drawn separately underneath it.
 */
export function DragToCompare() {
  const id = useId();
  const [pos, setPos] = useState(50);

  return (
    <section className="container-x py-20 md:py-28" aria-labelledby="compare-title">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 id="compare-title" className="max-w-xl text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl">
            The same inquiry, handled two ways.
          </h2>
          <p className="text-lg text-muted-foreground lg:pb-2 lg:text-right">Drag to compare.</p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative mt-10 overflow-hidden rounded-[2rem] shadow-lift">
          {/* Base layer: the good outcome. */}
          <Panel steps={WITH} tone="with" />

          {/* Overlay: the current reality, clipped to the handle position. */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            aria-hidden="true"
          >
            <Panel steps={WITHOUT} tone="without" />
          </div>

          {/* Visible divider and grip. */}
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-card"
            style={{ left: `${pos}%` }}
            aria-hidden="true"
          >
            <div className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-navy bg-card shadow-lift">
              <span className="text-base font-extrabold text-navy">&#8942;</span>
            </div>
          </div>

          {/* The actual control. */}
          <label htmlFor={id} className="sr-only">
            Reveal more of the &ldquo;without Leadvela&rdquo; or &ldquo;with Leadvela&rdquo; side
          </label>
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
