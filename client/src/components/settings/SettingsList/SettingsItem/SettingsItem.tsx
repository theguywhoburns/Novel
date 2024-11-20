import { LabeledRadioButton } from '@/components/ui/LabeledRadioButton/LabeledRadioButton';
import { IconArrow } from '@/icons/Arrow';
import { useTheme } from '@/theme';
import React, { useCallback, useState } from 'react';
import styles from './SettingsItem.module.css';

export interface ISettingsOption {
	label: string;
	onPress: () => void;
}

export interface ISettingsItem {
	Icon: React.FC | null;
	title: string;
	isModalVisible: boolean;
	setIsModalVisible: (isModalVisible: boolean) => void;
	options: ISettingsOption[];
}

export const SettingsItem = ({
	Icon,
	title,
	isModalVisible,
	setIsModalVisible,
	options,
}: ISettingsItem) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const theme = useTheme();

	const handleModalClose = useCallback(() => {
		setIsModalVisible(false);
	}, [setIsModalVisible]);

	const handleOptionSelection = useCallback(
		(option: string) => {
			setSelectedOptions(prevSelectedOptions => {
				if (prevSelectedOptions.includes(option)) {
					return prevSelectedOptions.filter(opt => opt !== option);
				} else {
					return [...prevSelectedOptions, option];
				}
			});
		},
		[setSelectedOptions]
	);

	return (
		<>
			<div
				className={styles.item}
				style={{ backgroundColor: theme.list_item_background_color }}
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				<div className={styles.iconAndTitleContainer}>
					<div
						className={styles.iconWrapper}
						style={{ backgroundColor: theme.background_color }}
					>
						{Icon && <Icon />}
					</div>
					<h3 className={styles.title} style={{ color: theme.accent_color }}>
						{title}
					</h3>
				</div>
				<IconArrow color={theme.grey} direction='right' />
			</div>
			{isModalVisible && (
				<div className={styles.modal}>
					<div className={styles.modalContainer} onClick={handleModalClose}>
						<div className={styles.modalInner}>
							<h3>{title}</h3>
							{options.map(option => (
								<LabeledRadioButton
									key={option.label}
									label={option.label}
									selectedValue={
										selectedOptions.includes(option.label) ? option.label : ''
									}
									setSelectedValue={() => handleOptionSelection(option.label)}
								/>
							))}
						</div>
						<button className={styles.continueButton}>Продолжить</button>
					</div>
				</div>
			)}
		</>
	);
};
