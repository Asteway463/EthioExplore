import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact EthioExplore — Ethiopia Trip Enquiries" },
      {
        name: "description",
        content:
          "Ask our Addis Ababa team about routes, guides, permits and custom Ethiopian itineraries.",
      },
      { property: "og:title", content: "Contact EthioExplore" },
      {
        property: "og:description",
        content: "Questions about routes, guides or permits? Talk to our Addis Ababa team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink md:text-3xl">Contact us</h1>
          <p className="mt-2 text-muted-foreground">
            Tell us where you'd like to go and we'll reply with a route suggestion within two
            working days.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-primary" /> Bole Road, Addis Ababa, Ethiopia
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-primary" /> hello@ethioexplore.example
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-primary" /> +251 11 000 0000
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent — we'll be in touch soon");
            (e.target as HTMLFormElement).reset();
          }}
          className="space-y-4 rounded-2xl border border-border p-6 shadow-soft"
        >
          {[
            { label: "Name", type: "text", placeholder: "Your name" },
            { label: "Email", type: "email", placeholder: "you@email.com" },
          ].map((f) => (
            <label key={f.label} className="block">
              <span className="mb-1 block text-xs font-semibold text-muted-foreground">
                {f.label}
              </span>
              <input
                required
                type={f.type}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-muted-foreground">Message</span>
            <textarea
              required
              rows={5}
              placeholder="Where would you like to travel?"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            Send message
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
