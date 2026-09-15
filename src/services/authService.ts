import { AuthSession, AuthUser } from '../types';

/**
 * AUTHENTICATION & AUTHORIZATION SERVICE
 * 
 * CANONICAL OWNER EMAIL: utkristabhandary@gmail.com
 * 
 * IMPORTANT SECURITY RULE:
 * The frontend must NEVER be treated as the final authority for authorization.
 * This client-side verification is an isolated prototype mechanism.
 * In production, the backend must verify the Google OAuth 2.0 / GSI JWT ID token
 * and independently validate that the subject email matches the authorized owner email
 * before granting any database mutation or privileged view rights.
 */

export const CANONICAL_OWNER_EMAIL = 'utkristabhandary@gmail.com';
const STORAGE_KEY = 'portfolio_auth_session_v1';
const VISITOR_FLAG_KEY = 'portfolio_visitor_mode_selected';

export function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

export function isOwnerEmail(email: string): boolean {
  return normalizeEmail(email) === normalizeEmail(CANONICAL_OWNER_EMAIL);
}

class AuthService {
  private session: AuthSession;
  private listeners: Array<(session: AuthSession) => void> = [];

  constructor() {
    this.session = this.loadSession();
  }

  private loadSession(): AuthSession {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthSession;
        // Enforce strict check on rehydration
        const isOwner = !!(parsed.user?.email && isOwnerEmail(parsed.user.email));
        return {
          isAuthenticated: !!parsed.isAuthenticated,
          isOwner,
          user: parsed.user
        };
      }
    } catch {
      // Ignore parse error and fallback
    }
    return {
      isAuthenticated: false,
      isOwner: false,
      user: null
    };
  }

  private saveSession(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.session));
    } catch {
      // Ignore storage error in sandbox
    }
  }

  public getSession(): AuthSession {
    return this.session;
  }

  public isOwner(): boolean {
    return this.session.isAuthenticated && this.session.isOwner;
  }

  public getCurrentUser(): AuthUser | null {
    return this.session.user;
  }

  public subscribe(callback: (session: AuthSession) => void): () => void {
    this.listeners.push(callback);
    callback(this.session);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify(): void {
    this.saveSession();
    this.listeners.forEach((cb) => cb(this.session));
  }

  /**
   * Authenticate via verified Google identity payload
   */
  public signIn(email: string, name: string, avatar?: string): { success: boolean; isOwner: boolean; message?: string } {
    const cleanEmail = normalizeEmail(email);
    const isOwner = isOwnerEmail(cleanEmail);

    const user: AuthUser = {
      name: name.trim() || (isOwner ? 'UTKRISTA BHANDARY' : 'Google User'),
      email: cleanEmail
    };

    this.session = {
      isAuthenticated: true,
      isOwner,
      user
    };

    this.notify();

    if (!isOwner) {
      return {
        success: false,
        isOwner: false,
        message: 'Owner access is restricted to the portfolio owner.'
      };
    }

    return {
      success: true,
      isOwner: true
    };
  }

  public signOut(): void {
    this.session = {
      isAuthenticated: false,
      isOwner: false,
      user: null
    };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    this.notify();
  }

  // Visitor mode helpers (frictionless browsing)
  public hasVisitorChosenMode(): boolean {
    try {
      return localStorage.getItem(VISITOR_FLAG_KEY) === 'true';
    } catch {
      return false;
    }
  }

  public setVisitorMode(): void {
    try {
      localStorage.setItem(VISITOR_FLAG_KEY, 'true');
    } catch {
      // Ignore
    }
  }

  public resetVisitorMode(): void {
    try {
      localStorage.removeItem(VISITOR_FLAG_KEY);
    } catch {
      // Ignore
    }
  }
}

export const authService = new AuthService();
