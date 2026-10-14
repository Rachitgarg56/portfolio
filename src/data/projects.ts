export type ComparisonMetric = {
  kind: "comparison";
  label: string;
  before: string;
  after: string;
  unit?: string;
  note?: string;
};

export type OutcomeMetric = {
  kind: "outcome";
  label: string;
  value: string;
  qualifier?: string;
  note?: string;
};

export type ProjectMetric = ComparisonMetric | OutcomeMetric;

export type Project = {
  slug: string;
  name: string;
  category: "Production" | "Internal" | "Personal" | "Experiment";
  group: "professional" | "independent";
  focus: string;
  summary: string;
  problem: string;
  contributions: readonly string[];
  implementation: readonly { title: string; body: string }[];
  technologies: readonly string[];
  metrics: Record<string, ProjectMetric>;
  previewMetric?: string;
  transformation?: ComparisonMetric;
  links?: { live: string; source?: string; article?: string };
  media?: {
    image: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
    video: string;
    duration: string;
    walkthrough: readonly string[];
  };
  lessons?: readonly string[];
};

// Historical results supplied by Rachit. No live audit or independent validation
// is implied. Keep approximate figures qualified wherever they are displayed.
export const sringeriProject = {
  slug: "sringeri-net",
  name: "Sringeri.net",
  category: "Production",
  group: "professional",
  focus: "Frontend modernization",
  summary: "Modernizing a production website through component migration, performance optimization and more accessible interfaces.",
  problem: "An existing production website had a legacy frontend to modernize. The work addressed component structure, page load time, search visibility, accessibility and responsive behavior while supporting content management.",
  contributions: [
    "Migrated 40+ legacy components to Next.js and TypeScript.",
    "Worked on production performance, SEO and accessibility improvements.",
    "Improved responsive and mobile compatibility across 15+ templates/devices.",
    "Worked with Firebase-backed content management and interfaces built with Tailwind CSS and Material UI.",
  ],
  implementation: [
    { title: "A typed component foundation", body: "The migration moved 40+ legacy components to Next.js and TypeScript. Component modernization was accompanied by an approximately 18% reduction in codebase size." },
    { title: "Performance and discoverability", body: "Production optimization brought page load time from 3.6 seconds to 2.1 seconds. The reported SEO score increased from 78 to 95, alongside the frontend modernization work." },
    { title: "Access across screens", body: "Accessibility work improved the reported score from 82 to 96. Responsive interface work covered 15+ templates/devices, with Tailwind CSS and Material UI in the frontend stack." },
    { title: "Content-backed interfaces", body: "Firebase-backed content management formed part of the production website. This work connected the frontend modernization with the site's content-management needs." },
  ],
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Material UI", "Firebase"],
  metrics: {
    load: { kind: "comparison", label: "Page load time", before: "3.6", after: "2.1", unit: "s" },
    seo: { kind: "comparison", label: "SEO score", before: "78", after: "95", unit: "/100" },
    accessibility: { kind: "comparison", label: "Accessibility score", before: "82", after: "96", unit: "/100" },
    codebase: { kind: "outcome", label: "Smaller codebase", value: "18%", qualifier: "Approximately" },
    components: { kind: "outcome", label: "Legacy components migrated", value: "40+" },
    responsive: { kind: "outcome", label: "Responsive coverage", value: "15+", note: "Templates/devices" },
  },
  previewMetric: "load",
  transformation: { kind: "comparison", label: "Frontend architecture", before: "Legacy components", after: "Next.js + TypeScript" },
} as const satisfies Project;

export const assetProject = {
  slug: "asset-management-system",
  name: "Asset Management System",
  category: "Internal",
  group: "professional",
  focus: "Role-based workflows",
  summary: "An internal production application for procurement, approvals and audit tracking, with interfaces shaped by roles and request state.",
  problem: "Manual asset tracking introduced errors and slowed request processing. Procurement, approvals and audit tracking needed structured workflows, with interfaces that reflected permissions and prevented edits after approval.",
  contributions: [
    "Worked on procurement workflows, role-based dashboards, approvals and audit tracking.",
    "Implemented state-driven UI rules to prevent post-approval edits.",
    "Worked with Next.js, TypeScript, REST APIs and SQL in the internal application.",
    "Contributed to workflow improvements that reduced tracking errors and improved request processing and data consistency.",
  ],
  implementation: [
    { title: "Interfaces organized around roles", body: "Role-based dashboards supported the application's procurement and approval workflows. Permissions and request state were part of the frontend's business-rule handling, rather than simply visual variations of a dashboard." },
    { title: "Request state guides editing", body: "State-driven UI rules prevented post-approval edits. This describes interface behavior; backend authorization and API enforcement are separate concerns and are not established by these UI rules." },
    { title: "Connected workflow data", body: "The Next.js and TypeScript frontend worked with REST APIs and SQL-backed data. Procurement workflows, approvals and audit tracking formed the application's core workflow features." },
    { title: "Less manual tracking", body: "The move toward structured, role-based workflows was associated with approximately 30% fewer manual tracking errors and approximately 25% faster request processing. Data consistency also improved." },
  ],
  technologies: ["Next.js", "TypeScript", "REST APIs", "SQL", "RBAC"],
  metrics: {
    processing: { kind: "outcome", label: "Faster request processing", value: "25%", qualifier: "Approximately" },
    errors: { kind: "outcome", label: "Fewer manual tracking errors", value: "30%", qualifier: "Approximately" },
  },
  previewMetric: "processing",
  transformation: { kind: "comparison", label: "Workflow", before: "Manual tracking", after: "Structured, role-based workflows" },
} as const satisfies Project;

// Papertrail implementation checked against the public repository on 2026-10-07.
// unStuck's private source is not verified; its story is based on Rachit's
// supplied intent and launch recording. Do not infer its stack from Papertrail.
export const papertrailProject = {
  slug: "papertrail",
  name: "Papertrail",
  category: "Personal",
  group: "independent",
  focus: "Document Q&A / Full-stack AI",
  summary: "Ask your documents. Follow the evidence. A document Q&A product that connects streamed answers to their source material.",
  problem: "A fluent AI answer is hard to trust when you cannot see where it came from. I built Papertrail to let people bring their own documents, ask questions in plain language and inspect the passages behind an answer.",
  contributions: [
    "Built the document workflow: PDF, TXT and Markdown uploads, extraction, chunking and embeddings.",
    "Connected workspace-scoped vector retrieval to streamed answers and inspectable source citations.",
    "Built the interface around upload progress, processing states, partial answers, errors and usage limits.",
    "Added signed uploads, usage controls, cleanup and automated checks, including CI and Playwright smoke tests.",
  ],
  implementation: [
    { title: "Retrieval before generation", body: "Uploaded text is split into overlapping chunks and embedded with Gemini. PostgreSQL and pgvector store the vectors alongside document metadata. A question is embedded, relevant chunks from the current workspace are selected, and that evidence is supplied to the model through the Vercel AI SDK." },
    { title: "Evidence belongs in the interface", body: "The response streams into the conversation. Cited sources can be expanded to inspect the underlying passage, with page references for PDFs. Loading, processing, empty and failure states are part of the document workflow, not just the chat box." },
    { title: "Boundaries around the demo", body: "Files use signed uploads to private Supabase storage. Retrieval is scoped to the workspace, with server-side quota checks and scheduled cleanup for document lifecycles. Web search is a separate, explicit user choice rather than silently mixed into a document answer." },
    { title: "Checks and practical limits", body: "The repository includes unit tests, retrieval evaluation fixtures, CI and Playwright smoke tests. Processing runs synchronously rather than through a durable background queue. Text-based PDFs are supported; scanned documents requiring OCR are not. These are implementation boundaries, not claims of measured accuracy or scale." },
  ],
  technologies: ["Next.js", "TypeScript", "Vercel AI SDK", "Gemini", "Supabase", "PostgreSQL / pgvector"],
  metrics: {},
  links: {
    live: "https://support-agent-beige-iota.vercel.app/",
    source: "https://github.com/Rachitgarg56/support-agent",
    article: "https://medium.com/@rachitgarg56/building-papertrail-a-production-minded-rag-document-q-a-app-e3f799b0ace3",
  },
  media: {
    image: "/images/papertrail-demo.webp", width: 1906, height: 898,
    alt: "Papertrail document workspace with an uploaded product guide and an answer with numbered source references.",
    caption: "From the recorded demo: uploaded material, an answer and its sources.",
    video: "/media/papertrail-demo.mp4", duration: "1:06",
    walkthrough: [
      "A PDF is uploaded into the document panel and moves through processing to a ready state.",
      "The user asks about the document's API rate limit. Papertrail displays an answer with numbered references to the uploaded guide.",
      "A second question compares two plans described in the same document, with source references alongside the response.",
    ],
  },
  lessons: [
    "RAG quality starts before the prompt: extraction, chunking, metadata and retrieval scope determine the evidence available to the model.",
    "Trust needs an interface. Readable citations and clear streaming, loading and error states make an AI feature easier to inspect and use.",
  ],
} as const satisfies Project;

export const unstuckProject = {
  slug: "unstuck",
  name: "unStuck",
  category: "Personal",
  group: "independent",
  focus: "DSA thinking coach / AI interaction design",
  summary: "Help with the next thought, not the whole answer. A DSA coach designed to help learners work through a problem themselves.",
  problem: "While preparing DSA, I wanted help when I was stuck without being shown the answer or code immediately. Getting a solution could finish the question while taking away the thinking I needed to practice. unStuck grew out of that frustration.",
  contributions: [
    "Turned a personal DSA preparation problem into a working coaching product.",
    "Designed the coaching experience around focused questions, progressive hints and smaller examples.",
    "Made articulating an approach part of the experience, with the coach reflecting on the learner's reasoning.",
  ],
  implementation: [
    { title: "Begin with the learner's thinking", body: "The walkthrough starts by asking what the learner understands and what they have tried. The coach narrows the problem with a focused question rather than opening with a complete approach." },
    { title: "Make help incremental", body: "A smaller example gives the learner one idea to test. Progressive hints move from constraints to repeated work and pattern recognition. The product is designed to preserve useful effort while giving the learner a way forward." },
    { title: "Ask the learner to explain", body: "In the recorded example, the learner describes their approach and complexity. The coach responds with a question that tests the reasoning. The interaction aims to strengthen understanding rather than simply check whether code passes." },
  ],
  technologies: [],
  metrics: {},
  links: { live: "https://unstuck-black.vercel.app/" },
  media: {
    image: "/images/unstuck-demo.webp", width: 1080, height: 1350,
    alt: "unStuck launch walkthrough: the coach asks what the learner understands and has tried before offering further help.",
    caption: "From the launch walkthrough: start with what the learner is thinking.",
    video: "/media/unstuck-demo.mp4", duration: "1:12",
    walkthrough: [
      "The walkthrough uses Longest Substring Without Repeating Characters to introduce the feeling of being stuck before the first step.",
      "The coach asks what the learner understands and has already tried, then uses a small input example to narrow the question.",
      "Progressive hints compare repeated work with a linear scan. The learner explains an approach and the coach asks a follow-up about its complexity.",
    ],
  },
} as const satisfies Project;

export const projects: readonly Project[] = [sringeriProject, assetProject, papertrailProject, unstuckProject];
export const professionalProjects = projects.filter((project) => project.group === "professional");
export const independentProjects = projects.filter((project) => project.group === "independent");

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
