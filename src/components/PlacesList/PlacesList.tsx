import { IPlace, Place } from './Place';
import styles from './PlacesList.module.css';

interface IPlacesList {
	places: IPlace[];
}

export const PlacesList = ({ places }: IPlacesList) => {
	return (
		<ul className={styles.placesList}>
			{places?.map(place => (
				<Place key={place.id} {...place} />
			))}
		</ul>
	);
};
