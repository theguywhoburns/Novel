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
		},
		{
			Icon: IconSchoolHat,
			title: 'Образование',
			options: [],
		},
		{
			Icon: IconFamily,
			title: 'Планы на семью',
			options: [],
		},
		{
			Icon: IconSports,
			title: 'Спорт',
			options: [],
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
		},
		{
			Icon: IconSmoke,
			title: 'Как часто ты куришь?',
			options: [],
		},
		{
			Icon: IconHead,
			title: 'Тип личности',
			options: [],
		},
		{
			Icon: IconFood,
			title: 'Предпочтения в еде',
			options: [],
		},
		{
			Icon: IconPaw,
			title: 'Питомцы',
			options: [],
		},
		{
			Icon: IconCommunicationStyle,
			title: 'Стиль общения',
			options: [],
		},
		{
			Icon: IconSocial,
			title: 'Соцсети',
			options: [],
		},
		{
			Icon: IconLips,
			title: 'Язык любви',
			options: [],
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
				label='Показывать людей в радиусе'
				value={showPeopleInDistance}
				onChange={setShowPeopleInDistance}
			/>
			<div className={styles.separator} />

			<RangeInput
				values={ageRange}
				setValues={setAgeRange}
				label='Возраст'
				min={18}
				max={99}
				unit='лет'
			/>
			<LabeledSwitch
				label='Показывать людей в радиусе'
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
