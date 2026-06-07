"use client";

import { create } from "zustand";

type AuthStore = {
  user: any;

  setUser: (user: any) => void;
};

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    setUser: (user) =>
      set({
        user,
      }),
  }));