import { IPair } from '@/components';
import axios from 'axios';
import { create } from 'zustand';
import { useLoginStore } from '../login/useLoginStore';
import { baseUrl } from '../messenger/useMessengerStore';

interface IUseNewPairsStore {
	newPairs: IPair[];
	setNewPairs: (newPairs: IPair[]) => void;

	getNewPairsByUser: () => Promise<void>;
}

export const useNewPairsStore = create<IUseNewPairsStore>((set, get) => ({
	newPairs: [],
	setNewPairs: newPairs => set({ newPairs }),

	getNewPairsByUser: async () => {
		try {
			const userId = useLoginStore.getState().userId;

			const response = await axios.get(`${baseUrl}/new_pairs/${userId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			get().setNewPairs(response.data);
		} catch (err) {
			console.error(err);
		}
	},
}));
