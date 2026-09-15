import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthSession, AuthUser } from '../types';
import { authService, CANONICAL_OWNER_EMAIL } from '../services/authService';

interface AuthContextType {
  session: AuthSession;
  isAuthenticated: boolean;
  isOwner: boolean;
  user: AuthUser | null;
  signIn: (email: string, name: string, avatar?: string) => { success: boolean; isOwner: boolean; message?: string };
  signOut: () => void;
  showAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  showVisitorPrompt: boolean;
  dismissVisitorPrompt: () => void;
  unauthorizedAttempt: { email: string; message: string } | null;
  clearUnauthorizedAttempt: () => void;
  canonicalOwnerEmail: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>(authService.getSession());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [unauthorizedAttempt, setUnauthorizedAttempt] = useState<{ email: string; message: string } | null>(null);

  // Show visitor prompt on first visit if user has never chosen a mode and is not authenticated
  const [showVisitorPrompt, setShowVisitorPrompt] = useState<boolean>(() => {
    return !authService.hasVisitorChosenMode() && !authService.getSession().isAuthenticated;
  });

  useEffect(() => {
    const unsubscribe = authService.subscribe((newSession) => {
      setSession(newSession);
      if (newSession.isAuthenticated) {
        setShowVisitorPrompt(false);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = (email: string, name: string, avatar?: string) => {
    const result = authService.signIn(email, name, avatar);
    if (!result.isOwner) {
      setUnauthorizedAttempt({
        email,
        message: result.message || 'Owner access is restricted to the portfolio owner.'
      });
    } else {
      setUnauthorizedAttempt(null);
      setShowAuthModal(false);
      setShowVisitorPrompt(false);
    }
    return result;
  };

  const signOut = () => {
    authService.signOut();
    setUnauthorizedAttempt(null);
  };

  const openAuthModal = () => {
    setUnauthorizedAttempt(null);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setUnauthorizedAttempt(null);
  };

  const dismissVisitorPrompt = () => {
    authService.setVisitorMode();
    setShowVisitorPrompt(false);
  };

  const clearUnauthorizedAttempt = () => {
    setUnauthorizedAttempt(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session.isAuthenticated,
        isOwner: session.isOwner,
        user: session.user,
        signIn,
        signOut,
        showAuthModal,
        openAuthModal,
        closeAuthModal,
        showVisitorPrompt,
        dismissVisitorPrompt,
        unauthorizedAttempt,
        clearUnauthorizedAttempt,
        canonicalOwnerEmail: CANONICAL_OWNER_EMAIL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
