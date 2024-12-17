import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { BottomModal } from '@/components/ui/BottomModal/BottomModal';
import { LabeledRadioButton } from '@/components/ui/LabeledRadioButton/LabeledRadioButton';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { IconArrow } from '@/icons/Arrow';
import { useTheme } from '@/theme';
import React, { useCallback, useState } from 'react';
import { Separator } from '../Separator/Separator';
import styles from './LabeledRadioButtonsList.module.css';

export interface ILabeledRadioButtonsList {
	Icon: React.FC | null;
	title: string;
	options: string[];
}

export const LabeledRadioButtonsList = ({
	Icon,
	title,
	options,
}: ILabeledRadioButtonsList) => {
	const theme = useTheme();

	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleModalClose = useCallback(() => {
		setIsModalVisible(false);
	}, [setIsModalVisible]);

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
				<BottomModal
					isOpen={isModalVisible}
					setIsOpen={handleModalClose}
					name={title}
				>
					<BottomButtonContainer gap={30}>
						<ul className={styles.optionsList}>
							{options.map(option => (
								<div key={option}>
									<LabeledRadioButton
										option={option}
										selectedValue={selectedOption}
										setSelectedValue={setSelectedOption}
									/>
									<Separator marginY={[2, 8]} />
								</div>
							))}
						</ul>

						<RoundedButton onClick={() => setIsModalVisible(false)}>
							Продолжить
						</RoundedButton>
					</BottomButtonContainer>
				</BottomModal>
			)}
		</>
	);
};
