import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/leadvela-logo-horizontal.png.asset.json";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";
import { ScheduleButton, SoundToggle } from "./primitives";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const { pulse } = useHeartbeatSound();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-all", scrolled ? "border-border bg-background/85 backdrop-blur-xl" : "border-transparent bg-background/60 backdrop-blur")}>
      <div className="container-x grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" aria-label="Leadvela home" className="flex min-w-0 items-center">
          <img key={pulse} src={logo.url} alt="Leadvela" width={2000} height={560} className={cn("h-10 w-auto origin-left md:h-11", pulse > 0 && "animate-heart")} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link text-[0.95rem]">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <SoundToggle />
          <ScheduleButton className="px-4 py-2.5 text-sm" />
        </div>
      </div>
      <nav aria-label="Main mobile" className="container-x flex justify-center gap-8 pb-3 md:hidden">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="nav-link text-sm">{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}
