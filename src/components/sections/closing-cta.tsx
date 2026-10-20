import { ButtonLink } from "@/components/ui/button-link";
import { Headline } from "@/components/ui/headline";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { contactDetails } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/seo";

/**
 * The dark band that opens the footer on every page except Contact. Kept as a
 * separate section (rather than inside Footer) so a page can leave it out.
 */
export function ClosingCta({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.cta;

  return (
    <section aria-labelledby="closing-cta" className="bg-ink text-on-ink">
      <Reveal className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-10 px-5 pt-28 pb-24 sm:px-10 sm:pt-32">
        <h2 id="closing-cta" className="max-w-[11ch] text-[clamp(3rem,6.4vw,6rem)]">
          <Headline title={copy.title} accent={copy.accent} punctuation="?" onInk />
        </h2>
        <div className="max-w-md">
          <p className="mb-8 text-lg leading-relaxed text-on-ink-muted">{copy.description}</p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <ButtonLink href={localePath("/contact", locale)} icon="up-right">
                {dict.common.startProject}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={`mailto:${contactDetails.email}`} variant="outline-on-ink">
              {copy.emailUs}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
