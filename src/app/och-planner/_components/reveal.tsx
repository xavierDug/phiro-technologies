"use client";

import { motion } from "framer-motion";

/**
 * Scroll-triggered fade-and-rise. One place to tune the page's motion so the
 * sections stay in rhythm instead of each inventing its own timing.
 */
export function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}
