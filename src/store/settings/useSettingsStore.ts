import { create } from 'zustand';

export interface IUseSettingsStore {
	isSettingsOpen: boolean;
	setIsSettingsOpen: (isSettingsOpen: boolean) => void;
}

export const useSettingsStore = create<IUseSettingsStore>()(set => ({
	isSettingsOpen: false,
	setIsSettingsOpen: (isSettingsOpen: boolean) => set({ isSettingsOpen }),
}));
