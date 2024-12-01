import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import {
	IconClock,
	IconDollar,
	IconGeoTag,
	IconPhone,
	IconStar,
} from '@/icons';
import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { useTheme } from '@/theme';
import { distance } from '@/utils/distance';
import { IPlace } from '../Place';
import styles from './PlaceDetailed.module.css';
import { PlaceInfoItem } from './PlaceInfoItem/PlaceInfoItem';

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
		distanceInKm = distance(
			coords[0],
			coords[1],
			position.latitude,
			position.longitude,
			'K'
		).toFixed(2);
	}

	const handleClick = () => {};

	return (
		<div className={styles.placeDetailed}>
			<div>
				<img className={styles.img} src={imgSrc} />
				<h3 className={styles.name} style={{ color: theme.text_color }}>
					{name}
				</h3>

				<ul className={styles.placeInfoList}>
					<PlaceInfoItem
						Icon={<IconStar />}
						value={formattedRating}
						separator=''
					/>
					<PlaceInfoItem
						Icon={<IconGeoTag />}
						value={`${address}, ${position ? distanceInKm : '???'} км от вас`}
						separator=''
					/>
					<PlaceInfoItem
						Icon={<IconClock />}
						title='Рабочие часы'
						value={`${workingHours[0]} - ${workingHours[1]}`}
					/>
					<PlaceInfoItem
						Icon={<IconDollar />}
						title='Средний чек'
						value={`от ${approximateCost} ₽`}
					/>
					<PlaceInfoItem
						Icon={<IconPhone />}
						title='Номер телефона'
						value={`+${phoneNumber}`}
					/>
				</ul>
			</div>

			<RoundedButton className={styles.button} onClick={handleClick}>
				Забронировать
			</RoundedButton>
		</div>
	);
};
