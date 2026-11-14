import { useState } from "react";
import { Star } from "lucide-react";
import { Check } from "lucide-react";
import { PhoneMock, type Bubble } from "./PhoneMock";
import { useSequence } from "./useSequence";

const ASK = "Thanks for coming in today! How did we do? Tap a star below.";

const POINTS = [
  "Happy customers go straight to your Google review page",
  "Unhappy feedback comes to you privately first, so you can put it right",
  "Sent automatically at the right moment, not days later",
];

export function ReviewDemo() {
  const [rating, setRating] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([{ id: "ask", kind: "out", text: ASK }]);
  const [typing, setTyping] = useState(false);
  const { run, reset } = useSequence();

  function rate(stars: number) {
    setRating(stars);
    const happy = stars >= 4;
    setBubbles([
      { id: "ask", kind: "out", text: ASK },
      { id: "in", kind: "in", text: "★".repeat(stars) + "☆".repeat(5 - stars) },
    ]);
    run([
      { at: 200, do: () => setTyping(true) },
      {
        at: 1200,
        do: () => {
          setTyping(false);
          setBubbles((b) => [
            ...b,
            happy
              ? { id: "out", kind: "out", text: "That's brilliant to hear, thank you! Would you mind sharing it here? g.page/your-business/review" }
              : { id: "out", kind: "out", text: "Thank you for being honest — that's not the experience we want. The owner has been notified and will call you today to put it right." },
          ]);
        },
      },
    ]);
  }

  function again() {
    reset();
    setRating(0);
    setTyping(false);
    setBubbles([{ id: "ask", kind: "out", text: ASK }]);
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <h3 className="text-2xl font-extrabold text-navy sm:text-3xl">A sample review request</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          After a job or a visit, your customer gets a short text. Pick a rating to see what happens next &mdash; and what happens when it isn&rsquo;t five stars.
        </p>

        <ul className="mt-7 grid gap-3">
          {POINTS.map((p) => (
            <li key={p} className="flex gap-3 text-sm font-medium leading-relaxed text-navy">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                <Check className="size-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold text-navy">Rate the visit</legend>
          <div className="mt-3 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => rate(n)}
                aria-label={`${n} star${n === 1 ? "" : "s"}`}
                aria-pressed={rating === n}
                className="rounded-full p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Star className={`size-8 ${n <= rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
              </button>
            ))}
            {rating > 0 && (
              <button type="button" onClick={again} className="ml-2 text-sm font-bold text-primary-deep underline underline-offset-4">
                Try another
              </button>
            )}
          </div>
        </fieldset>
      </div>

      <PhoneMock business="Your Business" bubbles={bubbles} typing={typing} />
    </div>
  );
}
