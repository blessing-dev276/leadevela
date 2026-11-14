import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";
import { ScheduleButton, SoundToggle } from "./primitives";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/demo", label: "Live demo" },
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
      <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-3 sm:gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" aria-label="Leadvela home" className="flex min-w-0 items-center">
          <img key={pulse} src="/leadvela-logo-horizontal.png" alt="Leadvela" width={2000} height={560} className={cn("h-auto w-full max-w-36 origin-left sm:max-w-44 md:max-w-48", pulse > 0 && "animate-heart")} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link text-[0.95rem]">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <SoundToggle />
          <ScheduleButton className="px-3 py-2.5 text-xs sm:px-4 sm:text-sm" />
        </div>
      </div>
      <nav aria-label="Main mobile" className="container-x flex justify-between gap-3 pb-3 sm:justify-center sm:gap-8 md:hidden">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="nav-link text-sm">{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}
