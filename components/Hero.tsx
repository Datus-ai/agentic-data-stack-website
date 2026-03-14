export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-background to-background" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          #AgenticDataStack
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          How Do Data Systems Evolve{" "}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            in an Agentic World?
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          A community exploring how modern data stacks evolve to serve agents,
          and how agents reshape data analytics and data engineering.
        </p>

        <p className="mx-auto mt-4 max-w-xl text-sm font-medium tracking-wide text-violet-300/80">
          Vendor-neutral &middot; Practice-driven &middot; Architecture-first
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/newsletter"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-8 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110"
          >
            Subscribe to Newsletter
          </a>
          <a
            href="/resources"
            className="inline-flex h-12 items-center justify-center rounded-full border border-card-border px-8 text-sm font-medium text-foreground transition-colors hover:bg-card-bg"
          >
            Explore Resources
          </a>
        </div>
      </div>
    </section>
  );
}
