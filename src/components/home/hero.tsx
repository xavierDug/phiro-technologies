import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { WorkStrip } from "@/components/home/work-strip";
import { getDictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/seo";

/**
 * Server component. Every entrance here is a CSS animation (globals.css), so
 * the headline and the screenshots are painted with the first HTML — nothing
 * above the fold waits for JavaScript. The work strip below is CSS 3D too;
 * the only client code is the CTA's magnetic hover.
 */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.hero;
  const words = copy.titleLead.split(" ");

  return (
    <section className="overflow-hidden pb-6 sm:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 pt-14 text-center sm:px-10 sm:pt-[clamp(3.5rem,7vw,6.5rem)]">
        <p className="fade-up mb-8 flex items-center gap-3" style={{ "--delay": "0ms" } as React.CSSProperties}>
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-gold shadow-[0_0_0_4px_rgb(245_200_67/0.25)]" />
          <span className="eyebrow">{copy.badge}</span>
        </p>

        <h1 className="max-w-[12ch] text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.045em]">
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

        <p
          className="fade-up mt-8 max-w-[35rem] text-lg leading-relaxed text-muted sm:text-xl"
          style={{ "--delay": "420ms" } as React.CSSProperties}
        >
          {copy.lead}
        </p>
        <div
          className="fade-up mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center"
          style={{ "--delay": "520ms" } as React.CSSProperties}
        >
          <Magnetic>
            <ButtonLink href={localePath("/contact", locale)} icon="up-right" className="w-full sm:w-auto">
              {dict.common.startProject}
            </ButtonLink>
          </Magnetic>
          <ButtonLink href={localePath("/projects", locale)} variant="outline">
            {dict.common.seeWork}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-[clamp(2.5rem,5vw,4.5rem)]">
        <WorkStrip locale={locale} />
      </div>
    </section>
  );
}
