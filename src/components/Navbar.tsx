import React, { useState, useEffect } from 'react';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ArrowUpRight, Check, Copy, ShieldCheck, FileText } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenAuthModal }) => {
  const { profile, settings } = usePortfolioContent();
  const { isOwner } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'PROCESS', href: '#process' },
    { label: 'AI WORKFLOW', href: '#ai-workflow' },
    { label: 'TESTING', href: '#testing' },
    { label: 'ABOUT', href: '#about' },
    ...(settings.showExperience ? [{ label: 'EXPERIENCE', href: '#experience' }] : []),
    ...(settings.showContactSection ? [{ label: 'CONTACT', href: '#contact' }] : []),
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0d0f]/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Left: Identity & Status */}
        <a
          href="#home"
          id="nav-brand-link"
          className="group flex items-center gap-3 text-left focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-sm"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-neutral-100 group-hover:text-white transition-colors">
              {profile.name}
            </span>
            <span className="hidden md:inline-block ml-2 text-xs font-mono text-neutral-400 tracking-wider">
              / {profile.role}
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                id={`nav-link-${item.label.toLowerCase()}`}
                className={`px-3 py-1.5 text-xs font-mono tracking-widest transition-all rounded-sm ${
                  isActive
                    ? 'text-white bg-neutral-800/80 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Quick Action & External */}
        <div className="hidden sm:flex items-center gap-2.5">
          {isOwner && onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              id="nav-owner-cms-btn"
              className="px-2.5 py-1.5 rounded border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-xs font-mono text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Open Personal / CV Context Manager"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>OWNER CMS</span>
            </button>
          )}

          {settings.showCvButton && (
            <a
              href="/utkrista_bhandary.pdf"
              download="utkrista_bhandary.pdf"
              id="nav-cv-btn"
              aria-label="Download CV (utkrista_bhandary.pdf)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>CV</span>
            </a>
          )}

          <button
            onClick={copyEmail}
            id="nav-copy-email-btn"
            title="Copy email to clipboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>EMAIL</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            id="nav-get-in-touch-btn"
            className="px-3.5 py-1.5 rounded bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-mono font-medium tracking-wider transition-colors flex items-center gap-1"
          >
            CONTACT
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="mobile-nav-toggle"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-drawer"
          className="lg:hidden p-2 rounded text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-[#0c0d0f]/98 border-b border-neutral-800 px-6 py-6 transition-all duration-200"
        >
          <div className="flex flex-col gap-3">
            <div className="pb-3 border-b border-neutral-800/80 mb-1 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400">
                ● {profile.status}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {profile.location}
              </span>
            </div>

            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-mono tracking-widest text-neutral-300 hover:text-white py-2 border-b border-neutral-900/60"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              {isOwner && onOpenAuthModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-2.5 rounded border border-emerald-500/40 bg-emerald-950/40 text-xs font-mono text-emerald-300 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>OPEN OWNER CMS DASHBOARD</span>
                </button>
              )}

              {settings.showCvButton && (
                <a
                  href="/utkrista_bhandary.pdf"
                  download="utkrista_bhandary.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Download CV (utkrista_bhandary.pdf)"
                  className="w-full py-2.5 rounded border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-neutral-400" />
                  <span>DOWNLOAD CV (.PDF)</span>
                </a>
              )}

              <button
                onClick={() => {
                  copyEmail();
                }}
                className="w-full py-2.5 rounded border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-300 flex items-center justify-center gap-2"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">EMAIL COPIED ({profile.email})</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>COPY EMAIL ({profile.email})</span>
                  </>
                )}
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded bg-neutral-100 text-neutral-950 text-xs font-mono font-medium text-center tracking-wider"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
