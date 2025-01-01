import { LabeledSwitch, RangeInput } from '@/components';
import { Banner } from '@/components/settings/Banner/Banner';
import {
	IRadioModalTrigger,
	RadioModalTriggerList,
} from '@/components/ui/RadioModalTriggerList/RadioModalTriggerList';
import {
	IconAlcohol,
	IconFamily,
	IconFingersCross,
	IconFood,
	IconHead,
	IconHeartLoop,
	IconLips,
	IconLoop,
	IconPaw,
	IconPuzzle,
	IconSchoolHat,
	IconSmoke,
	IconSocial,
	IconSports,
	IconVortex,
} from '@/icons';
import { IconCommunicationStyle } from '@/icons/CommunicationStyle';
import { useSettingsStore } from '@/store/settings/useSettingsStore';
import { useTheme } from '@/theme';
import styles from './Settings.module.css';

export const Settings = () => {
	const theme = useTheme();

	const showPeopleInDistance = useSettingsStore(
		state => state.showPeopleInDistance
	);
	const setShowPeopleInDistance = useSettingsStore(
		state => state.setShowPeopleInDistance
	);

	const showPeopleInAge = useSettingsStore(state => state.showPeopleInAge);
	const setShowPeopleInAge = useSettingsStore(
		state => state.setShowPeopleInAge
	);

	const showMeToMen = useSettingsStore(state => state.showMeToMen);
	const setShowMeToMen = useSettingsStore(state => state.setShowMeToMen);

	const showMeToWomen = useSettingsStore(state => state.showMeToWomen);
	const setShowMeToWomen = useSettingsStore(state => state.setShowMeToWomen);

	const isUserVerified = useSettingsStore(state => state.isUserVerified);
	const setIsUserVerified = useSettingsStore(state => state.setIsUserVerified);

	const ageRange = useSettingsStore(state => state.ageRange);
	const setAgeRange = useSettingsStore(state => state.setAgeRange);

	const distanceRange = useSettingsStore(state => state.distanceRange);
	const setDistanceRange = useSettingsStore(state => state.setDistanceRange);

	const interests = useSettingsStore(state => state.interests);
	const setInterests = useSettingsStore(state => state.setInterests);

	const zodiacSign = useSettingsStore(state => state.zodiacSign);
	const setZodiacSign = useSettingsStore(state => state.setZodiacSign);

	const searchGoal = useSettingsStore(state => state.searchGoal);
	const setSearchGoal = useSettingsStore(state => state.setSearchGoal);

	const education = useSettingsStore(state => state.education);
	const setEducation = useSettingsStore(state => state.setEducation);

	const familyPlans = useSettingsStore(state => state.familyPlans);
	const setFamilyPlans = useSettingsStore(state => state.setFamilyPlans);

	const sport = useSettingsStore(state => state.sport);
	const setSport = useSettingsStore(state => state.setSport);

	const alcohol = useSettingsStore(state => state.alcohol);
	const setAlcohol = useSettingsStore(state => state.setAlcohol);

	const smoking = useSettingsStore(state => state.smoking);
	const setSmoking = useSettingsStore(state => state.setSmoking);

	const personalityType = useSettingsStore(state => state.personalityType);
	const setPersonalityType = useSettingsStore(
		state => state.setPersonalityType
	);

	const foodPreferences = useSettingsStore(state => state.foodPreferences);
	const setFoodPreferences = useSettingsStore(
		state => state.setFoodPreferences
	);

	const pets = useSettingsStore(state => state.pets);
	const setPets = useSettingsStore(state => state.setPets);

	const communicationStyle = useSettingsStore(
		state => state.communicationStyle
	);
	const setCommunicationStyle = useSettingsStore(
		state => state.setCommunicationStyle
	);

	const socialNetworks = useSettingsStore(state => state.socialNetworks);
	const setSocialNetworks = useSettingsStore(state => state.setSocialNetworks);

	const loveLanguage = useSettingsStore(state => state.loveLanguage);
	const setLoveLanguage = useSettingsStore(state => state.setLoveLanguage);

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
			setSelectedOption: setInterests,
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
			setSelectedOption: setZodiacSign,
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
			setSelectedOption: setSearchGoal,
		},
		{
			Icon: IconSchoolHat,
			title: 'Образование',
			options: [],
			selectedOption: education,
			setSelectedOption: setEducation,
		},
		{
			Icon: IconFamily,
			title: 'Планы на семью',
			options: [],
			selectedOption: familyPlans,
			setSelectedOption: setFamilyPlans,
		},
		{
			Icon: IconSports,
			title: 'Спорт',
			options: [],
			selectedOption: sport,
			setSelectedOption: setSport,
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
			setSelectedOption: setAlcohol,
		},
		{
			Icon: IconSmoke,
			title: 'Как часто ты куришь?',
			options: [],
			selectedOption: smoking,
			setSelectedOption: setSmoking,
		},
		{
			Icon: IconHead,
			title: 'Тип личности',
			options: [],
			selectedOption: personalityType,
			setSelectedOption: setPersonalityType,
		},
		{
			Icon: IconFood,
			title: 'Предпочтения в еде',
			options: [],
			selectedOption: foodPreferences,
			setSelectedOption: setFoodPreferences,
		},
		{
			Icon: IconPaw,
			title: 'Питомцы',
			options: [],
			selectedOption: pets,
			setSelectedOption: setPets,
		},
		{
			Icon: IconCommunicationStyle,
			title: 'Стиль общения',
			options: [],
			selectedOption: communicationStyle,
			setSelectedOption: setCommunicationStyle,
		},
		{
			Icon: IconSocial,
			title: 'Соцсети',
			options: [],
			selectedOption: socialNetworks,
			setSelectedOption: setSocialNetworks,
		},
		{
			Icon: IconLips,
			title: 'Язык любви',
			options: [],
			selectedOption: loveLanguage,
			setSelectedOption: setLoveLanguage,
		},
	];

	return (
		<div
			className={styles.settingsPage}
			style={{ backgroundColor: theme.background_color }}
		>
			<Banner
				type='basic'
				title='Базовая подписка'
				subTitle='Расширь свои возможности'
				Icon={IconLoop}
			/>

			<RangeInput
				values={distanceRange}
				setValues={setDistanceRange}
				label='Расстояние'
				min={0}
				max={100}
				unit='км'
			/>
			<LabeledSwitch
				label='Показывать людей в диапозоне'
				value={showPeopleInDistance}
				onChange={setShowPeopleInDistance}
			/>

			<RangeInput
				values={ageRange}
				setValues={setAgeRange}
				label='Возраст'
				min={18}
				max={99}
				unit='лет'
			/>
			<LabeledSwitch
				label='Показывать людей в диапозоне'
				value={showPeopleInAge}
				onChange={setShowPeopleInAge}
			/>
			<LabeledSwitch
				label='Показывать меня мужчинам'
				value={showMeToMen}
				onChange={setShowMeToMen}
			/>
			<LabeledSwitch
				label='Показывать меня женщинам'
				value={showMeToWomen}
				onChange={setShowMeToWomen}
			/>

			<Banner
				type='advanced'
				title='Продвинутая подписка'
				subTitle='Подбирай партнёра по интересам'
				Icon={IconHeartLoop}
			/>

			<LabeledSwitch
				label='Пользователь верифицирован'
				value={isUserVerified}
				onChange={setIsUserVerified}
			/>

			<RadioModalTriggerList triggers={RadioModalTriggers} />
		</div>
	);
};
