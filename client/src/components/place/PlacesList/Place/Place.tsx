import { IconGeoTag, IconStar } from '@/icons';
import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { usePlacesStore } from '@/store/places/usePlacesStore';
import { useTheme } from '@/theme';
import { Rating } from '@/types/types';
import { distance } from '@/utils/distance';
import { useNavigate } from 'react-router-dom';
import styles from './Place.module.css';

export interface IPlace {
	id?: number;
	name: string;
	imgSrc: string;
	rating: Rating;
	workingHours: [string, string];
	description?: string;
	approximateCost?: number;
	phoneNumber?: string;
	address?: string;
	geoLat: number;
	geoLon: number;
	link?: string;
}

export const Place = ({
	id,
	name,
	imgSrc,
	rating,
	geoLat,
	geoLon,
	workingHours,
}: IPlace) => {
	const theme = useTheme();

	const navigate = useNavigate();

	const position = useGeoPositionStore(state => state.position);

	const setPlace = usePlacesStore(state => state.setPlace);

	let distanceInKm = '';
	if (position) {
		distanceInKm = distance(
			geoLat,
			geoLon,
			position?.geoLat,
			position?.geoLon,
			'K'
		).toFixed(2);
	}

	const formattedRating = rating / 10;

	const handleClick = () => {
		navigate(`/place/${id}`);
		setPlace({ id, name, imgSrc, rating, geoLat, geoLon, workingHours });
	};

	return (
		<li className={styles.place} onClick={handleClick}>
			<img className={styles.img} src={imgSrc} alt='place image' />
			<div className={styles.dataContainer}>
				<p className={styles.placeName} style={{ color: theme.white }}>
					{name}
				</p>

				<div className={styles.iconAndValue} style={{ color: theme.grey }}>
					<IconStar style={{ transform: 'scale(0.85)' }} />
					<span>{formattedRating}</span>
				</div>

				<div
					className={styles.iconAndValue}
					style={{ color: theme.grey, marginLeft: 2.5 }}
				>
					<IconGeoTag style={{ transform: 'scale(0.88)' }} />
					<span>{position ? distanceInKm : '???'} км от вас</span>
				</div>
			</div>
		</li>
	);
};
