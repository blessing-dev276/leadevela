import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PhoneMock, type Bubble } from "./PhoneMock";
import { Timeline, type Event } from "./Timeline";
import { useSequence } from "./useSequence";

const EVENTS: Event[] = [
  { title: "Inquiry received", detail: "Added to your CRM as a new lead" },
  { title: "Instant text sent", detail: "In your business name, within seconds" },
  { title: "Email confirmation sent", detail: "With your booking link" },
  { title: "Your team is notified", detail: "By app, text or email" },
  { title: "Follow-up scheduled", detail: "If they don't reply, a nudge goes out tomorrow" },
];

const NEEDS = ["a quote", "an appointment", "more information", "a call back"] as const;

export function EnquiryDemo() {
  const [business, setBusiness] = useState("");
  const [customer, setCustomer] = useState("");
  const [need, setNeed] = useState<string>(NEEDS[0]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [stage, setStage] = useState<"new" | "contacted" | null>(null);
  const { step, running, run } = useSequence();

  const biz = business.trim() || "Your Business";
  const who = customer.trim() || "Alex";

  function send(e: FormEvent) {
    e.preventDefault();
    setBubbles([]);
    setStage(null);
    run([
      { at: 150, do: () => { setBubbles([{ id: "in", kind: "in", text: `Hi, I'm after ${need}. Are you free this week?` }]); setStage("new"); } },
      { at: 900, do: () => setTyping(true) },
      {
        at: 2000,
        do: () => {
          setTyping(false);
          setBubbles((b) => [...b, { id: "out1", kind: "out", text: `Hi ${who}, thanks for getting in touch with ${biz}! We've got your message and we'll come straight back to you.` }]);
          setStage("contacted");
        },
      },
      { at: 3100, do: () => setBubbles((b) => [...b, { id: "out2", kind: "out", text: "In the meantime you can pick a time that suits you here: book.example/your-business" }]) },
      { at: 4100 },
      { at: 5100 },
    ]);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="rounded-[1.75rem] border bg-card p-7 sm:p-9">
        <h3 className="text-2xl font-extrabold text-navy">A sample inquiry form</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Fill it in like a customer would, press send, and watch what your system does in the next few seconds.
        </p>
        <form onSubmit={send} className="mt-7 grid gap-4">
          <label className="grid gap-1.5 text-sm font-semibold text-navy">
            Your business name <span className="font-normal text-muted-foreground">(for the demo)</span>
            <input value={business} onChange={(e) => setBusiness(e.target.value)} maxLength={40} placeholder="e.g. Aurelia Journeys" className="rounded-xl border bg-background px-4 py-3 font-normal" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-semibold text-navy">
              Customer name
              <input value={customer} onChange={(e) => setCustomer(e.target.value)} maxLength={30} placeholder="Alex" className="rounded-xl border bg-background px-4 py-3 font-normal" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-navy">
              They need
              <select value={need} onChange={(e) => setNeed(e.target.value)} className="rounded-xl border bg-background px-4 py-3 font-normal">
                {NEEDS.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
          </div>
          <button type="submit" disabled={running} className="btn btn-primary w-full justify-center disabled:opacity-60">
            {running ? "Watch the panel…" : "Send this inquiry"} <ArrowRight className="size-4" />
          </button>
          <p className="text-xs text-muted-foreground">This is a demo. Nothing is sent and nothing is stored.</p>
        </form>
      </div>

      {/* Behind the scenes */}
      <div className="rounded-[1.75rem] bg-navy-gradient p-7 text-navy-foreground sm:p-9">
        <Timeline events={EVENTS} done={step === 0 ? 0 : Math.min(step, EVENTS.length)} />

        <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="order-2 sm:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-navy-foreground/55">Your pipeline</p>
            <div className="mt-4 grid gap-3">
              {([["New lead", "new"], ["Contacted", "contacted"], ["Booked", null]] as const).map(([label, key]) => (
                <div key={label}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-foreground/45">{label}</p>
                  <div className="mt-1.5 grid min-h-11 place-items-center rounded-xl border border-dashed border-navy-foreground/20 px-3">
                    {key && stage === key && (
                      <motion.span layoutId="lead-card" className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
                        {who} &middot; {need}
                      </motion.span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 sm:order-2">
            <PhoneMock business={biz} status="Text message · now" bubbles={bubbles} typing={typing} />
          </div>
        </div>
      </div>
    </div>
  );
}
