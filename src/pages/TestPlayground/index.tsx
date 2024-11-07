import { LabeledRadioButton, LabeledSwitch, RangeInput } from '@/components';
import { RoundedButton } from '@/components/RoundedButton/RoundedButton';
import { UsersList } from '@/components/UsersList/UsersList';
import IconCrystal from '@/icons/crystal.tsx';
import IconDiscard from '@/icons/discard.tsx';
import IconSettingsGear from '@/icons/settingsGear.tsx';
import IconShield from '@/icons/shield.tsx';
import { setTheme } from '@/theme';
import useThemeStore from '@/useThemeStore';
import { useState } from 'react';
import styles from './TestPlayground.module.css';

const TestPlayground = () => {
	const currentTheme = useThemeStore(state => state.theme);

	const switchTheme = () => {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	const [range, _] = useState([0, 50]);
	console.log(_); // SO IT DOESN'T FUCKING COMPLAIN
	const [checked, setChecked] = useState(false);

	const [selectedValue, setSelectedValue] = useState('aries');

	return (
		<div style={{ padding: '20px 20px 80px' }} className={styles.container}>
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

			
			<UsersList />
			
		</div>
	);
};

export default TestPlayground;
