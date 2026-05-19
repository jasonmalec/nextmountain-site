import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="container-wide flex items-center justify-between py-6">
        <Link
          href="/"
          className="font-serif text-lg text-primary-foreground drop-shadow"
        >
          Next Mountain Circles
        </Link>
        <Link
          href="/apply"
          className="text-sm text-primary-foreground hover:text-accent transition-colors drop-shadow"
        >
          Apply →
        </Link>
      </div>
    </header>
  );
}
