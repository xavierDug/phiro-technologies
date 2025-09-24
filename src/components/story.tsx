import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
    BriefcaseBusiness,
    HandHelping,
    HeartHandshake,
    Scaling,
} from "lucide-react";

export default function Story() {
    // adjust for more tiles or bigger size
    const FIB_COUNT = 7;
    const UNIT = 20;

    const { squares, d, bbox } = useMemo(
        () => generateFibonacciLayoutAndPath(FIB_COUNT, UNIT),
        [FIB_COUNT, UNIT]
    );

    // Calculate the center points based on bbox
    const centerX = (bbox.minX + bbox.maxX) / 2;
    const centerY = (bbox.minY + bbox.maxY) / 2;

    // Calculate the viewBox based on bbox
    const viewBoxWidth = bbox.maxX - bbox.minX + UNIT * 2; // Add padding
    const viewBoxHeight = bbox.maxY - bbox.minY + UNIT * 2;
    const viewBoxX = bbox.minX - UNIT;
    const viewBoxY = bbox.minY - UNIT;

    return (
        <section
            className="relative py-20 px-4"
            style={{
                background: "linear-gradient(120deg, #0a0f2c 0%, #1a2150 100%)",
                color: "white",
                overflow: "hidden",
            }}
        >
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 max-w-7xl">
                {/* Left: Text Content */}
                <div className="flex-1">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        At Phiro, we believe technology should feel human —{" "}
                        <span className="text-[#f5c843]">simple, intuitive, and powerful.</span>
                    </motion.h2>

                    <div className="space-y-7">
                        {[
                            {
                                icon: <HandHelping className="w-8 h-8 text-[#f5c843]" />,
                                title: "Clarity First",
                                desc: "We strip away the noise and deliver websites that focus on what matters — your story, your product, your growth.",
                                delay: 0.2,
                            },
                            {
                                icon: <HeartHandshake className="w-8 h-8 text-[#f5c843]" />,
                                title: "Design + Tech in Harmony",
                                desc: "We don’t just code or design — we merge both to create seamless digital experiences that feel alive.",
                                delay: 0.4,
                            },
                            {
                                icon: <Scaling className="w-8 h-8 text-[#f5c843]" />,
                                title: "Built to Scale",
                                desc: "Every site we craft is fast, secure, and ready to grow with you — not something that needs to be rebuilt in 12 months.",
                                delay: 0.6,
                            },
                            {
                                icon: <BriefcaseBusiness className="w-8 h-8 text-[#f5c843]" />,
                                title: "Your Partner, Not Just a Vendor",
                                desc: "We collaborate, adapt, and care about your vision like it’s our own.",
                                delay: 0.8,
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-start gap-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: item.delay }}
                                viewport={{ once: true, amount: 0.4 }}
                            >
                                <div className="flex-shrink-0">
                                    <div className="backdrop-blur-md bg-[#f5c843]/5 border border-[#f5c843]/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] p-2 rounded-2xl">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-semibold">{item.title}</p>
                                    <p className="text-gray-300">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Fibonacci Spiral + Squares */}
                <motion.div
                    className="flex-1 flex justify-center items-center relative w-full aspect-square max-w-[700px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="w-full h-full">
                        <svg
                            className="w-full h-full"
                            viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <defs>
                                    <linearGradient id="golden-glow" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#f5c843" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#fffbe6" stopOpacity="0.8" />
                                    </linearGradient>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                            </defs>

                            <g filter="url(#glow)">
                                {/* faint tiles */}
                                {squares.map((sq, i) => (
                                    <rect
                                        key={i}
                                        x={sq.x}
                                        y={sq.y}
                                        width={sq.size}
                                        height={sq.size}
                                        stroke="#f5c84355"
                                        strokeWidth={1}
                                        fill="none"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                ))}

                                {/* spiral path */}
                                <motion.path
                                    d={d}
                                    stroke="url(#golden-glow)"
                                    strokeWidth={4}
                                    fill="none"
                                    strokeLinecap="round"
                                    vectorEffect="non-scaling-stroke"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 4, ease: "easeInOut" }}
                                    viewport={{ once: true, amount: 0.3 }}
                                />
                            </g>
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ---------- helper: robust construction of squares + spiral path ---------- */
function generateFibonacciLayoutAndPath(n: number, unit: number) {
    // fibonacci sequence
    const fib: number[] = [1, 1];
    for (let i = 2; i < n; i++) fib.push(fib[i - 1] + fib[i - 2]);

    // place squares (classic bounding-box expansion)
    const squares: { x: number; y: number; size: number }[] = [];
    squares.push({ x: 0, y: 0, size: fib[0] * unit });
    let minX = 0;
    let minY = 0;
    let maxX = fib[0] * unit;
    let maxY = fib[0] * unit;

    for (let i = 1; i < n; i++) {
        const s = fib[i] * unit;
        const dir = (i - 1) % 4; // 0=right,1=up,2=left,3=down
        let x: number, y: number;
        if (dir === 0) {
            x = maxX;
            y = minY;
        } else if (dir === 1) {
            x = minX;
            y = minY - s;
        } else if (dir === 2) {
            x = minX - s;
            y = minY;
        } else {
            x = minX;
            y = maxY;
        }
        squares.push({ x, y, size: s });
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + s);
        maxY = Math.max(maxY, y + s);
    }

    // generate all possible quarter-arcs for a square (center index, start, end)
    function possibleArcsForSquare(sq: { x: number; y: number; size: number }) {
        const { x, y, size } = sq;
        const corners: [number, number][] = [
            [x, y], // TL (0)
            [x + size, y], // TR (1)
            [x + size, y + size], // BR (2)
            [x, y + size], // BL (3)
        ];
        const out: { centerIdx: number; center: [number, number]; start: [number, number]; end: [number, number] }[] = [];
        for (let cc = 0; cc < 4; cc++) {
            const a = corners[(cc + 1) % 4];
            const b = corners[(cc + 3) % 4];
            // two directions (a -> b) and (b -> a)
            out.push({ centerIdx: cc, center: corners[cc], start: a, end: b });
            out.push({ centerIdx: cc, center: corners[cc], start: b, end: a });
        }
        return out;
    }

    // find a continuous chain of arcs across all squares.
    // try each possible starting arc for the first square and greedily pick arcs that continue the chain.
    function findContinuousChain() {
        const firstOptions = possibleArcsForSquare(squares[0]);
        for (const first of firstOptions) {
            const chain = [first];
            let prevEnd = first.end;
            let ok = true;
            for (let i = 1; i < squares.length; i++) {
                const opts = possibleArcsForSquare(squares[i]);
                // find an option whose start matches prevEnd
                const match = opts.find((o) => pointsEqual(o.start, prevEnd));
                if (!match) {
                    ok = false;
                    break;
                }
                chain.push(match);
                prevEnd = match.end;
            }
            if (ok) return chain;
        }
        // fallback: return the first natural chain (shouldn't happen for classic tiling)
        return squares.map((sq) => possibleArcsForSquare(sq)[0]);
    }

    const chain = findContinuousChain();

    // for each arc in chain, pick sweepFlag by testing which arc-midpoint lies inside its square
    function midpointForSweep(
        center: [number, number],
        a1: number,
        a2: number,
        radius: number,
        sweep: 0 | 1
    ): [number, number] {
        let mid: number;
        if (sweep === 1) {
            let d = a2 - a1;
            while (d < 0) d += Math.PI * 2;
            mid = a1 + d / 2;
        } else {
            let d = a1 - a2;
            while (d < 0) d += Math.PI * 2;
            mid = a1 - d / 2;
        }
        return [center[0] + radius * Math.cos(mid), center[1] + radius * Math.sin(mid)];
    }

    let d = "";
    for (let i = 0; i < chain.length; i++) {
        const arc = chain[i];
        const sq = squares[i];
        const s = sq.size;
        const [cx, cy] = arc.center;
        const [sx, sy] = arc.start;
        const [ex, ey] = arc.end;

        const a1 = Math.atan2(sy - cy, sx - cx);
        const a2 = Math.atan2(ey - cy, ex - cx);

        const m1 = midpointForSweep(arc.center, a1, a2, s, 1);
        const m0 = midpointForSweep(arc.center, a1, a2, s, 0);

        const inside1 = pointInSquare(m1, sq);
        const inside0 = pointInSquare(m0, sq);

        // --- inside the arc loop ---
        let sweepFlag: 0 | 1;
        if (inside1 && !inside0) sweepFlag = 1;
        else if (inside0 && !inside1) sweepFlag = 0;
        else {
            let delta = a2 - a1;
            while (delta <= -Math.PI) delta += Math.PI * 2;
            while (delta > Math.PI) delta -= Math.PI * 2;
            sweepFlag = delta > 0 ? 1 : 0;
        }

        // --- manual correction for specific tiles ---
        // tiles are 1-indexed in your description
        if ([3, 4, 7].includes(i + 1)) {
            sweepFlag = sweepFlag === 1 ? 0 : 1;
        }

        if (i === 0) {
            d += `M ${sx} ${sy} `;
        }
        d += `A ${s} ${s} 0 0 ${sweepFlag} ${ex} ${ey} `;
    }

    return {
        squares,
        d: d.trim(),
        bbox: { minX, minY, maxX, maxY },
    };
}

// small helpers
function pointsEqual(a: [number, number], b: [number, number]) {
    return a[0] === b[0] && a[1] === b[1];
}
function pointInSquare(pt: [number, number], sq: { x: number; y: number; size: number }) {
    const [mx, my] = pt;
    return mx >= sq.x - 1e-6 && mx <= sq.x + sq.size + 1e-6 && my >= sq.y - 1e-6 && my <= sq.y + sq.size + 1e-6;
}
