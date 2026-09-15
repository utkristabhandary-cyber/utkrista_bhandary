import React, { useState } from 'react';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Github, Linkedin, Shield } from 'lucide-react';

interface ContactSectionProps {
  onOpenAuthModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAuthModal }) => {
  const { profile, settings } = usePortfolioContent();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!settings.showContactSection) {
    return null;
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#090a0c]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main CTA Section */}
        <div className="pb-16 sm:pb-20 border-b border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>INTERNSHIPS & ENTRY-LEVEL OPPORTUNITIES</span>
          </div>

          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            LET'S BUILD
            <br />
            <span className="text-neutral-500">SOMETHING USEFUL.</span>
          </h2>

          <p className="mt-8 text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-sans">
            Open to internships, entry-level opportunities, collaborative projects and technology-focused roles. Let's discuss software engineering, backend APIs, or testing workflows.
          </p>
        </div>

        {/* Direct Contact Channels Grid */}
        <div className="pt-16">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>DIRECT CHANNELS & VERIFIED PROFILES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    Primary Contact
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    id="contact-copy-email-btn"
                    className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="text-base sm:text-lg font-mono font-semibold text-white hover:text-emerald-300 transition-colors block truncate"
                >
                  {profile.email}
                </a>
              </div>

              <p className="text-xs font-mono text-neutral-500">
                Direct inquiries, technical discussions, and role proposals.
              </p>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    Telephone (Nepal)
                  </span>
                  <button
                    onClick={handleCopyPhone}
                    id="contact-copy-phone-btn"
                    className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`tel:${profile.phone}`}
                  className="text-base sm:text-lg font-mono font-semibold text-white hover:text-cyan-300 transition-colors block"
                >
                  {profile.phone}
                </a>
              </div>

              <p className="text-xs font-mono text-neutral-500">
                Available for phone screenings, interviews, and direct calls.
              </p>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4 flex flex-col justify-between hover:border-neutral-700 transition-colors font-mono text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Base Location</span>
                </div>
                <div className="text-white font-semibold text-base">
                  {profile.location}
                </div>
                <div className="text-neutral-500 text-[11px]">
                  Coordinates: {profile.coordinates}
                </div>
              </div>

              <p className="text-xs font-mono text-neutral-500">
                Kathmandu Valley timezone (GMT+5:45). Remote friendly.
              </p>
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-github-link"
              className="py-4 px-5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white font-mono text-sm flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-3">
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                <span className="font-semibold">GITHUB REPOSITORIES</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-linkedin-link"
              className="py-4 px-5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white font-mono text-sm flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="font-semibold">LINKEDIN NETWORK</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. Built with deliberate craft and systematic testing.
          </div>

          <div className="flex items-center gap-4">
            {onOpenAuthModal && (
              <button
                onClick={onOpenAuthModal}
                className="text-neutral-600 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="Open Personal / CV Context Management System"
              >
                <Shield className="w-3 h-3" />
                <span>OWNER ACCESS</span>
              </button>
            )}
            <span>•</span>
            <span>{profile.location}</span>
            <span>•</span>
            <a href="#home" className="text-neutral-400 hover:text-white transition-colors">
              BACK TO TOP ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
