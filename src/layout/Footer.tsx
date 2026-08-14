import { Link } from "react-router-dom";
import { SITE_NAME } from "@/config";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Data Depot", to: "/data-depot" },
      { label: "Use OMI", to: "/use-omi" },
      { label: "Learning Center", to: "/learning-center" },
      { label: "Researcher Guide", to: "/researcher-guide" },
      { label: "Glossary", to: "/glossary" },
      { label: "Use Cases", to: "/use-cases" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contribute Data", to: "/contribute" },
      { label: "Community", to: "/community" },
      { label: "About", to: "/about" },
      { label: "Our Principles", to: "/about#principles" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-bold text-slate-900">{SITE_NAME}</p>
            <p className="mt-3 max-w-sm text-sm text-slate-500">
              Open, accessible, and authentic K–12 math datasets, tools, and a community built for
              collaboration — modeled on open-cyberinfrastructure principles, reimagined for
              math classrooms.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-slate-800">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-500 hover:text-primary-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>Part of the CAMEL Phase II collaboratory proposal. Site content is illustrative and subject to change.</p>
          <p>Datasets openly licensed — see each dataset's citation for details.</p>
        </div>
      </div>
    </footer>
  );
}
