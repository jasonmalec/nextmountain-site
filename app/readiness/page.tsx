import Link from "next/link";

export const metadata = {
  title: "The Next Mountain Readiness Assessment",
  description:
    "A 5-minute self-diagnostic across eight dimensions of senior leadership in the AI shift.",
};

export default function ReadinessPage() {
  return (
    <main className="bg-primary text-primary-foreground min-h-screen flex items-center">
      <div className="container-prose py-32 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40">
          The Next Mountain Readiness Assessment
        </p>
        <h1 className="mt-6 font-serif text-5xl md:text-6xl leading-[1.05]">
          <span className="text-accent">Coming</span> soon.
        </h1>
        <p className="mt-8 text-lg text-primary-foreground/70 leading-relaxed max-w-xl mx-auto">
          A 5-minute self-diagnostic across eight dimensions of senior
          leadership in the AI shift. Launching alongside the founding cohort.
        </p>
        <p className="mt-4 text-sm text-primary-foreground/40">
          In the meantime, if you already know — apply.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/apply"
            className="inline-block px-8 py-3.5 bg-accent text-accent-foreground text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors"
          >
            Apply for a Founding Seat
          </Link>
          <Link
            href="/"
            className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors underline underline-offset-4"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
