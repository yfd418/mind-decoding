import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '@/types';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerWithForestName: (email: string, password: string, forestName: string, agreedTerms: string[]) => Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }>;
  resendConfirmation: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const fetchProfile = useCallback(async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          email: data.email,
          forestName: data.forest_name,
          avatar: data.avatar,
          createdAt: new Date(data.created_at),
          agreedToTerms: data.agreed_to_terms,
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }, []);

  const handleSessionChange = useCallback(async (session: Session | null) => {
    if (session?.user) {
      const profile = await fetchProfile(session.user.id);
      setUser(profile);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [fetchProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSessionChange(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSessionChange(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleSessionChange]);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        
        if (error.message.includes('Email not confirmed')) {
          return { success: false, error: '请先验证您的邮箱后再登录' };
        }
        
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: '登录失败，请稍后重试' };
    }
  }, []);

  const registerWithForestName = useCallback(async (
    email: string, 
    password: string,
    forestName: string,
    agreedTerms: string[]
  ): Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }> => {
    setIsLoading(true);
    
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            forest_name: forestName,
            agreed_to_terms: agreedTerms.length >= 2,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) {
        setIsLoading(false);
        return { success: false, error: signUpError.message };
      }

      if (signUpData.user && !signUpData.session) {
        setIsLoading(false);
        return { 
          success: true, 
          needsConfirmation: true,
        };
      }

      if (signUpData.user && signUpData.session) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: signUpData.user.id,
            email,
            forest_name: forestName,
            agreed_to_terms: agreedTerms.length >= 2,
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: '注册失败，请稍后重试' };
    }
  }, []);

  const resendConfirmation = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: '发送失败，请稍后重试' };
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const openAuthModal = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    registerWithForestName,
    resendConfirmation,
    logout,
    openAuthModal,
    closeAuthModal,
    isAuthModalOpen,
    authModalMode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
