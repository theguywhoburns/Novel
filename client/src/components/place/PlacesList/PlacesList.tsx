import { Loader } from '@/components/ui/Loader/Loader';
import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { IPlace, Place } from './Place/Place';
import styles from './PlacesList.module.css';

interface IPlacesList {
	places: IPlace[];
}

export const PlacesList = ({ places }: IPlacesList) => {
	const position = useGeoPositionStore(state => state.position);

	return (
		<>
			{position ? (
				<ul className={styles.placesList}>
					{places?.map(place => (
						<Place key={place.id} {...place} />
					))}
				</ul>
			) : (
				<Loader />
			)}
		</>
	);
};
