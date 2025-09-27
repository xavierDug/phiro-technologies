"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section className="bg-neutral-950 text-white px-2 relative">
            {/* Mobile Background Image */}
            <div className="absolute inset-0 md:hidden">
                <Image
                    src="/AboutUs.jpg"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-neutral-950/70" />
            </div>

            <div className="max-w-[2000px] mx-auto h-screen">
                <div className="grid md:grid-cols-2 h-full relative">
                    {/* Content Column */}
                    <div className="relative z-10 flex items-center p-4 sm:p-8">
                        <div>
                            <motion.h1
                                className="text-white font-bold mb-8 leading-tight relative max-w-4xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                <p className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic'>
                                    Building <span className='underline decoration-[#f5c843]'>With Purpose</span><span className='text-[#f5c843]'>.</span>
                                </p>
                            </motion.h1>

                            <motion.p
                                className="text-md md:text-lg text-[#d0d0d0] max-w-xl relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                            >
                                At Phiro, we believe technology should feel simple, powerful, and human.
                                Our mission is to craft digital products that don&apos;t just work — they inspire trust, clarity, and growth.
                            </motion.p>
                        </div>
                    </div>

                    {/* Desktop Image Column - hidden on mobile */}
                    <div className="hidden md:block relative h-full py-8"> {/* Added py-8 for top/bottom padding */}
                        <div className="relative h-full rounded-3xl overflow-hidden"> {/* Added wrapper div with rounded corners */}
                            <Image
                                src="/AboutUs.jpg"
                                alt="Projects Background"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}