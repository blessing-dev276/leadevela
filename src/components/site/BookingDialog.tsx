import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function BookingDialog({ variant = "primary", className }: { variant?: "primary" | "navy" | "light"; className?: string | undefined }) {
  const { play } = useHeartbeatSound();
  const [openedEmail, setOpenedEmail] = useState(false);
  const [error, setError] = useState("");
  const [today, setToday] = useState("");
  const [timeZone, setTimeZone] = useState("Your local time");

  useEffect(() => {
    setToday(localToday());
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "Your local time");
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const date = String(data.get("date") || "");
    const time = String(data.get("time") || "");
    const selected = new Date(`${date}T${time}`);
    if (!date || !time || Number.isNaN(selected.getTime()) || selected <= new Date()) {
      setError("Choose a future date and time.");
      return;
    }

    setError("");
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const body = [
      "Hello Leadvela,",
      "",
      "I'd like to request a call at the following time:",
      `${date} at ${time} (${timeZone})`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `What I'd like to discuss: ${topic || "Not provided"}`,
      "",
      "Please confirm the time or suggest an alternative.",
    ].join("\n");
    const href = `mailto:${SITE.companyEmail}?subject=${encodeURIComponent(`Call request from ${name}`)}&body=${encodeURIComponent(body)}`;
    setOpenedEmail(true);
    window.location.href = href;
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) { setOpenedEmail(false); setError(""); } }}>
      <DialogTrigger asChild>
        <button type="button" onClick={play} className={cn("btn", `btn-${variant}`, className)}>
          Schedule a Call <ArrowUpRight className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-navy">Choose a call time</DialogTitle>
          <DialogDescription>
            Pick a preferred time and send your request to {SITE.companyEmail}. We'll confirm availability by email.
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
            <label className="grid gap-1.5 text-sm font-semibold text-navy">Preferred time
              <input name="time" type="time" required className="rounded-xl border bg-card px-4 py-3 font-normal" />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">Time zone: {timeZone}. Times are requests until Leadvela confirms them.</p>
          <label className="grid gap-1.5 text-sm font-semibold text-navy">What would you like to discuss?
            <textarea name="topic" rows={3} className="rounded-xl border bg-card px-4 py-3 font-normal" />
          </label>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">Continue to email <ArrowUpRight className="size-4" /></button>
          {openedEmail && <p role="status" className="text-sm text-muted-foreground">Your email app should open with the details filled in. Send that email to finish your request. If it did not open, email {SITE.companyEmail} directly.</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
