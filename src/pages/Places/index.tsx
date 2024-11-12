import { PlacesList } from '@/components/PlacesList/PlacesList';
import { IconFilter } from '@/icons';
import { useState } from 'react';
import { IPlace } from '../../components/PlacesList/Place';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import styles from './Places.module.css';

export const placesObj: Record<string, IPlace[]> = {
	parks: [
		{
			id: 1,
			name: 'Парк Победы',
			imgSrc: 'https://via.placeholder.com/100',
			rating: 4.5,
			description: 'Описание парка',
			address: 'ул. Победы, 1',
			workingHours: ['8:00', '20:00'],
		},
		{
			id: 2,
			name: 'Парк Космонавтов',
			imgSrc: 'https://via.placeholder.com/100',
			rating: 4.1,
			description: 'Описание парка',
			address: 'ул. Космонавтов, 2',
			workingHours: ['8:00', '21:00'],
		},
		{
			id: 3,
			name: 'Парк имени Ленина',
			imgSrc: 'https://via.placeholder.com/100',
			rating: 4.3,
			description: 'Описание парка',
			address: 'ул. Ленина, 3',
			workingHours: ['9:00', '19:00'],
		},
		{
			id: 4,
			name: 'Парк имени Калинина',
			imgSrc: 'https://via.placeholder.com/100',
			rating: 4.2,
			description: 'Описание парка',
			address: 'ул. Калинина, 4',
			workingHours: ['8:00', '22:00'],
		},
		{
			id: 5,
			name: 'Парк имени Горького',
			imgSrc: 'https://via.placeholder.com/100',
			rating: 4.8,
			description: 'Описание парка',
			address: 'ул. Горького, 5',
			workingHours: ['7:00', '20:00'],
		},
		{
			id: 6,
			name: 'Парк имени Чкалова',
			imgSrc: 'https://via.placeholder.com/100',
			rating: 4.6,
			description: 'Описание парка',
			address: 'ул. Чкалова, 6',
			workingHours: ['8:00', '21:00'],
		},
	],
	culture: [
		{
			id: 1,
			name: 'Музей Культуры',
			imgSrc: '',
			rating: 4.7,
			description: 'Описание музея',
			address: 'ул. Культуры, 0',
			workingHours: ['10:00', '18:00'],
		},
		{
			id: 2,
			name: 'Музей Искусств',
			imgSrc: '',
			rating: 4.3,
			description: 'Описание музея',
			address: 'ул. Искусств, 1',
			workingHours: ['11:00', '19:00'],
		},
		{
			id: 3,
			name: 'Музей Архитектуры',
			imgSrc: '',
			rating: 4.2,
			description: 'Описание музея',
			address: 'ул. Архитектуры, 2',
			workingHours: ['9:00', '17:00'],
		},
		{
			id: 4,
			name: 'Музей Литературы',
			imgSrc: '',
			rating: 4.8,
			description: 'Описание музея',
			address: 'ул. Литературы, 3',
			workingHours: ['10:00', '18:00'],
		},
		{
			id: 5,
			name: 'Музей Музыки',
			imgSrc: '',
			rating: 4.6,
			description: 'Описание музея',
			address: 'ул. Музыки, 4',
			workingHours: ['11:00', '19:00'],
		},
		{
			id: 6,
			name: 'Музей Театра',
			imgSrc: '',
			rating: 4.9,
			description: 'Описание музея',
			address: 'ул. Театра, 5',
			workingHours: ['10:00', '18:00'],
		},
	],
};

export const Places = () => {
	const [placeType, setPlaceType] = useState('parks');

	const tabs = [
		{ type: 'parks', label: 'Парки' },
		{ type: 'culture', label: 'Культура' },
		{ type: 'coffee shops', label: 'Кофейни' },
		{ type: 'restaurants', label: 'Рестораны' },
	];

	return (
		<>
			<div className={styles.placesHeader}>
				<button className={styles.filterButton}>
					<IconFilter />
				</button>
				<Tabs tabs={tabs} selectedTab={placeType} onSelectTab={setPlaceType} />
			</div>
			<h3>Рекомендуемые места</h3>
			<PlacesList places={placesObj[placeType]} />
		</>
	);
};
