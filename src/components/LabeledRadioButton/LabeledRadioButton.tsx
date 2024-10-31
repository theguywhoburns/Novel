import styles from './LabeledRadioButton.module.css';

export interface IRadioInput {
	label: string;
	isSelected: boolean;
	setIsSelected: (isChecked: boolean) => void;
}

export const LabeledRadioButton = ({
	label,
	isSelected,
	setIsSelected,
}: IRadioInput) => {
	return (
		<div className={styles.radioButtonWrapper}>
			<label
				className={`${styles.label} ${isSelected ? styles.activeLabel : ''}`}
			>
				{label}
			</label>
			<input
				type='radio'
				id='radioInput'
				checked={isSelected}
				onChange={() => setIsSelected(!isSelected)}
			/>
		</div>
	);
};
