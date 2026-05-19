import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/fade-in";
import { PageNav } from "@/components/page-nav";

export default function HomePage() {
  return (
    <main>
      <PageNav />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-primary">
        <Image
          src="/images/patio.png"
          alt="Whisper Ranch, Colorado"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="relative z-10 container-wide pt-40 pb-32">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-3">
            The Next Mountain · Founding Cohort · Mid-to-Late June 2026
          </p>
          <p className="text-sm italic text-primary-foreground/60 mb-8 max-w-md">
            For leaders who understand the times — and want to know what to do.
          </p>
          <h1 className="font-serif leading-[1.08] max-w-3xl">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-accent">
              AI will not replace
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl text-primary-foreground">
              wise leaders.
            </span>
            <span className="block text-3xl md:text-4xl text-primary-foreground/70 mt-4 font-light">
              But wise leaders will learn to lead with it.
            </span>
          </h1>
          <p className="mt-8 text-base text-primary-foreground/60 max-w-md leading-relaxed">
            Ten senior executives. Six one-hour Circles. One day at Whisper
            Ranch. Ninety days that change how you decide.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/apply"
              className="inline-block px-8 py-3.5 bg-accent text-accent-foreground text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors"
            >
              Apply for a Founding Seat
            </Link>
            <Link
              href="/readiness"
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors underline underline-offset-4"
            >
              Not sure yet? Take the 5-minute Readiness Assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <section className="bg-primary border-t border-primary-foreground/10 py-16">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { num: "10",  label: "Seats in the founding cohort" },
            { num: "6",   label: "One-hour Circles, biweekly" },
            { num: "25+", label: "Years of leadership coaching" },
            { num: "90",  label: "Days · Mid-to-late June start" },
          ].map(({ num, label }) => (
            <div key={num}>
              <p className="font-serif text-5xl md:text-6xl text-accent leading-none">
                {num}
              </p>
              <p className="mt-3 text-xs text-primary-foreground/50 leading-snug max-w-[10rem]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────────────────── */}
      <div className="bg-primary border-t border-primary-foreground/10 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="text-xs tracking-widest text-primary-foreground/30 uppercase mr-0">
              {[
                "Founding Cohort",
                "June 2026",
                "Ten Seats",
                "Applications Close Mid-June",
                "Whisper Ranch · Colorado",
                "Senior Executive Cohort",
                "Senior Executives Only",
                "No Passive Observers",
              ].map((item) => (
                <span key={item}>
                  <span className="mx-8">{item}</span>
                  <span className="text-accent/40">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Program ────────────────────────────────────────────────── */}
      <section id="program" className="py-28 bg-background">
        <div className="container-wide">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              The program
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-xl leading-tight">
              A room you can&rsquo;t find anywhere else.
            </h2>
            <p className="mt-6 text-foreground max-w-2xl leading-relaxed">
              Next Mountain Circles is the founding program of{" "}
              <span className="font-medium">The Next Mountain</span> — a
              community for senior leaders learning to climb wisely through the
              AI shift. Built by Jeff Caliguire and Jason Malec.
            </p>
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
              Most AI content is built for practitioners. This is built for the
              people they report to — executives carrying the calls that decide
              whether their organizations thrive or drift through one of the
              most consequential shifts in a generation.
            </p>
            <p className="mt-5 text-muted-foreground max-w-2xl leading-relaxed">
              Our working frame is{" "}
              <span className="text-primary font-medium">
                Essence → Vision → Strategy → Tools.
              </span>{" "}
              We don&rsquo;t start with the tools. We start with who you are,
              what you&rsquo;re called to build, and the discernment to know
              what only you can do — and what AI is genuinely good for.
            </p>
          </FadeIn>

          <div className="mt-20 grid gap-0 md:grid-cols-3 border-t border-border">
            {[
              {
                label: "Six one-hour Circles",
                desc: "Structured working sessions on Zoom, biweekly over 90 days, with between-session resources and reflection prompts.",
              },
              {
                label: "Ten curated peers",
                desc: "Senior leaders — CEOs, CFOs, COOs — selected for their seriousness, not their industry. No passive observers.",
              },
              {
                label: "One full-day intensive",
                desc: "An in-person day at Whisper Ranch in Boulder, Colorado — included in the founding seat for every cohort member.",
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 120}>
                <div className="pt-8 pr-10 pb-12">
                  <div className="w-6 h-px bg-accent mb-6" />
                  <h3 className="font-serif text-xl text-primary">{item.label}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote (Issachar) ──────────────────────────────────── */}
      <section className="py-28 bg-primary">
        <FadeIn>
          <div className="container-prose text-center">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-[1.2] tracking-tight italic">
              <span className="text-accent/40 text-7xl leading-none align-top mr-2 not-italic">
                &ldquo;
              </span>
              From the tribe of Issachar… men who understood the times and knew
              what Israel should do.
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-primary-foreground/40">
              1 Chronicles 12:32
            </p>
            <p className="mt-10 text-lg text-primary-foreground/70 max-w-xl mx-auto leading-relaxed">
              Next Mountain Circles is where that becomes possible.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Selection criteria ─────────────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container-wide">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Selection criteria
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-xl leading-tight">
              Ten seats. Deliberately limited.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl leading-relaxed">
              We&rsquo;re selective because the quality of the room is the
              product. Here&rsquo;s who belongs.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <FadeIn delay={100}>
              <ul className="space-y-5">
                {[
                  "You hold decision authority — CEO, CFO, COO, or equivalent — and you're accountable for how AI shapes your organization.",
                  "You want a trusted room of peers, not another webinar or vendor pitch.",
                  "You're past curiosity and ready for strategic engagement with real implementation pressure.",
                  "You believe wise leadership still matters — especially as the tools change.",
                ].map((item) => (
                  <li key={item} className="flex gap-4 text-sm leading-relaxed">
                    <span className="mt-1 text-accent flex-shrink-0 text-base">→</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="border-l border-border pl-10">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  Not designed for
                </p>
                <ul className="space-y-5">
                  {[
                    "Those seeking tool tutorials or hands-on technical training.",
                    "Passive learners — this is a working room, not a lecture series.",
                    "Leaders without authority to influence organizational AI decisions.",
                    "Anyone who can't commit to six one-hour Circles over 90 days.",
                  ].map((item) => (
                    <li key={item} className="flex gap-4 text-sm leading-relaxed">
                      <span className="mt-1 text-muted-foreground/40 flex-shrink-0">
                        —
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Mid-page assessment CTA ────────────────────────────────── */}
      <section className="py-20 bg-secondary/40 border-y border-border">
        <FadeIn>
          <div className="container-prose text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Not sure where you stand?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight max-w-2xl mx-auto">
              Want to know where you stand before you decide?
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The Next Mountain Readiness Assessment is a 5-minute
              self-diagnostic across eight dimensions of senior leadership in
              the AI shift. You&rsquo;ll get a private report — your zone, your
              strongest dimension, your growth dimension, and three questions
              worth sitting with. No sales call. No pressure.
            </p>
            <Link
              href="/readiness"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 border border-primary text-primary text-sm rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Take the Readiness Assessment <span aria-hidden>→</span>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Founders ───────────────────────────────────────────────── */}
      <section id="founders" className="py-28 bg-secondary/30">
        <div className="container-wide">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              The founders
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-xl leading-tight">
              Who you&rsquo;ll be working with.
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-16 md:grid-cols-2">
            {/* Jeff */}
            <FadeIn delay={100}>
              <div className="text-center md:text-left">
                <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto md:mx-0 mb-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/founder-jeff.png"
                    alt="Jeff Caliguire"
                    fill
                    sizes="(min-width: 768px) 256px, 224px"
                    className="object-contain"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  Leadership development
                </p>
                <h3 className="font-serif text-3xl text-primary">
                  Jeff Caliguire
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Twenty-five years coaching senior leaders through transitions.
                  Built and sold a leadership development practice. Owner of
                  Whisper Ranch. Jeff has sat with leaders in their hardest
                  rooms — this one included. He brings the long view: what
                  actually changes people who already know a lot.
                </p>
              </div>
            </FadeIn>

            {/* Jason */}
            <FadeIn delay={200}>
              <div className="text-center md:text-left">
                <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto md:mx-0 mb-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/founder-jason.png"
                    alt="Jason Malec"
                    fill
                    sizes="(min-width: 768px) 256px, 224px"
                    className="object-contain"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  Technology strategy &amp; AI adoption
                </p>
                <h3 className="font-serif text-3xl text-primary">
                  Jason Malec
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Technology strategist and AI adoption advisor working with
                  mission-driven organizations at the intersection of leadership
                  and emerging technology. Jason keeps the conversation
                  grounded in what&rsquo;s actually happening — not what&rsquo;s
                  being marketed. He&rsquo;s in the work, not just advising
                  on it.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Whisper Ranch ──────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground overflow-hidden">
        <div className="container-wide grid md:grid-cols-2 items-stretch min-h-[480px]">
          <FadeIn className="flex flex-col justify-center py-24 pr-12">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/40 mb-6">
              The full-day intensive
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Whisper Ranch,
              <br />
              Colorado.
            </h2>
            <p className="mt-6 text-primary-foreground/70 leading-relaxed max-w-sm">
              All founding members spend one full day together at Whisper Ranch
              — Jeff&rsquo;s property in the Colorado mountains. Included in
              the founding seat. (You cover travel and lodging; we cover meals.)
            </p>
            <a
              href="https://www.whisperranch.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Learn about the ranch <span aria-hidden>→</span>
            </a>
          </FadeIn>
          <div className="relative min-h-[360px] md:min-h-0">
            <Image
              src="/images/patio.png"
              alt="Whisper Ranch patio with mountain views"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Investment ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 bg-background">
        <div className="container-wide">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              The investment
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              Founding member pricing.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              25% below standard. Founding pricing locks for year two.
            </p>
          </FadeIn>

          <div className="mt-16 grid md:grid-cols-2 gap-px bg-border max-w-4xl">
            {/* Founding Seat */}
            <FadeIn delay={100}>
              <div className="bg-background p-10 flex flex-col h-full">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  Founding Seat
                </p>
                <p className="font-serif text-6xl text-primary leading-none">
                  $9,000
                </p>
                <p className="mt-2 text-sm text-muted-foreground line-through">
                  $12,000 standard
                </p>
                <ul className="mt-8 space-y-3 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    Six one-hour Circles on Zoom, biweekly over 90 days
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    One-day intensive at Whisper Ranch in Boulder, Colorado — included
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    Between-session resources and reflection prompts
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    Cohort peer access
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    Founding pricing locks for year two
                  </li>
                </ul>
                <Link
                  href="/apply"
                  className="mt-10 block text-center py-3 bg-accent text-accent-foreground text-sm rounded-sm hover:bg-accent/90 transition-colors"
                >
                  Apply for a Founding Seat
                </Link>
              </div>
            </FadeIn>

            {/* Private coaching add-on */}
            <FadeIn delay={200}>
              <div className="bg-primary p-10 flex flex-col h-full">
                <p className="text-xs uppercase tracking-widest text-accent mb-6">
                  Add private coaching
                </p>
                <p className="font-serif text-6xl text-primary-foreground leading-none">
                  +$3,000
                </p>
                <p className="mt-2 text-sm text-primary-foreground/40 line-through">
                  $6,000 standard
                </p>
                <ul className="mt-8 space-y-3 text-sm text-primary-foreground/70 flex-1">
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    Three monthly 1:1 coaching sessions with Jeff Caliguire or Jason Malec
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    Continues for the 90 days of the cohort
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    Founding pricing locks for year two
                  </li>
                </ul>
                <Link
                  href="/apply"
                  className="mt-10 block text-center py-3 border border-primary-foreground/30 text-primary-foreground text-sm rounded-sm hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  Add to your application
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-secondary/30">
        <div className="container-wide max-w-2xl">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Common questions
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-16">
              What people ask.
            </h2>
          </FadeIn>
          <Accordion type="single" collapsible>
            <AccordionItem value="time">
              <AccordionTrigger>
                How much time does this require?
              </AccordionTrigger>
              <AccordionContent>
                Six one-hour Circles over 90 days — roughly one every two
                weeks — plus a one-day intensive at Whisper Ranch. Each Circle
                includes pre-reading or a brief reflection prompt (30–45
                minutes). Budget about three to four hours per month. We&rsquo;ve
                designed this for people with demanding schedules, not academics.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="confidential">
              <AccordionTrigger>
                Is what I share confidential?
              </AccordionTrigger>
              <AccordionContent>
                Yes. What&rsquo;s said in the room stays in the room. Every
                cohort member agrees to full confidentiality before the first
                Circle. We don&rsquo;t record sessions without consent. The
                curated, small-group format is designed specifically to create
                the conditions where senior leaders can actually be honest.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cost">
              <AccordionTrigger>
                Why does this cost what it costs?
              </AccordionTrigger>
              <AccordionContent>
                We&rsquo;re limiting the founding cohort to ten people. That
                level of curation — and the facilitation quality it requires —
                isn&rsquo;t achievable at scale. The founding price reflects
                both the intimacy of the format and an acknowledgment that
                you&rsquo;re taking a bet on us before we have a track record
                to show. Standard pricing for year two is $12,000.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fit">
              <AccordionTrigger>
                How do you decide who gets in?
              </AccordionTrigger>
              <AccordionContent>
                We read every application personally. If the fit looks right on
                paper, we&rsquo;ll send a link to schedule a short
                conversation — not a sales call, a real conversation.
                We&rsquo;re looking for people who will make the cohort better
                for everyone else, not just people who can pay.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="timeline">
              <AccordionTrigger>When does the program start?</AccordionTrigger>
              <AccordionContent>
                The founding cohort begins in mid-to-late June 2026 and runs
                90 days. Applications close mid-June or when all ten seats are
                filled — whichever comes first. We&rsquo;ll notify all
                applicants of our decision, regardless of outcome.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-primary text-primary-foreground">
        <FadeIn>
          <div className="container-prose text-center">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/40 mb-8">
              Applications open
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
              Ten seats.
              <br />
              <span className="text-accent">Applications close mid-June.</span>
            </h2>
            <p className="mt-6 text-primary-foreground/50 max-w-sm mx-auto">
              Or when the cohort is full.
            </p>
            <p className="mt-8 text-primary-foreground/60 max-w-sm mx-auto leading-relaxed">
              A short application — about ten minutes. Jeff and Jason read every
              one personally. You&rsquo;ll hear back within 48 hours.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5">
              <Link
                href="/apply"
                className="inline-block px-10 py-4 bg-accent text-accent-foreground text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors"
              >
                Apply for a Founding Seat →
              </Link>
              <Link
                href="/readiness"
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors underline underline-offset-4"
              >
                Take the Readiness Assessment first →
              </Link>
            </div>
            <p className="mt-10 text-sm text-primary-foreground/30">
              Questions?{" "}
              <a
                href="mailto:hello@thenextmountain.ai"
                className="underline underline-offset-4 hover:text-primary-foreground/60 transition-colors"
              >
                hello@thenextmountain.ai
              </a>
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
