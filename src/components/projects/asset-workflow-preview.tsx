const workflow = [
  "Request",
  "Review",
  "Approval",
  "Asset update",
  "In / Out tracking",
  "Audit trail",
] as const;

export function AssetWorkflowPreview() {
  return (
    <div className="asset-workflow-preview" aria-labelledby="asset-workflow-preview-title">
      <p className="type-label text-muted">State-driven workflow</p>
      <h4 id="asset-workflow-preview-title">From request to audit trail.</h4>
      <ol className="asset-workflow-preview-list">
        {workflow.map((step, index) => (
          <li key={step}>
            <span className="asset-workflow-number">0{index + 1}</span>
            <strong>{step}</strong>
            {index < workflow.length - 1 && <span className="asset-workflow-direction" aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>
      <p className="asset-workflow-note">A public-safe view of the interface states. Authorization remains a server-side concern.</p>
    </div>
  );
}
