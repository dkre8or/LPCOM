import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LAUNCHPAD_MEDIA } from '../config/media';

interface AboutSectionProps {
  onOpenJoin: (source?: string) => void;
}

const COMMUNITY_OUTCOMES = [
  {
    number: '01',
    title: 'Real-world career outcomes',
    detail: 'Internships, scholarships, remote roles, and careers members are proud of.',
  },
  {
    number: '02',
    title: 'Readiness, not just listings',
    detail: 'Practical skills and structured preparation so members are ready when opportunity arrives.',
  },
  {
    number: '03',
    title: 'Peer accountability & mentorship',
    detail: 'Direct access to peers growing alongside you and people who have walked the path before.',
  },
];

export function AboutSection({ onOpenJoin }: AboutSectionProps) {
  const primaryPhoto = LAUNCHPAD_MEDIA.aboutPrimary;
  const secondaryPhoto = LAUNCHPAD_MEDIA.aboutSecondary;
  const hasSuppliedPhotos = Boolean(primaryPhoto || secondaryPhoto);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#FEFAF6] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-[13px] font-medium tracking-[0.06em] text-[#9E6506] mb-4">
              About the community
            </p>

            <h2
              id="about-heading"
              className="font-serif text-[clamp(1.85rem,3.4vw,2.85rem)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#5C3317] max-w-[20ch]"
            >
              A community built on action, not just aspiration.
            </h2>

            <div className="mt-7 space-y-5 max-w-[60ch] text-[16px] sm:text-[16.5px] font-light leading-[1.88] text-[#6B4C30]">
              <p>
                What started as one person&apos;s journey to unlock her own potential has grown into
                a movement spanning{' '}
                <strong className="font-semibold text-[#2A1A0A]">45+ countries</strong> — thousands
                of ambitious young people choosing to grow together. Through our community, members
                have landed internships, secured scholarships, discovered remote roles, and built
                careers they are proud of.
              </p>

              <p>
                We don&apos;t just share opportunities. We help members{' '}
                <strong className="font-semibold text-[#2A1A0A]">get ready for them</strong> — with
                practical skills, peer accountability, and access to people who have walked the path
                before them.
              </p>
            </div>

            <div className="mt-9">
              <button
                type="button"
                onClick={() => onOpenJoin('About Section')}
                className="group inline-flex cursor-pointer items-center gap-2.5 border-b-[1.5px] border-[#5C3317] pb-1.5 text-[14.5px] font-semibold text-[#5C3317] transition-all duration-200 hover:gap-3.5 hover:border-[#8B5A2B] hover:text-[#8B5A2B]"
              >
                Join for free.
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.div>

          {/* Right Visual Column — Supplied Dual Photos OR Editorial Community Ledger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {hasSuppliedPhotos ? (
              <div className="relative h-[380px] sm:h-[460px]">
                {primaryPhoto && (
                  <div className="absolute inset-y-0 left-0 right-[16%] bottom-[14%] overflow-hidden rounded-[14px] border border-[#E8D8C6] bg-[#F4E8DA]">
                    <img
                      src={primaryPhoto.src}
                      alt={primaryPhoto.alt}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: primaryPhoto.objectPosition ?? 'center' }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                {secondaryPhoto && (
                  <div className="absolute bottom-0 right-0 h-[48%] w-[54%] overflow-hidden rounded-[14px] border-4 border-[#FEFAF6] bg-[#F4E8DA]">
                    <img
                      src={secondaryPhoto.src}
                      alt={secondaryPhoto.alt}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: secondaryPhoto.objectPosition ?? 'center' }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[14px] border border-[#E8D8C6] bg-[#F4E8DA]/70 p-7 sm:p-9">
                <div className="flex items-baseline justify-between border-b border-[#E8D8C6] pb-5">
                  <span className="font-serif text-[36px] sm:text-[42px] font-semibold leading-none text-[#5C3317] tabular-nums">
                    45+
                  </span>
                  <span className="text-[13px] font-medium text-[#6B4C30]">
                    Countries represented
                  </span>
                </div>

                <div className="mt-2 divide-y divide-[#E8D8C6]">
                  {COMMUNITY_OUTCOMES.map((item) => (
                    <div key={item.number} className="py-5 first:pt-5 last:pb-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-[13px] font-semibold text-[#9E6506] tabular-nums">
                          {item.number}.
                        </span>
                        <h3 className="font-serif text-[18px] font-semibold text-[#5C3317]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 pl-7 text-[14px] font-light leading-[1.72] text-[#6B4C30]">
                        {item.detail}
                      </p>
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
