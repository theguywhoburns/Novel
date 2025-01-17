import { ILikedUser } from '@/components/chat/LikedUsersList/LikedUser/LikedUser';
import axios from 'axios';
import { create } from 'zustand';
import { useLoginStore } from '../login/useLoginStore';
import { baseUrl } from '../messenger/useMessengerStore';

interface IUseLikesStore {
	matches: ILikedUser[];
	setMatches: (matches: ILikedUser[]) => void;
	myLikes: ILikedUser[];
	setMyLikes: (myLikes: ILikedUser[]) => void;
	likedPartners: ILikedUser[];
	setLikedPartners: (likedPartners: ILikedUser[]) => void;

	getMatches: () => Promise<void>;
	getMyLikes: () => Promise<void>;
	getLikedPartners: () => Promise<void>;
}

export const useLikesStore = create<IUseLikesStore>((set, get) => ({
	matches: [],
	setMatches: matches => set({ matches }),

	myLikes: [],
	setMyLikes: myLikes => set({ myLikes }),

	likedPartners: [],
	setLikedPartners: likedPartners => set({ likedPartners }),

	getMatches: async () => {
		try {
			const userId = useLoginStore.getState().userId;

			if (!userId) {
				throw new Error('User ID is not found');
			}

			const response = await axios.get(`${baseUrl}/matches/${userId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			get().setMatches(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	getMyLikes: async () => {
		try {
			const userId = useLoginStore.getState().userId;

			if (!userId) {
				throw new Error('User ID is not found');
			}

			const response = await axios.get(`${baseUrl}/my_likes/${userId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			get().setMyLikes(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	getLikedPartners: async () => {
		try {
			const userId = useLoginStore.getState().userId;

			if (!userId) {
				throw new Error('User ID is not found');
			}

			const response = await axios.get(`${baseUrl}/liked_partners/${userId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			get().setLikedPartners(response.data);
		} catch (err) {
			console.error(err);
		}
	},
}));
