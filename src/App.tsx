import { useCallback, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DestinationNotice } from './components/DestinationNotice';
import type { NoticeData } from './components/DestinationNotice';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { JoinModal } from './components/JoinModal';
import { MembershipSection } from './components/MembershipSection';
import { Navbar } from './components/Navbar';
import { ProgramsSection } from './components/ProgramsSection';
import { SubBrandsSection } from './components/SubBrandsSection';
import { TestimonialSection } from './components/TestimonialSection';

export default function App() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [notice, setNotice] = useState<NoticeData | null>(null);

  const handleOpenJoin = useCallback(() => {
    setJoinOpen(true);
  }, []);

  const handleCloseJoin = useCallback(() => {
    setJoinOpen(false);
  }, []);

  const handleUnavailableLink = useCallback((label: string, message: string) => {
    setNotice({ label, message });
  }, []);

  const handleDismissNotice = useCallback(() => {
    setNotice(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFAF6] text-[#2A1A0A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#5C3317] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#FEFAF6]"
      >
        Skip to main content
      </a>

      <Navbar
        onOpenJoin={handleOpenJoin}
        onUnavailableLink={handleUnavailableLink}
      />

      <main id="main-content">
        <Hero onOpenJoin={handleOpenJoin} />
        <AboutSection onOpenJoin={handleOpenJoin} />
        <ProgramsSection onOpenJoin={handleOpenJoin} />
        <SubBrandsSection onOpenJoin={handleOpenJoin} />
        <TestimonialSection />
        <MembershipSection onOpenJoin={handleOpenJoin} />
        <ContactSection onOpenJoin={handleOpenJoin} />
      </main>

      <Footer onUnavailableLink={handleUnavailableLink} />

      <JoinModal isOpen={joinOpen} onClose={handleCloseJoin} />

      <DestinationNotice
        notice={notice}
        onDismiss={handleDismissNotice}
        onOpenJoin={handleOpenJoin}
      />
    </div>
  );
}
