const answerFirst = ["Prompt", "Approach", "Solution"] as const;
const coached = ["What have you tried?", "Smaller example", "Progressive hint", "Explain the approach"] as const;

export function UnstuckBehavior() {
  return (
    <aside className="unstuck-behavior" aria-labelledby="unstuck-behavior-title">
      <p id="unstuck-behavior-title" className="type-label text-muted">Interaction constraint</p>
      <div className="behavior-track behavior-answer-first">
        <p>Typical answer-first AI</p>
        <ol>{answerFirst.map((step) => <li key={step}>{step}</li>)}</ol>
      </div>
      <div className="behavior-track behavior-coached">
        <p>unStuck coaching</p>
        <ol>{coached.map((step) => <li key={step}>{step}</li>)}</ol>
      </div>
    </aside>
  );
}
