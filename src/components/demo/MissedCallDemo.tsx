import { useEffect, useState } from "react";
import { PhoneMock, type Bubble } from "./PhoneMock";

const INDUSTRIES = [
  { id: "travel", label: "Travel", line: (b: string) => `Hi, this is ${b} — sorry we missed your call! Were you asking about a trip or an existing booking? Happy to help right here.` },
  { id: "clinic", label: "Clinic", line: (b: string) => `Hi, this is ${b} — sorry we missed you! Would you like to book an appointment? I can check this week's availability for you.` },
  { id: "home", label: "Home services", line: (b: string) => `Hi, this is ${b} — sorry we missed your call! Were you after a quote? Tell us the job and we'll come straight back with a price.` },
  { id: "salon", label: "Salon", line: (b: string) => `Hi, this is ${b} — sorry we missed you! Looking to book in? Let us know the service and we'll find you a slot.` },
  { id: "other", label: "Other", line: (b: string) => `Hi, this is ${b} — sorry we missed your call! Let us know what you need and we'll reply right away.` },
] as const;

export function MissedCallDemo() {
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState<string>(INDUSTRIES[0].id);
  const [typing, setTyping] = useState(false);
  const [reply, setReply] = useState("");

  const biz = business.trim() || "your business";
  const chosen = INDUSTRIES.find((i) => i.id === industry) ?? INDUSTRIES[0];
  const line = chosen.line(biz);

  // Re-type the reply whenever the wording changes, so the phone feels live.
  useEffect(() => {
    setTyping(true);
    setReply("");
    const t = setTimeout(() => {
      setTyping(false);
      setReply(line);
    }, 700);
    return () => clearTimeout(t);
  }, [line]);

  const bubbles: Bubble[] = [
    { id: "sys", kind: "sys", text: "Missed call · just now" },
    ...(reply ? [{ id: "out", kind: "out" as const, text: reply }] : []),
  ];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <h3 className="text-2xl font-extrabold text-navy sm:text-3xl">See the text your customers would get</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Type your business name and pick your industry. The phone updates as you type.
        </p>

        <label className="mt-7 grid max-w-sm gap-1.5 text-sm font-semibold text-navy">
          Your business name
          <input value={business} onChange={(e) => setBusiness(e.target.value)} maxLength={40} placeholder="e.g. Aurelia Journeys" autoComplete="organization" className="rounded-xl border bg-card px-4 py-3 font-normal" />
        </label>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-navy">Industry</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => setIndustry(i.id)}
                aria-pressed={industry === i.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  industry === i.id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-navy hover:border-primary"
                }`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="mt-6 text-xs text-muted-foreground">
          Your real message is written with you and approved before it goes live.
        </p>
      </div>

      <PhoneMock business={biz} status="Text message · now" bubbles={bubbles} typing={typing} />
    </div>
  );
}
