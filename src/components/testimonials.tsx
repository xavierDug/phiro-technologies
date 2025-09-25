"use client";
import { motion } from "framer-motion";

// Define the type for each tool card
interface Tool {
  name: string;
  tagline: string;
}

const toolsRow1: Tool[] = [
  { name: "Angular", tagline: "Robust front-end framework" },
  { name: "TypeScript", tagline: "Scalable typed JavaScript" },
  { name: "Tailwind CSS", tagline: "Modern responsive styling" },
  { name: "Next.js", tagline: "High-performance web apps" },
  { name: "Node.js", tagline: "Powerful backend runtime" },
];

const toolsRow2: Tool[] = [
  { name: "Stripe", tagline: "Payments made simple" },
  { name: "Firebase", tagline: "Auth & real-time database" },
  { name: "WordPress", tagline: "Flexible CMS solutions" },
  { name: "Figma", tagline: "Collaborative design system" },
  { name: "GitHub", tagline: "Version control & teamwork" },
];

// Props for MarqueeRow
interface MarqueeRowProps {
  tools: Tool[];
  direction?: "left" | "right";
  duration?: number;
}

function MarqueeRow({ tools, direction = "left", duration = 20 }: MarqueeRowProps) {
  // Calculer la direction de l'animation
  const marqueeDirection = direction === "left" ? "marquee-left" : "marquee-right";
  const animationDuration = `${duration}s`;

  return (
    <div className="relative flex overflow-hidden">
      <div
        className={`flex gap-6 ${marqueeDirection}`}
        style={{
          animationDuration,
        }}
      >
        {[...tools, ...tools].map((tool, index) => (
          <div
            key={index}
            className="flex-none w-64 p-6 rounded-2xl bg-neutral-900/70 backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300 border border-neutral-800/50"
          >
            <h3 className="text-xl font-bold text-[#f5c843]">{tool.name}</h3>
            <p className="text-sm text-neutral-400">{tool.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ajouter les styles CSS pour l'animation infinie
type StyleProps = {};

const style = `
@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.marquee-left {
  animation: marquee-left linear infinite;
}
.marquee-right {
  animation: marquee-right linear infinite;
}
`;

// Injecter le style dans le composant principal
export default function ToolsShowcase() {
  return (
    <section className="bg-neutral-950 text-white py-20 px-2 overflow-hidden relative">
      <style>{style}</style>
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div
          className="max-w-6xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl max-w-4xl mx-auto">
            Tools and Technologies that{" "}
            <span className="underline decoration-[#f5c843] font-bold text-4xl md:text-5xl">
              Power Phiro
            </span>
            <span className="text-[#f5c843] font-bold">.</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl max-w-5xl mx-auto text-gray-300">
            Our craft blends the latest frameworks, platforms, and design tools —
            ensuring your project is built on solid, modern foundations.
          </p>
        </motion.div>

        {/* Rows */}
        <div className="space-y-8">
          <MarqueeRow tools={toolsRow1} direction="left" duration={25} />
          <MarqueeRow tools={toolsRow2} direction="right" duration={28} />
        </div>
      </div>
    </section>
  );
}
