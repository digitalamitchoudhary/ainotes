import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  hydrateFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setAccessToken: (token) => set({ accessToken: token }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  logout: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  hydrateFromStorage: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      set({
        accessToken: token,
        user,
        isAuthenticated: !!(token && user),
      });
    }
  },
}));
