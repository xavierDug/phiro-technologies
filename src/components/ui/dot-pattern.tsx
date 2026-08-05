"use client";

import React, { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Dot Pattern (Magic UI) — an SVG background dot grid that fills its container.
 * The animated `glow` variant of the original was dropped: this page uses it as
 * a static texture, so the per-dot motion elements were pure cost.
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    cx?: number;
    cy?: number;
    cr?: number;
    className?: string;
}

export function DotPattern({
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    className,
    ...props
}: DotPatternProps) {
    const id = useId();
    const containerRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const columns = Math.ceil(dimensions.width / width);
    const dots = Array.from(
        { length: columns * Math.ceil(dimensions.height / height) },
        (_, i) => ({
            x: (i % columns) * width + cx + x,
            y: Math.floor(i / columns) * height + cy + y,
        })
    );

    return (
        <svg
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
                className
            )}
            {...props}
        >
            <defs>
                <radialGradient id={`${id}-gradient`}>
                    <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
            </defs>
            {dots.map((dot) => (
                <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r={cr} fill="currentColor" />
            ))}
        </svg>
    );
}
