import React, { useCallback, useState } from 'react';
import styles from './SettingsItem.module.css';
import { LabeledRadioButton } from '../../LabeledRadioButton/LabeledRadioButton';

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
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				<div className={styles.iconAndTitleContainer}>
					<div>{Icon ? <Icon /> : <p>No Icon</p>}</div>
					<h3 className={styles.title}>{title}</h3>
				</div>
				<p>{'>'}</p>
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
									isSelected={selectedOptions.includes(option.label)}
									setIsSelected={() => handleOptionSelection(option.label)}
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
