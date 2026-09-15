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
  canonicalOwnerEmail: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>(authService.getSession());
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    // Non-owner accounts are treated as visitors: no dashboard, standard browsing.
    if (!result.isOwner) {
      authService.setVisitorMode();
    }
    setShowAuthModal(false);
    setShowVisitorPrompt(false);
    return result;
  };

  const signOut = () => {
    authService.signOut();
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const dismissVisitorPrompt = () => {
    authService.setVisitorMode();
    setShowVisitorPrompt(false);
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
