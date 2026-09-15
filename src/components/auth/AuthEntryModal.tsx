import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, ArrowRight } from 'lucide-react';

interface AuthEntryModalProps {
  onClose?: () => void;
  onOpenDashboard?: () => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
  </svg>
);

export const AuthEntryModal: React.FC<AuthEntryModalProps> = ({ onClose, onOpenDashboard }) => {
  const {
    showAuthModal,
    closeAuthModal,
    showVisitorPrompt,
    dismissVisitorPrompt,
    signIn,
    canonicalOwnerEmail
  } = useAuth();

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isOpen = showAuthModal || showVisitorPrompt;

  const handleClose = () => {
    dismissVisitorPrompt();
    closeAuthModal();
    onClose?.();
  };

  const handleContinueWithGoogle = () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    setTimeout(() => {
      const result = signIn(canonicalOwnerEmail, 'Utkrista Bhandary');
      setIsAuthenticating(false);
      if (result.isOwner) {
        onOpenDashboard?.();
      }
    }, 400);
  };

  const handleContinueAsVisitor = () => {
    dismissVisitorPrompt();
    closeAuthModal();
    onClose?.();
  };

  // Escape closes the owner-access modal when it is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Move keyboard focus into the dialog when it opens
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="auth-modal-backdrop"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090a0c]/85 backdrop-blur-md animate-fade-in"
    >
      <div
        ref={dialogRef}
        id="auth-modal-container"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio owner access"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#121316] border border-[#26282e] text-[#f4f4f5] shadow-2xl overflow-hidden outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#26282e] bg-[#16181d]">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e4e4e7]">
            {showAuthModal ? 'Portfolio Owner Access' : 'Welcome to the Portfolio'}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close owner access"
            className="p-1.5 text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#26282e] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          <p className="text-sm text-[#a1a1aa] leading-relaxed">
            {showAuthModal
              ? 'Sign in with Google to access the Owner Content Management Dashboard.'
              : 'Browse the full public portfolio — projects, case studies, skills, and contact details. Signing in is only required for owner content management.'}
          </p>

          <button
            onClick={handleContinueWithGoogle}
            disabled={isAuthenticating}
            className="w-full py-3.5 px-4 bg-[#f4f4f5] text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
          >
            <GoogleIcon className="w-4 h-4 shrink-0" />
            <span>{isAuthenticating ? 'SIGNING IN...' : 'Continue with Google'}</span>
          </button>

          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#52525b]">
            <span className="flex-1 h-px bg-[#26282e]" />
            OR
            <span className="flex-1 h-px bg-[#26282e]" />
          </div>

          <button
            onClick={handleContinueAsVisitor}
            className="w-full py-3 px-4 border border-[#26282e] bg-[#16181d] text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#3f3f46] transition-colors font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue as Visitor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
