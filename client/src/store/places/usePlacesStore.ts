import { IPlace } from '@/components/place/PlacesList/Place/Place';
import axios from 'axios';
import { create } from 'zustand';
import { useGeoPositionStore } from '../geoPosition/useGeoPositionStore';
import { baseUrl } from '../messenger/useMessengerStore';

interface IUsePlacesStore {
	placesObj: Record<string, IPlace[]>;
	setPlacesObj: (placesObj: Record<string, IPlace[]>) => void;

	places: IPlace[];
	setPlaces: (places: IPlace[]) => void;

	place: IPlace;
	setPlace: (place: IPlace) => void;

	isPlacesLoading: boolean;
	setIsPlacesLoading: (isPlacesLoading: boolean) => void;

	getPlacesObj: () => Promise<void>;
	getPlace: (placeId: number) => Promise<void>;
}

export const usePlacesStore = create<IUsePlacesStore>(set => ({
	placesObj: {},
	setPlacesObj: placesObj => set({ placesObj }),

	places: [],
	setPlaces: places => set({ places }),

	place: {} as IPlace,
	setPlace: place => set({ place }),

	isPlacesLoading: false,
	setIsPlacesLoading: isPlacesLoading => set({ isPlacesLoading }),

	getPlacesObj: async () => {
		try {
			const city = useGeoPositionStore.getState().city;

			const response = await axios.get(`${baseUrl}/places/${city}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			usePlacesStore.getState().setPlacesObj(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	getPlace: async placeId => {
		try {
			const response = await axios.get(`${baseUrl}/place/${placeId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			usePlacesStore.getState().setPlace(response.data);
		} catch (err) {
			console.error(err);
		}
	},
}));
