import type { Project } from "@/data/projects";

const retrieval = [
  { title: "Your documents", detail: "PDF, TXT or Markdown" },
  { title: "Searchable context", detail: "Extract → chunk → embed" },
  { title: "Relevant passages", detail: "Workspace-scoped vector retrieval" },
  { title: "An inspectable answer", detail: "Streamed response + sources" },
];
const coaching = [
  { title: "Start with your thinking", detail: "What do you know? What have you tried?" },
  { title: "Take a smaller step", detail: "One question or a toy example" },
  { title: "Build toward a pattern", detail: "Progressive hints when needed" },
  { title: "Explain your approach", detail: "Reflect on the reasoning" },
];

export function ProductFlow({ project }: { project: Project }) {
  const isPapertrail = project.slug === "papertrail";
  return (
    <section className="product-flow" aria-labelledby="flow-title">
      <p className="type-label flow-eyebrow">{isPapertrail ? "The system" : "The product principle"}</p>
      <h2 id="flow-title" className="type-heading">{isPapertrail ? "From a file to an answer you can inspect." : "Help the learner move. Leave the discovery to them."}</h2>
      <ol className="flow-steps">
        {(isPapertrail ? retrieval : coaching).map((step, index) => (
          <li key={step.title}><span className="type-label flow-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>
        ))}
      </ol>
      <p className="flow-note">{isPapertrail ? "A simplified view of the document retrieval path. Web search is a separate, explicit choice." : "The intended coaching flow, illustrated in the launch walkthrough. It is not a guarantee of every model response."}</p>
    </section>
  );
}
