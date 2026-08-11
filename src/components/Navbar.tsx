import { Link } from "@tanstack/react-router";
import { Menu, MountainSnow, X, ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { ETB_RATE } from "@/lib/data";

const links = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Trip Planner", to: "/planner" },
  { label: "Favorites", to: "/favorites" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
          <span className="surface-brand flex size-8 items-center justify-center rounded-lg text-primary-foreground">
            <MountainSnow className="size-4" />
          </span>
          EthioExplore
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <ArrowLeftRight className="size-3.5" /> 1$ ≈ {ETB_RATE} ETB
          </span>
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-mist"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:opacity-90"
          >
            Register
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          className="rounded-lg p-2 hover:bg-mist lg:hidden"
        >
          {open ? <Menu className="size-5" /> : <X className="hidden size-5" />}
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="fade-in flex flex-col gap-3 border-t border-border px-5 py-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="py-1.5 text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-1 flex gap-2 border-t border-border pt-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
