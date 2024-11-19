import { LabeledSwitch, RangeInput, SettingsList } from '@/components';
import { Banner } from '@/components/Banner/Banner';
import { IconArrow, IconHeartLoop, IconLoop } from '@/icons';
import { useSettingsStore } from '@/store/settings/useSettingsStore';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

export const Settings = () => {
	const theme = useTheme();

	const navigate = useNavigate();

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

	return (
		<div className={styles.settingsPage}>
			<div className={styles.settingsPageHeader}>
				<button onClick={() => navigate(-1)} className={styles.settingsPageBtn}>
					<IconArrow color={theme.accent_color} />
				</button>
				<h2 className={styles.settingsPageHeaderText}>Настройки поиска</h2>
			</div>
			<div className={styles.settingsPageScrollView}>
				<Banner
					type='basic'
					title='Базовая подписка'
					subTitle='Расширь свои возможности'
					Icon={IconLoop}
				/>

				<RangeInput label='Расстояние' min={0} max={100} unit='км' />
				<LabeledSwitch
					label='Показывать людей в радиусе'
					value={showPeopleInDistance}
					onChange={setShowPeopleInDistance}
				/>
				<div className={styles.separator} />

				<RangeInput label='Возраст' min={18} max={99} unit='лет' />
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
					subTitle='Расширь свои возможности'
					Icon={IconHeartLoop}
				/>

				<LabeledSwitch
					label='Пользователь верифицирован'
					value={isUserVerified}
					onChange={setIsUserVerified}
				/>

				<SettingsList />
			</div>
		</div>
	);
};
