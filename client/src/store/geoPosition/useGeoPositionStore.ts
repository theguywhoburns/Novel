import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type GeoCoords = {
	geoLat: number;
	geoLon: number;
};
export interface IUseGeoPositionStore {
	position?: GeoCoords;
	city?: string;
	setPosition: (position: GeoCoords) => void;
	setCity: (city: string) => void;
}

export const useGeoPositionStore = create<IUseGeoPositionStore>()(
	persist(
		set => ({
			position: undefined,
			city: undefined,
			setPosition: (position?: GeoCoords) => set({ position }),
			setCity: (city?: string) => set({ city }),
		}),
		{
			name: 'geoPosition',
		}
	)
);
