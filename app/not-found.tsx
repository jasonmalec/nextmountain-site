import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center">
      <div className="container-prose pt-32 pb-24">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="text-4xl text-primary">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-accent hover:text-accent/80 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
