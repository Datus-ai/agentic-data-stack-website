const steps = [
  {
    number: "01",
    title: "Follow",
    description: (
      <>
        Follow the Agentic Data Stack{" "}
        <a href="https://www.linkedin.com/company/agentic-data-stack/" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">LinkedIn page</a>
        {" "}and{" "}
        <a href="https://lu.ma/AgenticDataStack" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Luma calendar</a>
        {" "}to stay up to date on events, discussions, and new content.
      </>
    ),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Speak",
    description:
      "Submit a talk via our Call for Proposals. Share your experience building, operating, or designing agentic data systems.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Learn",
    description:
      "Explore past sessions and shared materials. Learn from real production practices across data platform teams worldwide.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="participate" className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How to{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              participate
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Join a growing community of data engineers, analysts, and architects
            shaping the agentic future of data.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute left-[calc(50%+3rem)] top-10 hidden h-px w-[calc(100%-6rem)] bg-gradient-to-r from-violet-500/50 to-transparent md:block" />
              )}

              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-card-border bg-card-bg text-violet-400 shadow-lg shadow-violet-500/5">
                {step.icon}
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                  {step.number}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
