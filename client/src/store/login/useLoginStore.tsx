import { create } from 'zustand';

type Gender = 'male' | 'female' | null;

interface IUseLoginStore {
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
}

export const useLoginStore = create<IUseLoginStore>(set => ({
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
}));
