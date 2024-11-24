import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { useTheme } from '@/theme';
import { IPlace } from '../Place';
import styles from './PlaceDetailed.module.css';
import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { distance } from '@/utils/distance';
import { IconStar } from '@/icons';


export const PlaceDetailed = ({
	imgSrc,
	name,
	rating,
	address,
	workingHours,
	approximateCost,
	phoneNumber,
	coords,
}: IPlace) => {
	const theme = useTheme();

	const formattedRating = rating / 10;

	const position = useGeoPositionStore(state => state.position);
	let distanceInKm = '';
	if (position) {
		distanceInKm = distance(coords[0], coords[1], position.latitude, position.longitude, 'K').toFixed(2);
	}

	return (
		<div>
			<img className={styles.img} src={imgSrc} />
			<div>
				<p style={{ color: theme.text_color, fontSize: 24, fontWeight: 600 }}>
					{name}
				</p>
				<p><IconStar/>{formattedRating}</p>
				<p>
					Рабочие часы: {workingHours[0]} - {workingHours[1]}
				</p>
				<p>
					{address};{' '+(position ? distanceInKm: '???')} км от вас
				</p>
				{approximateCost ?? <p>Средний чек: от {approximateCost} ₽</p>}
				{phoneNumber ?? <p>Номер телефона: +{phoneNumber}</p>}
			</div>
			<RoundedButton onClick={() => {}}>
				<p>Забронировать</p>
			</RoundedButton>
		</div>
	);
};
