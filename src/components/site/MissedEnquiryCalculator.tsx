import { useId, useState } from "react";
import { ScheduleButton } from "./primitives";

const FIELDS = [
  { key: "missed", label: "Inquiries you miss or never follow up", suffix: "per week", min: 1, max: 50, step: 1, initial: 6 },
  { key: "value", label: "Average value of one customer", prefix: "£", min: 50, max: 5000, step: 50, initial: 400 },
  { key: "close", label: "Share of those you'd realistically win", suffix: "%", min: 5, max: 60, step: 5, initial: 25 },
] as const;

type Key = (typeof FIELDS)[number]["key"];

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

/**
 * Lets a visitor put their own numbers against the cost of unanswered inquiries.
 * Deliberately conservative: it reports a range, not a single confident figure,
 * and says plainly that it is an estimate rather than a promise.
 */
export function MissedEnquiryCalculator() {
  const id = useId();
  const [values, setValues] = useState<Record<Key, number>>(
    () => Object.fromEntries(FIELDS.map((f) => [f.key, f.initial])) as Record<Key, number>,
  );

  const monthly = (values.missed * 52 / 12) * values.value * (values.close / 100);
  const low = Math.round(monthly * 0.7);
  const high = Math.round(monthly * 1.3);

  return (
    <div className="grid gap-8 rounded-[2rem] border bg-card p-6 shadow-soft sm:p-9 lg:grid-cols-[1fr_0.85fr] lg:gap-12 lg:p-12">
      <div>
        <p className="eyebrow">Worth checking</p>
        <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">What do unanswered inquiries actually cost you?</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Move the sliders to match your business. Most owners we speak to have never put a number on this.
        </p>

        <div className="mt-8 grid gap-7">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${id}-${field.key}`} className="text-sm font-semibold text-navy">
                  {field.label}
                </label>
                <output htmlFor={`${id}-${field.key}`} className="shrink-0 text-base font-extrabold tabular-nums text-primary-deep">
                  {"prefix" in field ? field.prefix : ""}
                  {values[field.key].toLocaleString("en-GB")}
                  {"suffix" in field ? ` ${field.suffix}` : ""}
                </output>
              </div>
              <input
                id={`${id}-${field.key}`}
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={values[field.key]}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: Number(e.target.value) }))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid place-content-center gap-5 rounded-[1.5rem] bg-navy-gradient p-8 text-center text-navy-foreground">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-foreground/70">
          Roughly what that&rsquo;s worth each month
        </p>
        <p className="text-3xl font-extrabold tabular-nums sm:text-4xl">
          {money.format(low)}&ndash;{money.format(high)}
        </p>
        <p className="text-sm leading-relaxed text-navy-foreground/75">
          An estimate built from your own numbers, not a promise. We&rsquo;d rather show you a range than a figure that looks more certain than it is.
        </p>
        <ScheduleButton variant="light" className="mt-2 w-full justify-center" />
      </div>
    </div>
  );
}
