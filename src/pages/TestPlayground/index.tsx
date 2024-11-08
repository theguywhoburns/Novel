import { LabeledRadioButton, LabeledSwitch, RangeInput } from '@/components';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { UsersList } from '@/components/UsersList/UsersList';
import IconCrystal from '@/icons/Crystal';
import IconDiscard from '@/icons/Discard';
import IconSettingsGear from '@/icons/SettingsGear';
import IconShield from '@/icons/Shield';
import { useThemeStore } from '@/store/theme/useThemeStore';
import { setTheme } from '@/theme';
import { useState } from 'react';

const TestPlayground = () => {
	const currentTheme = useThemeStore(state => state.theme);

	const switchTheme = () => {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	const [range] = useState([0, 50]);

	const [checked, setChecked] = useState(false);

	const [selectedValue, setSelectedValue] = useState('aries');

	return (
		<div>
			<RoundedButton onClick={switchTheme}>Switch theme</RoundedButton>
			<IconCrystal />
			<IconDiscard />
			<IconSettingsGear />
			<IconShield />

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 50,
					marginBottom: 30,
					maxWidth: 600,
				}}
			>
				<RangeInput
					label={''}
					min={range[0]}
					max={range[1]}
					step={1}
					unit={'units'}
				/>
				<LabeledSwitch
					label='checked'
					value={checked}
					onChange={() => setChecked(prev => !prev)}
				/>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
					<LabeledRadioButton
						label='aries'
						selectedValue={selectedValue}
						setSelectedValue={() => setSelectedValue('aries')}
					/>
					<LabeledRadioButton
						label='other'
						selectedValue={selectedValue}
						setSelectedValue={() => setSelectedValue('other')}
					/>
				</div>
			</div>

			<div style={{ display: 'grid', placeItems: 'center' }}>
				<UsersList />
			</div>
		</div>
	);
};

export default TestPlayground;
