import { UserCard } from '@/components/UsersList/UserCard/UserCard';
import { UsersList } from '@/components/UsersList/UsersList';
import IconCrystal from '@/icons/crystal.tsx';
import IconDiscard from '@/icons/discard.tsx';
import IconSettingsGear from '@/icons/settingsGear.tsx';
import IconShield from '@/icons/shield.tsx';
import { SetTheme } from '@/theme';
import { themes } from '@/theme/themes';

const TestPlayground = () => {
	const switchTheme = () => {
		const currentTheme = localStorage.getItem('theme');
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', newTheme);
		SetTheme(themes[newTheme]);
	};
	return (
		<>
			<button onClick={switchTheme}>Switch theme</button>
			<IconCrystal />
			<IconDiscard />
			<IconSettingsGear />
			<IconShield />

			<div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
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
		</>
	);
};

export default TestPlayground;
