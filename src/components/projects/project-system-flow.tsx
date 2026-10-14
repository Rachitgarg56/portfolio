const sringeriFlow = [
  { title: "Legacy frontend", detail: "Repeated components and rigid content patterns" },
  { title: "Typed components", detail: "40+ pieces migrated to Next.js and TypeScript" },
  { title: "Content flow", detail: "Firebase-backed content made updates more flexible" },
  { title: "Production surface", detail: "Responsive, accessible and easier to maintain" },
];

const assetFlow = [
  "Request",
  "Review",
  "Approval",
  "Asset update",
  "In / Out tracking",
  "Audit trail",
];

export function SringeriSystemFlow() {
  return (
    <section className="system-flow" aria-labelledby="sringeri-system-title">
      <p className="type-label text-muted">System view</p>
      <h2 id="sringeri-system-title" className="type-heading">Modernization connected code and content.</h2>
      <ol className="system-flow-grid">
        {sringeriFlow.map((step, index) => <li key={step.title}>
          <span className="type-label text-accent">0{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.detail}</p>
        </li>)}
      </ol>
    </section>
  );
}

export function AssetWorkflow() {
  return (
    <section className="workflow-panel" aria-labelledby="asset-workflow-title">
      <p className="type-label text-muted">Workflow model</p>
      <h2 id="asset-workflow-title" className="type-heading">The interface follows the business state.</h2>
      <ol className="workflow-steps">
        {assetFlow.map((step, index) => <li key={step}>
          <span className="workflow-index">0{index + 1}</span>
          <strong>{step}</strong>
          {index < assetFlow.length - 1 && <span className="workflow-arrow" aria-hidden="true">→</span>}
        </li>)}
      </ol>
      <p className="workflow-note">Roles and request state determine which actions the interface presents. Server-side authorization remains a separate enforcement layer.</p>
    </section>
  );
}

export function UnstuckContrast() {
  return (
    <section className="ai-contrast" aria-labelledby="unstuck-contrast-title">
      <p className="type-label text-muted">The product decision</p>
      <h2 id="unstuck-contrast-title" className="type-heading">Optimize for learning, not the fastest answer.</h2>
      <div className="ai-contrast-grid">
        <div>
          <p className="type-label text-muted">Typical answer-first AI</p>
          <p>Prompt <span aria-hidden="true">→</span> approach <span aria-hidden="true">→</span> solution</p>
          <small>The immediate task may finish before the learner practices the reasoning.</small>
        </div>
        <div>
          <p className="type-label text-accent">unStuck</p>
          <p>What have you tried? <span aria-hidden="true">→</span> smaller step <span aria-hidden="true">→</span> progressive hint <span aria-hidden="true">→</span> explain the approach</p>
          <small>The AI helps move the thinking forward while leaving the discovery with the learner.</small>
        </div>
      </div>
    </section>
  );
}
