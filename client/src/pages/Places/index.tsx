import { PlacesList } from '@/components/place/PlacesList/PlacesList';
import { IconFilter } from '@/icons';
import { usePlacesStore } from '@/store/places/usePlacesStore';
import { useEffect, useState } from 'react';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import styles from './Places.module.css';

// export const placesObj: Record<string, IPlace[]> = {
// 	parks: [
// 		{
// 			id: 1,
// 			name: 'Парк Победы',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 42,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание парка',
// 			address: 'ул. Победы, 1',
// 			workingHours: ['8:00', '20:00'],
// 		},
// 		{
// 			id: 2,
// 			name: 'Парк Космонавтов',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 41,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание парка',
// 			address: 'ул. Космонавтов, 2',
// 			workingHours: ['8:00', '21:00'],
// 		},
// 		{
// 			id: 3,
// 			name: 'Парк имени Ленина',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 43,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание парка',
// 			address: 'ул. Ленина, 3',
// 			workingHours: ['9:00', '19:00'],
// 		},
// 		{
// 			id: 4,
// 			name: 'Парк имени Калинина',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 42,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание парка',
// 			address: 'ул. Калинина, 4',
// 			workingHours: ['8:00', '22:00'],
// 		},
// 		{
// 			id: 5,
// 			name: 'Парк имени Горького',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 48,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание парка',
// 			address: 'ул. Горького, 5',
// 			workingHours: ['7:00', '20:00'],
// 		},
// 		{
// 			id: 6,
// 			name: 'Парк имени Чкалова',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 10,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание парка',
// 			address: 'ул. Чкалова, 6',
// 			workingHours: ['8:00', '21:00'],
// 		},
// 	],
// 	culture: [
// 		{
// 			id: 1,
// 			name: 'Музей Культуры',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 12,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание музея',
// 			address: 'ул. Культуры, 0',
// 			workingHours: ['10:00', '18:00'],
// 		},
// 		{
// 			id: 2,
// 			name: 'Музей Искусств',
// 			imgSrc:
// 				'https://istanbultourstudio.s3.amazonaws.com/uploads/media_content/picture/1213/medium_Istanbul_Modern_Museum_2023_New_Photos_9.jpg',
// 			rating: 22,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание музея',
// 			address: 'ул. Искусств, 1',
// 			workingHours: ['11:00', '19:00'],
// 		},
// 		{
// 			id: 3,
// 			name: 'Музей Архитектуры',
// 			imgSrc: '',
// 			rating: 42,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание музея',
// 			address: 'ул. Архитектуры, 2',
// 			workingHours: ['9:00', '17:00'],
// 		},
// 		{
// 			id: 4,
// 			name: 'Музей Литературы',
// 			imgSrc: '',
// 			rating: 48,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание музея',
// 			address: 'ул. Литературы, 3',
// 			workingHours: ['10:00', '18:00'],
// 		},
// 		{
// 			id: 5,
// 			name: 'Музей Музыки',
// 			imgSrc: '',
// 			rating: 46,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание музея',
// 			address: 'ул. Музыки, 4',
// 			workingHours: ['11:00', '19:00'],
// 		},
// 		{
// 			id: 6,
// 			name: 'Музей Театра',
// 			imgSrc: '',
// 			rating: 50,
// 			coords: {
// 				latitude: 55.914953,
// 				longitude: 37.832342,
// 			},
// 			description: 'Описание музея',
// 			address: 'ул. Театра, 5',
// 			workingHours: ['10:00', '18:00'],
// 		},
// 	],
// };

export const PlacesPage = () => {
	const placesObj = usePlacesStore(state => state.placesObj);
	const getPlacesObj = usePlacesStore(state => state.getPlacesObj);

	const [selectedTab, setSelectedTab] = useState('cafe');

	const tabs = [
		{ label: 'cafe', displayedLabel: 'Кафе' },
		{ label: 'bar', displayedLabel: 'Бары' },
		{ label: 'parks', displayedLabel: 'Парки' },
		{ label: 'movie', displayedLabel: 'Кино' },
		{ label: 'exhibition', displayedLabel: 'Выставки' },
		{ label: 'others', displayedLabel: 'Другое' },
	];

	useEffect(() => {
		getPlacesObj();
	}, []);

	return (
		<div className={styles.placesPage}>
			<div className={styles.container}>
				<button className={styles.filterButton}>
					<IconFilter />
				</button>
				<Tabs
					tabs={tabs}
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
			</div>
			<div className={styles.titledPlacesList}>
				<h3 className={styles.title}>Рекомендуемые места</h3>
				<PlacesList places={placesObj[selectedTab]} />
			</div>
		</div>
	);
};
