import { Switch, SwitchProps } from '@mui/material';

export const IOSSwitch = (props: SwitchProps) => (
	<Switch
		focusVisibleClassName='Mui-focusVisible'
		disableRipple
		{...props}
		classes={{
			root: 'MuiSwitch-root',
			switchBase: 'MuiSwitch-switchBase',
			thumb: 'MuiSwitch-thumb',
			track: 'MuiSwitch-track',
			checked: 'MuiSwitch-checked',
		}}
	/>
);
