import { LabeledRadioButton, LabeledSwitch, RangeInput } from '@/components';
import { UserCard } from '@/components/UsersList/UserCard/UserCard';
import { UsersList } from '@/components/UsersList/UsersList';
import { UserTag } from '@/components/UserTag/UserTag';
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
	console.log(_);
	const [checked, setChecked] = useState(false);

	const [selectedValue, setSelectedValue] = useState('ariew');

	return (
		<div style={{ padding: '20px 20px 80px' }} className={styles.container}>
			<button onClick={switchTheme}>Switch theme</button>
			<IconCrystal />
			<IconDiscard />
			<IconSettingsGear />
			<IconShield />

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					gap: 50,
					marginBottom: 30,
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

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: 50,
					marginBottom: 30,
				}}
			>
				<UserCard
					imgSrc='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SEhUPDw8VFRUVFRUVFRUVFQ8VFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKys3KysrKysrKysrKysrKysrKysrK//AABEIAOAA4AMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAABAAIEBQP/xAAWEAEBAQAAAAAAAAAAAAAAAAAAARH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APVRWJEkQRCBYigZJxAFiQDFjSwGUcQCFIFixIFEoQCSBJIEKQBRxYARxYCShAIyLACNQBYiARowEMawAE0MAIgEigBSoBJAqCAbwmIGU0MBI4AWJEGUcWAEUARAIFUAYkCwYUASQJJALCECWIg+mBpUAK1FAZxNLAAw4gCKwBQSDKIBIgEkgCIBJIAigCVQJJA+yKwAqQCwHCABQDERgBYbEDJOAAGgAqIBRJAEbACSVAIgFEkDoxFAA0ABWAEjVgMrCqARAJmtDAQIsAVQgECAVFMQBKoEDUARAOlHEAxFABWhgBEAgbEARADCgAVIoKs1oALFaayCqSBAqgFUgCKB1IoBgaABFAzUUARABGoGUQCsGEAFiqgAU2AAjQAKQApAEkDrSIAFAEQAqOIBYDQCSQBJAEQABoBAoGaCASSAJIEkgdiMAJWJAEQARABGgECgZVIBM1oAA0KA0GABUqgCSAJEAkgdoaQDAVgBFAyjQASQAEAgagASBUKgECAQSwFQgCVSBJIHckgBSoAFAKKQCBABJABSKCBAAEAhDgAVIAYyiASFAggHekgQIBAgECACSAAgECACQoCpACKqAVGoAQqgQVVBaggegkASQoJIAgloIIAkqAS0UaBrNNrNBIIEKgBCAKpUAlaKgISB/9k='
					isPopular={true}
					name='John Doe'
					age={25}
					search='Search'
					job='Software Engineer'
					distance='5 km'
					style={{ display: 'block' }}
				/>

				<UsersList />
			</div>

			<UserTag Icon={IconShield}>tag</UserTag>
		</div>
	);
};

export default TestPlayground;
