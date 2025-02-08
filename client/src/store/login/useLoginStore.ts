import { RouteNames } from '@/routes';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';
import { baseUrl } from '../messenger/useMessengerStore';

export type Gender = 'male' | 'female' | null;

export type UserId = number | null;

export type Image = File | null;

interface IUseLoginStore {
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;

	userId: UserId;
	setUserId: (userId: UserId) => void;

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

	uploadedImages: Image[];
	setUploadedImages: (value: Image[] | ((state: Image[]) => Image[])) => void;

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

	isVerificationCodeVaild: boolean;
	setIsVerificationCodeVaild: (isVerificationCodeVaild: boolean) => void;

	sendVerificationCode: () => Promise<void>;
	checkVerificationCode: (navigate: NavigateFunction) => Promise<void>;
	signIn: () => Promise<void>;
	signUp: () => Promise<void>;
}

export const useLoginStore = create<IUseLoginStore>((set, get) => ({
	isAuth: localStorage.getItem('userId') ? true : false,
	setIsAuth: isAuth => set({ isAuth }),

	userId: Number(localStorage.getItem('userId')) || null,
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
	setUploadedImages: (value: Image[] | ((state: Image[]) => Image[])) =>
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

	isVerificationCodeVaild: true,
	setIsVerificationCodeVaild: isVerificationCodeVaild =>
		set({ isVerificationCodeVaild }),

	sendVerificationCode: async () => {
		try {
			console.log(
				'Sending verification code to: ',
				baseUrl,
				'/send_verification_code'
			);
			const response = await axios.post(`${baseUrl}/send_verification_code`, {
				email: useLoginStore.getState().email,
			});

			console.log('Verification code sent:', response.data);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error('Error sending verification code:', JSON.stringify(err));
		}
	},

	checkVerificationCode: async navigate => {
		try {
			const response = await axios.post(`${baseUrl}/check_verification_code`, {
				email: useLoginStore.getState().email,
				verificationCode: useLoginStore.getState().verificationCode,
			});

			console.log(response);
			console.log(response.data.isNewUser);

			if (response.data.error?.includes('Invalid verification code')) {
				get().setIsVerificationCodeVaild(false);
				return;
			}

			if (response.status === 200) {
				if (response.data.isNewUser) {
					navigate(RouteNames.LOGIN_NAME);
				} else {
					await useLoginStore.getState().signIn();
					navigate(RouteNames.HOME);
				}
				get().setIsVerificationCodeVaild(true);
			} else {
				throw new Error(response.statusText);
			}
		} catch (err) {
			if (
				(err as any).response?.data.error?.includes('Invalid verification code')
			) {
				get().setIsVerificationCodeVaild(false);
			}
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
				throw new Error('User ID not found');
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

			const formData = new FormData(); // Create FormData object

			// Append non-image data to FormData
			formData.append('email', email);
			formData.append('name', name);
			formData.append('bDate', birthDate); // Make sure your backend expects 'bDate'
			formData.append('gender', String(gender));
			formData.append('about', description);
			formData.append('interests', JSON.stringify(interests)); // Stringify arrays/objects
			formData.append('zodiacSign', zodiacSign);
			formData.append('searchGoal', searchGoal);
			formData.append('education', education);
			formData.append('familyPlans', familyPlans);
			formData.append('sport', sport);
			formData.append('alcohol', alcohol);
			formData.append('smoking', smoking);

			// Append images to FormData
			uploadedImages.forEach((image, index) => {
				if (image) {
					formData.append(`image${index}`, image); // Append each image
				}
			});

			const response = await axios.post(`${baseUrl}/sign_up`, formData, {
				// Send FormData
				headers: {
					'Content-Type': 'multipart/form-data', // IMPORTANT! Set Content-Type
				},
			});

			if (response.status !== 200) {
				throw new Error(
					`Sign-up failed: ${response.status} ${response.statusText}`
				);
			}

			// Handle successful sign-up (e.g., store token, redirect)
			console.log('Sign-up successful', response.data); // Log response data for debugging
		} catch (err) {
			console.error('Sign-up error:', err);
			alert('Sign-up failed. Please check your information and try again.'); // User-friendly message
			// Optionally, log the full error details to a logging service
		}
	},
}));
