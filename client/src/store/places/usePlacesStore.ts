import { IPlace } from "@/components/place/PlacesList/Place/Place";
import axios from "axios";
import { create } from "zustand";
import { useGeoPositionStore } from "../geoPosition/useGeoPositionStore";
import { baseUrl } from "../messenger/useMessengerStore";

interface IUsePlacesStore {
  placesAndTabsObj: Record<string, { displayLabel: string; places: IPlace[] }>;
  setPlacesAndTabsObj: (
    placesAndTabsObj: Record<string, { displayLabel: string; places: IPlace[] }>
  ) => void;

  places: IPlace[];
  setPlaces: (places: IPlace[]) => void;

  place: IPlace;
  setPlace: (place: IPlace) => void;

  isPlacesLoading: boolean;
  setIsPlacesLoading: (isPlacesLoading: boolean) => void;

  getPlacesAndTabsObj: () => Promise<void>;
  getPlace: (placeId: number) => Promise<void>;
}

export const usePlacesStore = create<IUsePlacesStore>((set, get) => ({
  placesAndTabsObj: {},
  setPlacesAndTabsObj: (placesAndTabsObj) => set({ placesAndTabsObj }),

  places: [],
  setPlaces: (places) => set({ places }),

  place: {} as IPlace,
  setPlace: (place) => set({ place }),

  isPlacesLoading: false,
  setIsPlacesLoading: (isPlacesLoading) => set({ isPlacesLoading }),

  getPlacesAndTabsObj: async () => {
    try {
      const city = useGeoPositionStore.getState().city;

      const response = await axios.get(`${baseUrl}/places/${city}`);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      get().setPlacesAndTabsObj(response.data);
    } catch (err) {
      console.error(err);
    }
  },

  getPlace: async (placeId) => {
    try {
      if (!placeId) {
        throw new Error("Place ID found");
      }

      const response = await axios.get(`${baseUrl}/place/${placeId}`);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      get().setPlace(response.data);
    } catch (err) {
      console.error(err);
    }
  },
}));
