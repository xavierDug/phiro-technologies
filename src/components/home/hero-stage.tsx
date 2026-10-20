"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";

import { BrowserFrame } from "@/components/ui/browser-frame";
import { useLiteMotion } from "@/components/motion/motion-provider";
import { cn } from "@/lib/utils";

interface Shot {
  src: string;
  alt: string;
  /** Position and size inside the 2:1 stage, desktop only. */
  place: string;
  /** Resting tilt, in degrees. */
  rotate: number;
  /** Parallax depth: how many px the frame drifts across the stage's scroll. */
  depth: number;
  /** Entrance delay for the CSS fade-up, in ms. */
  delay: number;
  priority?: boolean;
}

/** Back to front: the middle frame overlaps both neighbours. */
const SHOTS: Shot[] = [
  {
    src: "/CNMustang.png",
    alt: "Club de Natation Mustang website",
    place: "left-0 top-[15%] w-[44%] z-[1]",
    rotate: -3,
    depth: 60,
    delay: 640,
  },
  {
    src: "/TeamOT13.png",
    alt: "Team OT13 website",
    place: "right-0 top-[23%] w-[40%] z-[2]",
    rotate: 2.5,
    depth: 90,
    delay: 760,
  },
  {
    src: "/SoudureFLF.png",
    alt: "Soudure FLF website",
    place: "left-[27%] top-0 w-[47%] z-[3]",
    rotate: 0.6,
    depth: 30,
    delay: 520,
    priority: true,
  },
];

/** Phone layout, back to front: the hero shot (Soudure FLF) sits in front. */
const PHONE_DECK = [
  { shot: SHOTS[0], place: "-left-[2%] z-[1] w-[60%]", rotate: -5, delay: 640 },
  { shot: SHOTS[1], place: "-right-[2%] z-[2] w-[60%] mt-[7%]", rotate: 4, delay: 760 },
  { shot: SHOTS[2], place: "", rotate: 0, delay: 520 },
];

/**
 * Each transform lives on its own wrapper so they never fight: parallax drift
 * (motion value) outside, CSS entrance inside it, resting tilt inside that,
 * and the hover lift on the frame itself.
 */
function Frame({ shot, progress, still }: { shot: Shot; progress: MotionValue<number>; still: boolean }) {
  const y = useTransform(progress, [0, 1], [shot.depth / 2, -shot.depth / 2]);

  return (
    <m.div style={still ? undefined : { y }} className={cn("absolute", shot.place)}>
      <div className="fade-up" style={{ "--delay": `${shot.delay}ms` } as React.CSSProperties}>
        <div style={{ transform: `rotate(${shot.rotate}deg)` }}>
          <BrowserFrame className="transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-1.5">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1200}
              height={900}
              priority={shot.priority}
              sizes="(max-width: 1280px) 46vw, 600px"
              className="aspect-[4/3] w-full object-cover object-top"
            />
          </BrowserFrame>
        </div>
      </div>
    </m.div>
  );
}

/**
 * Three real client sites as overlapping, slightly tilted windows. The depth
 * comes from layering and shadow alone; on capable desktops each frame also
 * drifts at its own speed as the page scrolls. In the lite tier (touch,
 * reduced motion, modest hardware) the frames simply sit still.
 */
export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-10 sm:pb-32">
      {/* Desktop: the overlapping cluster. */}
      <div ref={ref} className="relative hidden aspect-[2/1] md:block">
        <div
          aria-hidden="true"
          className="absolute inset-x-[8%] bottom-[2%] h-[18%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(11_11_13/0.14),transparent)]"
        />
        {SHOTS.map((shot) => (
          <Frame key={shot.src} shot={shot} progress={scrollYProgress} still={lite} />
        ))}
      </div>

      {/* Phone: the same three sites as a fanned deck, each at the
          screenshots' native 16:9 so nothing is squeezed or cropped. The two
          back frames peek out above the front one instead of sitting side by
          side. */}
      <div className="relative pt-[33%] md:hidden">
        {PHONE_DECK.map(({ shot, place, rotate, delay }, i) => {
          const front = i === PHONE_DECK.length - 1;
          return (
            <div
              key={shot.src}
              className={cn(front ? "relative z-[3] mx-auto w-[90%]" : "absolute top-0", place)}
            >
              <div className="fade-up" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
                <div style={{ transform: `rotate(${rotate}deg)` }}>
                  <BrowserFrame>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={1200}
                      height={900}
                      priority={front}
                      sizes={front ? "90vw" : "60vw"}
                      className="aspect-[16/9] w-full object-cover object-left-top"
                    />
                  </BrowserFrame>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
