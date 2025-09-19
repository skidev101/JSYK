// src/data/features.ts
export interface Feature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export const features: Feature[] = [
  {
    title: "100% Anonymous",
    description: "No names, no profiles. Just pure, honest communication.",
    icon: "👻",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Safe Space",
    description:
      "Share your thoughts without fear of judgment or consequences.",
    icon: "🛡️",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Real Conversations",
    description: "Get authentic feedback and genuine connections.",
    icon: "💬",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Easy to Use",
    description:
      "Simple, clean interface. No complicated setup required.",
    icon: "⚡",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Privacy First",
    description:
      "Your data stays private. We don't track or store personal info.",
    icon: "🔒",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Fun & Engaging",
    description:
      "Discover new perspectives and enjoy meaningful interactions.",
    icon: "🎉",
    gradient: "from-pink-500 to-rose-500",
  },
];
