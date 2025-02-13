import { INewPair } from '@/components';
import axios from 'axios';
import { create } from 'zustand';
import { UserId } from '../login/useLoginStore';
import { baseUrl } from '../messenger/useMessengerStore';

interface IUseNewPairsStore {
	newPairs: INewPair[];
	setNewPairs: (newPairs: INewPair[]) => void;

	getNewPairsByUser: (userId: UserId) => Promise<void>;
}

export const useNewPairsStore = create<IUseNewPairsStore>((set, get) => ({
	newPairs: [],
	setNewPairs: newPairs => set({ newPairs }),

	getNewPairsByUser: async userId => {
		try {
			if (!userId) {
				throw new Error('User ID not found');
			}

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
