import { ButtonLink } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-mesh-hero" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-200 ring-1 ring-inset ring-white/20">
            Funded by NSF · Built for math educators
          </span>
          <h1 className="mt-6 font-display text-balance text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Open data infrastructure for K-12 math education
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            The datasets behind K-12 math research exist. National assessments, tutoring
            system logs, and international comparisons are all publicly available, but finding,
            citing, and analyzing them means navigating scattered agencies and formats. Open Math
            Insights brings them together with consistent metadata so teachers and researchers
            can focus on the questions, not the plumbing.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to="/data-depot" size="lg">
              Explore the Data Depot
            </ButtonLink>
            <ButtonLink to="/community" variant="outlineLight" size="lg">
              Join the Community
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
