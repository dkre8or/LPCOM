import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND, EXTERNAL_LINKS, NAV_LINKS } from '../config/siteData';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  onOpenJoin: (source?: string) => void;
  onUnavailableLink: (label: string, message: string) => void;
}

export function Navbar({ onOpenJoin, onUnavailableLink }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkedInClick = () => {
    setMobileOpen(false);
    onUnavailableLink(
      'LinkedIn',
      'The official LinkedIn URL has not been added yet. Follow us on Instagram or reach out via Contact.'
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#FEFAF6]/95 backdrop-blur-md border-b border-[#E8D8C6]'
          : 'bg-[#FEFAF6]/85 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        {/* Brand Identity */}
        <a
          href="#top"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3 shrink-0"
          aria-label={`${BRAND.name} — ${BRAND.tagline}`}
        >
          <BrandMark size="md" />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[16px] font-semibold tracking-[-0.01em] text-[#5C3317] whitespace-nowrap">
              {BRAND.name}
            </span>
            <span className="mt-1 hidden text-[10.5px] font-normal tracking-[0.04em] text-[#7A5B3E] sm:block whitespace-nowrap">
              {BRAND.tagline}
            </span>
          </div>
        </a>

        {/* Primary Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7 xl:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-[13.5px] font-normal text-[#6B4C30] transition-colors duration-200 hover:text-[#5C3317] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#5C3317] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Socials + Primary CTA */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <div className="hidden xl:flex items-center gap-4 text-[12.5px] text-[#7A5B3E]">
            <a
              href={EXTERNAL_LINKS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-[#5C3317] whitespace-nowrap shrink-0"
            >
              Instagram
            </a>
            <span aria-hidden="true" className="text-[#D4BFA8]">
              ·
            </span>
            <button
              type="button"
              onClick={handleLinkedInClick}
              className="cursor-pointer transition-colors duration-200 hover:text-[#5C3317] whitespace-nowrap shrink-0"
            >
              LinkedIn
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenJoin('Header')}
            className="cursor-pointer rounded-full border-[1.5px] border-[#5C3317] bg-transparent px-5 py-2.5 text-[13px] font-semibold text-[#5C3317] transition-all duration-200 hover:bg-[#5C3317] hover:text-[#FEFAF6] whitespace-nowrap shrink-0"
          >
            Join Community
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#5C3317] transition-colors hover:bg-[#F4E8DA] lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-[#E8D8C6] bg-[#FEFAF6] px-6 pb-8 pt-4 lg:hidden"
        >
          <p className="mb-4 text-[12px] text-[#7A5B3E] sm:hidden">{BRAND.tagline}</p>

          <nav aria-label="Mobile navigation" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[#E8D8C6]/80 py-3.5 font-serif text-[20px] font-medium text-[#5C3317] transition-colors hover:text-[#8B5A2B]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-5 text-[13.5px] text-[#6B4C30]">
            <a
              href={EXTERNAL_LINKS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="py-1 underline decoration-[#D4BFA8] underline-offset-4 hover:text-[#5C3317]"
            >
              Instagram
            </a>
            <span aria-hidden="true" className="text-[#D4BFA8]">
              ·
            </span>
            <button
              type="button"
              onClick={handleLinkedInClick}
              className="cursor-pointer py-1 underline decoration-[#D4BFA8] underline-offset-4 hover:text-[#5C3317]"
            >
              LinkedIn
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenJoin('Mobile Menu');
            }}
            className="mt-6 w-full cursor-pointer rounded-full bg-[#5C3317] px-6 py-3.5 text-center text-[14px] font-semibold text-[#FEFAF6] transition-colors hover:bg-[#8B5A2B]"
          >
            Join Community
          </button>
        </div>
      )}
    </header>
  );
}
