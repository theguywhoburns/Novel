import { IUser } from '@/components/user/UsersList/UsersList';
import { NumericTuple } from '@/types/types';
import axios from 'axios';
import { create } from 'zustand';
import { useLoginStore, userId } from '../login/useLoginStore';
import { baseUrl } from '../messenger/useMessengerStore';

export type Filter = {
	distanceRange: NumericTuple<2>;
	showPeopleInDistance: boolean;
	ageRange: NumericTuple<2>;
	showPeopleInAge: boolean;
	showVerifiedOnly: boolean;
};

type RateFunction = (ratedId: userId) => Promise<void>;

interface IUseUsersStore {
	user: IUser | null;
	setUser: (user: IUser | null) => void;

	users: IUser[];
	setUsers: (users: IUser[]) => void;

	getAllUsers: () => Promise<void>;
	getFilteredUsers: (filter: Filter) => Promise<void>;
	getUserById: (userId: userId) => Promise<void>;

	likeUser: RateFunction;
	dislikeUser: RateFunction;
}

export const useUsersStore = create<IUseUsersStore>((set, get) => ({
	user: null,
	setUser: user => set({ user }),

	users: [],
	setUsers: users => set({ users }),

	getAllUsers: async () => {
		try {
			const response = await axios.get(`${baseUrl}/users`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			get().setUsers(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	getFilteredUsers: async filter => {
		try {
			const { userId } = useLoginStore.getState();

			if (!userId) {
				throw new Error('User ID is not found');
			}

			const response = await axios.post(`${baseUrl}/filtered_users/${userId}`, {
				...filter,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			console.log('response: ', response);
			get().setUsers(response.data);
			console.log(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	getUserById: async userId => {
		try {
			if (!userId) {
				throw new Error('User ID is not found');
			}

			const response = await axios.get(`${baseUrl}/user/${userId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			get().setUser(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	likeUser: async likedId => {
		try {
			const likerId = useLoginStore.getState().userId;

			if (!likerId || !likedId) {
				throw new Error('User ID is not found');
			}

			const response = await axios.post(`${baseUrl}/like_user`, {
				raterId: likerId,
				ratedId: likedId,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	},

	dislikeUser: async likedId => {
		try {
			const likerId = useLoginStore.getState().userId;

			if (!likerId || !likedId) {
				throw new Error('User ID is not found');
			}

			const response = await axios.post(`${baseUrl}/dislike_user`, {
				raterId: likerId,
				ratedId: likedId,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	},
}));
