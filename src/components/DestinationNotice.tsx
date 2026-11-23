import { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EXTERNAL_LINKS } from '../config/siteData';

export interface NoticeData {
  label: string;
  message: string;
}

interface DestinationNoticeProps {
  notice: NoticeData | null;
  onDismiss: () => void;
  onOpenJoin: (source?: string) => void;
}

export function DestinationNotice({ notice, onDismiss, onOpenJoin }: DestinationNoticeProps) {
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(onDismiss, 6500);
    return () => window.clearTimeout(timeout);
  }, [notice, onDismiss]);

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-50 w-[min(92vw,400px)] rounded-[12px] border border-[#D8C5B0] bg-[#FEFAF6] p-4 shadow-lg"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-[15px] font-semibold text-[#5C3317]">
                {notice.label}
              </p>
              <p className="mt-1 text-[13px] font-light leading-relaxed text-[#6B4C30]">
                {notice.message}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[12.5px] font-medium">
                <a
                  href={EXTERNAL_LINKS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#5C3317] underline decoration-[#CBB59D] underline-offset-4 hover:decoration-[#5C3317]"
                >
                  Instagram
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                {notice.label === 'WhatsApp' ? (
                  <button
                    type="button"
                    onClick={() => {
                      onDismiss();
                      onOpenJoin('WhatsApp Notice');
                    }}
                    className="cursor-pointer text-[#5C3317] underline decoration-[#CBB59D] underline-offset-4 hover:decoration-[#5C3317]"
                  >
                    Register for free
                  </button>
                ) : (
                  <a
                    href="#contact"
                    onClick={onDismiss}
                    className="text-[#5C3317] underline decoration-[#CBB59D] underline-offset-4 hover:decoration-[#5C3317]"
                  >
                    Go to Contact
                  </a>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#7A5B3E] transition-colors hover:bg-[#F4E8DA] hover:text-[#5C3317]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
