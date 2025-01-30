import { NumericTuple } from "@/types/types";
import axios from "axios";
import { create } from "zustand";
import { useLoginStore, userId } from "../login/useLoginStore";
import { baseUrl } from "../messenger/useMessengerStore";

export interface ISettingsState {
  // Home settings
  distanceRange: NumericTuple<2>;
  showPeopleInDistance: boolean;
  ageRange: NumericTuple<2>;
  showPeopleInAge: boolean;
  showMeToMen: boolean;
  showMeToWomen: boolean;
  showVerifiedOnly: boolean;

  interests: string;
  zodiacSign: string;
  searchGoal: string;
  education: string;
  familyPlans: string;
  sport: string;
  alcohol: string;
  smoking: string;
  personalityType: string;
  foodPreferences: string;
  pets: string;
  communicationStyle: string;
  socialNetworks: string;
  loveLanguage: string;
}

interface IFormattedSettings
  extends Omit<ISettingsState, "distanceRange" | "ageRange"> {
  distanceRange: string;
  ageRange: string;
}

export interface IUseSettingsStore {
  settings: ISettingsState;
  setSettings: (newState: Partial<ISettingsState>) => void;

  getSettingsByUser: (userId: userId) => Promise<void>;
  updateSettings: (newSettings: Partial<ISettingsState>) => Promise<void>;
}

const defaultSettingsState: ISettingsState = {
  ageRange: [18, 100],
  showPeopleInDistance: false,
  distanceRange: [0, 100],
  showPeopleInAge: false,
  showMeToMen: true,
  showMeToWomen: true,
  showVerifiedOnly: false,
  interests: "",
  zodiacSign: "",
  searchGoal: "",
  education: "",
  familyPlans: "",
  sport: "",
  alcohol: "",
  smoking: "",
  personalityType: "",
  foodPreferences: "",
  pets: "",
  communicationStyle: "",
  socialNetworks: "",
  loveLanguage: "",
};

export const useSettingsStore = create<IUseSettingsStore>((set, get) => ({
  settings: defaultSettingsState,
  setSettings: (newState) =>
    set((state) => ({
      settings: { ...state.settings, ...newState },
    })),

  getSettingsByUser: async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/settings/${userId}`);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      console.log(response);

      const settingsData = response.data;

      settingsData.ageRange = JSON.parse(settingsData.ageRange);
      settingsData.distanceRange = JSON.parse(settingsData.distanceRange);

      console.log(settingsData);

      get().setSettings(settingsData);
    } catch (err) {
      console.error(err);
    }
  },

  updateSettings: async (newSettings) => {
    try {
      const userId = useLoginStore.getState().userId;

      if (!userId) {
        throw new Error("User ID not found");
      }

      const formattedSettings: Partial<IFormattedSettings> = {
        ...newSettings,
        ageRange: JSON.stringify(newSettings.ageRange),
        distanceRange: JSON.stringify(newSettings.distanceRange),
      };

      const response = await axios.patch(`${baseUrl}/settings/${userId}`, {
        ...formattedSettings,
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const settingsData = response.data;

      settingsData.ageRange = JSON.parse(settingsData.ageRange);
      settingsData.distanceRange = JSON.parse(settingsData.distanceRange);

      get().setSettings(settingsData);
    } catch (err) {
      console.error(err);
    }
  },
}));
