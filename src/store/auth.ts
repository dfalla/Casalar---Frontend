import {create} from "zustand";
import { persist } from "zustand/middleware";
import { SafeAny } from "../common";
import { profileRequest, registerRequest } from "../api";

export interface Profile {
    _id?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}


export interface createUser {
    email: string;
    password: string;
    fullName: string;
}

type State = {
    token: string | null;
    profile: Profile;
    isAuth: boolean;
    errors: SafeAny;
};

type Actions = {
    setToken: (token: string) => void;
    register: (user: createUser) => void;
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
        setToken: (token: string) =>
          set((state) => ({
            token,
            isAuth: !!token,
          })),
        register: async (user: createUser) => {
          try {
            const resRegister = await registerRequest(user);
            set(() => ({
              token: resRegister.data.token,
              isAuth: true,
            }));
          } catch (error) {
            set(() => ({ errors: (error as SafeAny).response.data }));
          }
        },
        getProfile: async () => {
          const resProfile = await profileRequest();
          set(() => ({
            profile: resProfile.data,
          }));
        },
        logout: () => set(() => ({ token: null, profile: {}, isAuth: false })),
        cleanErrors: () => set(() => ({ errors: null })),
      }),
      {
        name: "auth",
      }
    )
  );


