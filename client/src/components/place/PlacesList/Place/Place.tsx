import { IconGeoTag, IconStar } from '@/icons';
import { RouteBase } from '@/routes';
import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { usePlacesStore } from '@/store/places/usePlacesStore';
import { useTheme } from '@/theme';
import { distance } from '@/utils/distance';
import { useNavigate } from 'react-router-dom';
import styles from './Place.module.css';

export interface IPlace {
	id?: number;
	categoryName: string;
	name: string;
	image: string;
	rate: number;
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
	categoryName,
	name,
	image,
	rate,
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

	const handleClick = () => {
		navigate(`${RouteBase.PLACE}/${id}`);
		setPlace({
			id,
			categoryName,
			name,
			image,
			rate,
			geoLat,
			geoLon,
			workingHours,
		});
	};

	return (
		<li className={styles.place} onClick={handleClick}>
			<img className={styles.img} src={image} alt='place image' />
			<div className={styles.dataContainer}>
				<p className={styles.placeName} style={{ color: theme.white }}>
					{name}
				</p>

				<div className={styles.iconAndValue} style={{ color: theme.grey }}>
					<IconStar style={{ transform: 'scale(0.85)' }} />
					<span>{rate}</span>
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
