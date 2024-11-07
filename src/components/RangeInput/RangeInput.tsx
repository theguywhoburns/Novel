import { useTheme } from '@/theme';
import { Slider } from '@mui/material';
import { useState } from 'react';
import styles from './RangeInput.module.css';
export interface IRangeInput {
	label: string;
	min: number;
	max: number;
	step?: number;
	unit: string;
	width?: number | string;
}

export const RangeInput = ({
	label,
	min,
	max,
	step = 1,
	unit,
	width = '100%',
}: IRangeInput) => {
	const [sliderValues, setSliderValues] = useState([min, max]);

	const handleValuesChange = (
		event: Event,
		values: number | number[],
		activeThumb: number
	) => {
		console.log(event, values, activeThumb);
		setSliderValues(typeof values === 'number' ? [values, values] : values);
	};
	const theme = useTheme();
	return (
		<div className={styles.container} style={{ width }}>
			<div className={styles.labelAndValue}>
				<span className={styles.label}>{label}</span>
				<span className={styles.value}>
					{sliderValues[0] !== sliderValues[1]
						? `${sliderValues[0]} - ${sliderValues[1]} ${unit}`
						: `${sliderValues[0]} ${unit}`}
				</span>
			</div>

			<div className={styles.sliderWrapper}>
				<Slider
					value={sliderValues}
					onChange={handleValuesChange}
					sx={{
						'& .MuiSlider-rail': {
							color: theme.accent_color,
						},
						'& .MuiSlider-track': {
							color: theme.accent_color,
						},
						'& .MuiSlider-thumb': {
							width: 25,
							height: 25,
							color: theme.white,
							'&::after': {
								width: 25,
								height: 25,
							},
							'&:focus, &:hover, &.Mui-active': {
								boxShadow: 'none',
								// Reset on touch devices, it doesn't add specificity
								'@media (hover: none)': {
									boxShadow: 'none',
								},
							},
						},
					}}
					min={min}
					max={max}
					step={step}
					style={{ width }}
				/>
			</div>
		</div>
	);
};
