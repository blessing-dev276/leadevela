import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="Leadvela home"><img src="/leadvela-logo-horizontal-white.png" alt="Leadvela" width={2000} height={560} className="h-11 w-auto" loading="lazy" /></Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
            A digital solutions agency designing websites, GoHighLevel CRM systems, sales funnels, and automated customer journeys for growing businesses.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-foreground/50">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-foreground/50">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`mailto:${SITE.contactEmail}`} className="hover:text-primary">{SITE.contactEmail}</a></li>
            <li><a href={`mailto:${SITE.companyEmail}`} className="hover:text-primary">{SITE.companyEmail}</a></li>
            <li><a href={SITE.url} className="hover:text-primary">leadvela.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x py-6 text-xs text-navy-foreground/50">© {new Date().getFullYear()} Leadvela. All rights reserved.</div>
      </div>
    </footer>
  );
}
