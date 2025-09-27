"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaAngular, FaNodeJs, FaStripe, FaGithub } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiDotnet, SiFirebase, SiWordpress, SiFigma, SiPostgresql, SiMongodb } from "react-icons/si";
import { PiFileCSharp } from "react-icons/pi";
import { TbSql } from "react-icons/tb"; // for SQL
import { DiVisualstudio } from "react-icons/di"; // VS/IDE

interface Tool {
    name: string;
    tagline: string;
    icon?: IconType; // Optional icon component
}


const toolsRow1: Tool[] = [
    { name: "Angular", tagline: "Enterprise-grade front-end framework", icon: FaAngular },
    { name: "TypeScript", tagline: "JavaScript with type safety and scalability", icon: SiTypescript },
    { name: "Tailwind CSS", tagline: "Utility-first modern styling", icon: SiTailwindcss },
    { name: "Next.js", tagline: "React framework for SSR & performance", icon: SiNextdotjs },
    { name: ".NET", tagline: "Robust cross-platform backend framework", icon: SiDotnet },
    { name: "C#", tagline: "Object-oriented language for .NET", icon: PiFileCSharp },
    { name: "Node.js", tagline: "JavaScript runtime for scalable APIs", icon: FaNodeJs },
    { name: "SQL Server", tagline: "Relational database & stored procedures", icon: TbSql },
    { name: "Entity Framework Core", tagline: "Modern ORM for .NET apps", icon: DiVisualstudio },
];

const toolsRow2: Tool[] = [
    { name: "Stripe", tagline: "Seamless payments & subscriptions", icon: FaStripe },
    { name: "Firebase", tagline: "Realtime database & authentication", icon: SiFirebase },
    { name: "WordPress", tagline: "Customizable CMS & WooCommerce", icon: SiWordpress },
    { name: "Figma", tagline: "Collaborative design & prototyping", icon: SiFigma },
    { name: "GitHub", tagline: "Version control & open-source collaboration", icon: FaGithub },
    { name: "PostgreSQL", tagline: "Advanced relational database", icon: SiPostgresql },
    { name: "MongoDB", tagline: "Flexible NoSQL document database", icon: SiMongodb },
];

interface MarqueeRowProps {
    tools: Tool[];
    /**
     * speed = pixels-per-second (how many px the slice travels per second).
     * The component converts this to a duration for the CSS animation:
     * duration (s) = sliceWidth(px) / speed(px/s)
     */
    speed?: number;
    direction?: "left" | "right";
}

interface MarqueeCustomProperties extends React.CSSProperties {
    '--slice-width-px': string;
    '--marquee-duration': string;
}

function MarqueeRow({ tools, speed = 60, direction = "left" }: MarqueeRowProps) {
    const sliceRef = useRef<HTMLDivElement | null>(null);
    const [sliceWidth, setSliceWidth] = useState(0);
    const [copies, setCopies] = useState(0);

    // Measure slice width and determine how many copies we need to fill viewport + 1
    useEffect(() => {
        function update() {
            const sliceEl = sliceRef.current;
            if (!sliceEl) return;
            const w = sliceEl.offsetWidth;
            if (!w) return;
            setSliceWidth(w);
            const needed = Math.max(1, Math.ceil(window.innerWidth / w) + 1);
            setCopies(needed);
        }

        update();
        const ro = new ResizeObserver(update);
        if (sliceRef.current) ro.observe(sliceRef.current);
        window.addEventListener("resize", update);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
        };
    }, [tools]);

    // compute animation duration in seconds (sliceWidth px / speed px-per-second)
    const durationSec = sliceWidth ? sliceWidth / speed : 0;

    // Set CSS vars for the marquee container. Note: TS typing for custom properties below.
    const cssVars: MarqueeCustomProperties = {
        '--slice-width-px': `${sliceWidth}px`,
        '--marquee-duration': `${durationSec}s`,
    };

    // Render one slice (the original content)
    const renderSlice = (keyPrefix = "") => (
        <div className="marquee__slice" key={keyPrefix || "original"}>
            {tools.map((tool, i) => (
                <div
                    key={`${keyPrefix}-card-${i}`}
                    className="flex-none w-64 p-6 min-h-52 items-center rounded-2xl bg-neutral-900/70 backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300 border border-neutral-800/50"
                >
                    {tool.icon && <tool.icon className="size-8 mb-4 text-[#f5c843]" />}
                    <p className="text-xl font-bold text-[#f5c843]">{tool.name}</p>
                    <p className="text-sm text-neutral-400">{tool.tagline}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div
            className={`marquee ${direction === "right" ? "marquee--reverse" : ""}`}
            style={cssVars}
            aria-hidden={false}
        >
            <div className="marquee__content">
                {/* original slice: used for measuring */}
                <div ref={sliceRef}>{renderSlice("orig")}</div>

                {/* generated copies to fill the viewport */}
                <div className="marquee__copies" aria-hidden="true">
                    {Array.from({ length: copies }).map((_, i) => (
                        <div key={`copy-${i}`}>{renderSlice(`copy-${i}`)}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <section className="bg-neutral-950 text-white py-28 px-2 overflow-hidden relative">
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
                        Tools and Technologies that{" "}
                        <span className="underline decoration-[#f5c843] font-bold text-4xl md:text-5xl">
                            Power Phiro
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
                        Our craft blends the latest frameworks, platforms, and design tools — ensuring your
                        project is built on solid, modern foundations.
                    </p>
                </motion.div>
            </div>

            {/* full-width rows (outside container) */}
            <div className="space-y-8 w-full overflow-visible">
                <MarqueeRow tools={toolsRow1} direction="left" speed={60} />
                <MarqueeRow tools={toolsRow2} direction="right" speed={60} />
            </div>
        </section>
    );
}
