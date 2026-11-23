import { motion } from 'motion/react';
import { LAUNCHPAD_MEDIA } from '../config/media';
import { TESTIMONIAL } from '../config/siteData';

export function TestimonialSection() {
  const meetupPhoto = LAUNCHPAD_MEDIA.lagosMeetup;

  return (
    <section
      aria-label="Member testimonial"
      className="bg-[#FEFAF6] border-b border-[#E8D8C6]"
    >
      {/* Editorial Pull Quote */}
      <div className="mx-auto max-w-[980px] px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            aria-hidden="true"
            className="block font-serif text-[52px] leading-none text-[#B8780A]/60 select-none mb-2"
          >
            &ldquo;
          </span>

          <blockquote className="font-serif text-[clamp(1.5rem,3.1vw,2.45rem)] font-normal italic leading-[1.42] tracking-[-0.01em] text-[#5C3317]">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-col items-center">
            <span className="h-px w-12 bg-[#D8C5B0] mb-5" aria-hidden="true" />
            <p className="text-[14.5px] text-[#6B4C30]">
              <strong className="font-semibold text-[#2A1A0A]">{TESTIMONIAL.author}</strong>,{' '}
              {TESTIMONIAL.roleAndLocation}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Community Moment Showcase — Renders supplied Lagos meetup photograph cleanly once provided */}
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 pb-20 sm:pb-24">
        {meetupPhoto ? (
          <figure className="relative overflow-hidden rounded-[14px] border border-[#E8D8C6] bg-[#2A1A0A]">
            <div className="aspect-[16/9] max-h-[540px] w-full overflow-hidden">
              <img
                src={meetupPhoto.src}
                alt={meetupPhoto.alt}
                referrerPolicy="no-referrer"
                style={{ objectPosition: meetupPhoto.objectPosition ?? 'center 35%' }}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0D06]/75 via-[#1A0D06]/10 to-transparent"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 px-6 py-5 sm:px-8 sm:py-6 font-serif text-[14px] sm:text-[15px] italic text-[#FEFAF6]/90">
              {TESTIMONIAL.imageCaption}
            </figcaption>
          </figure>
        ) : (
          <figure className="rounded-[14px] border border-[#E8D8C6] bg-[#F4E8DA]/65 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium tracking-[0.06em] text-[#9E6506]">
                  Community Gathering
                </p>
                <figcaption className="mt-1.5 font-serif text-[19px] sm:text-[22px] italic text-[#5C3317]">
                  {TESTIMONIAL.imageCaption}
                </figcaption>
              </div>
              <div className="text-[13px] font-light text-[#6B4C30] sm:text-right">
                Lagos, Nigeria · In-person meetup
              </div>
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
