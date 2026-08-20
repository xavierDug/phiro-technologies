"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to chase the cursor, in px. */
  strength?: number;
}

/**
 * Pulls its child slightly toward the cursor while hovered, then springs back.
 *
 * Deliberately subtle — the effect should register as "responsive" rather than
 * as an effect. Pointer-based, so it never fires on touch devices.
 */
export function Magnetic({ children, className, strength = 12 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: (x / (rect.width / 2)) * strength,
      y: (y / (rect.height / 2)) * strength,
    });
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
