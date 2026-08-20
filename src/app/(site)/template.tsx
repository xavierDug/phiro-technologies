"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Next remounts a template on every navigation, which gives us a route
 * transition without wiring AnimatePresence to the pathname by hand.
 *
 * Enter-only and short: a long exit animation makes a site feel slow, however
 * good it looks the first time.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
