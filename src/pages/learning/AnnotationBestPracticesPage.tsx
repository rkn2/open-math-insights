import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "why-annotation-quality-matters", label: "1. Why annotation quality matters" },
  { id: "building-a-codebook", label: "2. Building a codebook that works" },
  { id: "training-coders", label: "3. Training coders and maintaining reliability" },
  { id: "measuring-reliability", label: "4. Measuring inter-rater reliability" },
  { id: "ai-assisted-annotation", label: "5. AI-assisted annotation" },
  { id: "iterating-versioning", label: "6. Iterating and versioning your codebook" },
  { id: "references", label: "7. Key references" },
];

const CODEBOOK_COMPONENTS = [
  {
    component: "Code label / mnemonic",
    description: "A short, memorable name for the code that coders can recall without looking it up.",
    example: 'HINT-ABUSE — student requests hints in rapid succession without reading them.',
  },
  {
    component: "Brief definition",
    description: "A one-sentence summary used as a quick reference during coding.",
    example: '"Student requests three or more hints within 30 seconds on a single problem step."',
  },
  {
    component: "Full definition with operational criteria",
    description: "The complete, unambiguous definition including measurable criteria that determine when the code applies.",
    example: '"The student clicks the hint button three or more times within a 30-second window on the same problem step, without typing, selecting, or modifying any answer field between hint requests. The 30-second window begins with the first hint request after the student enters the problem step."',
  },
  {
    component: "When to use (inclusion criteria)",
    description: "Specific conditions that must be met for the code to apply.",
    example: 'Apply when: (a) 3+ hint requests within 30 seconds, (b) no substantive interaction with the answer field between requests, (c) the student is on a single problem step (not navigating between steps).',
  },
  {
    component: "When NOT to use (exclusion criteria)",
    description: "Conditions that explicitly rule out use of this code, especially edge cases that look similar.",
    example: 'Do NOT apply when: (a) the student reads each hint for 5+ seconds before requesting the next (this is legitimate hint use), (b) the system auto-advances hints without student action, (c) the student is reviewing previously seen hints.',
  },
  {
    component: "Examples from real data",
    description: "At least two annotated examples, one clear positive case and one boundary case, drawn from actual data, not hypotheticals.",
    example: 'Positive: Student on problem 4.2a clicks "Show hint" at 0:03, 0:08, 0:11, and 0:14 with no answer-field activity. Boundary: Student clicks at 0:03, 0:18, 0:31, three hints but over 28 seconds, with brief pauses. Code as HINT-ABUSE because the 30-second window criterion is met, even though the pace is slower.',
  },
];

const TRAINING_PHASES = [
  {
    phase: "1. Orientation",
    description: "Project overview, codebook walkthrough, ethical considerations (data handling, confidentiality, avoiding bias in judgments).",
    tone: "primary" as const,
  },
  {
    phase: "2. Guided practice",
    description: "Work through pre-annotated examples together. Compare each coder's judgments against a gold standard, discussing the reasoning behind each code assignment.",
    tone: "teal" as const,
  },
  {
    phase: "3. Independent practice",
    description: "Coders annotate a sample independently, then receive detailed feedback from the lead coder. Focus on patterns of error, not individual mistakes.",
    tone: "primary" as const,
  },
  {
    phase: "4. Calibration",
    description: "All coders annotate the same material independently, then convene to discuss every disagreement. Update the codebook with decision rules for recurring edge cases.",
    tone: "teal" as const,
  },
  {
    phase: "5. Certification",
    description: "Each coder annotates a fresh sample independently. Compute kappa against the lead coder. Only coders who meet the minimum threshold (typically kappa >= 0.70) proceed to production coding.",
    tone: "primary" as const,
  },
];

const RELIABILITY_COMPARISON = [
  {
    metric: "Cohen's kappa",
    raters: "2",
    missingData: "No",
    paradoxResistant: "No",
    bestFor: "Two trained coders, balanced category frequencies",
  },
  {
    metric: "Krippendorff's alpha",
    raters: "2+",
    missingData: "Yes",
    paradoxResistant: "Partially",
    bestFor: "Multiple coders, incomplete overlap, ordinal or interval data",
  },
  {
    metric: "Gwet's AC1",
    raters: "2+",
    missingData: "Yes",
    paradoxResistant: "Yes",
    bestFor: "Highly skewed category distributions where kappa underestimates agreement",
  },
];

export function AnnotationBestPracticesPage() {
  useDocumentTitle("Annotation Best Practices");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Annotation Best Practices" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Researchers"
          title="Annotation Best Practices"
          subtitle="How to design codebooks, train coders, measure reliability, and navigate AI-assisted annotation. The goal is to ensure that the labels you apply to education data are trustworthy enough for others to build on."
        />
      </div>

      {/* Page outline navigation */}
      <nav className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          On this page
        </h2>
        <ol className="mt-3 space-y-1.5">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Section 1: Why annotation quality matters ── */}
      <section id="why-annotation-quality-matters" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="Why annotation quality matters" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Annotation transforms raw data into a reusable scientific resource. Without it, student
            logs are just timestamped events, classroom transcripts are undifferentiated text, and
            assessment responses are isolated answers. With annotation, patterns become visible:
            which students struggle productively vs. unproductively, what types of errors signal
            conceptual misunderstanding vs. mechanical mistakes, how problem-solving strategies
            differ across populations.
          </p>
          <p>
            But annotation is only as good as the process behind it. Poorly defined codes, untrained
            coders, and unreported reliability produce annotations that{" "}
            <strong className="text-slate-900">look like data but encode noise</strong>. When
            another researcher builds on your annotations, or when a machine learning model trains
            on them, errors in the annotation layer propagate silently. There is no error message;
            there is only a downstream finding that was never true.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <h4 className="font-display font-bold text-slate-900">For reuse</h4>
              <p className="mt-1 text-sm text-slate-600">
                Other researchers cannot evaluate whether your annotations fit their question
                without knowing how the codes were defined, who applied them, and how reliable
                the process was.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">For ML training</h4>
              <p className="mt-1 text-sm text-slate-600">
                A model trained on noisy labels learns noise. Annotation quality sets the ceiling
                on model performance. No algorithm can recover signal that the labels destroyed.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">For reproducibility</h4>
              <p className="mt-1 text-sm text-slate-600">
                If your annotation process is not documented precisely enough for another team to
                replicate it, the results it produces are not reproducible science.
              </p>
            </Card>
          </div>

          <p>
            This guide covers the full annotation lifecycle: designing a codebook, training coders,
            measuring agreement, working with AI, and maintaining your annotation scheme over time.
            Each section draws on established methodology from content analysis, psychometrics, and
            emerging work on human-AI collaboration.
          </p>
        </div>
      </section>

      {/* ── Section 2: Building a codebook that works ── */}
      <section id="building-a-codebook" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 2" title="Building a codebook that works" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            A codebook is the document that defines what each annotation label means, when to apply
            it, and how to handle edge cases. The foundational reference is{" "}
            <strong className="text-slate-900">MacQueen et al. (1998)</strong>, who established
            that every code in a codebook needs six components to be operationally complete.
            Without all six, coders fill in the gaps with their own assumptions, and different
            coders fill them differently.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            The six components of a complete code definition
          </h3>

          <div className="space-y-4">
            {CODEBOOK_COMPONENTS.map((c, i) => (
              <Card key={c.component}>
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-slate-900">{c.component}</h4>
                    <p className="mt-1 text-sm text-slate-600">{c.description}</p>
                    <p className="mt-2 text-sm italic text-slate-500">
                      Example: {c.example}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm text-rose-800">
              <strong>MacQueen's key maxim:</strong> "Do not assume that anything is obvious; always
              state specifically what the code should and should not capture." Roberts et al. (2019)
              found that even meticulous adherence to these guidelines produced inadequate agreement
              without iterative calibration. Detailed definitions are necessary but not sufficient.
            </p>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Example: coding "productive struggle" in classroom observations
          </h3>
          <p>
            Consider a research team coding segments of classroom video for "productive struggle."
            A definition that says only "student is working hard on a challenging problem" will
            produce wildly inconsistent coding. Does a student staring at a blank page count?
            What about a student who is trying multiple approaches but making algebraic errors
            each time? What if the student is visibly frustrated but still engaged?
          </p>
          <p>
            A complete codebook entry would specify observable indicators (e.g., student attempts at
            least two distinct solution strategies, student verbalizes reasoning even if incorrect),
            explicit exclusions (e.g., student is off-task, student has disengaged and is waiting
            for help without attempting further work), and boundary examples that illustrate exactly
            where "productive" ends and "unproductive" begins.
          </p>
        </div>
      </section>

      {/* ── Section 3: Training coders ─────────────────── */}
      <section id="training-coders" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 3"
          title="Training coders and maintaining reliability"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            A well-written codebook is necessary but not sufficient. Coders need structured training
            to internalize the codes, and ongoing calibration to stay aligned over time. The
            following five-phase model produces coders who can apply a codebook consistently:
          </p>

          <div className="space-y-4">
            {TRAINING_PHASES.map((t) => (
              <Card key={t.phase}>
                <Badge tone={t.tone}>{t.phase}</Badge>
                <p className="mt-3 text-sm text-slate-600">{t.description}</p>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>Watch for coder drift:</strong> Coders develop "implicit rules" over time
              without realizing the codebook no longer reflects their actual practice (MacQueen et
              al., 1998). A coder who initially applied a strict definition may gradually relax it,
              or develop private shortcuts that are never documented. Regular calibration sessions,
              monthly at minimum, catch drift before it corrupts the data.
            </p>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Cognitive load: how many codes can a coder handle?
          </h3>
          <p>
            Research on working memory and coding tasks suggests that coders can reasonably manage{" "}
            <strong className="text-slate-900">30-40 codes</strong> at once. Beyond that threshold,
            accuracy degrades as coders struggle to hold all the distinctions in mind simultaneously.
            If your scheme has more than 40 codes, consider coding in stages. First apply a
            high-level category (e.g., "error type"), then apply a finer-grained sub-code within
            each category in a separate pass.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Handling disagreements
          </h3>
          <p>
            When coders disagree, the disagreement itself is data. Resist the temptation to simply
            have the lead coder "break the tie." Instead, discuss the disagreement to determine
            whether it stems from ambiguity in the codebook (fix the codebook), insufficient
            training (retrain), or genuine boundary cases that reasonable people will code
            differently (document the decision rule and move on). The worst outcome is resolving
            disagreements informally without updating the codebook. This creates an oral tradition
            that new coders cannot access.
          </p>
        </div>
      </section>

      {/* ── Section 4: Measuring inter-rater reliability ── */}
      <section id="measuring-reliability" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 4"
          title="Measuring inter-rater reliability"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The{" "}
            <a
              href="/learning-center/statistical-foundations"
              className="text-primary-600 hover:text-primary-800 hover:underline"
            >
              Statistical Foundations
            </a>{" "}
            page introduces Cohen's kappa as a measure of inter-rater agreement. This section goes
            deeper: why percent agreement alone fails, when kappa itself can mislead, and what
            alternatives exist.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Why percent agreement is not enough
          </h3>
          <p>
            Suppose two coders classify 100 student responses as either "correct" or "incorrect,"
            and 90 responses are correct. If both coders simply label everything "correct," they
            will agree 90% of the time, but they have done no actual work. Percent agreement does
            not account for the agreement expected by chance alone. Cohen's kappa (Cohen, 1960)
            subtracts out this chance agreement, giving a more honest measure of how much the
            coders' judgments actually align.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            The kappa paradox
          </h3>
          <p>
            Feinstein and Cicchetti (1990) identified a counterintuitive problem: when a code is
            very rare (or very common), kappa can be{" "}
            <strong className="text-slate-900">paradoxically low even when percent agreement is
            high</strong>. This happens because the expected chance agreement is also high when
            category frequencies are skewed, leaving little room for kappa to register above-chance
            agreement. A code that applies to only 5% of cases might produce a kappa of 0.30 even
            when coders agree 95% of the time.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Comparing reliability metrics
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Metric</th>
                  <th className="py-3 pr-4">Raters</th>
                  <th className="py-3 pr-4">Missing data</th>
                  <th className="py-3 pr-4">Paradox-resistant</th>
                  <th className="py-3">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RELIABILITY_COMPARISON.map((r) => (
                  <tr key={r.metric}>
                    <td className="py-3 pr-4 font-medium text-slate-900">{r.metric}</td>
                    <td className="py-3 pr-4 text-slate-600">{r.raters}</td>
                    <td className="py-3 pr-4 text-slate-600">{r.missingData}</td>
                    <td className="py-3 pr-4 text-slate-600">{r.paradoxResistant}</td>
                    <td className="py-3 text-slate-600">{r.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Reporting best practices
          </h3>
          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Report per code, not just one global number
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                A single overall kappa can mask the fact that some codes have excellent reliability
                while others are essentially random. Artstein and Poesio (2008) recommend reporting
                reliability for each code individually so that consumers of your data know which
                annotations they can trust.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Always report confidence intervals
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                A kappa of 0.72 sounds comfortably above the 0.70 threshold, but if the 95%
                confidence interval is [0.58, 0.86], the true reliability might be well below
                acceptable. Baker et al. (2022) emphasize that point estimates without intervals
                are incomplete.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Double-code enough units for stable estimates
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Bujang and Baharum (2017) recommend{" "}
                <strong className="text-slate-900">30-100 double-coded units</strong> for stable
                kappa estimates. Fewer than 30 units produce confidence intervals so wide that the
                kappa value is essentially meaningless.
              </p>
            </Card>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>The N &lt; 10 problem:</strong> If you have fewer than 10 double-coded units
              for a particular code, do not compute kappa at all. The estimate will be
              dominated by individual cases and can swing wildly with a single change. Instead,
              report the raw agreement counts and flag the code as having insufficient data for
              reliability estimation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: AI-assisted annotation ──────────── */}
      <section id="ai-assisted-annotation" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 5"
          title="AI-assisted annotation: opportunities and risks"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Large language models are increasingly used to assist with annotation tasks. The
            research is promising but comes with significant caveats that education researchers
            should understand before adopting these tools.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What the evidence shows
          </h3>
          <p>
            Gilardi et al. (2023, <em>PNAS</em>) found that ChatGPT's zero-shot accuracy exceeded
            that of trained crowd-workers on several text classification tasks. This generated
            understandable excitement about replacing expensive human annotation with cheap,
            scalable AI annotation. However, Pangakis et al. (2023) showed that LLM performance
            is "highly contingent on both the dataset and the type of annotation task." Models
            that excel on sentiment classification may perform poorly on domain-specific codes that
            require expert judgment, like distinguishing conceptual errors from procedural errors
            in mathematics.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            The anchoring problem
          </h3>
          <p>
            Beck et al. (2026) documented a critical risk in human-AI workflows, namely{" "}
            <strong className="text-slate-900">anchoring bias</strong>. When human annotators see
            AI-generated labels before making their own judgments, their annotations are
            systematically pulled toward the AI's suggestion, even when the AI is wrong. This
            means that the common "model proposes, human confirms" workflow does not measure
            genuine agreement between human and AI. It measures human compliance with the AI's
            suggestion.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Do vs. Don't
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <Badge tone="teal">Do</Badge>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Use AI as an <strong className="text-slate-900">independent second coder</strong>. The AI annotates without seeing human labels, and the human annotates without seeing AI labels</li>
                <li>Report human-AI kappa separately from human-human kappa</li>
                <li>Validate AI performance on your specific codes and data before scaling up</li>
                <li>Document the exact model, version, prompt, and parameters used</li>
                <li>Treat AI annotations as a distinct provenance layer in your data</li>
              </ul>
            </Card>
            <Card>
              <Badge tone="coral">Don't</Badge>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Use AI as a pre-labeler that humans then "verify," as this introduces anchoring bias and inflates apparent agreement</li>
                <li>Assume that high accuracy on one task generalizes to another</li>
                <li>Report human-AI agreement without also reporting human-human agreement as a baseline</li>
                <li>Treat LLM outputs as deterministic, because the same prompt can produce different labels across runs</li>
                <li>Skip reliability measurement because "the AI is consistent with itself"</li>
              </ul>
            </Card>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Pre-register your prompts:</strong> Baumann et al. (2025) demonstrated that
              LLM output varies significantly across semantically equivalent prompts. Minor
              rephrasing can shift classification rates by 10-20 percentage points. If you use LLMs
              for annotation, treat your prompt as a methodological instrument: develop it
              systematically, freeze it before production coding begins, and report the exact prompt
              text in your methods section, just as you would report your codebook.
            </p>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Prompt sensitivity: an underappreciated risk
          </h3>
          <p>
            Unlike a human coder who internalizes a codebook and applies it with some stability,
            an LLM's behavior is exquisitely sensitive to prompt wording. Two prompts that a human
            would consider identical, such as "classify this response as correct or incorrect" vs. "label
            this answer as right or wrong," can produce meaningfully different annotation
            distributions. This means that the "codebook" for an LLM annotator is the prompt
            itself, and it must be developed and validated with the same rigor as a human codebook.
          </p>
        </div>
      </section>

      {/* ── Section 6: Iterating and versioning ────────── */}
      <section id="iterating-versioning" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 6"
          title="Iterating and versioning your codebook"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Codebook refinement is a normal and expected part of the annotation process, not a sign
            of failure. As coders encounter real data, they discover edge cases the original
            definitions did not anticipate, ambiguities that seemed clear in the abstract, and
            distinctions that matter in practice but were not part of the original scheme. The
            question is not whether to revise. It is how to revise without losing track of what
            was annotated under which definitions.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Semantic versioning for codebooks
          </h3>
          <p>
            Borrow the concept of semantic versioning from software engineering. When you change a
            code definition, increment the version number (e.g., Codebook v1.0 to v1.1 for a
            clarification, v1.0 to v2.0 for a substantive change in what a code captures). Any
            definition change that could cause a coder to label the same data differently under the
            old and new versions requires re-establishing reliability.
          </p>

          <div className="space-y-4">
            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">1</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Track which version produced which annotations</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Every annotation record should include a field identifying the codebook version
                    in use when that annotation was produced. Without this, you cannot distinguish
                    between "two coders disagreed" and "two coders used different definitions."
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">2</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Provide crosswalk mappings</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    When codes are merged, split, or renamed, document the mapping between old and new
                    codes. A crosswalk table lets downstream users translate annotations from one
                    version to another, or decide that the versions are too different to combine.
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">3</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Know when to revise</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Revise the codebook when you see systematic disagreements between coders on the
                    same type of case, recurring edge cases that the existing codes cannot capture,
                    or new data that does not fit any existing code. Do not revise for isolated
                    disagreements on individual cases. Those are resolved through calibration
                    discussion, not codebook changes.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            The "stranger test"
          </h3>
          <p>
            The most revealing test of codebook quality: give your codebook and a sample of your
            data to someone <strong className="text-slate-900">outside your project</strong>, such as a
            colleague in a different lab, a graduate student from another department, or even a
            collaborator at another institution. Ask them to annotate the sample using only the
            codebook, with no additional guidance. If they cannot produce annotations that agree
            with your team's at an acceptable level, the codebook does not stand on its own. The
            implicit knowledge in your team's heads has not yet been captured in writing.
          </p>
        </div>
      </section>

      {/* ── Section 7: Key references ──────────────────── */}
      <section id="references" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 7" title="Key references" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <h3 className="mt-2 font-display text-base font-bold text-slate-900">
            Codebook design and qualitative methodology
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              MacQueen, K. M., McLellan, E., Kay, K., & Milstein, B. (1998). Codebook development
              for team-based qualitative analysis.{" "}
              <em>Field Methods, 10</em>(2), 31-36.{" "}
              <a
                href="https://doi.org/10.1177/1525822x980100020301"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 hover:underline"
              >
                DOI
              </a>
            </li>
            <li>
              Boyatzis, R. E. (1998).{" "}
              <em>Transforming Qualitative Information: Thematic Analysis and Code Development.</em>{" "}
              Sage.
            </li>
            <li>
              DeCuir-Gunby, J. T., Marshall, P. L., & McCulloch, A. W. (2011). Developing and
              using a codebook for the analysis of interview data.{" "}
              <em>Field Methods, 23</em>(2), 136-155.
            </li>
            <li>
              {"Saldaña"}, J. (2021).{" "}
              <em>The Coding Manual for Qualitative Researchers</em> (4th ed.). SAGE.
            </li>
            <li>
              Roberts, K., Dowell, A., & Nie, J.-B. (2019). Attempting rigour and replicability in
              thematic analysis of qualitative research data.{" "}
              <em>BMC Medical Research Methodology, 19</em>(1), 66.
            </li>
          </ul>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Inter-rater reliability and measurement
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Cohen, J. (1960). A coefficient of agreement for nominal scales.{" "}
              <em>Educational and Psychological Measurement, 20</em>(1), 37-46.
            </li>
            <li>
              Feinstein, A. R., & Cicchetti, D. V. (1990). High agreement but low kappa: I. The
              problems of two paradoxes.{" "}
              <em>Journal of Clinical Epidemiology, 43</em>(6), 543-549.
            </li>
            <li>
              Gwet, K. L. (2008). Computing inter-rater reliability and its variance in the
              presence of high agreement.{" "}
              <em>British Journal of Mathematical and Statistical Psychology, 61</em>(1), 29-48.
            </li>
            <li>
              Artstein, R., & Poesio, M. (2008). Inter-coder agreement for computational
              linguistics.{" "}
              <em>Computational Linguistics, 34</em>(4), 555-596.
            </li>
            <li>
              Krippendorff, K. (2018).{" "}
              <em>Content Analysis: An Introduction to Its Methodology</em> (4th ed.). SAGE.
            </li>
            <li>
              Bujang, M. A., & Baharum, N. (2017). Guidelines of the minimum sample size
              requirements for Cohen's kappa.{" "}
              <em>Epidemiology, Biostatistics and Public Health, 14</em>(2).
            </li>
          </ul>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            AI-assisted annotation
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Gilardi, F., Alizadeh, M., & Kubli, M. (2023). ChatGPT outperforms crowd-workers
              for text-annotation tasks.{" "}
              <em>Proceedings of the National Academy of Sciences, 120</em>, e2305016120.
            </li>
            <li>
              Pangakis, N., Wolken, S., & Fasano, N. (2023). Automated annotation with generative
              AI requires validation.{" "}
              <em>arXiv:2306.00176.</em>
            </li>
            <li>
              Beck, N., Sch{"ü"}nemann, L., & Zumstein, F. (2026). Anchoring effects in
              human-AI collaborative annotation.{" "}
              <em>Harvard Data Science Review, 8</em>(2).
            </li>
            <li>
              Baumann, M., Blagec, K., & Gul, S. (2025). Prompt sensitivity in LLM-based text
              annotation.{" "}
              <em>arXiv:2509.08825.</em>
            </li>
          </ul>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Data sharing and FAIR principles
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Wilkinson, M. D., et al. (2016). The FAIR Guiding Principles for scientific data
              management and stewardship.{" "}
              <em>Scientific Data, 3</em>, 160018.
            </li>
            <li>
              Baker, R. S., Hawn, A., & others (2022). Reporting and best practices in educational
              data mining and learning analytics.
            </li>
          </ul>

          <h3 className="mt-8 font-display text-base font-bold text-slate-900">
            Related pages on OMI
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Statistical Foundations</h4>
              <p className="mt-1 text-sm text-slate-600">
                Covers the basics of kappa, confidence intervals, effect sizes, and other
                quantitative concepts referenced in this guide.
              </p>
              <ButtonLink
                to="/learning-center/statistical-foundations"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Statistical Foundations →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Schemas, Metadata & Annotation
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Defines schema, metadata, and annotation as distinct data layers. Essential
                background for understanding where annotation fits in the data lifecycle.
              </p>
              <ButtonLink
                to="/learning-center/schemas-metadata-annotation"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Schemas & Metadata →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Researcher Guide</h4>
              <p className="mt-1 text-sm text-slate-600">
                The full guide to contributing data to OMI, including de-identification,
                licensing, and metadata standards.
              </p>
              <ButtonLink to="/researcher-guide" variant="outline" size="sm" className="mt-3">
                Researcher Guide →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Learning Center</h4>
              <p className="mt-1 text-sm text-slate-600">
                Return to the full catalog of courses and tutorials for teachers, students,
                and researchers.
              </p>
              <ButtonLink to="/learning-center" variant="outline" size="sm" className="mt-3">
                All courses →
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Completion banner ─────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Annotation done right</h2>
        <p className="mt-2 text-teal-100">
          Good annotation is invisible. It lets the data speak clearly. The practices on this
          page ensure that when someone builds on your annotations, they are building on solid
          ground.
        </p>
      </div>
    </div>
  );
}
