import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fraevo — AI-Native Software Engineering",
    short_name: "Fraevo",
    description:
      "Fraevo builds AI-powered software, digital products and intelligent systems for businesses that want to move faster.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0d",
    theme_color: "#0a0b0d",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}