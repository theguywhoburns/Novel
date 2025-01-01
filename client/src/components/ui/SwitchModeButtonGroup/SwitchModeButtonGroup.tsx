import { useTheme } from '@/theme';
import { ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import { RoundedButton } from '../RoundedButton/RoundedButton';

interface ISwitchModeButtonGroupProps<T extends string>
	extends ToggleButtonGroupProps {
	values: T[];
	displayValues?: string[];
	value?: T;
	setValue: (value: T) => void;
}

export const SwitchModeButtonGroup = <T extends string>({
	values,
	displayValues,
	value,
	setValue,
	sx,
	...props
}: ISwitchModeButtonGroupProps<T>) => {
	const theme = useTheme();

	return (
		<ToggleButtonGroup
			sx={{
				backgroundColor: theme.button_background_color,
				borderRadius: '50px',
				width: 'fit-content',
				padding: '0 10px',
				...sx,
			}}
			value={value}
			exclusive
			{...props}
		>
			{values.map((val, index) => (
				<RoundedButton
					sx={{
						padding: '7px 30px',
						margin: '0 -10px',
						zIndex: value === val ? 2 : 1,
					}}
					onClick={() => setValue(val)}
					variant={value === val ? 'contained' : 'text'}
					key={val}
					value={val}
				>
					{displayValues && displayValues[index] ? displayValues[index] : val}
				</RoundedButton>
			))}
		</ToggleButtonGroup>
	);
};
