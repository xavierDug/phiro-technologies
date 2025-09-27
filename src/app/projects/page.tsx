"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        title: "Members – Gym Management SaaS",
        description:
            "Multi-tenant SaaS with Stripe payments, subscriptions, attendance tracking, and admin dashboards. Built with Next.js, .NET, SQL Server, and Firebase.",
        image: "/saas-gym.png",
        link: "/projects/members",
    },
    {
        title: "OCH Planner – Automotive Workshop Tool",
        description:
            "Web app for mechanics to manage schedules and online appointments with Firebase backend and a responsive React/Next.js frontend.",
        image: "/OCHProject.png",
        link: "/projects/och-planner",
    },
    {
        title: "Industrial Welding Website",
        description:
            "Custom WordPress site with 3D models using Three.js, showcasing interactive product visualizations with optimized performance.",
        image: "/SoudureFLF.png",
        link: "/projects/welding",
    },
    {
        title: "Coach Fitness – Personal Trainer",
        description:
            "Tailored WordPress site with a custom design, contact form, and SEO optimization for lead generation.",
        image: "/TeamOT13.png",
        link: "/projects/coach-fitness",
    },
    {
        title: "Club de Natation Mustang",
        description:
            "Lead developer for a WordPress site, managing content and technical updates for a sports club.",
        image: "/CNMustang.png",
        link: "/projects/mustang",
    },
];

export default function ProjectsPage() {
    return (
        <section className="bg-neutral-950 text-white px-2">
            <div className="h-screen p-4 sm:p-8 max-w-[2000px] mx-auto">
                {/* Projects hero */}
                <div className="bg-neutral-900 rounded-3xl shadow-lg flex flex-col justify-center h-full p-4 sm:p-8 xl:p-16 overflow-hidden relative">
                    {/* Background image */}
                    <Image
                        src="/goldHome.jpg" // abstract glow or spiral image
                        alt="Projects Background"
                        fill
                        className="object-cover object-center opacity-30"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/20" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/40 via-transparent to-transparent blur-3xl" />

                    <motion.h1
                        className="text-white font-bold mb-8 leading-tight relative max-w-4xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <p className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic'>
                            Where Ideas <span className='underline decoration-[#f5c843]'>Become Real</span><span className='text-[#f5c843]'>.</span>
                        </p>
                    </motion.h1>

                    <motion.p
                        className="text-md md:text-lg text-[#d0d0d0] max-w-xl relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                    >
                        From SaaS platforms to interactive websites, here’s a showcase of projects where design meets performance — and results follow.
                    </motion.p>
                </div>
            </div>
            {/* Projects Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            className="group bg-neutral-900 rounded-3xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                className="w-full h-72 object-cover p-2 rounded-3xl"
                                width={1000}
                                height={800}
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
            </div>
        </section>
    );
}