import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccessState {
  accessToken: string;
  addAccessToken: (key: string) => void;
  code: string;
  addCode: (key: string) => void;
}

const useAccessStore = create<AccessState>()(
  persist(
    (set) => ({
      accessToken: "",
      code: "",
      addAccessToken: (token: string) =>
        set(() => ({
          accessToken: token,
        })),
      addCode: (code: string) =>
        set(() => ({
          code: code,
        })),
    }),
    {
      name: "access-storage",
    }
  )
);

export default useAccessStore;
