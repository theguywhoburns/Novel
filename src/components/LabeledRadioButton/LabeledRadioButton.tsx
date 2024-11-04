import { Radio } from '@mui/material';
import styles from './LabeledRadioButton.module.css';

export interface IRadioInput {
	label: string;
	selectedValue: string;
	setSelectedValue: () => void;
}

export const LabeledRadioButton = ({
	label,
	selectedValue,
	setSelectedValue,
}: IRadioInput) => {
	const handleChange = () => {
		setSelectedValue();
	};

	return (
		<div className={styles.radioButtonWrapper} onClick={handleChange}>
			<label
				className={`${styles.label} ${
					selectedValue === label.toLowerCase() ? styles.activeLabel : ''
				}`}
			>
				{label}
			</label>
			<Radio
				checked={selectedValue === label.toLowerCase()}
				onChange={handleChange}
			/>
		</div>
	);
};
