"use client";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";

interface Project {
    title: string;
    description: string;
    image: string;
    link?: string;
}

const projects: Project[] = [
    {
        title: "Phiro – Gym Management SaaS",
        description:
            "Multi-tenant SaaS for gyms with subscription management, payments via Stripe, attendance tracking, and admin dashboards. Built with Next.js, .NET, SQL Server, and Firebase, deployed on Azure.",
        image: "/saas-gym.png",
        link: "/projects/phiro",
    },
    {
        title: "OCH Planner – Automotive Workshop Tool",
        description:
            "Web app for mechanics to manage schedules and online appointments, with a Firebase-powered backend and responsive React/Next.js frontend.",
        image: "/OCHProject.png",
        link: "/projects/och-planner",
    },
    {
        title: "Industrial Welding Website",
        description:
            "Custom WordPress site with integrated 3D models using Three.js, showcasing products interactively with a performant and SEO-optimized design.",
        image: "/SoudureFLF.png",
        link: "/projects/welding",
    },
];

export default function Projects() {
    return (
        <section className="bg-neutral-950 text-white py-28 px-2">
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

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            className="group bg-neutral-900 rounded-3xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                className="w-full h-64 object-cover p-2 rounded-3xl"
                                height={1000}
                                width={1000}
                            />
                            <div className="p-6">
                                <p className="text-2xl font-bold mb-2 group-hover:text-[#f5c843] transition-colors">
                                    {project.title}
                                </p>
                                <p className="text-neutral-400 text-sm">{project.description}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <a
                        href="/projects"
                        className="py-3 px-8 inline-flex items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-white text-black hover:bg-gray-200 transition-all"
                    >
                        View All Projects <MoveRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
