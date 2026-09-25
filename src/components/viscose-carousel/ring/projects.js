// The array controls the art atlas, ring order, index, and metadata together.
export const PROJECTS = [
  {
    file: "pixelpop.jpg",
    name: "Ideas that move markets.",
    type: "",
    year: "2023",
  },
  {
    file: "fathom-audio.jpg",
    name: "Fathom",
    type: "Growth & Media",
    year: "2024",
  },
  {
    file: "meridian-coffee.jpg",
    name: "Meridian",
    type: "Branding",
    year: "2024",
  },
  {
    file: "harbor-ash.jpg",
    name: "Harbor & Ash",
    type: "Digital & Web",
    year: "2025",
  },
  {
    file: "verve-botanicals.jpg",
    name: "Verve",
    type: "Social Strategy",
    year: "2024",
  },
  {
    file: "hyperion-labs.jpg",
    name: "Hyperion",
    type: "Production",
    year: "2025",
  },
];

export const IMAGE_FILES = PROJECTS.map((project) => project.file);
