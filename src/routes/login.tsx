import { createFileRoute, Link } from "@tanstack/react-router";
import { MountainSnow } from "lucide-react";
import { AuthShell, Field, useAuthSubmit } from "@/components/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In | EthioExplore" },
      {
        name: "description",
        content: "Log in to EthioExplore to continue planning your Ethiopian itinerary.",
      },
      { property: "og:title", content: "Log In | EthioExplore" },
      { property: "og:description", content: "Access your saved Ethiopian trips and favorites." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const onSubmit = useAuthSubmit("Logged in");
  return (
    <AuthShell>
      <Link
        to="/"
        className="mb-8 flex items-center gap-2 font-display text-lg font-extrabold text-ink lg:hidden"
      >
        <span className="surface-brand flex size-8 items-center justify-center rounded-lg text-primary-foreground">
          <MountainSnow className="size-4" />
        </span>
        EthioExplore
      </Link>
      <h1 className="mb-1 font-display text-2xl font-extrabold text-ink">Welcome back</h1>
      <p className="mb-7 text-sm text-muted-foreground">Log in to continue planning your trip.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" type="email" placeholder="you@email.com" icon="mail" />
        <Field label="Password" type="password" placeholder="••••••••" icon="lock" />
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="rounded accent-primary" /> Remember me
        </label>
        <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
          Log In
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-primary">
          Register
        </Link>
      </p>
    </AuthShell>
  );
}
