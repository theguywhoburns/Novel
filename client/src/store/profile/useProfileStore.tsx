import { create } from 'zustand';

interface IUseProfileStore {
	description: string;
	setDescription: (description: string) => void;

	position: string;
	setPosition: (position: string) => void;
}

export const useProfileStore = create<IUseProfileStore>(set => ({
	description: '',
	setDescription: description => set({ description }),

	position: '',
	setPosition: position => set({ position }),
}));
