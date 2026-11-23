import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LAUNCHPAD_MEDIA } from '../config/media';
import { BRAND, HERO_STATS } from '../config/siteData';
import { BrandMark } from './BrandMark';

interface HeroProps {
  onOpenJoin: (source?: string) => void;
}

function StatCounter({ target, suffix, display }: { target: number; suffix: string; display: string }) {
  const [text, setText] = useState(display);
  const hasAnimated = useRef(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = elRef.current;
    if (!node || hasAnimated.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * eased);
          setText(`${current.toLocaleString('en-US')}${suffix}`);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setText(display);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, suffix, display]);

  return (
    <div ref={elRef} className="font-serif text-[28px] sm:text-[32px] font-semibold leading-none tracking-tight text-[#FEFAF6] tabular-nums">
      {text}
    </div>
  );
}

export function Hero({ onOpenJoin }: HeroProps) {
  const heroImage = LAUNCHPAD_MEDIA.hero;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative pt-[72px] bg-[#FEFAF6] border-b border-[#E8D8C6]"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch gap-10 lg:gap-12 py-12 sm:py-16 lg:py-20">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center lg:pr-6"
          >
            <p className="text-[13px] font-medium tracking-[0.06em] text-[#9E6506] mb-5">
              {BRAND.name}
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-[clamp(2.25rem,4.3vw,3.85rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#5C3317] max-w-[16ch] sm:max-w-[18ch]"
            >
              Helping young people turn potential into{' '}
              <em className="font-normal italic text-[#8B5A2B]">real-world success.</em>
            </h1>

            <p className="mt-7 max-w-[54ch] text-[15.5px] sm:text-[16.5px] font-light leading-[1.82] text-[#6B4C30]">
              The Launchpad Community is a{' '}
              <strong className="font-semibold text-[#2A1A0A]">free, members-based platform</strong>{' '}
              that equips students, graduates, and young professionals with the mindset, skills, and
              opportunities to thrive. We bridge the gap between learning and the future of work —
              for ambitious young people from{' '}
              <strong className="font-semibold text-[#2A1A0A]">all backgrounds.</strong>
            </p>

            <p className="mt-5 font-serif text-[15.5px] italic font-medium text-[#9E6506]">
              Membership is free — always.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5 sm:gap-7">
              <button
                type="button"
                onClick={() => onOpenJoin('Hero Primary CTA')}
                className="cursor-pointer rounded-full bg-[#5C3317] px-8 py-4 text-[14px] font-semibold text-[#FEFAF6] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8B5A2B] whitespace-nowrap shrink-0"
              >
                Become a Member
              </button>

              <a
                href="#programs"
                className="group inline-flex items-center gap-2 border-b border-[#D4BFA8] pb-1 text-[14px] font-medium text-[#6B4C30] transition-colors duration-200 hover:border-[#5C3317] hover:text-[#5C3317] whitespace-nowrap shrink-0"
              >
                Explore programs
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.div>

          {/* Right Showcase Column — Approved Hero Photograph OR Architectural Editorial Frame */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            {heroImage ? (
              <div className="relative flex w-full min-h-[420px] lg:min-h-[540px] flex-col justify-end overflow-hidden rounded-[14px] border border-[#E8D8C6] bg-[#2A1A0A]">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  referrerPolicy="no-referrer"
                  style={{ objectPosition: heroImage.objectPosition ?? 'center' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1A0D06]/85 via-[#1A0D06]/35 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10 px-6 pb-6 pt-16 sm:px-8">
                  <p className="font-serif text-[16px] italic leading-relaxed text-[#FEFAF6]/90">
                    Growing together — members, mentors and momentum.
                  </p>
                </div>
                <div className="relative z-10 grid grid-cols-3 border-t border-[#FEFAF6]/15 bg-[#1A0D06]/75 backdrop-blur-md">
                  {HERO_STATS.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className={`px-4 py-5 text-center ${
                        idx < HERO_STATS.length - 1 ? 'border-r border-[#FEFAF6]/12' : ''
                      }`}
                    >
                      <StatCounter target={stat.value} suffix={stat.suffix} display={stat.display} />
                      <div className="mt-2 text-[11.5px] font-normal tracking-[0.03em] text-[#F4E8DA]/80">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-[14px] bg-[#5C3317] text-[#FEFAF6]">
                {/* Architectural Hairline Framing */}
                <div className="flex items-center justify-between border-b border-[#FEFAF6]/14 px-7 py-6 sm:px-9">
                  <div className="flex items-center gap-3">
                    <BrandMark variant="inverted" size="sm" />
                    <span className="text-[12.5px] font-medium tracking-[0.04em] text-[#F4E8DA]">
                      {BRAND.tagline}
                    </span>
                  </div>
                  <span className="font-serif text-[13px] italic text-[#D9A03C]">
                    Est. Worldwide
                  </span>
                </div>

                {/* Central Editorial Statement & Core Pillars (derived strictly from Hero copy) */}
                <div className="flex flex-1 flex-col justify-between px-7 py-9 sm:px-9 sm:py-11">
                  <div>
                    <p className="font-serif text-[24px] sm:text-[28px] font-normal italic leading-[1.35] text-[#FEFAF6]">
                      “Growing together — members, mentors and momentum.”
                    </p>
                  </div>

                  <dl className="mt-10 divide-y divide-[#FEFAF6]/12 border-t border-[#FEFAF6]/12">
                    <div className="flex items-baseline justify-between gap-4 py-3.5">
                      <dt className="text-[12.5px] font-medium text-[#D9A03C]">Mindset</dt>
                      <dd className="text-right text-[13px] font-light text-[#FEFAF6]/85">
                        Students, graduates &amp; young professionals
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3.5">
                      <dt className="text-[12.5px] font-medium text-[#D9A03C]">Skills</dt>
                      <dd className="text-right text-[13px] font-light text-[#FEFAF6]/85">
                        Bridging learning &amp; the future of work
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3.5">
                      <dt className="text-[12.5px] font-medium text-[#D9A03C]">Opportunities</dt>
                      <dd className="text-right text-[13px] font-light text-[#FEFAF6]/85">
                        Free membership for all backgrounds
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Integrated Community Statistics Strip */}
                <div className="grid grid-cols-3 border-t border-[#FEFAF6]/14 bg-[#3E210E]">
                  {HERO_STATS.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className={`px-3 py-6 sm:px-5 text-center ${
                        idx < HERO_STATS.length - 1 ? 'border-r border-[#FEFAF6]/12' : ''
                      }`}
                    >
                      <StatCounter target={stat.value} suffix={stat.suffix} display={stat.display} />
                      <div className="mt-2 text-[11.5px] font-normal tracking-[0.03em] text-[#F4E8DA]/80">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
