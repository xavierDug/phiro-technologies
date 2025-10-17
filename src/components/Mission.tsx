"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="bg-neutral-950 text-white py-24 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-5xl sm:text-6xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Our Mission and <span className="text-[#f5c843] italic">Philosophy.</span>
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {/* Card A - Philosophy */}
          <motion.div
            className="md:col-span-1 bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between border border-neutral-800"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-semibold mb-4 text-[#f5c843]">
              Built With Intention
            </p>
            <p className="text-[#c0c0c0] leading-relaxed">
              Every project begins with a purpose — to design technology that simplifies, connects, and empowers.
            </p>
          </motion.div>

          {/* Card B - Image */}
          <motion.div
            className="md:col-span-2 relative rounded-3xl overflow-hidden border border-neutral-800"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/ourmissionbento1.jpg"
              alt="Innovation"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
              <h3 className="text-3xl sm:text-4xl font-semibold italic text-white">
                Innovation With Purpose
              </h3>
            </div>
          </motion.div>

          {/* Card C - Mission Text */}
          <motion.div
            className="md:col-span-2 bg-neutral-900 rounded-3xl p-8 border border-neutral-800 flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg sm:text-xl text-[#d0d0d0] leading-relaxed max-w-3xl">
              We craft digital products that inspire clarity and trust — balancing human insight with modern engineering.
              Our mission is to transform ideas into timeless experiences that move people and businesses forward.
            </p>
          </motion.div>

          {/* Card D - Wide Image */}
          <motion.div
            className="md:col-span-3 relative rounded-3xl overflow-hidden h-[300px] border border-neutral-800"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/ourmissionbento2.jpg"
              alt="Team collaboration"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-950/60 flex items-center justify-center">
              <p className="text-xl sm:text-2xl italic text-[#f5c843] text-center px-4 max-w-3xl">
                “Technology is most powerful when it amplifies human potential.”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
