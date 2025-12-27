import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { registerUser, login } from "@/services/authentication";

interface AuthState {
  user: Record<string, unknown> | null;
  jwt: string | null;
  register: (userData: any) => Promise<any>;
  loginUser: (credentials: any) => Promise<any>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const isNewSession = () => {
  if (typeof window === "undefined") return false;
  const sessionFlag = sessionStorage.getItem("session_active");
  if (!sessionFlag) {
    sessionStorage.setItem("session_active", "true");
    return true;
  }
  return false;
};

export const useStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      jwt: null,

      isAuthenticated: () => !!get().jwt,

      register: async (userData: any) => {
        const data = await registerUser(userData);
        set({ user: data.user, jwt: data.jwt });

        return data.user;
      },

      loginUser: async (credentials: any) => {
        const data = await login(credentials);
        set({ user: data.user, jwt: data.jwt });

        return data.user;
      },

      logout: () => {
        set({ user: null, jwt: null });
        useStore.persist.clearStorage();
        sessionStorage.removeItem("session_active");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined" && isNewSession()) {
          localStorage.removeItem("auth-storage");
        }
        return localStorage;
      }),
    }
  )
);
