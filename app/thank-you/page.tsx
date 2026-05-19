import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-primary text-primary-foreground flex items-center">
      <div className="container-prose pt-32 pb-24">
        <Link
          href="/"
          className="text-sm text-primary-foreground/60 hover:text-primary-foreground/90 transition-colors"
        >
          ← Back to home
        </Link>
        <div className="mt-16">
          <h1 className="text-4xl md:text-5xl text-primary-foreground">
            Thanks. We&rsquo;ll be in touch within 48 hours.
          </h1>
          <div className="mt-8 space-y-5 text-primary-foreground/80 max-w-lg">
            <p>
              Jeff and Jason read every application personally. If your fit
              looks right on paper, we&rsquo;ll send a link to schedule a
              30-minute conversation — not a sales call, just a real
              conversation to confirm mutual fit.
            </p>
            <p>
              Applications for the founding cohort receive rolling decisions
              through May 26. You&rsquo;ll hear from us either way.
            </p>
          </div>
          <p className="mt-10 text-sm text-primary-foreground/60">
            Questions? Email{" "}
            <a
              href="mailto:hello@thenextmountain.ai"
              className="underline hover:text-primary-foreground/80 transition-colors"
            >
              hello@thenextmountain.ai
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
