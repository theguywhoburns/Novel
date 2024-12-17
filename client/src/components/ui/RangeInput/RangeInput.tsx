import { useTheme } from '@/theme';
import { Slider } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import styles from './RangeInput.module.css';

export interface IRangeInput {
	label: string;
	values: number[];
	min: number;
	max: number;
	setValues: (value: number[]) => void;
	step?: number;
	unit: string;
	width?: number | string;
}

export const RangeInput = ({
	label,
	values,
	min,
	max,
	setValues,
	step = 1,
	unit,
	width = '100%',
}: IRangeInput) => {
	const handleValuesChange = (
		_event: Event,
		newValues: number | number[],
		_activeThumb: number
	) => {
		const updatedValues =
			typeof newValues === 'number' ? [newValues] : newValues;
		setValues(updatedValues);
	};

	const theme = useTheme();

	return (
		<div className={styles.container} style={{ width }}>
			<div className={styles.labelAndValue}>
				<span className={styles.label}>{label}</span>
				<span className={styles.value}>
					{values.map((val, index) => (
						<Fragment key={index}>
							{index > 0 && ' - '}
							{val} {unit}
						</Fragment>
					))}
				</span>
			</div>

			<div className={styles.sliderWrapper}>
				<Slider
					value={values.length === 1 ? values[0] : values}
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
