import { Direction } from '@/components/user/UsersList/UserCard/UserCard';
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
	user: IUser;
	setUser: (user: IUser) => void;

	visitingUserId: number | null;
	setVisitingUserId: (visitingUserId: number | null) => void;

	visitingUser: IUser | null;
	setVisitingUser: (visitingUser: IUser | null) => void;

	users: IUser[] | null;
	setUsers: (users: IUser[]) => void;

	currentIndex: number;
	setCurrentIndex: (value: number | ((state: number) => number)) => void;

	nextIndex: number;
	setNextIndex: (nextIndex: number) => void;

	direction: Direction;
	setDirection: (direction: Direction) => void;

	getAllUsers: () => Promise<void>;
	getFilteredUsers: (userId: userId, filter: Filter) => Promise<void>;
	getUserById: (
		userId: userId,
		setUser: (user: IUser) => void
	) => Promise<void>;

	likeUser: RateFunction;
	dislikeUser: RateFunction;
}

export const useUsersStore = create<IUseUsersStore>((set, get) => ({
	user: {} as IUser,
	setUser: user => set({ user }),

	visitingUserId: null,
	setVisitingUserId: visitingUserId => set({ visitingUserId }),

	visitingUser: null,
	setVisitingUser: visitingUser => set({ visitingUser }),

	users: [],
	setUsers: users => set({ users }),

	currentIndex: 0,
	setCurrentIndex: (value: number | ((state: number) => number)) =>
		set(state => ({
			currentIndex:
				typeof value === 'function' ? value(state.currentIndex) : value,
		})),

	nextIndex: 1,
	setNextIndex: nextIndex => set({ nextIndex }),

	direction: null,
	setDirection: direction => set({ direction }),

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

	getFilteredUsers: async (userId, filter) => {
		try {
			if (!userId) {
				throw new Error('User ID not found');
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

	getUserById: async (userId, setUser) => {
		try {
			if (!userId) {
				throw new Error('User ID not found');
			}

			const response = await axios.get(`${baseUrl}/user/${userId}`);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			console.log('USER RES: , ', response);

			setUser(response.data);
		} catch (err) {
			console.error(err);
		}
	},

	likeUser: async likedId => {
		try {
			const likerId = useLoginStore.getState().userId;

			if (!likerId || !likedId) {
				throw new Error('User ID not found');
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
				throw new Error('User ID not found');
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
