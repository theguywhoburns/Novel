import { ThemeType } from "@/theme/themes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IUseSettingsStore {
  // Local settings
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  geolocationAllowed: boolean;
  setGeolocationAllowed: (geolocationAllowed: boolean) => void;

  // Home settings
  showPeopleInDistance: boolean;
  setShowPeopleInDistance: (showPeopleInDistance: boolean) => void;
  showPeopleInAge: boolean;
  setShowPeopleInAge: (showPeopleInAge: boolean) => void;
  showMeToMen: boolean;
  setShowMeToMen: (showMeToMen: boolean) => void;
  showMeToWomen: boolean;
  setShowMeToWomen: (showMeToWomen: boolean) => void;
  isUserVerified: boolean;
  setIsUserVerified: (isUserVerified: boolean) => void;
}

export const useSettingsStore = create<IUseSettingsStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
      geolocationAllowed: true, // If it's true, the app will request permissions for the user's geolocation
      setGeolocationAllowed: (geolocationAllowed) =>
        set({ geolocationAllowed }),
      showPeopleInDistance: false,
      setShowPeopleInDistance: (showPeopleInDistance) =>
        set({ showPeopleInDistance }),
      showPeopleInAge: false,
      setShowPeopleInAge: (showPeopleInAge) => set({ showPeopleInAge }),
      showMeToMen: false,
      setShowMeToMen: (showMeToMen) => set({ showMeToMen }),
      showMeToWomen: false,
      setShowMeToWomen: (showMeToWomen) => set({ showMeToWomen }),
      isUserVerified: false,
      setIsUserVerified: (isUserVerified) => set({ isUserVerified }),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
