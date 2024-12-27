import { ThemeType } from '@/theme/themes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IUseSettingsStore {
	// Local settings
	theme: ThemeType;
	setTheme: (theme: ThemeType) => void;
	geolocationAllowed: boolean;
	setGeolocationAllowed: (geolocationAllowed: boolean) => void;

	// Home settings
	showPeopleInDistance: boolean;
	setShowPeopleInDistance: (showPeopleInDistance: boolean) => void;
	showPeopleInAge: boolean;
	setShowPeopleInAge: (showPeopleInAge: boolean) => void;
	showMeToMen: boolean;
	setShowMeToMen: (showMeToMen: boolean) => void;
	showMeToWomen: boolean;
	setShowMeToWomen: (showMeToWomen: boolean) => void;
	isUserVerified: boolean;
	setIsUserVerified: (isUserVerified: boolean) => void;

	interests: string;
	setInterests: (interests: string) => void;
	zodiacSign: string;
	setZodiacSign: (zodiacSign: string) => void;
	searchGoal: string;
	setSearchGoal: (searchGoal: string) => void;
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
	personalityType: string;
	setPersonalityType: (personalityType: string) => void;
	foodPreferences: string;
	setFoodPreferences: (foodPreferences: string) => void;
	pets: string;
	setPets: (pets: string) => void;
	communicationStyle: string;
	setCommunicationStyle: (communicatonStyle: string) => void;
	socialNetworks: string;
	setSocialNetworks: (socialNetworks: string) => void;
	loveLanguage: string;
	setLoveLanguage: (loveLanguage: string) => void;

	ageRange: number[];
	setAgeRange: (ageRange: number[]) => void;
	distanceRange: number[];
	setDistanceRange: (distanceRange: number[]) => void;
}

export const useSettingsStore = create<IUseSettingsStore>()(
	persist(
		set => ({
			theme: 'light',
			setTheme: theme => set({ theme }),
			geolocationAllowed: true, // If it's true, the app will request permissions for the user's geolocation
			setGeolocationAllowed: geolocationAllowed => set({ geolocationAllowed }),
			showPeopleInDistance: false,
			setShowPeopleInDistance: showPeopleInDistance =>
				set({ showPeopleInDistance }),
			showPeopleInAge: false,
			setShowPeopleInAge: showPeopleInAge => set({ showPeopleInAge }),
			showMeToMen: false,
			setShowMeToMen: showMeToMen => set({ showMeToMen }),
			showMeToWomen: false,
			setShowMeToWomen: showMeToWomen => set({ showMeToWomen }),
			isUserVerified: false,
			setIsUserVerified: isUserVerified => set({ isUserVerified }),

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
			personalityType: '',
			setPersonalityType: personalityType => set({ personalityType }),
			foodPreferences: '',
			setFoodPreferences: foodPreferences => set({ foodPreferences }),
			pets: '',
			setPets: pets => set({ pets }),
			communicationStyle: '',
			setCommunicationStyle: communicationStyle => set({ communicationStyle }),
			socialNetworks: '',
			setSocialNetworks: socialNetworks => set({ socialNetworks }),
			loveLanguage: '',
			setLoveLanguage: loveLanguage => set({ loveLanguage }),

			ageRange: [18, 100],
			setAgeRange: ageRange => set({ ageRange }),
			distanceRange: [0, 100],
			setDistanceRange: distanceRange => set({ distanceRange }),
		}),
		{
			name: 'settings',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
