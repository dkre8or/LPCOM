import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LAUNCHPAD_MEDIA } from '../config/media';
import { STANDALONE_SUB_BRANDS } from '../config/siteData';

interface SubBrandsSectionProps {
  onOpenJoin: (source?: string) => void;
}

function SubBrandArchitecturalPlate({ id }: { id: 'podcast' | 'summit' }) {
  if (id === 'podcast') {
    const barHeights = [22, 42, 30, 58, 74, 48, 86, 62, 44, 78, 52, 36, 64, 40, 26];
    return (
      <div
        aria-hidden="true"
        className="mt-8 flex h-[176px] w-full flex-col justify-between overflow-hidden rounded-[12px] border border-[#FEFAF6]/14 bg-[#472610] p-6 sm:p-7"
      >
        <div className="flex items-center justify-between text-[11.5px] font-medium text-[#F4E8DA]/75">
          <span>Accountability Podcast</span>
          <span className="font-serif italic text-[#D9A03C]">Raw, consistent, and real.</span>
        </div>
        <div className="flex h-[74px] items-end justify-between gap-2 sm:gap-3 pt-2">
          {barHeights.map((height, i) => (
            <span
              key={i}
              style={{ height: `${height}%` }}
              className={`flex-1 rounded-t-[2px] ${
                i === 6 || i === 9 ? 'bg-[#D9A03C]' : 'bg-[#FEFAF6]/25'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="mt-8 flex h-[176px] w-full flex-col justify-between overflow-hidden rounded-[12px] border border-[#FEFAF6]/14 bg-[#472610] p-6 sm:p-7"
    >
      <div className="flex items-center justify-between text-[11.5px] font-medium text-[#F4E8DA]/75">
        <span>Launchpad Summit</span>
        <span className="font-serif italic text-[#D9A03C]">Annual Gathering</span>
      </div>
      <div className="grid grid-cols-3 gap-4 border-t border-[#FEFAF6]/14 pt-5">
        <div>
          <span className="block font-serif text-[17px] text-[#FEFAF6]">Conversations</span>
          <span className="mt-1 block text-[11.5px] font-light text-[#F4E8DA]/70">
            Ambitious young people
          </span>
        </div>
        <div className="border-l border-[#FEFAF6]/12 pl-4">
          <span className="block font-serif text-[17px] text-[#FEFAF6]">Connections</span>
          <span className="mt-1 block text-[11.5px] font-light text-[#F4E8DA]/70">
            Industry leaders
          </span>
        </div>
        <div className="border-l border-[#FEFAF6]/12 pl-4">
          <span className="block font-serif text-[17px] text-[#FEFAF6]">Clarity</span>
          <span className="mt-1 block text-[11.5px] font-light text-[#F4E8DA]/70">
            Partner organisations
          </span>
        </div>
      </div>
    </div>
  );
}

export function SubBrandsSection({ onOpenJoin }: SubBrandsSectionProps) {
  return (
    <section
      id="sub-brands"
      aria-labelledby="sub-brands-heading"
      className="bg-[#5C3317] text-[#FEFAF6] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-14 sm:mb-16">
          <div className="lg:col-span-6">
            <p className="text-[13px] font-medium tracking-[0.06em] text-[#D9A03C] mb-3.5">
              Standalone sub-brands.
            </p>
            <h2
              id="sub-brands-heading"
              className="font-serif text-[clamp(1.9rem,3.6vw,2.95rem)] font-semibold leading-[1.15] tracking-[-0.015em] text-[#FEFAF6]"
            >
              Two brands. Built to go further.
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="max-w-[56ch] text-[15.5px] sm:text-[16px] font-light leading-[1.82] text-[#F4E8DA]/82">
              Some ideas outgrow their container. These two programs carry their own identity, their
              own audience, and their own ambition — while remaining rooted in the Launchpad
              mission.
            </p>
          </div>
        </div>

        {/* Sub-brand Editorial Spreads */}
        <div className="divide-y divide-[#FEFAF6]/16 border-t border-b border-[#FEFAF6]/16">
          {STANDALONE_SUB_BRANDS.map((subBrand, idx) => {
            const suppliedMedia =
              subBrand.id === 'podcast'
                ? LAUNCHPAD_MEDIA.accountabilityPodcast
                : LAUNCHPAD_MEDIA.launchpadSummit;

            return (
              <motion.article
                key={subBrand.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 sm:py-16 items-start"
              >
                {/* Left Brand Identity Column */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2.5 text-[12.5px] font-medium text-[#D9A03C]">
                    <span className="font-serif tabular-nums">{subBrand.index}</span>
                    <span aria-hidden="true" className="text-[#FEFAF6]/30">
                      ·
                    </span>
                    <span>{subBrand.category}</span>
                  </div>

                  <h3 className="mt-4 font-serif text-[clamp(1.85rem,3vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.015em] text-[#FEFAF6]">
                    {subBrand.name}
                  </h3>

                  <p className="mt-4 inline-block border-t border-[#FEFAF6]/22 pt-2.5 text-[12.5px] font-medium tracking-[0.04em] text-[#F4E8DA]/78">
                    {subBrand.label}
                  </p>
                </div>

                {/* Right Editorial Narrative + Media Column */}
                <div className="lg:col-span-7">
                  <p className="max-w-[58ch] text-[15.5px] sm:text-[16.5px] font-light leading-[1.88] text-[#F4E8DA]/88">
                    {subBrand.description}
                  </p>

                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={() => onOpenJoin(subBrand.name)}
                      className="group inline-flex cursor-pointer items-center gap-2.5 border-b border-[#D9A03C]/70 pb-1.5 text-[14px] font-semibold text-[#FEFAF6] transition-all duration-200 hover:gap-3.5 hover:border-[#FEFAF6]"
                    >
                      {subBrand.ctaLabel}
                      <ArrowRight
                        className="h-4 w-4 text-[#D9A03C] transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {suppliedMedia ? (
                    <div className="relative mt-8 aspect-[16/9] max-h-[300px] w-full overflow-hidden rounded-[12px] border border-[#FEFAF6]/14 bg-[#3E210E]">
                      <img
                        src={suppliedMedia.src}
                        alt={suppliedMedia.alt}
                        referrerPolicy="no-referrer"
                        style={{ objectPosition: suppliedMedia.objectPosition ?? 'center' }}
                        className="h-full w-full object-cover"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0D06]/55 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <SubBrandArchitecturalPlate id={subBrand.id} />
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
