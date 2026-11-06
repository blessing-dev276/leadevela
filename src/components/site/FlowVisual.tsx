import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe, ClipboardList, KanbanSquare, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NODES = [
  { icon: Globe, label: "Website", detail: "Visitor explores services" },
  { icon: ClipboardList, label: "Inquiry form", detail: "Trip details submitted" },
  { icon: KanbanSquare, label: "CRM pipeline", detail: "Added to New Inquiry" },
  { icon: MailCheck, label: "Follow-up", detail: "Acknowledgment sent" },
];

/** Subtle looping illustration: website → form → CRM → automated follow-up. */
export function FlowVisual() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % NODES.length), 1800);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative rounded-[1.75rem] border bg-card/80 p-5 shadow-lift backdrop-blur md:p-7" aria-label="Diagram: a website inquiry flows into a CRM pipeline and triggers automated follow-up" role="img">
      <div className="mb-5 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 text-xs font-semibold text-muted-foreground">Customer journey · live</span>
      </div>
      <div className="relative space-y-3">
        <svg className="absolute left-[27px] top-6 h-[calc(100%-48px)] w-1" aria-hidden>
          <line x1="2" y1="0" x2="2" y2="100%" stroke="var(--border)" strokeWidth="2" />
          <line x1="2" y1="0" x2="2" y2="100%" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 8" className="animate-flow" />
        </svg>
        {NODES.map((n, i) => {
          const on = i <= active;
          return (
            <motion.div key={n.label} animate={{ scale: i === active ? 1.02 : 1 }} transition={{ duration: 0.4 }}
              className={cn("relative flex items-center gap-4 rounded-2xl border p-3 transition-colors duration-500", i === active ? "border-primary/40 bg-teal-tint" : "bg-card")}>
              <div className={cn("grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-500", on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                <n.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-navy">{n.label}</p>
                <p className="truncate text-xs text-muted-foreground">{n.detail}</p>
              </div>
              <span className={cn("ml-auto text-[11px] font-bold transition-opacity duration-500", on ? "text-primary-deep opacity-100" : "opacity-0")}>✓ Done</span>
            </motion.div>
          );
        })}
      </div>
      <div className="absolute -bottom-5 -right-3 hidden rounded-2xl bg-navy px-4 py-3 text-navy-foreground shadow-lift sm:block">
        <p className="text-[10px] font-bold uppercase tracking-wider text-navy-foreground/60">Next step</p>
        <p className="text-sm font-bold">Consultation reminder · 24h</p>
      </div>
    </div>
  );
}
