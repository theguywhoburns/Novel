import {
	IRadioModalTrigger,
	RadioModalTriggerList,
} from '@/components/ui/RadioModalTriggerList/RadioModalTriggerList';
import { useUserId } from '@/hooks/useUserId';
import {
	IconAlcohol,
	IconCommunicationStyle,
	IconFamily,
	IconFingersCross,
	IconFood,
	IconHead,
	IconLips,
	IconPaw,
	IconPuzzle,
	IconSchoolHat,
	IconSmoke,
	IconSocial,
	IconSports,
	IconVortex,
} from '@/icons';
import {
	ISettingsState,
	useSettingsStore,
} from '@/store/settings/useSettingsStore';
import { useCallback } from 'react';

export const SettingsRadioModalTriggers = () => {
	const userId = useUserId();
	const settings = useSettingsStore(state => state.settings);
	const updateSettings = useSettingsStore(state => state.updateSettings);

	const {
		interests,
		zodiacSign,
		searchGoal,
		education,
		familyPlans,
		sport,
		alcohol,
		smoking,
		personalityType,
		foodPreferences,
		pets,
		communicationStyle,
		socialNetworks,
		loveLanguage,
	} = settings;

	const handleSettingsChange = useCallback(
		(newSettings: Partial<ISettingsState>) => {
			updateSettings(userId, newSettings);
		},
		[]
	);

	const RadioModalTriggers: IRadioModalTrigger[] = [
		{
			Icon: IconPuzzle,
			title: 'Мои интересы',
			options: [
				'Netflix',
				'Stand Up',
				'Harry Potter',
				'Вкусная еда',
				'Счастливые часы',
			],
			selectedOption: interests,
			setSelectedOption: option => handleSettingsChange({ interests: option }),
		},
		{
			Icon: IconVortex,
			title: 'Знак зодиака',
			options: [
				'Овен',
				'Телец',
				'Близнецы',
				'Рак',
				'Лев',
				'Стрелец',
				'Весы',
				'Дева',
				'Скорпион',
				'Водолей',
				'Рыбы',
				'Козерог',
			],
			selectedOption: zodiacSign,
			setSelectedOption: option => handleSettingsChange({ zodiacSign: option }),
		},
		{
			Icon: IconFingersCross,
			title: 'Я ищу',
			options: [
				'Долгосрочного партнера',
				'Долго- или краткосрочного партнера',
				'Просто повеселиться',
				'Найти друзей',
				'Не определился (-ась)',
			],
			selectedOption: searchGoal,
			setSelectedOption: option => handleSettingsChange({ searchGoal: option }),
		},
		{
			Icon: IconSchoolHat,
			title: 'Образование',
			options: ['Среднее', 'Среднее специальное', 'Высшее'],
			selectedOption: education,
			setSelectedOption: option => handleSettingsChange({ education: option }),
		},
		{
			Icon: IconFamily,
			title: 'Планы на семью',
			options: ['Хочу детей', 'Не хочу детей'],
			selectedOption: familyPlans,
			setSelectedOption: option =>
				handleSettingsChange({ familyPlans: option }),
		},
		{
			Icon: IconSports,
			title: 'Спорт',
			options: ['Регулярно', 'Часто', 'Редко', 'Никогда'],
			selectedOption: sport,
			setSelectedOption: option => handleSettingsChange({ sport: option }),
		},
		{
			Icon: IconAlcohol,
			title: 'Алкоголь',
			options: [
				'Не употребляю',
				'Только в компании',
				'Только по выходным',
				'Редко',
			],
			selectedOption: alcohol,
			setSelectedOption: option => handleSettingsChange({ alcohol: option }),
		},
		{
			Icon: IconSmoke,
			title: 'Как часто ты куришь?',
			options: ['Не курю', 'Редко', 'Часто'],
			selectedOption: smoking,
			setSelectedOption: option => handleSettingsChange({ smoking: option }),
		},
		{
			Icon: IconHead,
			title: 'Тип личности',
			options: [],
			selectedOption: personalityType,
			setSelectedOption: option =>
				handleSettingsChange({ personalityType: option }),
		},
		{
			Icon: IconFood,
			title: 'Предпочтения в еде',
			options: [],
			selectedOption: foodPreferences,
			setSelectedOption: option =>
				handleSettingsChange({ foodPreferences: option }),
		},
		{
			Icon: IconPaw,
			title: 'Питомцы',
			options: [],
			selectedOption: pets,
			setSelectedOption: option => handleSettingsChange({ pets: option }),
		},
		{
			Icon: IconCommunicationStyle,
			title: 'Стиль общения',
			options: [],
			selectedOption: communicationStyle,
			setSelectedOption: option =>
				handleSettingsChange({ communicationStyle: option }),
		},
		{
			Icon: IconSocial,
			title: 'Соцсети',
			options: [],
			selectedOption: socialNetworks,
			setSelectedOption: option =>
				handleSettingsChange({ socialNetworks: option }),
		},
		{
			Icon: IconLips,
			title: 'Язык любви',
			options: [],
			selectedOption: loveLanguage,
			setSelectedOption: option =>
				handleSettingsChange({ loveLanguage: option }),
		},
	];

	return <RadioModalTriggerList triggers={RadioModalTriggers} />;
};
