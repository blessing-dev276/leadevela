import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

export type Event = { title: string; detail: string };

/** "Behind the scenes" checklist. Items light up as `done` advances. */
export function Timeline({ events, done, label = "Behind the scenes" }: { events: Event[]; done: number; label?: string }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{label}</p>
      <ol className="mt-5 grid gap-4">
        {events.map((e, i) => {
          const complete = i < done;
          return (
            <li key={e.title} className="flex items-start gap-3.5">
              <motion.span
                aria-hidden="true"
                animate={{ scale: !reduce && complete ? [1, 1.18, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                  complete ? "border-primary bg-primary text-primary-foreground" : "border-navy-foreground/25 text-transparent"
                }`}
              >
                <Check className="size-3.5" />
              </motion.span>
              <span className={`transition-opacity ${complete ? "opacity-100" : "opacity-45"}`}>
                <span className="block text-sm font-bold text-navy-foreground">{e.title}</span>
                <span className="block text-xs leading-relaxed text-navy-foreground/70">{e.detail}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
