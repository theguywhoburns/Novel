import { useCallback, useState } from 'react';

import {
	ILabeledRadioButtonsList,
	LabeledRadioButtonsList,
} from '@/components/ui/LabeledRadioButtonsList/LabeledRadioButtonsList';
import { IconCrystal } from '@/icons/Crystal';
import styles from './SettingsList.module.css';

export const SettingsList = () => {
	const [settings, setSettings] = useState<ILabeledRadioButtonsList[]>([
		{
			Icon: IconCrystal,
			title: 'Профиль',
			isModalVisible: false,
			setIsModalVisible: () => {},
			options: [
				{ label: 'asdf', onPress: () => {} },
				{ label: 'qwer', onPress: () => {} },
			],
		},
		{
			Icon: null,
			title: 'Настройки',
			isModalVisible: false,
			setIsModalVisible: () => {},
			options: [],
		},
	]);

	const handleModalVisibility = useCallback(
		(index: number, isVisible: boolean) => {
			setSettings(prevSettings => {
				const updatedSettings = [...prevSettings];
				updatedSettings[index] = {
					...updatedSettings[index],
					isModalVisible: isVisible,
				};
				return updatedSettings;
			});
		},
		[setSettings]
	);

	const handleSetIsModalVisible = useCallback(
		(index: number, isVisible: boolean) => {
			handleModalVisibility(index, isVisible);
		},
		[handleModalVisibility]
	);

	return (
		<div className={styles.list}>
			{settings.map((item, index) => (
				<LabeledRadioButtonsList
					key={index}
					Icon={item.Icon}
					title={item.title}
					isModalVisible={item.isModalVisible}
					setIsModalVisible={() =>
						handleSetIsModalVisible(index, !item.isModalVisible)
					}
					options={item.options}
				/>
			))}
		</div>
	);
};
