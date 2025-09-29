"use client"

import CTA from "@/components/cta";
import { motion } from "framer-motion";
import { ArrowBigDown, ArrowDown, BriefcaseBusiness, CalendarX2, HandHelping, HeartHandshake, Mail, MonitorSmartphone, PhoneOff, Scaling, Send, Sparkle } from "lucide-react";
import Image from "next/image";

export default function CampagneGarages() {
    return (
        <div>
            <section className="bg-black text-white px-8 relative overflow-hidden">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 min-h-screen items-center py-20">
                        <div>
                            <motion.h1
                                className="text-white font-bold mb-8 leading-tight relative max-w-4xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                <p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic'>
                                    A professional website for your garage <span className='underline decoration-[#f5c843]'>starting at just </span><span className='text-[#f5c843]'>$599.</span>
                                </p>
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-xl text-[#d0d0d0] max-w-xl relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                            >
                                Modern design, domain, hosting & support — everything included.
                            </motion.p>
                            <motion.p
                                className="mt-8 relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
                            >
                                <button type="button" className="py-3 sm:py-4 px-6 sm:px-10 inline-flex items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-white text-black hover:bg-gray-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                                    Get Started Today <ArrowDown className="ms-2" size={16} />
                                </button>
                            </motion.p>
                        </div>
                        <Image
                            src="/PhiroGarageMock.png"
                            alt="Garage Website Example"
                            width={1000}
                            height={400}
                            className="rounded-lg mx-auto z-10"
                        />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/40 via-transparent to-transparent blur-3xl" />
            </section>
            <section className="bg-neutral-900 text-white px-8 py-28">
                <div className="container mx-auto">
                    {/* The why section */}
                    {/* Heading */}
                    <motion.div
                        className="max-w-6xl mx-auto text-center mb-16"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl max-w-4xl mx-auto">
                            Why most garages lose{" "}
                            <br />
                            <span className="underline decoration-[#f5c843] font-bold text-4xl md:text-5xl">
                                customers online
                            </span>
                            <span className="text-[#f5c843] font-bold">.</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            {
                                icon: <CalendarX2 className="w-8 h-8 text-[#f5c843]" />,
                                title: "Outdated or no website",
                                desc: "Your garage looks unprofessional if your site is old — or worse, if you don’t have one at all.",
                                delay: 0.2,
                            },
                            {
                                icon: <MonitorSmartphone className="w-8 h-8 text-[#f5c843]" />,
                                title: "Hard to find on mobile",
                                desc: "Most customers search “garage near me” on their phone. If your site isn’t mobile-friendly, they’ll pick someone else.",
                                delay: 0.4,
                            },
                            {
                                icon: <PhoneOff className="w-8 h-8 text-[#f5c843]" />,
                                title: "Lost bookings and calls",
                                desc: "Without clear contact info or booking options, you lose clients who wanted to schedule today.",
                                delay: 0.6,
                            },
                            {
                                icon: <Sparkle className="w-8 h-8 text-[#f5c843]" />,
                                title: "Competitors look better",
                                desc: "Other garages with modern websites inspire more trust and win more clients — even if your service is better.",
                                delay: 0.8,
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-start gap-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: item.delay }}
                                viewport={{ once: true, amount: 0.4 }}
                            >
                                <div className="flex-shrink-0">
                                    <div className="backdrop-blur-md bg-[#f5c843]/5 border border-[#f5c843]/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] p-2 rounded-2xl">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold">{item.title}</p>
                                    <p className="text-gray-300">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-center mt-16 text-lg text-gray-400 italic">
                        The good news? Fixing all this is easier than you think.
                    </p>
                </div>
            </section>

            <section className="bg-black text-white px-8 py-28 relative">
                <div className="container mx-auto">
                    {/* Heading */}
                    <motion.div
                        className="max-w-6xl mx-auto text-center mb-16"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl max-w-4xl mx-auto">
                            How{" "}
                            <span className="underline decoration-[#f5c843] font-bold">
                                Phiro
                            </span>{" "}
                            helps your garage win online
                            <span className="text-[#f5c843] font-bold">.</span>
                        </h2>
                        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                            Everything you need to attract more customers, look professional,
                            and grow your business — done for you.
                        </p>
                    </motion.div>

                    {/* Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <BriefcaseBusiness className="w-8 h-8 text-[#f5c843]" />,
                                title: "Modern Professional Design",
                                desc: "A clean, mobile-first website that inspires trust and sets you apart from competitors.",
                                delay: 0.2,
                            },
                            {
                                icon: <HandHelping className="w-8 h-8 text-[#f5c843]" />,
                                title: "All-Inclusive Package",
                                desc: "Domain, hosting, email, and ongoing support — everything is handled for you.",
                                delay: 0.4,
                            },
                            {
                                icon: <Scaling className="w-8 h-8 text-[#f5c843]" />,
                                title: "Built to Grow",
                                desc: "Easily add features like online booking, reviews, or promotions as your garage expands.",
                                delay: 0.6,
                            },
                            {
                                icon: <HeartHandshake className="w-8 h-8 text-[#f5c843]" />,
                                title: "Local SEO Boost",
                                desc: "Appear when customers search 'garage near me' and never lose business to outdated competitors.",
                                delay: 0.8,
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="flex flex-col items-start gap-4 p-6 rounded-2xl border border-[#f5c843]/10 bg-neutral-900/60 backdrop-blur-md hover:bg-neutral-800/60 transition"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: item.delay }}
                                viewport={{ once: true, amount: 0.4 }}
                            >
                                <div className="flex-shrink-0">
                                    <div className="backdrop-blur-md bg-[#f5c843]/10 border border-[#f5c843]/20 p-3 rounded-2xl">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold mb-2">{item.title}</p>
                                    <p className="text-gray-300">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative">
                        <Image
                            src="/garageCTA.jpg"
                            alt="Garage background"
                            fill
                            className="object-cover absolute inset-0 w-full h-full z-0"
                            style={{ opacity: 0.15 }}
                            priority
                        />
                        {/* Call to Action */}
                        <div className="container mt-20 mx-auto text-center relative bg-gray-500/10 backdrop-blur-md border border-gray-200/10 rounded-3xl p-20 shadow-lg overflow-hidden">

                            <div className="relative z-10">
                                {/* Heading */}
                                <motion.h2
                                    className="text-3xl md:text-5xl font-bold mb-6"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                >
                                    Ready to bring <span className="text-[#f5c843]">more customers to your garage</span>?
                                </motion.h2>

                                {/* Subheading */}
                                <motion.p
                                    className="text-lg md:text-xl text-gray-300 mb-10"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                >
                                    Get your professional website today — starting at{" "}
                                    <span className="text-[#f5c843] font-semibold">$599</span>.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                >
                                    {/* Email link */}
                                    <a
                                        href="#"
                                        className="flex items-center justify-center gap-2 bg-[#f5c843] text-black font-semibold p-4 sm:px-12 py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-yellow-500/30 transition-transform duration-300"
                                    >
                                        Get Started Today <ArrowDown className="ms-2" size={20} />
                                    </a>
                                </motion.div>
                            </div>

                            {/* Background Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 via-transparent to-transparent blur-3xl" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}