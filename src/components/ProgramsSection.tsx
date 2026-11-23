import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CORE_PROGRAMS } from '../config/siteData';

interface ProgramsSectionProps {
  onOpenJoin: (source?: string) => void;
}

export function ProgramsSection({ onOpenJoin }: ProgramsSectionProps) {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="bg-[#F4E8DA] border-y border-[#E8D8C6] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-14 sm:mb-16">
          <div className="lg:col-span-6">
            <p className="text-[13px] font-medium tracking-[0.06em] text-[#9E6506] mb-3.5">
              What we run.
            </p>
            <h2
              id="programs-heading"
              className="font-serif text-[clamp(1.9rem,3.6vw,2.95rem)] font-semibold leading-[1.15] tracking-[-0.015em] text-[#5C3317]"
            >
              Six programs. One community.
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="max-w-[56ch] text-[15.5px] sm:text-[16px] font-light leading-[1.82] text-[#6B4C30]">
              Everything we build at Launchpad is designed to move members forward — from weekly
              gatherings to annual conferences, from curated newsletters to community meetups.
            </p>
          </div>
        </div>

        {/* Core Programs Editorial Label */}
        <div className="mb-4 flex items-center justify-between text-[12.5px] font-medium text-[#7A5B3E]">
          <span>Core Community Programs (01–04)</span>
          <a
            href="#sub-brands"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#5C3317] transition-colors hover:text-[#8B5A2B]"
          >
            Plus 2 standalone sub-brands below
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* 2x2 Architectural Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b border-[#D8C5B0]">
          {CORE_PROGRAMS.map((program, idx) => {
            const isRightCol = idx % 2 === 1;
            const isSecondRow = idx >= 2;

            return (
              <motion.article
                key={program.id}
                id={program.anchorId}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: (idx % 2) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col justify-between py-10 sm:py-12 transition-colors duration-200 hover:bg-[#FEFAF6]/65 ${
                  isRightCol
                    ? 'md:pl-10 lg:pl-14 md:pr-2'
                    : 'md:pr-10 lg:pr-14 md:border-r md:border-[#D8C5B0]'
                } ${
                  isSecondRow ? 'border-t border-[#D8C5B0]' : idx === 1 ? 'border-t border-[#D8C5B0] md:border-t-0' : ''
                } px-1 sm:px-3`}
              >
                {/* Top Accent Reveal Line */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-[2px] w-0 bg-[#B8780A] transition-all duration-300 ease-out group-hover:w-full"
                />

                <div>
                  <div className="flex items-center gap-2.5 text-[12.5px] font-medium text-[#9E6506]">
                    <span className="font-serif tabular-nums">{program.index}</span>
                    <span aria-hidden="true" className="text-[#C8B29A]">
                      ·
                    </span>
                    <span>{program.category}</span>
                  </div>

                  <h3 className="mt-4 font-serif text-[23px] sm:text-[26px] font-semibold leading-[1.22] text-[#5C3317]">
                    {program.name}
                    {program.hasTrademark && (
                      <sup className="ml-0.5 font-sans text-[12px] font-medium text-[#8B5A2B]">
                        ™
                      </sup>
                    )}
                  </h3>

                  <p className="mt-4 max-w-[46ch] text-[15px] font-light leading-[1.84] text-[#6B4C30]">
                    {program.description}
                  </p>
                </div>

                <div className="mt-8 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenJoin(program.name)}
                    className="group/btn inline-flex cursor-pointer items-center gap-2 border-b border-[#CBB59D] pb-1 text-[13.5px] font-semibold text-[#5C3317] transition-all duration-200 hover:gap-3 hover:border-[#5C3317] hover:text-[#8B5A2B]"
                  >
                    {program.ctaLabel}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
