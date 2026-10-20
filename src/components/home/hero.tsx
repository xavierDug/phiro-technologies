import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroStage } from "@/components/home/hero-stage";
import { getDictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/seo";

/**
 * Server component. Every entrance here is a CSS animation (globals.css), so
 * the headline and the screenshots are painted with the first HTML — nothing
 * above the fold waits for JavaScript. The only client code is the stage's
 * optional scroll parallax and the CTA's magnetic hover.
 */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.hero;
  const words = copy.titleLead.split(" ");

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-14 sm:px-10 sm:pt-28 sm:pb-20">
        <p className="fade-up mb-9 flex items-center gap-3" style={{ "--delay": "0ms" } as React.CSSProperties}>
          <span aria-hidden="true" className="size-2 rounded-full bg-gold shadow-[0_0_0_4px_rgb(245_200_67/0.25)]" />
          <span className="eyebrow">{copy.badge}</span>
        </p>

        <h1 className="max-w-[13ch] text-[clamp(3.25rem,8.4vw,7.75rem)] leading-[0.98] tracking-[-0.045em]">
          {words.map((word, i) => (
            <span key={i}>
              <span className="word-mask">
                <span className="word-rise" style={{ "--i": i } as React.CSSProperties}>
                  {word}
                </span>
              </span>{" "}
            </span>
          ))}
          <span className="word-mask">
            <span className="word-rise" style={{ "--i": words.length } as React.CSSProperties}>
              <span className="accent">{copy.titleAccent}</span>.
            </span>
          </span>
        </h1>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-10">
          <p
            className="fade-up max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl"
            style={{ "--delay": "420ms" } as React.CSSProperties}
          >
            {copy.lead}
          </p>
          <div className="fade-up flex flex-wrap gap-3" style={{ "--delay": "520ms" } as React.CSSProperties}>
            <Magnetic>
              <ButtonLink href={localePath("/contact", locale)} icon="up-right">
                {dict.common.startProject}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={localePath("/projects", locale)} variant="outline">
              {dict.common.seeWork}
            </ButtonLink>
          </div>
        </div>
      </div>

      <HeroStage />
    </section>
  );
}
