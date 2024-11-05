import { Radio } from '@mui/material';
import styles from './LabeledRadioButton.module.css';
import { useTheme } from '@/theme';

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
	const theme = useTheme();
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
				sx={{
					'&.Mui-checked': {
						color: theme.button_selected_background_color
					}
				}}
				onChange={handleChange}
			/>
		</div>
	);
};
