import { IUser } from '@/components/user/UsersList/UsersList';
import axios from 'axios';
import { create } from 'zustand';
import { userId } from '../login/useLoginStore';
import { baseUrl } from '../messenger/useMessengerStore';

export type Filter = {
	gender: string;
	zodiacSign: string;
};

type RateFunction = (raterId: userId, ratedId: userId) => Promise<void>;

interface IUseUsersStore {
	user: IUser | null;
	setUser: (user: IUser | null) => void;

	users: IUser[];
	setUsers: (users: IUser[]) => void;

	getAllUsers: () => Promise<void>;
	getFilterdUsers: (filter: Filter) => Promise<void>;
	getUserById: (userId: userId) => Promise<void>;

	likeUser: RateFunction;
	dislikeUser: RateFunction;
}

export const useUsersStore = create<IUseUsersStore>(set => ({
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

			useUsersStore.getState().setUsers(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	getFilterdUsers: async filter => {
		try {
			const response = await axios.post(`${baseUrl}/filtered_users`, {
				...filter,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			useUsersStore.getState().setUsers(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	getUserById: async userId => {
		try {
			const response = await axios.get(`${baseUrl}/user/${userId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			useUsersStore.getState().setUser(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	likeUser: async (likerId, likedId) => {
		try {
			const response = await axios.post(`${baseUrl}/like_user`, {
				likerId,
				likedId,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	},

	dislikeUser: async (likerId, likedId) => {
		try {
			const response = await axios.post(`${baseUrl}/dislike_user`, {
				likerId,
				likedId,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	},
}));
