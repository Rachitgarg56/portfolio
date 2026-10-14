import { AssetWorkflowMotion } from "@/components/projects/asset-workflow-motion";

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
    <AssetWorkflowMotion>
      <div className="asset-workflow-heading">
        <p className="type-label">State-driven system</p>
        <h4 id="asset-workflow-preview-title" data-workflow-trigger>One request. Six accountable states.</h4>
      </div>
      <ol className="asset-workflow-preview-list" aria-label="Asset request workflow">
        {workflow.map((step, index) => (
          <li key={step} data-workflow-node>
            <span className="asset-workflow-number">0{index + 1}</span>
            <strong>{step}</strong>
            {index < workflow.length - 1 && <span className="asset-workflow-connector" data-workflow-connector aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="asset-workflow-principle"><span>Role context</span><b aria-hidden="true">+</b><span>request state</span><b aria-hidden="true">→</b><strong>available UI actions</strong></p>
      <p className="asset-workflow-note">A public-safe view of the interface states. Frontend rules improve workflow clarity; authorization remains a server-side concern.</p>
    </AssetWorkflowMotion>
  );
}
