import {create} from "zustand";
import { persist } from "zustand/middleware";
import { SafeAny } from "../common";
// import { profileRequest, registerRequest } from "../api";

export interface Profile {
    nombre?: string;
    apellido?: string;
}

type State = {
    token: string | null;
    onClose?: () => void;
    profile: Profile;
    isAuth: boolean;
    errors: SafeAny;
};

type Actions = {
    setOnClose: (onClose: () => void) => void;
    setToken: (token: string) => void;
    setProfile: (profile: Profile) => void;
    logout: () => void;
    cleanErrors: () => void;
};

export const useAuthStore = create(
    persist<State & Actions>(
      (set) => ({
        token: null,
        profile: {},
        isAuth: false,
        errors: null,
        onClose: undefined,
        setToken: ( token: string) =>
          set((state) => ({
            token,
            isAuth: !!token,
          })),

        setOnClose: ( onClose: () => void) => 
          set((state) => ({
            onClose
          })),
          
        setProfile: (profile: Profile) => {
          set((state) => ({
            profile
          }))
        },
        logout: () => set(() => ({ token: null, profile: {}, isAuth: false, onClose: undefined })),
        cleanErrors: () => set(() => ({ errors: null })),
      }),
      {
        name: "auth",
      }
    )
  );


