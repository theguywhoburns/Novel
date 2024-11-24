import { IconGeoTag} from '@/icons';
import { useTheme } from '@/theme';
import { Rating } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import styles from './Place.module.css';
import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { distance } from '@/utils/distance';
import { IconLilStar } from '@/icons';

export interface IPlace {
	id?: number;
	name: string;
	imgSrc: string;
	rating: Rating;
	workingHours: [string, string];
	description?: string;
	approximateCost?: number;
	phoneNumber?: string;
	address?: string; // We will use open street map to get the latitude and longitude from this address
	coords: [number,number]; // latitude, longtitude
}

export const Place = ({ id, name, imgSrc, rating, coords }: IPlace) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/place/${id}`);
	};

	const position = useGeoPositionStore(state => state.position);
	let distanceInKm = '';
	if (position) {
		distanceInKm = distance(coords[0], coords[1], position.latitude, position.longitude, 'K').toFixed(2);
	}

	const formattedRating = rating / 10;

	return (
		<li className={styles.place} onClick={handleClick}>
			<img className={styles.img} src={imgSrc} alt='place image' />
			<div className={styles.dataContainer}>
				<p className={styles.placeName} style={{ color: theme.white }}>
					{name}
				</p>

				<div className={styles.iconAndValue} style={{ color: theme.grey }}>
					<IconLilStar />
					<span>{formattedRating}</span>
				</div>

				<div className={styles.iconAndValue} style={{ color: theme.grey }}>
					<IconGeoTag />
					<span>{position ? distanceInKm : '???'} км от вас</span>
				</div>
			</div>
		</li>
	);
};
