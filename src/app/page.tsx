'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0e0e10] text-[#e0e0e0] flex items-center justify-center px-6 overflow-hidden">
      {/* Animated background — optional, see below */}
      <div className="absolute top-1/6 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-[#f5c843]/10 blur-3xl rounded-full animate-pulse"></div>

      <div className="z-10 max-w-4xl text-center">
        <motion.h1
          className="text-5xl md:text-6xl text-[#f5c843] leading-tight mb-4 font-semibold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Purpose, Engineered.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[#d0d0d0] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        >
          We design and build smart, scalable tech for the next generation of digital products.
        </motion.p>
      </div>
    </main>
  );
}