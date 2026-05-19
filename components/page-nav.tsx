"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function PageNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={`fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-wide flex items-center gap-6 py-3">
        <Link href="/" className="font-serif text-sm text-primary mr-auto">
          Next Mountain Circles
        </Link>
        <a
          href="#program"
          className="text-sm text-muted-foreground hover:text-accent transition-colors hidden md:inline"
        >
          Program
        </a>
        <a
          href="#founders"
          className="text-sm text-muted-foreground hover:text-accent transition-colors hidden md:inline"
        >
          Founders
        </a>
        <a
          href="#pricing"
          className="text-sm text-muted-foreground hover:text-accent transition-colors hidden md:inline"
        >
          Investment
        </a>
        <Link
          href="/apply"
          className="text-sm bg-accent text-accent-foreground px-4 py-1.5 rounded-sm hover:bg-accent/90 transition-colors"
        >
          Apply
        </Link>
      </div>
    </nav>
  );
}
