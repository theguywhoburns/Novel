import { LabeledSwitch, RangeInput } from '@/components';
import { Banner } from '@/components/settings/Banner/Banner';
import { IconHeartLoop, IconLoop } from '@/icons';
import { useLoginStore } from '@/store/login/useLoginStore';
import {
	ISettingsState,
	useSettingsStore,
} from '@/store/settings/useSettingsStore';
import { useTheme } from '@/theme';
import { getCaseByAmount } from '@/utils/getCaseByAmount';
import { useCallback, useEffect } from 'react';
import styles from './Settings.module.css';
import { SettingsRadioModalTriggers } from './SettingsRadioModalTriggers';

export const SettingsPage = () => {
	const theme = useTheme();

	const settings = useSettingsStore(state => state.settings);
	const userId = useLoginStore(state => state.userId);
	const getSettingsByUser = useSettingsStore(state => state.getSettingsByUser);
	const updateSettings = useSettingsStore(state => state.updateSettings);

	const {
		distanceRange,
		showPeopleInDistance,
		ageRange,
		showPeopleInAge,
		showMeToMen,
		showMeToWomen,
		showVerifiedOnly,
	} = settings;

	useEffect(() => {
		getSettingsByUser(userId);
	}, [userId]);

	const handleSettingsChange = useCallback(
		(newSettings: Partial<ISettingsState>) => {
			updateSettings(newSettings);
		},
		[]
	);

	useEffect(() => {
		console.log(settings);
	}, [settings]);

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
				setValues={values => handleSettingsChange({ distanceRange: values })}
				label='Расстояние'
				min={0}
				max={100}
				unit='км'
			/>
			<LabeledSwitch
				label='Показывать людей в диапозоне'
				value={showPeopleInDistance}
				onChange={value =>
					handleSettingsChange({ showPeopleInDistance: value })
				}
			/>

			<RangeInput
				values={ageRange}
				setValues={values => handleSettingsChange({ ageRange: values })}
				label='Возраст'
				min={18}
				max={99}
				unit={value =>
					getCaseByAmount(
						{ zeroOne: 'год', twoFour: 'года', fiveTen: 'лет' },
						value
					)
				}
			/>
			<LabeledSwitch
				label='Показывать людей в диапозоне'
				value={showPeopleInAge}
				onChange={value => handleSettingsChange({ showPeopleInAge: value })}
			/>
			<LabeledSwitch
				label='Показывать меня мужчинам'
				value={showMeToMen}
				onChange={value => handleSettingsChange({ showMeToMen: value })}
			/>
			<LabeledSwitch
				label='Показывать меня женщинам'
				value={showMeToWomen}
				onChange={value => handleSettingsChange({ showMeToWomen: value })}
			/>

			<Banner
				type='advanced'
				title='Продвинутая подписка'
				subTitle='Подбирай партнёра по интересам'
				Icon={IconHeartLoop}
			/>

			<LabeledSwitch
				label='Пользователь верифицирован'
				value={showVerifiedOnly}
				onChange={value => handleSettingsChange({ showVerifiedOnly: value })}
			/>

			<SettingsRadioModalTriggers />
		</div>
	);
};
