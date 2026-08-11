import { createFileRoute, Link } from "@tanstack/react-router";
import { MountainSnow } from "lucide-react";
import { AuthShell, Field, useAuthSubmit } from "@/components/AuthShell";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Your Account | EthioExplore" },
      {
        name: "description",
        content:
          "Create an EthioExplore account to save favorites and build Ethiopian itineraries in minutes.",
      },
      { property: "og:title", content: "Create Your Account | EthioExplore" },
      {
        property: "og:description",
        content: "Save favorites and build Ethiopian itineraries in minutes.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const onSubmit = useAuthSubmit("Account created");
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
      <h1 className="mb-1 font-display text-2xl font-extrabold text-ink">Create your account</h1>
      <p className="mb-7 text-sm text-muted-foreground">
        Start building your Ethiopia itinerary in minutes.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Full name" placeholder="Your name" icon="user" />
        <Field label="Email" type="email" placeholder="you@email.com" icon="mail" />
        <Field label="Password" type="password" placeholder="••••••••" icon="lock" />
        <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
          Create Account
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
