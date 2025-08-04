'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-[#e0e0e0] grid grid-cols-1 md:grid-cols-2">
      {/* Left: Content */}
      <div className="flex flex-col justify-center items-start px-10 md:px-20 py-24 z-10">
        <motion.h1
          className=" text-white font-bold mb-6 leading-tight "    
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic'>Purpose, <span className='underline decoration-[#f5c843]'>Engineered</span><span className='text-[#f5c843]'>.</span></p>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[#d0d0d0] max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        >
          We design and build smart, scalable tech for the next generation of digital products.
        </motion.p>
      </div>

      {/* Right: Image from Unsplash */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter saturate-150 hue-rotate-30"
          style={{
            backgroundImage: "url('/HeroImage.jpg')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black" />
      </motion.div>
    </main>
  );
}