import { LabeledRadioButton, LabeledSwitch, RangeInput } from '@/components';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { UsersList } from '@/components/UsersList/UsersList';
import * as Icons from '@/icons';
import { useThemeStore } from '@/store/theme/useThemeStore';
import { setTheme, useTheme } from '@/theme';
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
	const theme = useTheme();
	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
			<RoundedButton onClick={switchTheme}>Switch theme</RoundedButton>
			<div style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 30,
				alignItems: 'center',
				overflow: 'hidden',
				maxWidth: '70vw',
				padding: 10,
				backgroundColor: "#FFFFFF2A",
				border: `3px solid ${theme.accent_color}`,
				borderRadius: 20,
			}}>
				{
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					Object.entries(Icons).map(([_, Component], index) => (
						<Component 
							key={index} 
							color={theme.accent_color}
							focused
						/>
					))
				}
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					marginBottom: 30,
					maxWidth: 600,
					padding: 10,
					backgroundColor: "#FFFFFF2A",
					border: `3px solid ${theme.accent_color}`,
					borderRadius: 20,
				}}
			>
				<div style={{ color: theme.accent_color }}>Range input</div>
				<div style={{ width: '100%', height: 1, backgroundColor: theme.grey }} />
				<RangeInput
					label={''}
					min={range[0]}
					max={range[1]}
					step={1}
					unit={'units'}
				/>
				<div style={{ color: theme.accent_color }}>Labeled switch</div>
				<div style={{ width: '100%', height: 1, backgroundColor: theme.grey }} />
				<LabeledSwitch
					label='checked'
					value={checked}
					onChange={() => setChecked(prev => !prev)}
				/>

				<div style={{ color: theme.accent_color }}>Labeled radio buttons</div>
				<div style={{ width: '100%', height: 1, backgroundColor: theme.grey }} />
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
				<div style={{ color: theme.accent_color }}>Rounded button</div>
				<div style={{ width: '100%', height: 1, backgroundColor: theme.grey }} />
				<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
					<RoundedButton onClick={() => console.log('clicked')}>Click me</RoundedButton>
				</div>
			</div>

			<div style={{ display: 'grid', placeItems: 'center' }}>
				<UsersList />
			</div>
		</div>
	);
};

export default TestPlayground;
