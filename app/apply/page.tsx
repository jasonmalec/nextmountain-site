"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  full_name: z.string().trim().min(1, "Required").max(120),
  work_email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(1, "Required").max(120),
  role: z.string().trim().min(1, "Required").max(120),
  why_interested: z.string().trim().min(1, "Required").max(1500),
  key_decision: z.string().trim().min(1, "Required").max(1500),
  referred_by: z.string().trim().max(120).optional(),
  accelerator_interest: z.enum(["yes", "maybe", "no"]),
});

type FormErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

// Editorial field styling — underline-only inputs, generous padding
const fieldClass =
  "w-full px-0 py-3 bg-transparent border-0 border-b border-border text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors";
const textareaClass =
  "w-full px-0 py-3 bg-transparent border-0 border-b border-border text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none";
const errorClass = "border-destructive focus:border-destructive";
const labelClass =
  "block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3";
const errorMsgClass = "mt-2 text-xs text-destructive";

export default function ApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState({
    full_name: "",
    work_email: "",
    company: "",
    role: "",
    why_interested: "",
    key_decision: "",
    referred_by: "",
    accelerator_interest: "maybe" as "yes" | "maybe" | "no",
  });

  const set = (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const setRadio = (val: "yes" | "maybe" | "no") => {
    setValues((v) => ({ ...v, accelerator_interest: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      // Scroll to first error
      const firstField = Object.keys(fieldErrors)[0];
      if (firstField) {
        document.getElementById(firstField)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("applications").insert({
      full_name: result.data.full_name,
      work_email: result.data.work_email,
      company: result.data.company,
      role: result.data.role,
      why_interested: result.data.why_interested,
      key_decision: result.data.key_decision,
      accelerator_interest: result.data.accelerator_interest,
      referred_by: result.data.referred_by || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    router.push("/thank-you");
  };

  return (
    <main className="bg-background">
      {/* ── Hero band ──────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-wide">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.18em] text-primary-foreground/50 hover:text-accent transition-colors"
          >
            ← Back to home
          </Link>
          <p className="mt-12 text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
            The Application
          </p>
          <h1 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl">
            <span className="text-accent">Apply</span> for a founding seat.
          </h1>
          <p className="mt-8 text-lg text-primary-foreground/70 max-w-xl leading-relaxed">
            A short application — about ten minutes. Jeff and Jason read every
            one personally. You&rsquo;ll hear back within 48 hours.
          </p>
        </div>
      </section>

      {/* ── Body: sticky context + form ──────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-wide grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* LEFT — sticky context rail */}
          <aside className="lg:sticky lg:top-32 lg:self-start space-y-12">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
                What to expect
              </p>
              <ol className="space-y-6">
                {[
                  {
                    n: "01",
                    title: "We read every one",
                    body: "Jeff and Jason personally read every application. No filters, no automated screening.",
                  },
                  {
                    n: "02",
                    title: "Reply within 48 hours",
                    body: "You&rsquo;ll hear back from us by email — yes, no, or a request for a short conversation.",
                  },
                  {
                    n: "03",
                    title: "A quick call",
                    body: "Shortlisted applicants meet one of us briefly. Mutual fit matters more than credentials.",
                  },
                ].map(({ n, title, body }) => (
                  <li key={n} className="flex gap-5">
                    <span className="font-serif text-2xl text-accent leading-none flex-shrink-0 w-8">
                      {n}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-primary leading-tight">
                        {title}
                      </h3>
                      <p
                        className="mt-2 text-sm text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: body }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-l-2 border-accent pl-6">
              <p className="font-serif text-xl text-primary leading-snug italic">
                We&rsquo;re selective because the quality of the room is the
                product.
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                Jeff &amp; Jason
              </p>
            </div>
          </aside>

          {/* RIGHT — form */}
          <form onSubmit={handleSubmit} className="space-y-20">
            {/* ── 01 — About you ─────────────────────────────── */}
            <fieldset>
              <div className="flex items-baseline gap-4 mb-10 pb-4 border-b border-border">
                <span className="font-serif text-3xl text-accent">01</span>
                <legend className="font-serif text-2xl text-primary">
                  About you
                </legend>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="full_name" className={labelClass}>
                    Full name
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    value={values.full_name}
                    onChange={set("full_name")}
                    className={`${fieldClass} ${errors.full_name ? errorClass : ""}`}
                    placeholder="Jane Smith"
                  />
                  {errors.full_name && (
                    <p className={errorMsgClass}>{errors.full_name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="work_email" className={labelClass}>
                    Work email
                  </label>
                  <input
                    id="work_email"
                    type="email"
                    value={values.work_email}
                    onChange={set("work_email")}
                    className={`${fieldClass} ${errors.work_email ? errorClass : ""}`}
                    placeholder="jane@company.com"
                  />
                  {errors.work_email && (
                    <p className={errorMsgClass}>{errors.work_email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={values.company}
                    onChange={set("company")}
                    className={`${fieldClass} ${errors.company ? errorClass : ""}`}
                    placeholder="Acme Corp"
                  />
                  {errors.company && (
                    <p className={errorMsgClass}>{errors.company}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="role" className={labelClass}>
                    Your role
                  </label>
                  <input
                    id="role"
                    type="text"
                    value={values.role}
                    onChange={set("role")}
                    className={`${fieldClass} ${errors.role ? errorClass : ""}`}
                    placeholder="CEO"
                  />
                  {errors.role && (
                    <p className={errorMsgClass}>{errors.role}</p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* ── 02 — Your context ──────────────────────────── */}
            <fieldset>
              <div className="flex items-baseline gap-4 mb-10 pb-4 border-b border-border">
                <span className="font-serif text-3xl text-accent">02</span>
                <legend className="font-serif text-2xl text-primary">
                  Your context
                </legend>
              </div>

              <div className="space-y-12">
                <div>
                  <label htmlFor="why_interested" className={labelClass}>
                    Why this founding cohort?
                  </label>
                  <p className="font-serif text-lg text-primary leading-snug mb-1">
                    What&rsquo;s the real reason you&rsquo;re applying?
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Be honest. We&rsquo;re not looking for polished — we&rsquo;re
                    looking for true.
                  </p>
                  <textarea
                    id="why_interested"
                    rows={6}
                    maxLength={1500}
                    value={values.why_interested}
                    onChange={set("why_interested")}
                    className={`${textareaClass} ${errors.why_interested ? errorClass : ""}`}
                    placeholder="Start typing…"
                  />
                  <div className="flex justify-between mt-2">
                    {errors.why_interested ? (
                      <p className={errorMsgClass}>{errors.why_interested}</p>
                    ) : (
                      <span />
                    )}
                    <p className="text-xs text-muted-foreground">
                      {values.why_interested.length}/1500
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="key_decision" className={labelClass}>
                    The decision you&rsquo;re navigating
                  </label>
                  <p className="font-serif text-lg text-primary leading-snug mb-1">
                    What&rsquo;s the most important leadership decision you&rsquo;re
                    making right now as it relates to AI?
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Be specific. This helps us understand where you actually
                    are.
                  </p>
                  <textarea
                    id="key_decision"
                    rows={6}
                    maxLength={1500}
                    value={values.key_decision}
                    onChange={set("key_decision")}
                    className={`${textareaClass} ${errors.key_decision ? errorClass : ""}`}
                    placeholder="Start typing…"
                  />
                  <div className="flex justify-between mt-2">
                    {errors.key_decision ? (
                      <p className={errorMsgClass}>{errors.key_decision}</p>
                    ) : (
                      <span />
                    )}
                    <p className="text-xs text-muted-foreground">
                      {values.key_decision.length}/1500
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* ── 03 — Logistics ─────────────────────────────── */}
            <fieldset>
              <div className="flex items-baseline gap-4 mb-10 pb-4 border-b border-border">
                <span className="font-serif text-3xl text-accent">03</span>
                <legend className="font-serif text-2xl text-primary">
                  Logistics
                </legend>
              </div>

              <div className="space-y-12">
                <div>
                  <p className={labelClass}>Private coaching add-on</p>
                  <p className="font-serif text-lg text-primary leading-snug mb-1">
                    Add three monthly 1:1 coaching sessions with Jeff or Jason?
                    (+$3,000 founding — $6,000 standard.)
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    The Whisper Ranch full-day intensive is already included in
                    your founding seat.
                  </p>
                  <div className="space-y-3">
                    {(
                      [
                        { value: "yes", label: "Yes, add private coaching" },
                        { value: "maybe", label: "Maybe — tell me more" },
                        { value: "no", label: "No, just the founding seat" },
                      ] as const
                    ).map(({ value, label }) => (
                      <label
                        key={value}
                        className={`flex items-center gap-4 cursor-pointer text-sm p-4 border rounded-sm transition-colors ${
                          values.accelerator_interest === value
                            ? "border-accent bg-accent/5 text-foreground"
                            : "border-border hover:border-muted-foreground text-muted-foreground"
                        }`}
                      >
                        <input
                          type="radio"
                          name="accelerator_interest"
                          value={value}
                          checked={values.accelerator_interest === value}
                          onChange={() => setRadio(value)}
                          className="accent-accent"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="referred_by" className={labelClass}>
                    How did you hear about this?
                  </label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optional, but appreciated.
                  </p>
                  <input
                    id="referred_by"
                    type="text"
                    value={values.referred_by}
                    onChange={set("referred_by")}
                    className={fieldClass}
                    placeholder="A colleague, LinkedIn, a podcast…"
                    maxLength={120}
                  />
                </div>
              </div>
            </fieldset>

            {/* ── Submit ──────────────────────────────────────── */}
            <div className="pt-8 border-t border-border">
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting…" : "Submit application"}
                {!loading && (
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                By submitting, you agree to be contacted by email about your
                application.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
