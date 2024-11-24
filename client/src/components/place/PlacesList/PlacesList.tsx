import { updateGeoPosition } from '@/utils/updateGeoPosition';
import { IPlace, Place } from './Place/Place';
import styles from './PlacesList.module.css';
import { useEffect } from 'react';

interface IPlacesList {
	places: IPlace[];
}

export const PlacesList = ({ places }: IPlacesList) => {
	useEffect(() => {
		updateGeoPosition();
	}, []);
	return (
		<ul className={styles.placesList}>
			{places?.map(place => (
				<Place key={place.id} {...place} />
			))}
		</ul>
	);
};
