import { ExternalLink } from 'lucide-react';
import {
  BRAND,
  FOOTER_CONNECT,
  FOOTER_PAGES,
  FOOTER_PROGRAMS,
} from '../config/siteData';
import type { FooterLinkItem } from '../config/siteData';
import { BrandMark } from './BrandMark';

interface FooterProps {
  onUnavailableLink: (label: string, message: string) => void;
}

export function Footer({ onUnavailableLink }: FooterProps) {
  const renderLinkItem = (item: FooterLinkItem) => {
    if (item.href && item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[14px] font-light text-[#F4E8DA]/80 transition-colors duration-200 hover:text-[#FEFAF6]"
        >
          {item.label}
          <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
        </a>
      );
    }

    if (item.href) {
      return (
        <a
          href={item.href}
          className="inline-block text-[14px] font-light text-[#F4E8DA]/80 transition-colors duration-200 hover:text-[#FEFAF6]"
        >
          {item.label}
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={() =>
          onUnavailableLink(
            item.label,
            item.unavailableReason ??
              `${item.label} destination has not been published yet.`
          )
        }
        className="cursor-pointer text-left text-[14px] font-light text-[#F4E8DA]/72 transition-colors duration-200 hover:text-[#FEFAF6]"
      >
        {item.label}
      </button>
    );
  };

  return (
    <footer className="bg-[#5C3317] text-[#FEFAF6]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-[#FEFAF6]/14 pb-14">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <BrandMark variant="inverted" size="sm" />
              <h2 className="font-serif text-[20px] font-semibold text-[#FEFAF6]">
                {BRAND.name}.
              </h2>
            </div>

            <p className="mt-4 max-w-[34ch] text-[14px] font-light leading-[1.82] text-[#F4E8DA]/80">
              {BRAND.footerDescription}
            </p>

            <p className="mt-5 font-serif text-[14px] italic text-[#D9A03C]">
              {BRAND.footerSupportingStatement}
            </p>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-[12px] font-semibold tracking-[0.06em] text-[#D9A03C]">
              Programs
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_PROGRAMS.map((item) => (
                <li key={item.label}>{renderLinkItem(item)}</li>
              ))}
            </ul>
          </div>

          {/* Pages Column */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[12px] font-semibold tracking-[0.06em] text-[#D9A03C]">
              Pages
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_PAGES.map((item) => (
                <li key={item.label}>{renderLinkItem(item)}</li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[12px] font-semibold tracking-[0.06em] text-[#D9A03C]">
              Connect
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_CONNECT.map((item) => (
                <li key={item.label}>{renderLinkItem(item)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[13px] font-light text-[#F4E8DA]/70">
            {BRAND.copyright}
          </p>
          <p className="text-[12.5px] font-light text-[#F4E8DA]/65">
            {BRAND.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
