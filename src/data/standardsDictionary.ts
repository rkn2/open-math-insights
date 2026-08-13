import type { GradeBand } from "@/shared/types";

export interface StandardEntry {
  code: string;
  title: string;
  gradeBand: GradeBand;
  domain: string;
  /** Lowercase keywords/phrases — matched as substrings against the input text. */
  keywords: string[];
}

/**
 * A real (if intentionally compact) keyword-matching dictionary modeled on the
 * Common Core State Standards for Mathematics domain codes. Good enough for a
 * genuine first-pass "which standards might this item touch?" signal — not a
 * substitute for a human standards review.
 */
export const STANDARDS_DICTIONARY: StandardEntry[] = [
  {
    code: "K.CC",
    title: "Counting & Cardinality",
    gradeBand: "K-2",
    domain: "Number Sense",
    keywords: ["count", "counting", "how many", "number of", "subitize", "compare quantities"],
  },
  {
    code: "1.OA",
    title: "Operations & Algebraic Thinking (Grade 1)",
    gradeBand: "K-2",
    domain: "Algebra I",
    keywords: ["add", "addition", "subtract", "subtraction", "word problem", "sum", "difference"],
  },
  {
    code: "2.NBT",
    title: "Number & Operations in Base Ten (Grade 2)",
    gradeBand: "K-2",
    domain: "Number Sense",
    keywords: ["place value", "tens", "ones", "hundreds", "regroup", "base ten"],
  },
  {
    code: "3.NF",
    title: "Number & Operations—Fractions (Grade 3)",
    gradeBand: "3-5",
    domain: "Fractions",
    keywords: ["fraction", "numerator", "denominator", "equivalent fraction", "unit fraction"],
  },
  {
    code: "4.NF",
    title: "Fractions (Grade 4)",
    gradeBand: "3-5",
    domain: "Fractions",
    keywords: ["fraction", "mixed number", "decimal", "compare fractions", "add fractions"],
  },
  {
    code: "4.OA",
    title: "Operations & Algebraic Thinking (Grade 4)",
    gradeBand: "3-5",
    domain: "Word Problems",
    keywords: ["multi-step", "word problem", "factor", "multiple", "prime", "composite"],
  },
  {
    code: "5.NF",
    title: "Fractions (Grade 5)",
    gradeBand: "3-5",
    domain: "Fractions",
    keywords: ["fraction", "multiply fractions", "divide fractions", "common denominator"],
  },
  {
    code: "6.RP",
    title: "Ratios & Proportional Relationships (Grade 6)",
    gradeBand: "6-8",
    domain: "Ratios & Proportions",
    keywords: ["ratio", "rate", "unit rate", "percent", "proportion", "scale"],
  },
  {
    code: "6.NS",
    title: "The Number System (Grade 6)",
    gradeBand: "6-8",
    domain: "Number Sense",
    keywords: ["negative number", "absolute value", "integer", "divide fractions", "long division"],
  },
  {
    code: "7.RP",
    title: "Ratios & Proportional Relationships (Grade 7)",
    gradeBand: "6-8",
    domain: "Ratios & Proportions",
    keywords: ["proportional relationship", "constant of proportionality", "percent increase", "percent decrease", "unit rate"],
  },
  {
    code: "7.EE",
    title: "Expressions & Equations (Grade 7)",
    gradeBand: "6-8",
    domain: "Algebra I",
    keywords: ["expression", "equation", "solve for", "linear equation", "inequality"],
  },
  {
    code: "8.EE",
    title: "Expressions & Equations (Grade 8)",
    gradeBand: "6-8",
    domain: "Algebra I",
    keywords: ["linear equation", "slope", "system of equations", "exponent", "scientific notation"],
  },
  {
    code: "8.G",
    title: "Geometry (Grade 8)",
    gradeBand: "6-8",
    domain: "Geometry",
    keywords: ["transformation", "congruent", "similar", "pythagorean", "volume", "angle"],
  },
  {
    code: "HSA-REI",
    title: "Algebra: Reasoning with Equations & Inequalities",
    gradeBand: "9-12",
    domain: "Algebra I",
    keywords: ["solve the equation", "quadratic", "system of equations", "inequality", "factor"],
  },
  {
    code: "HSA-SSE",
    title: "Algebra: Seeing Structure in Expressions",
    gradeBand: "9-12",
    domain: "Algebra I",
    keywords: ["expression", "polynomial", "factor", "simplify", "exponential"],
  },
  {
    code: "HSG-CO",
    title: "Geometry: Congruence",
    gradeBand: "9-12",
    domain: "Geometry",
    keywords: ["congruent", "proof", "transformation", "rotation", "reflection", "translation"],
  },
  {
    code: "HSG-SRT",
    title: "Geometry: Similarity, Right Triangles, & Trigonometry",
    gradeBand: "9-12",
    domain: "Geometry",
    keywords: ["similar triangles", "sine", "cosine", "tangent", "right triangle", "trigonometric"],
  },
  {
    code: "HSF-IF",
    title: "Functions: Interpreting Functions",
    gradeBand: "9-12",
    domain: "Algebra I",
    keywords: ["function", "domain", "range", "increasing", "decreasing", "graph of"],
  },
  {
    code: "HSS-ID",
    title: "Statistics: Interpreting Categorical & Quantitative Data",
    gradeBand: "9-12",
    domain: "Statistics & Probability",
    keywords: ["mean", "median", "standard deviation", "scatter plot", "correlation", "box plot", "box and whisker"],
  },
  {
    code: "HSS-CP",
    title: "Statistics: Conditional Probability",
    gradeBand: "9-12",
    domain: "Statistics & Probability",
    keywords: ["probability", "independent events", "conditional probability", "sample space"],
  },
];
