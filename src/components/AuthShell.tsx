import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, MountainSnow, User } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { toast } from "sonner";
import { RouteMotif } from "./RouteMotif";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="surface-cta relative hidden flex-col justify-between overflow-hidden p-12 text-primary-foreground lg:flex">
        <RouteMotif />
        <Link to="/" className="relative flex items-center gap-2 font-display text-lg font-extrabold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/20">
            <MountainSnow className="size-4" />
          </span>
          EthioExplore
        </Link>
        <div className="relative">
          <h2 className="mb-3 font-display text-3xl leading-tight font-extrabold">
            Your route through Ethiopia starts with an account.
          </h2>
          <p className="max-w-sm text-primary-foreground/80">
            Save favorites, build itineraries, and pick up your trip plan on any device.
          </p>
        </div>
        <p className="relative text-xs text-primary-foreground/60">© 2026 EthioExplore</p>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="fade-in w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  icon,
}: {
  label: string;
  type?: string;
  placeholder: string;
  icon: "mail" | "lock" | "user";
}) {
  const Icon = icon === "mail" ? Mail : icon === "lock" ? Lock : User;
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      <span className="relative block">
        <Icon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          required
          placeholder={placeholder}
          className="w-full rounded-xl border border-input bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </span>
    </label>
  );
}

export function useAuthSubmit(message: string) {
  const navigate = useNavigate();
  return (e: FormEvent) => {
    e.preventDefault();
    toast.success(message);
    navigate({ to: "/planner" });
  };
}
