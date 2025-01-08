import { useTheme } from '@/theme';
import { Slider } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import styles from './RangeInput.module.css';

export interface IRangeInput<T extends Array<number>> {
	label: string;
	values: T;
	setValues: (value: T) => void;
	min: number;
	max: number;
	step?: number;
	unit: string;
	width?: number | string;
}

export const RangeInput = <T extends Array<number>>({
	label,
	values,
	setValues,
	min,
	max,
	step = 1,
	unit,
	width = '100%',
}: IRangeInput<T>) => {
	const theme = useTheme();

	const handleValuesChange = (
		_event: Event,
		newValues: number | number[],
		_activeThumb: number
	) => {
		const typedNewValue = Array.isArray(newValues)
			? (newValues as T)
			: ([newValues] as T);

		setValues(typedNewValue);
	};

	return (
		<div className={styles.container} style={{ width }}>
			<div className={styles.labelAndValue}>
				<span className={styles.label}>{label}</span>
				<span className={styles.value}>
					{Array.isArray(values) &&
						values?.map((val, index) => (
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
					min={min}
					max={max}
					step={step}
					style={{ width }}
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
				/>
			</div>
		</div>
	);
};
