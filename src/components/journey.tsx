"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2023",
    title: "The Vision is Born",
    description:
      "Phiro was founded with one clear mission — to help businesses and creators bring their digital ideas to life with precision, beauty, and performance.",
  },
  {
    year: "2024",
    title: "Laying the Foundation",
    description:
      "We built our core structure, processes, and values — balancing design excellence with engineering discipline. Early partnerships shaped what Phiro stands for today.",
  },
  {
    year: "2025",
    title: "Launch & Momentum",
    description:
      "Phiro officially launched — building SaaS products, websites, and digital ecosystems that help brands grow faster and smarter.",
  },
  {
    year: "Future",
    title: "Expanding the Vision",
    description:
      "As technology evolves, so do we. Phiro’s future lies in innovation — merging design, strategy, and software to create what’s next.",
  },
];

export default function OurJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="our-journey"
      className="relative bg-neutral-950 text-white py-32 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,200,67,0.05),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-6xl font-bold text-center mb-20"
        >
          Our Story <span className="underline decoration-[#f5c843] italic">and Journey.</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-neutral-800 -translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#f5c843] to-transparent -translate-x-1/2 origin-top"
          />

          {/* Timeline items */}
          <div className="space-y-24 relative">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Card */}
                <div className="bg-neutral-900 rounded-3xl border border-neutral-800 shadow-lg p-8 md:w-1/2 z-10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f5c843]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-2xl font-bold text-[#f5c843] mb-2">
                    {item.year}
                  </h3>
                  <p className="text-xl font-medium mb-3 text-white/90">
                    {item.title}
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:block md:w-1/2 h-full relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-6 h-6 bg-[#f5c843] rounded-full border-4 border-neutral-950 shadow-[0_0_25px_rgba(245,200,67,0.4)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
