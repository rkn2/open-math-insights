import { ButtonAnchor } from "@/components/ui/Button";

export function SlackCTA() {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-teal-600 px-8 py-12 text-center text-white sm:px-16">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">Join the OMI Community on Slack</h2>
      <p className="mx-auto mt-3 max-w-xl text-primary-100">
        Educators, researchers, and district data teams trade datasets, tools, and ideas in real
        time — no PII, just open math data and the people working with it.
      </p>
      <ButtonAnchor href="#" variant="light" size="lg" className="mt-6">
        Request a Slack invite
      </ButtonAnchor>
    </div>
  );
}
