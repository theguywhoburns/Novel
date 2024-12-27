import { RouteNames } from '@/routes';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';
import { baseUrl } from '../messenger/useMessengerStore';

export type Gender = 'male' | 'female' | null;

export type userId = number | null;

interface IUseLoginStore {
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;

	userId: userId;
	setUserId: (userId: userId) => void;

	email: string;
	setEmail: (email: string) => void;

	verificationCode: string;
	setVerificationCode: (verificationCode: string) => void;

	remainingTime: number;
	setRemainingTime: (value: number | ((state: number) => number)) => void;

	name: string;
	setName: (name: string) => void;

	birthDate: string;
	setBirthDate: (birthDate: string) => void;

	uploadedImages: (File | null)[];
	setUploadedImages: (
		value: (File | null)[] | ((state: (File | null)[]) => (File | null)[])
	) => void;

	description: string;
	setDescription: (description: string) => void;

	gender: Gender;
	setGender: (gender: Gender) => void;

	interests: string;
	setInterests: (interests: string) => void;

	zodiacSign: string;
	setZodiacSign: (zodiacSign: string) => void;

	searchGoal: string;
	setSearchGoal: (search: string) => void;

	education: string;
	setEducation: (education: string) => void;

	familyPlans: string;
	setFamilyPlans: (familyPlans: string) => void;

	sport: string;
	setSport: (sport: string) => void;

	alcohol: string;
	setAlcohol: (alcohol: string) => void;

	smoking: string;
	setSmoking: (smoking: string) => void;

	sendVerificationCode: () => Promise<void>;

	checkVerificationCode: (navigate: NavigateFunction) => Promise<void>;

	signIn: () => Promise<void>;

	signUp: () => Promise<void>;
}

export const useLoginStore = create<IUseLoginStore>(set => ({
	isAuth: localStorage.getItem('userId') ? true : false,
	setIsAuth: isAuth => set({ isAuth }),

	userId: localStorage.getItem('userId')
		? Number(localStorage.getItem('userId'))
		: null,
	setUserId: userId => set({ userId }),

	email: '',
	setEmail: email => set({ email }),

	remainingTime: 300,

	setRemainingTime: (value: number | ((state: number) => number)) =>
		set(state => ({
			remainingTime:
				typeof value === 'function' ? value(state.remainingTime) : value,
		})),

	verificationCode: '',
	setVerificationCode: verificationCode => set({ verificationCode }),

	name: '',
	setName: name => set({ name }),

	birthDate: '',
	setBirthDate: birthDate => set({ birthDate }),

	uploadedImages: new Array(4).fill(null),
	setUploadedImages: (
		value: (File | null)[] | ((state: (File | null)[]) => (File | null)[])
	) =>
		set(state => ({
			uploadedImages:
				typeof value === 'function' ? value(state.uploadedImages) : value,
		})),

	description: '',
	setDescription: description => set({ description }),

	gender: null,
	setGender: gender => set({ gender }),

	interests: '',
	setInterests: interests => set({ interests }),

	zodiacSign: '',
	setZodiacSign: zodiacSign => set({ zodiacSign }),

	searchGoal: '',
	setSearchGoal: searchGoal => set({ searchGoal }),

	education: '',
	setEducation: education => set({ education }),

	familyPlans: '',
	setFamilyPlans: familyPlans => set({ familyPlans }),

	sport: '',
	setSport: sport => set({ sport }),

	alcohol: '',
	setAlcohol: alcohol => set({ alcohol }),

	smoking: '',
	setSmoking: smoking => set({ smoking }),

	sendVerificationCode: async () => {
		try {
			const response = await axios.post(`${baseUrl}/send_verification_code`, {
				email: useLoginStore.getState().email,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	},

	checkVerificationCode: async navigate => {
		try {
			const response = await axios.post(`${baseUrl}/check_verification_code`, {
				email: useLoginStore.getState().email,
				verificationCode: useLoginStore.getState().verificationCode,
			});

			switch (response.status) {
				case 200:
					if (response.data.isNewUser) {
						navigate(RouteNames.LOGIN_NAME);
					} else {
						await useLoginStore.getState().signIn();
						navigate(RouteNames.HOME);
					}
					break;

				default:
					throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	},

	signIn: async () => {
		try {
			const response = await axios.post(`${baseUrl}/sign_in`, {
				email: useLoginStore.getState().email,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			const userId = response.data.userId;

			if (!userId) {
				throw new Error('User ID is not found');
			}

			localStorage.setItem('userId', userId);
			set({ isAuth: true });
		} catch (err) {
			console.error(err);
		}
	},

	signUp: async () => {
		try {
			const {
				email,
				name,
				birthDate,
				uploadedImages,
				gender,
				description,
				interests,
				zodiacSign,
				searchGoal,
				education,
				familyPlans,
				sport,
				alcohol,
				smoking,
			} = useLoginStore.getState();

			const response = await axios.post(`${baseUrl}/sign_up`, {
				email,
				name,
				bDate: birthDate,
				imgSrc: uploadedImages,
				gender,
				about: description,
				interests,
				zodiacSign,
				searchGoal,
				education,
				familyPlans,
				sport,
				alcohol,
				smoking,
			});

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	},
}));
