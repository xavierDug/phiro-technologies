"use client";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function CTA() {
    return (
        <section
            className="relative bg-[url('/ctaBg.jpg')] bg-cover bg-center bg-no-repeat text-white py-28 px-4 before:absolute before:inset-0 before:bg-gradient-to-b before:from-neutral-950 before:to-black before:opacity-90"
        >
            <div className="container mx-auto text-center relative bg-gray-500/10 backdrop-blur-lg border border-gray-200/10 rounded-3xl p-20 shadow-lg overflow-hidden">
                <div className="relative z-10">
                    {/* Heading */}
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        Ready to <span className="text-[#f5c843]">build something great</span>?
                    </motion.h2>

                    {/* Subheading */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 mb-10"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        Let’s collaborate and turn your vision into reality. Drop me a line and I’ll get back to you quickly.
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
                            href="mailto:xavierdugal2004@hotmail.com"
                            className="flex items-center justify-center gap-2 bg-[#f5c843] text-black font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-yellow-500/30 transition-transform duration-300"
                        >
                            <Mail size={20} />
                            Email Me
                        </a>

                        {/* Contact form placeholder */}
                        <button
                            className="flex items-center justify-center gap-2 border border-neutral-700 bg-neutral-900/70 px-6 py-3 rounded-2xl shadow-lg hover:bg-neutral-800 hover:scale-105 transition-transform duration-300"
                        >
                            <Send size={20} />
                            Contact Form
                        </button>
                    </motion.div>
                </div>

                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 via-transparent to-transparent blur-3xl" />
            </div>
        </section>
    );
}