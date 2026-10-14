export type ExperienceEntry = {
  employer: string;
  role: string;
  start: string;
  startLabel: string;
  end?: string;
  endLabel: string;
};

// Employer names and dates supplied by Rachit. Project/employer attribution
// is intentionally absent until provided.
export const experience: readonly ExperienceEntry[] = [
  { employer: "Leviosa Consulting Pvt. Ltd.", role: "Junior Software Developer", start: "2025-01", startLabel: "Jan 2025", endLabel: "Present" },
  { employer: "Intentive Technologies Pvt. Ltd.", role: "SDE Intern", start: "2024-08", startLabel: "Aug 2024", end: "2025-01", endLabel: "Jan 2025" },
];
