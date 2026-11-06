import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";

const UK_TIME_ZONE = "Europe/London";
const HOURS = Array.from({ length: 12 }, (_, index) => String(index + 1));
const MINUTES = ["00", "15", "30", "45"];

function ukNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: UK_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const date = `${value("year")}-${value("month")}-${value("day")}`;
  return { date, key: `${date}T${value("hour")}:${value("minute")}` };
}

export function BookingDialog({ variant = "primary", className }: { variant?: "primary" | "navy" | "light"; className?: string | undefined }) {
  const { play } = useHeartbeatSound();
  const [today, setToday] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setToday(ukNow().date), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const date = String(data.get("date") || "");
    const hour = Number(data.get("hour"));
    const minute = String(data.get("minute") || "");
    const period = String(data.get("period") || "");
    const hour24 = hour % 12 + (period === "PM" ? 12 : 0);
    const selectedKey = `${date}T${String(hour24).padStart(2, "0")}:${minute}`;

    if (!date || !Number.isInteger(hour) || hour < 1 || hour > 12 || !MINUTES.includes(minute) || !["AM", "PM"].includes(period) || selectedKey <= ukNow().key) {
      setError("Choose a future date and time in the UK time zone.");
      return;
    }

    setError("");
    setSending(true);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const preferredTime = `${date} at ${hour}:${minute} ${period} UK time (Europe/London)`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${SITE.companyEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Leadvela call request",
          _replyto: email,
          _template: "table",
          _captcha: "false",
          _honey: String(data.get("website") || ""),
          name,
          email,
          preferred_date: date,
          preferred_time: `${hour}:${minute} ${period}`,
          time_zone: UK_TIME_ZONE,
          topic: topic || "Not provided",
          message: `${name} (${email}) requested a call on ${preferredTime}. ${topic}`,
        }),
      });
      const result = await response.json() as { success?: unknown };
      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error("Submission was not accepted");
      }
      setSubmitted(true);
      form.reset();
    } catch {
      setError("We couldn't send your request. Please try again or email admin@leadvela.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) { setSubmitted(false); setError(""); } }}>
      <DialogTrigger asChild>
        <button type="button" onClick={play} className={cn("btn", `btn-${variant}`, className)}>
          Schedule a Call <ArrowUpRight className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        {submitted ? (
          <div role="status" className="py-8 text-center">
            <CheckCircle2 className="mx-auto size-14 text-primary" aria-hidden="true" />
            <DialogTitle className="mt-5 text-2xl font-bold text-navy">Request submitted</DialogTitle>
            <DialogDescription className="mt-3">Your preferred call time was submitted for {SITE.companyEmail}. We'll email you to confirm the appointment.</DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-navy">Choose a call time</DialogTitle>
              <DialogDescription>
                Pick a preferred time in the UK time zone. We'll email you to confirm availability.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="mt-2 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-semibold text-navy">Your name
                  <input name="name" required autoComplete="name" className="rounded-xl border bg-card px-4 py-3 font-normal" />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold text-navy">Your email
                  <input name="email" type="email" required autoComplete="email" className="rounded-xl border bg-card px-4 py-3 font-normal" />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold text-navy">Preferred date
                  <input name="date" type="date" min={today} required className="rounded-xl border bg-card px-4 py-3 font-normal" />
                </label>
                <fieldset className="grid gap-1.5">
                  <legend className="text-sm font-semibold text-navy">Preferred time (UK)</legend>
                  <div className="flex gap-2">
                    <select name="hour" required defaultValue="" aria-label="Hour" className="min-w-0 flex-1 rounded-xl border bg-card px-2 py-3 text-sm">
                      <option value="" disabled>Hour</option>
                      {HOURS.map((hour) => <option key={hour} value={hour}>{hour}</option>)}
                    </select>
                    <select name="minute" required defaultValue="" aria-label="Minute" className="min-w-0 flex-1 rounded-xl border bg-card px-2 py-3 text-sm">
                      <option value="" disabled>Min</option>
                      {MINUTES.map((minute) => <option key={minute} value={minute}>{minute}</option>)}
                    </select>
                    <select name="period" required defaultValue="" aria-label="AM or PM" className="min-w-0 flex-1 rounded-xl border bg-card px-2 py-3 text-sm">
                      <option value="" disabled>AM/PM</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </fieldset>
              </div>
              <p className="text-xs text-muted-foreground">All times use the UK time zone (GMT or BST, depending on the date). Your time is a request until Leadvela confirms it.</p>
              <label className="grid gap-1.5 text-sm font-semibold text-navy">What would you like to discuss?
                <textarea name="topic" rows={3} className="rounded-xl border bg-card px-4 py-3 font-normal" />
              </label>
              <div className="sr-only" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={sending} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-60">
                {sending ? "Sending…" : "Send Call Request"} <ArrowUpRight className="size-4" />
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
