import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { EXTERNAL_LINKS } from '../config/siteData';

interface MembershipSectionProps {
  onOpenJoin: (source?: string) => void;
}

export function MembershipSection({ onOpenJoin }: MembershipSectionProps) {
  const [showInlineForm, setShowInlineForm] = useState(false);

  return (
    <section
      id="membership"
      aria-labelledby="membership-heading"
      className="bg-[#F4E8DA] border-b border-[#E8D8C6] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[14px] border border-[#D8C5B0] bg-[#FEFAF6] p-7 sm:p-10 lg:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-[13px] font-medium tracking-[0.06em] text-[#9E6506] mb-3.5">
                Membership Registration
              </p>
              <h2
                id="membership-heading"
                className="font-serif text-[clamp(1.85rem,3.3vw,2.75rem)] font-semibold leading-[1.16] tracking-[-0.015em] text-[#5C3317]"
              >
                Join the Launchpad Community.
              </h2>
              <p className="mt-4 max-w-[52ch] text-[15.5px] sm:text-[16.5px] font-light leading-[1.8] text-[#6B4C30]">
                Membership is free — always. Complete the form below to register.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center justify-end gap-3.5">
              <button
                type="button"
                onClick={() => onOpenJoin('Membership Section')}
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#5C3317] px-7 py-3.5 text-[14px] font-semibold text-[#FEFAF6] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8B5A2B] whitespace-nowrap shrink-0"
              >
                Open Registration Form
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={EXTERNAL_LINKS.registrationDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#CBB59D] bg-transparent px-6 py-3.5 text-[13.5px] font-medium text-[#5C3317] transition-colors duration-200 hover:border-[#5C3317] hover:bg-[#F4E8DA]/60 whitespace-nowrap shrink-0"
              >
                Open in Google Forms
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Optional inline toggle for visitors who prefer completing the preserved Google Form inline */}
          <div className="mt-8 border-t border-[#E8D8C6] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setShowInlineForm((prev) => !prev)}
                aria-expanded={showInlineForm}
                className="cursor-pointer text-[13.5px] font-medium text-[#5C3317] underline decoration-[#CBB59D] underline-offset-4 transition-colors hover:decoration-[#5C3317]"
              >
                {showInlineForm
                  ? 'Hide embedded registration form'
                  : 'Or load the official registration form directly on this page'}
              </button>

              <a
                href={EXTERNAL_LINKS.registrationDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-[#7A5B3E] hover:text-[#5C3317]"
              >
                Trouble loading? Direct registration link &rarr;
              </a>
            </div>

            {showInlineForm && (
              <div className="mt-6 overflow-hidden rounded-[12px] border border-[#E8D8C6] bg-white">
                <iframe
                  src={EXTERNAL_LINKS.registrationEmbedUrl}
                  title="Launchpad Community Member Registration Form"
                  loading="lazy"
                  className="h-[680px] w-full border-0"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
