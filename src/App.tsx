import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioContentProvider, usePortfolioContent } from './context/PortfolioContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectSection } from './components/ProjectSection';
import { HowIBuildSection } from './components/HowIBuildSection';
import { AiPhilosophySection } from './components/AiPhilosophySection';
import { TestingPhilosophySection } from './components/TestingPhilosophySection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { ContactSection } from './components/ContactSection';
import { AuthEntryModal } from './components/auth/AuthEntryModal';
import { OwnerDashboard } from './components/admin/OwnerDashboard';
import { ShieldCheck } from 'lucide-react';

function PortfolioMainContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const { isOwner } = useAuth();
  const { settings } = usePortfolioContent();

  useEffect(() => {
    // Dynamic document title based on settings
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
  }, [settings.siteTitle]);

  useEffect(() => {
    // Keyboard shortcut to open CMS (Ctrl+Shift+A) or hash listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isOwner) {
          setIsDashboardOpen((prev) => !prev);
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#cms' || window.location.hash === '#admin') {
        if (isOwner) {
          setIsDashboardOpen(true);
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);

    // Check initial hash
    if (window.location.hash === '#cms' || window.location.hash === '#admin') {
      if (isOwner) {
        setIsDashboardOpen(true);
      } else {
        setIsAuthModalOpen(true);
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isOwner]);

  useEffect(() => {
    const sections = [
      'home',
      'work',
      'process',
      'ai-workflow',
      'testing',
      'about',
      'skills',
      'experience',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAuth = () => {
    if (isOwner) {
      setIsDashboardOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // When owner dashboard is open, render dedicated CMS view
  if (isDashboardOpen && isOwner) {
    return <OwnerDashboard onClose={() => setIsDashboardOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0c0d0f] text-[#ededee] font-sans antialiased selection:bg-neutral-800 selection:text-white relative">
      {/* Sticky Minimal Navigation */}
      <Navbar activeSection={activeSection} onOpenAuthModal={handleOpenAuth} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <ProjectSection />
        <HowIBuildSection />
        <AiPhilosophySection />
        <TestingPhilosophySection />
        <AboutSection />
        <SkillsSection />
        <ExperienceEducationSection />
        <ContactSection onOpenAuthModal={handleOpenAuth} />
      </main>

      {/* Floating Owner Quick Bar (Only visible when verified owner is authenticated) */}
      {isOwner && (
        <aside
          aria-label="Owner CMS Access Floating Bar"
          className="fixed bottom-5 right-5 z-40"
        >
          <button
            onClick={() => setIsDashboardOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider shadow-xl transition-all cursor-pointer hover:scale-105"
            title="Open Portfolio Owner CMS"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>OWNER CMS ACTIVE</span>
          </button>
        </aside>
      )}

      {/* Authentication & Owner Verification Modal */}
      <AuthEntryModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenDashboard={() => {
          setIsAuthModalOpen(false);
          setIsDashboardOpen(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioContentProvider>
        <PortfolioMainContent />
      </PortfolioContentProvider>
    </AuthProvider>
  );
}
