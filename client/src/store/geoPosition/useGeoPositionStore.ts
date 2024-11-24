import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type GeoCoords = {
	latitude: number;
	longitude: number;
}
export interface IUseGeoPositionStore {
	position?: GeoCoords;
	setPosition: (position: GeoCoords) => void;
}

export const useGeoPositionStore = create<IUseGeoPositionStore>()(
	persist(
		set => ({
			position: undefined,
			setPosition: (position?: GeoCoords) => set({ position }),
		}),
		{
			name: 'geoPosition',
		}
	)
);
