"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring } from "motion/react";

import { useLiteMotion } from "@/components/motion/motion-provider";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element may chase the cursor, in px. */
  strength?: number;
}

/**
 * Pulls its child slightly toward the cursor while hovered, then springs back.
 *
 * Motion values rather than React state: the pointer moves at 60–120 Hz and
 * re-rendering on every event is exactly the kind of work a weak machine
 * drops frames on. Skipped entirely in the lite tier (touch, reduced motion,
 * modest hardware), where it renders a plain wrapper.
 */
export function Magnetic({ children, className, strength = 10 }: MagneticProps) {
  const lite = useLiteMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  if (lite) return <div className={className}>{children}</div>;

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2 * strength);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2 * strength);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
