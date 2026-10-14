export type ExperienceEntry = {
  kind: "employment" | "foundation";
  employer: string;
  role: string;
  start: string;
  startLabel: string;
  end?: string;
  endLabel: string;
  context: string;
  details?: readonly string[];
  proofLinks?: readonly { label: string; href: string; description: string }[];
};

// Employer names, dates and experience context are supplied by Rachit. Keep the
// apprenticeship visually and semantically separate from employment.
export const experience: readonly ExperienceEntry[] = [
  {
    kind: "employment",
    employer: "Leviosa Consulting Pvt. Ltd.",
    role: "Junior Software Developer",
    start: "2025-01",
    startLabel: "Jan 2025",
    endLabel: "Present",
    context: "Production frontend modernization · workflow-driven internal products · Next.js · TypeScript",
    proofLinks: [
      { label: "Sringeri.net", href: "/work/sringeri-net", description: "Production frontend modernization" },
      { label: "Asset Management System", href: "/work/asset-management-system", description: "Role-aware internal workflows" },
    ],
  },
  {
    kind: "employment",
    employer: "Intentive Technologies Pvt. Ltd.",
    role: "SDE Intern",
    start: "2024-08",
    startLabel: "Aug 2024",
    end: "2025-01",
    endLabel: "Jan 2025",
    context: "Customer-facing product and web experience · frontend UX · Jekyll / Liquid · JavaScript · AWS",
    details: ["Contributed to the Kommunicate website and Support Bot Builder.", "Worked on frontend and user-experience improvements within existing product systems."],
  },
  {
    kind: "foundation",
    employer: "Geekster",
    role: "Full Stack Web Development Apprentice",
    start: "2023-06",
    startLabel: "Jun 2023",
    end: "2024-06",
    endLabel: "Jun 2024",
    context: "Full-stack foundations · MERN · DSA and problem solving · project-based engineering",
    proofLinks: [
      {
        label: "FigPro",
        href: "https://figma-clone-react-dqk0w5bfm-rachit-gargs-projects.vercel.app/",
        description: "A collaborative canvas built with React, Fabric.js and Liveblocks, with shapes, text and export tools.",
      },
    ],
  },
];
