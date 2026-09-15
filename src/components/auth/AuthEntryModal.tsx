import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, ShieldAlert, CheckCircle2, Lock, UserCheck, ArrowRight, X, AlertTriangle, ExternalLink } from 'lucide-react';

export const AuthEntryModal: React.FC = () => {
  const {
    showAuthModal,
    closeAuthModal,
    showVisitorPrompt,
    dismissVisitorPrompt,
    signIn,
    unauthorizedAttempt,
    clearUnauthorizedAttempt,
    canonicalOwnerEmail
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'welcome' | 'google-login'>('welcome');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // If neither prompt is active, render nothing
  if (!showAuthModal && !showVisitorPrompt) {
    return null;
  }

  const handleSimulatedSignIn = (email: string, name: string) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      signIn(email, name);
      setIsAuthenticating(false);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    handleSimulatedSignIn(customEmail.trim(), customName.trim() || 'Guest User');
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090a0c]/85 backdrop-blur-md animate-fade-in"
    >
      <div
        id="auth-modal-container"
        className="w-full max-w-lg bg-[#121316] border border-[#26282e] text-[#f4f4f5] shadow-2xl overflow-hidden rounded-none"
      >
        {/* Top Terminal Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#26282e] bg-[#16181d]">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase">
              PORTFOLIO ACCESS & VERIFICATION GATEWAY
            </span>
          </div>
          {showAuthModal && (
            <button
              onClick={closeAuthModal}
              className="text-[#71717a] hover:text-[#f4f4f5] transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Unauthorized State Banner */}
        {unauthorizedAttempt ? (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 p-4 border border-rose-500/40 bg-rose-950/20 text-rose-200">
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-rose-400">
                  ACCESS RESTRICTED
                </p>
                <p className="text-sm text-[#f4f4f5] font-medium">
                  {unauthorizedAttempt.message}
                </p>
                <p className="text-xs text-[#a1a1aa] font-mono mt-2">
                  Authenticated Identity: <span className="text-rose-300">{unauthorizedAttempt.email}</span>
                </p>
              </div>
            </div>

            <div className="text-xs text-[#a1a1aa] leading-relaxed space-y-2 border-l-2 border-[#3f3f46] pl-3">
              <p>
                The Content Management System (CMS) is exclusively reserved for the portfolio author:
              </p>
              <p className="font-mono text-emerald-400 text-[11px]">
                {canonicalOwnerEmail}
              </p>
              <p>
                Public visitors, recruiters, and reviewers are welcome to view all completed projects, case studies, and engineering documentation without restriction.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                id="btn-return-portfolio"
                onClick={() => {
                  clearUnauthorizedAttempt();
                  dismissVisitorPrompt();
                  closeAuthModal();
                }}
                className="w-full py-3 bg-[#f4f4f5] text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>RETURN TO PORTFOLIO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-try-different-account"
                onClick={clearUnauthorizedAttempt}
                className="w-full py-2.5 border border-[#26282e] text-[#a1a1aa] font-mono text-xs uppercase tracking-wider hover:text-[#f4f4f5] hover:border-[#3f3f46] transition-colors"
              >
                TRY DIFFERENT ACCOUNT
              </button>
            </div>
          </div>
        ) : (
          /* Normal Gate flow */
          <div className="p-6 md:p-8 space-y-6">
            {/* Title & Author Info */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                SYSTEM VERIFICATION
              </span>
              <h2 className="text-xl font-bold font-sans tracking-tight text-[#f4f4f5]">
                Utkrista Bhandary — Portfolio
              </h2>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                BSc IT Student at Techspire College / Asia Pacific University (APU). AI-assisted software developer focused on civic technology, backend validation, and reliable systems.
              </p>
            </div>

            {/* Mode selection options */}
            <div className="space-y-3 pt-2">
              {/* Option 1: Continue as visitor */}
              <button
                id="btn-continue-as-visitor"
                onClick={() => {
                  dismissVisitorPrompt();
                  closeAuthModal();
                }}
                className="w-full p-4 text-left border border-emerald-500/30 bg-emerald-950/10 hover:bg-emerald-950/20 hover:border-emerald-500/60 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                        CONTINUE AS VISITOR
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 font-mono bg-emerald-500/20 text-emerald-300">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa]">
                      Full public access to projects, architecture breakdowns, QA reports & contact details.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </button>

              {/* Option 2: Owner Sign In toggle */}
              <div className="border border-[#26282e] bg-[#16181d] p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#e4e4e7]">
                      PORTFOLIO OWNER ACCESS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#71717a]">
                    CMS CONTROL
                  </span>
                </div>

                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Sign in with Google to access the Owner Content Management Dashboard (edit projects, update status, manage CV, and adjust settings).
                </p>

                {/* Google Sign In Options */}
                <div className="space-y-2 pt-1">
                  {/* Verified Owner Button */}
                  <button
                    id="btn-signin-owner"
                    disabled={isAuthenticating}
                    onClick={() => handleSimulatedSignIn(canonicalOwnerEmail, 'Utkrista Bhandary')}
                    className="w-full py-3 px-4 bg-[#f4f4f5] text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {isAuthenticating ? 'VERIFYING...' : 'SIGN IN AS OWNER (utkristabhandary@gmail.com)'}
                    </span>
                  </button>

                  {/* Non-owner test account button to prove security restriction */}
                  <div className="pt-2 border-t border-[#26282e]">
                    <div className="flex items-center justify-between text-[11px] text-[#71717a] font-mono pb-2">
                      <span>VERIFY SECURITY RESTRICTION:</span>
                    </div>

                    <button
                      id="btn-test-non-owner"
                      disabled={isAuthenticating}
                      onClick={() => handleSimulatedSignIn('visitor.recruiter@gmail.com', 'Guest Recruiter')}
                      className="w-full py-2 px-3 border border-[#26282e] bg-[#121316] text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#3f3f46] font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-zinc-500" />
                      <span>TEST UNAUTHORIZED ACCOUNT (visitor.recruiter@gmail.com)</span>
                    </button>
                  </div>

                  {/* Manual email input accordion */}
                  <form onSubmit={handleCustomSubmit} className="pt-2 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Or test any Google email address..."
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        className="flex-1 bg-[#121316] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] placeholder-[#71717a] font-mono focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={isAuthenticating || !customEmail}
                        className="px-3 py-1.5 bg-[#26282e] hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-40 cursor-pointer"
                      >
                        TEST
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Architecture note */}
            <div className="p-3 bg-[#0e0f12] border border-[#1f2127] flex items-start gap-2.5 text-[11px] text-[#71717a] leading-relaxed font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-[#a1a1aa] shrink-0 mt-0.5" />
              <span>
                Prototype security model: Frontend authorization validates against canonical owner email. Production deployment integrates backend Google JWT token signature verification.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
