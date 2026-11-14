import { useId, useState, type CSSProperties } from "react";
import { Reveal, ScheduleButton } from "./primitives";

const FIELDS = [
  { key: "missed", label: "Missed inquiries a week", min: 1, max: 50, step: 1, initial: 8, format: (v: number) => String(v) },
  { key: "value", label: "Average job value", min: 50, max: 5000, step: 50, initial: 400, format: (v: number) => money.format(v) },
  { key: "close", label: "How many would have booked", min: 5, max: 60, step: 5, initial: 30, format: (v: number) => `${v}%` },
] as const;

type Key = (typeof FIELDS)[number]["key"];

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

const WEEKS_PER_MONTH = 52 / 12;

/** Lets a visitor put their own numbers against the cost of unanswered inquiries. */
export function MissedEnquiryCalculator() {
  const id = useId();
  const [values, setValues] = useState<Record<Key, number>>(
    () => Object.fromEntries(FIELDS.map((f) => [f.key, f.initial])) as Record<Key, number>,
  );

  const lostBookings = values.missed * WEEKS_PER_MONTH * (values.close / 100);
  const monthly = Math.round(lostBookings * values.value);

  return (
    <section className="container-x py-20 md:py-28" aria-labelledby="calculator-title">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 id="calculator-title" className="max-w-xl text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl">
            What are missed inquiries costing you?
          </h2>
          <p className="text-lg text-muted-foreground lg:pb-2 lg:text-right">
            Use your own numbers. It takes ten seconds.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Inputs */}
          <div className="rounded-[2rem] bg-secondary/70 p-7 sm:p-10">
            <div className="grid gap-8">
              {FIELDS.map((field) => {
                const value = values[field.key];
                const fill = ((value - field.min) / (field.max - field.min)) * 100;
                return (
                  <div key={field.key}>
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor={`${id}-${field.key}`} className="text-lg font-semibold text-navy">
                        {field.label}
                      </label>
                      <output
                        htmlFor={`${id}-${field.key}`}
                        className="shrink-0 text-2xl font-extrabold tabular-nums text-primary"
                      >
                        {field.format(value)}
                      </output>
                    </div>
                    <input
                      id={`${id}-${field.key}`}
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={value}
                      onChange={(e) => setValues((v) => ({ ...v, [field.key]: Number(e.target.value) }))}
                      style={{ "--fill": `${fill}%` } as CSSProperties}
                      className="range-teal mt-4"
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              An estimate from your own numbers, not a promise.
            </p>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center rounded-[2rem] bg-navy-gradient p-8 text-navy-foreground sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-navy-foreground/60">
              Estimated revenue missed each month
            </p>
            <p className="mt-5 text-6xl font-extrabold tabular-nums text-primary sm:text-7xl">
              {money.format(monthly)}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-navy-foreground/75">
              About {Math.round(lostBookings)} lost {Math.round(lostBookings) === 1 ? "booking" : "bookings"} a month, based on your numbers.
            </p>
            <ScheduleButton variant="light" className="mt-8 self-start" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
