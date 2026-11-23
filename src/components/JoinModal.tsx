import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Loader2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EXTERNAL_LINKS } from '../config/siteData';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [frameState, setFrameState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setFrameState('loading');

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-modal-heading"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A0D06]/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-[min(88vh,820px)] w-full max-w-[780px] flex-col overflow-hidden rounded-[16px] border border-[#FEFAF6]/15 bg-[#FEFAF6] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 bg-[#5C3317] px-5 py-4 sm:px-7 sm:py-5 text-[#FEFAF6]">
              <div>
                <h2
                  id="join-modal-heading"
                  className="font-serif text-[20px] sm:text-[23px] font-semibold leading-snug text-[#FEFAF6]"
                >
                  Join the Launchpad Community.
                </h2>
                <p className="mt-1 text-[13px] font-light text-[#F4E8DA]/85">
                  Membership is free — always. Complete the form below to register.
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close registration modal"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#FEFAF6]/25 text-[#FEFAF6] transition-colors hover:bg-[#FEFAF6]/12"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Embedded Google Form Container */}
            <div className="relative flex-1 bg-white">
              {frameState === 'loading' && (
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FEFAF6] px-6 text-center">
                  <Loader2
                    className="h-6 w-6 animate-spin text-[#5C3317]"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-[14px] text-[#6B4C30]">
                    Loading the official Launchpad registration form…
                  </p>
                </div>
              )}

              {frameState === 'error' ? (
                <div className="flex h-full flex-col items-center justify-center bg-[#FEFAF6] px-6 text-center">
                  <p className="max-w-[42ch] text-[15px] leading-relaxed text-[#6B4C30]">
                    The registration form could not load inside this window. You can complete your
                    free registration directly on Google Forms.
                  </p>
                  <a
                    href={EXTERNAL_LINKS.registrationDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5C3317] px-7 py-3.5 text-[14px] font-semibold text-[#FEFAF6] transition-colors hover:bg-[#8B5A2B]"
                  >
                    Open registration form
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <iframe
                  src={EXTERNAL_LINKS.registrationEmbedUrl}
                  title="Launchpad Community Member Registration Form"
                  onLoad={() => setFrameState('loaded')}
                  onError={() => setFrameState('error')}
                  className="h-full w-full border-0 bg-white"
                />
              )}
            </div>

            {/* Always-accessible Direct Link Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E8D8C6] bg-[#F4E8DA] px-5 py-3.5 sm:px-7">
              <p className="text-[12.5px] text-[#6B4C30]">
                Having trouble with the embedded form?
              </p>
              <a
                href={EXTERNAL_LINKS.registrationDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5C3317] underline decoration-[#CBB59D] underline-offset-4 transition-colors hover:decoration-[#5C3317]"
              >
                Open registration form in a new tab
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
