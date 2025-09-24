import { motion } from "framer-motion";
import { ArrowBigRight, MoveRight } from "lucide-react";

export default function Projects() {
    return (
        <section className="bg-neutral-950 text-white py-20 px-2">
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
                        Projects That{" "}
                        <span className="underline decoration-[#f5c843] font-bold text-4xl md:text-5xl">
                            Speak for Themselves
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
                        We don’t just talk about building with purpose — we show it. Here are some of the websites and apps we’ve crafted, each designed for clarity, growth, and impact.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Project 1 */}
                    <motion.div
                        className="bg-neutral-900 rounded-3xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="/projectImg.png"
                            alt="Project 1"
                            className="w-full h-80 object-cover object-top p-2 rounded-3xl"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">E-Commerce Redesign</h3>
                            <p className="text-neutral-400">
                                A complete overhaul of an online store, boosting conversions by 30% with a sleek, user-friendly design.
                            </p>
                        </div>
                    </motion.div>
                    {/* Project 2 */}
                    <motion.div
                        className="bg-neutral-900 rounded-3xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="/projectImg.png"
                            alt="Project 2"
                            className="w-full h-80 object-cover object-top p-2 rounded-3xl"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">SaaS Platform Launch</h3>
                            <p className="text-neutral-400">
                                Developed a scalable SaaS platform from scratch, enabling seamless user onboarding and management.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* More projects can be added similarly */}

                {/* CTA */}
                <div className="text-center mt-16">
                    <button type="button" className="py-3 px-8 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-white text-black hover:bg-gray-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                        View All Projects <MoveRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="mt-10 text-center text-neutral-500">
                <p>More projects coming soon...</p>
            </div>
        </section>
    );
}