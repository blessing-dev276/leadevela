import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

export type Bubble = {
  id: string;
  /** "in" is from the customer, "out" is from the business, "sys" is a grey status line. */
  kind: "in" | "out" | "sys";
  text: string;
};

/** A phone frame with an iMessage-style thread. Purely presentational. */
export function PhoneMock({ business, status = "Text message", bubbles, typing = false }: {
  business: string;
  status?: string;
  bubbles: Bubble[];
  typing?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-[17rem] rounded-[2.25rem] border-[6px] border-navy bg-navy p-1 shadow-lift">
      <div className="relative overflow-hidden rounded-[1.9rem] bg-card">
        <div className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-navy" aria-hidden="true" />

        <div className="flex items-center gap-2.5 border-b px-4 pb-3 pt-7">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
            <Check className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-navy">{business}</span>
            <span className="block truncate text-[11px] text-muted-foreground">{status}</span>
          </span>
        </div>

        <div className="flex h-72 flex-col gap-2 overflow-y-auto p-3.5" role="log" aria-live="polite">
          <AnimatePresence initial={false}>
            {bubbles.map((b) => (
              <motion.div
                key={b.id}
                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={
                  b.kind === "sys"
                    ? "self-center rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground"
                    : b.kind === "out"
                      ? "max-w-[85%] self-end rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-[13px] leading-snug text-primary-foreground"
                      : "max-w-[85%] self-start rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-[13px] leading-snug text-navy"
                }
              >
                {b.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex max-w-[85%] items-center gap-1 self-end rounded-2xl rounded-br-md bg-primary/80 px-3.5 py-3"
              aria-label="Typing"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-primary-foreground"
                  animate={reduce ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
