"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email().max(255);

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_signups")
      .insert({ email: parsed.data });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setEmail("");
    toast.success("You're on the list. Watch for the next letter.");
  };

  return (
    <footer className="border-t border-border mt-24 py-16 bg-secondary/40">
      <div className="container-wide grid gap-10 md:grid-cols-2">
        <div>
          <p className="font-serif text-2xl text-primary">
            Next Mountain Circles
          </p>
          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/apply" className="hover:text-accent transition-colors">
              Apply
            </Link>
            <a
              href="/#founders"
              className="hover:text-accent transition-colors"
            >
              Founders
            </a>
            <a
              href="https://www.whisperranch.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              Whisper Ranch
            </a>
            <a
              href="mailto:hello@thenextmountain.ai"
              className="hover:text-accent transition-colors"
            >
              Contact
            </a>
          </nav>
          <p className="mt-8 text-xs text-muted-foreground max-w-sm leading-relaxed">
            Next Mountain Circles is a program of{" "}
            <span className="text-primary">The Next Mountain</span>. A Caliguire
            + Malec joint venture.
          </p>
        </div>
        <div>
          <p className="font-serif text-lg text-primary mb-3">
            The Next Mountain Letters
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Occasional notes from Jeff and Jason on leading wisely through the
            AI inflection.
          </p>
          <form onSubmit={submit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2.5 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container-wide mt-12 text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Next Mountain. All rights reserved.
      </div>
    </footer>
  );
}
