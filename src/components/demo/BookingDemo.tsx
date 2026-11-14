import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PhoneMock, type Bubble } from "./PhoneMock";
import { Timeline, type Event } from "./Timeline";
import { useSequence } from "./useSequence";

const SERVICES = ["Consultation · 30 min", "Appointment · 60 min", "Quick call · 15 min"] as const;
const SLOTS = ["9:00 am", "10:30 am", "12:00 pm", "2:15 pm", "3:45 pm", "5:00 pm"] as const;

const EVENTS: Event[] = [
  { title: "Booked now", detail: "Confirmation text and email with the details" },
  { title: "24 hours before", detail: "A friendly reminder text" },
  { title: "2 hours before", detail: "A final reminder with directions" },
  { title: "After the visit", detail: "A thank you and a review request" },
];

/** The next five weekdays, labelled for the chips. */
function useDays() {
  return useMemo(() => {
    const out: { key: string; day: string; date: string }[] = [];
    const d = new Date();
    while (out.length < 5) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      out.push({
        key: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString("en-GB", { weekday: "short" }),
        date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      });
    }
    return out;
  }, []);
}

export function BookingDemo() {
  const days = useDays();
  const [service, setService] = useState<string>(SERVICES[0]);
  const [day, setDay] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const { step, running, run } = useSequence();

  const who = name.trim() || "Alex";
  const chosenDay = days.find((d) => d.key === day);
  const ready = Boolean(day && slot);

  function confirm() {
    if (!ready) return;
    setBubbles([]);
    run([
      { at: 150, do: () => setTyping(true) },
      {
        at: 1100,
        do: () => {
          setTyping(false);
          setBubbles([{ id: "c", kind: "out", text: `You're booked, ${who}! ${service.split(" · ")[0]} on ${chosenDay?.day} ${chosenDay?.date} at ${slot}. Reply CHANGE if you need a different time.` }]);
        },
      },
      { at: 2300, do: () => setBubbles((b) => [...b, { id: "r1", kind: "out", text: `Reminder: we'll see you tomorrow at ${slot}.` }]) },
      { at: 3400, do: () => setBubbles((b) => [...b, { id: "r2", kind: "out", text: "See you in 2 hours. Here's how to find us: maps.example/visit" }]) },
      { at: 4500, do: () => setBubbles((b) => [...b, { id: "r3", kind: "out", text: "Thanks for coming in! Would you mind leaving us a quick review?" }]) },
    ]);
  }

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "bg-card text-navy hover:border-primary"}`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <div className="rounded-[1.75rem] border bg-card p-7 sm:p-9">
        <h3 className="text-2xl font-extrabold text-navy">A sample booking flow</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Book a time the way your customers would, then see the confirmation and reminders that go out for you.
        </p>

        <div className="mt-7 grid gap-6">
          <fieldset>
            <legend className="text-sm font-semibold text-navy">Service</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button key={s} type="button" onClick={() => setService(s)} aria-pressed={service === s} className={chip(service === s)}>{s}</button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-navy">Day</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {days.map((d) => (
                <button key={d.key} type="button" onClick={() => setDay(d.key)} aria-pressed={day === d.key} className={`rounded-2xl border px-4 py-2.5 text-center transition-colors ${day === d.key ? "border-primary bg-primary text-primary-foreground" : "bg-card text-navy hover:border-primary"}`}>
                  <span className="block text-xs font-bold uppercase tracking-wider opacity-70">{d.day}</span>
                  <span className="block text-sm font-bold">{d.date}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-navy">Time</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SLOTS.map((s) => (
                <button key={s} type="button" onClick={() => setSlot(s)} aria-pressed={slot === s} className={chip(slot === s)}>{s}</button>
              ))}
            </div>
          </fieldset>

          <label className="grid gap-1.5 text-sm font-semibold text-navy">
            Your name
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={30} placeholder="Alex" className="rounded-xl border bg-background px-4 py-3 font-normal" />
          </label>

          <button type="button" onClick={confirm} disabled={!ready || running} className="btn btn-primary w-full justify-center disabled:opacity-60">
            {ready ? (running ? "Watch the panel…" : "Confirm this booking") : "Pick a day and time to continue"} <ArrowRight className="size-4" />
          </button>
          <p className="text-xs text-muted-foreground">This is a demo. Nothing is booked and nothing is stored.</p>
        </div>
      </div>

      <div className="rounded-[1.75rem] bg-navy-gradient p-7 text-navy-foreground sm:p-9">
        <div className="rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-navy-foreground/55">Your calendar</p>
          <p className="mt-1.5 text-lg font-bold">{ready ? service : "Waiting for a booking"}</p>
          <p className="text-sm text-navy-foreground/70">{ready ? `${chosenDay?.day} ${chosenDay?.date} at ${slot}` : "Pick a service, day and time"}</p>
        </div>

        <div className="mt-7">
          <Timeline events={EVENTS} done={Math.min(step, EVENTS.length)} label="What happens next" />
        </div>

        <div className="mt-8">
          <PhoneMock business={"Your Business"} bubbles={bubbles} typing={typing} />
        </div>
      </div>
    </div>
  );
}
