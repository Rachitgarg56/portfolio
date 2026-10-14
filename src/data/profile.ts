// Keep factual content independent of components so every route uses the same
// public identity and contact details.
export const profile = {
  name: "Rachit Garg",
  role: "Software Engineer",
  positioning: "Software Engineer building product-grade web and AI systems, with a frontend edge.",
  statement: "I build, improve and ship real products.",
  experience: "Around 2 years of professional experience",
  technologies: ["React", "Next.js", "TypeScript"],
  email: "rachitgarg56@gmail.com",
  location: "Bengaluru",
  links: {
    github: "https://github.com/Rachitgarg56",
    linkedin: "https://linkedin.com/in/rachitgarg56",
    medium: "https://medium.com/@rachitgarg56",
  },
  description:
    "Rachit Garg is a software engineer with around 2 years of professional experience building product-grade web and AI systems with a strong frontend foundation.",
} as const;
