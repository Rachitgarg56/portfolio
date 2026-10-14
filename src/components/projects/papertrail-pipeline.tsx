const documentLane = ["PDF / TXT / Markdown", "Extraction + chunking", "Gemini embeddings", "PostgreSQL / pgvector"] as const;
const questionLane = ["Question", "Query embedding", "Workspace-scoped retrieval", "Grounded streamed answer", "Citations"] as const;

function PipelineLane({ label, steps }: { label: string; steps: readonly string[] }) {
  return (
    <div className="pipeline-lane">
      <p className="type-label">{label}</p>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{step}</span>
            {index < steps.length - 1 && <b aria-hidden="true">→</b>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PapertrailPipeline() {
  return (
    <aside className="papertrail-pipeline" aria-labelledby="papertrail-pipeline-title">
      <div className="pipeline-intro">
        <p className="type-label text-muted">System view</p>
        <h4 id="papertrail-pipeline-title">From material to inspectable answer.</h4>
      </div>
      <div className="pipeline-lanes">
        <PipelineLane label="Index the material" steps={documentLane} />
        <PipelineLane label="Answer from evidence" steps={questionLane} />
      </div>
    </aside>
  );
}
