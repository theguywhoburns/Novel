import { useTheme } from '@/theme';
import styled from '@emotion/styled';
import { Radio } from '@mui/material';
import styles from './LabeledRadioButton.module.css';

export interface IRadioInput {
	label: string;
	selectedValue: string;
	setSelectedValue: () => void;
}

const BpIcon = styled('span')(() => {
	const theme = useTheme();
	return {
		borderRadius: '50%',
		width: 20,
		height: 20,
		backgroundColor: theme.button_background_color,
		backgroundImage: `radial-gradient(${theme.button_secondary_background_color},${theme.button_secondary_background_color} 33%,transparent 32%)`,

		'input:hover ~ &': {
			// rn unused
		},
	};
});

const BpCheckedIcon = styled(BpIcon)(() => {
	const theme = useTheme();
	return {
		backgroundColor: theme.button_background_color,

		'&::before': {
			display: 'block',
			width: 20,
			height: 20,
			backgroundImage: `radial-gradient(${theme.button_selected_background_color},${theme.button_selected_background_color} 33%,transparent 32%)`,
			content: '""',
		},
		'input:hover ~ &': {
			// rn unused
		},
	};
});

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
		<div className={styles.container} onClick={handleChange}>
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
					padding: 0,
					height: 20,
					width: 20,
					color: theme.button_background_color,
					'&.Mui-checked': {
						color: theme.button_selected_background_color,
					},
				}}
				checkedIcon={<BpCheckedIcon />}
				icon={<BpIcon />}
				onChange={handleChange}
			/>
		</div>
	);
};