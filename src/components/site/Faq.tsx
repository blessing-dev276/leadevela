import { Reveal } from "./primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/** Objection-handling questions, answered plainly. Order matters: price first. */
export const FAQS = [
  {
    q: "How much does this cost?",
    a: "Every business needs a different amount of work, so we don't publish a fixed price list. After a short call we send a written quote covering the whole scope, and you decide before any work starts. No work begins without your approval.",
  },
  {
    q: "Do I own the system once it's built?",
    a: "Yes. The GoHighLevel account, the website, the workflows, and the data are yours. If you ever stop working with us, everything stays with you and keeps running. We don't hold your account hostage.",
  },
  {
    q: "Is the GoHighLevel subscription included?",
    a: "No. The GoHighLevel subscription is a separate, ongoing software cost on top of our setup fee. We'll confirm the exact monthly amount, and how it's billed, in your quote — so you know the full running cost before you commit.",
  },
  {
    q: "How long does a build take?",
    a: "It depends on how much is being built — a focused CRM and automation setup is quicker than one with a full website alongside it. Rather than quote a headline figure we can't hold to, we give you a dated timeline in your written quote, once we know the scope.",
  },
  {
    q: "What if I already have a website or a CRM?",
    a: "That's common, and it's often cheaper. We'll work with what you have and only rebuild the parts that are actually holding you back. If your current setup is fine, we'll tell you so.",
  },
  {
    q: "What happens after handover?",
    a: "You get a plain-language walkthrough and written documentation so your team can run the system without us. Ongoing support and improvements are available if you want them, but they're optional, not a lock-in.",
  },
] as const;

export function Faq() {
  return (
    <section className="container-x py-20 md:py-28" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title" className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            The things people ask before they commit.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            If something isn&rsquo;t covered here, ask us directly. We&rsquo;d rather answer an awkward question now than after you&rsquo;ve paid.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-bold text-navy hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
