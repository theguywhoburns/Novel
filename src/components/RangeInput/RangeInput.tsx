import { useState } from 'react';
import styles from './RangeInput.module.css';
import {Slider} from '@mui/material';
export interface IRangeInput {
	label: string;
	min: number;
	max: number;
	step?: number;
	unit: string;
	width?: number;
}

export const RangeInput = ({
	label,
	min,
	max,
	step = 1,
	unit,
	width = 300,
}: IRangeInput) => {
	const [sliderValues, setSliderValues] = useState([min, max]);

	const handleValuesChange = (event: Event, values: number | number[], activeThumb: number) => {
		console.log(event, values, activeThumb);
		setSliderValues(typeof values === 'number' ? [values, values] : values);
	};

	return (
		<div className={styles.container}>
			<div className={styles.labelAndValue}>
				<span className={styles.label}>{label}</span>
				<span className={styles.value}>
					{sliderValues[0] !== sliderValues[1]
						? `${sliderValues[0]} - ${sliderValues[1]} ${unit}`
						: `${sliderValues[0]} ${unit}`}
				</span>
			</div>
			<Slider
				value={sliderValues}
				onChange={handleValuesChange}
				min={min}
				max={max}
				step={step}
				style={{ width: width }}
			/>
		</div>
	);
};
