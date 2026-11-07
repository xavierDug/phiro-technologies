import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { OFFER_ANCHORS } from "@/content/navigation";
import { fillPrices, getOffer } from "@/content/offer";
import type { Locale } from "@/lib/seo";

/** "From **$790**" -> plain and bold runs. */
function GlanceItem({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/).map((part, i) =>
        i % 2 === 1 ? (
          <b key={i} className="font-medium text-ink">
            {part}
          </b>
        ) : (
          part
        )
      )}
    </>
  );
}

/**
 * Centered statement over one real Phiro site shown twice: a desktop browser
 * frame with a phone in front, both sinking into the panel band that the
 * packages section continues. Server component; every entrance is CSS so the
 * headline and screenshot paint without waiting for hydration.
 */
export function OfferHero({ locale }: { locale: Locale }) {
  const copy = getOffer(locale).hero;
  const anchors = OFFER_ANCHORS[locale];
  const words = copy.title.split(" ");

  return (
    <section aria-labelledby="offer-title" className="relative overflow-hidden pt-14 sm:pt-[clamp(3.5rem,7vw,6.5rem)]">
      {/* Panel band behind the lower half of the devices; #packages continues it. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[clamp(10rem,22vw,20rem)] bg-panel" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-10">
        <p className="fade-up eyebrow mb-7" style={{ "--delay": "0ms" } as React.CSSProperties}>
          {copy.eyebrow}
        </p>

        <h1
          id="offer-title"
          className="max-w-[15ch] text-[clamp(2.75rem,6.6vw,6rem)] leading-[0.98] tracking-[-0.045em]"
        >
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
              <span className="accent">{copy.accent}</span>.
            </span>
          </span>
        </h1>

        <p
          className="fade-up mt-7 max-w-[32.5rem] text-lg leading-relaxed text-muted"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          {copy.lead}
        </p>

        <div
          className="fade-up mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          <Magnetic>
            <ButtonLink href={`#${anchors.book}`} icon="down" className="w-full sm:w-auto">
              {copy.book}
            </ButtonLink>
          </Magnetic>
          <ButtonLink href={`#${anchors.packages}`} variant="outline">
            {copy.see}
          </ButtonLink>
        </div>

        <ul
          aria-label={copy.glanceLabel}
          className="fade-up mt-10 flex flex-wrap justify-center gap-y-2.5 font-mono text-xs tracking-[0.12em] text-muted uppercase"
          style={{ "--delay": "400ms" } as React.CSSProperties}
        >
          {copy.glance.map((item, i) => (
            <li
              key={item}
              className={
                "border-line-strong px-3 sm:px-4.5 " +
                (i === 0 ? "" : "border-l ") +
                (i === 2 ? "max-sm:border-l-0" : "")
              }
            >
              <GlanceItem text={fillPrices(item, locale)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-[clamp(3rem,6vw,5rem)] max-w-7xl px-5 sm:px-10">
        <div
          className="fade-up relative mx-auto h-[clamp(17rem,42vw,36rem)] max-w-[70rem] overflow-hidden"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        >
          <figure className="browser-frame m-0 rounded-[14px]">
            <div
              aria-hidden="true"
              className="flex h-7 items-center gap-1.5 border-b border-line bg-card px-2.5 sm:h-10 sm:px-3.5"
            >
              <span className="size-1.5 rounded-full bg-panel sm:size-2.5" />
              <span className="size-1.5 rounded-full bg-panel sm:size-2.5" />
              <span className="size-1.5 rounded-full bg-panel sm:size-2.5" />
              <span className="mx-auto hidden h-6 -translate-x-6 items-center rounded-full bg-paper px-3 font-mono text-[0.6875rem] tracking-[0.06em] text-muted sm:inline-flex">
                {copy.clientLabel}
              </span>
            </div>
            <Image
              src="/offer-hero-desktop.webp"
              alt={copy.desktopAlt}
              width={2000}
              height={1035}
              priority
              sizes="(max-width: 1280px) 92vw, 1120px"
              className="block h-auto w-full"
            />
          </figure>

          {/* Phone in front: a real narrow-viewport capture of the same site. */}
          <div className="absolute top-[22%] right-[2%] z-[2] aspect-[9/19.5] w-[34%] rounded-3xl bg-ink p-[5px] shadow-[0_48px_80px_-24px_rgb(11_11_13/0.45),inset_0_0_0_1px_rgb(255_255_255/0.12)] md:top-[15%] md:right-[5%] md:w-[22%] md:rounded-[46px] md:p-[9px]">
            <div className="relative size-full overflow-hidden rounded-[19px] bg-[#1b1b1d] md:rounded-[37px]">
              {/* Anchored to the bottom and 3% tall: pushes the capture's clipped top edge out of view. */}
              <Image
                src="/offer-hero-phone.png"
                alt={copy.phoneAlt}
                width={321}
                height={714}
                sizes="(max-width: 768px) 34vw, 260px"
                className="absolute inset-x-0 bottom-0 h-[103%] w-full object-cover object-bottom"
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-0.5 -bottom-0.5 z-[3] h-[42%] bg-[linear-gradient(to_bottom,rgb(236_232_222/0),rgb(236_232_222/0.85)_55%,var(--panel)_80%)]"
          />
        </div>
      </div>
    </section>
  );
}
