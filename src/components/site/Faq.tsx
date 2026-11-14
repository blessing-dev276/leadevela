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
    a: "No. GoHighLevel bills you directly for the software, separate from our setup fee. We'll tell you the exact monthly amount before you commit, so there's no surprise on your card.",
  },
  {
    q: "How long does a build take?",
    a: "A focused CRM and automation setup typically runs two to four weeks. A website alongside it takes longer. You'll get a realistic timeline in your quote rather than an optimistic one we can't hold to.",
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
