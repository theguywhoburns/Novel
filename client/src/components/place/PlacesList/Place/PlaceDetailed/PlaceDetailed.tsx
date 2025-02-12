import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import {
	IconClock,
	IconDollar,
	IconGeoTag,
	IconPhone,
	IconStar,
} from '@/icons';
import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { usePlacesStore } from '@/store/places/usePlacesStore';
import { useTheme } from '@/theme';
import { distance } from '@/utils/distance';
import { updateGeoPosition } from '@/utils/updateGeoPosition';
import { useEffect } from 'react';
import { IPlace } from '../Place';
import styles from './PlaceDetailed.module.css';
import { PlaceInfoItem } from './PlaceInfoItem/PlaceInfoItem';

export const PlaceDetailed = ({
	id,
	image,
	name,
	rate,
	address,
	workingHours,
	approximateCost,
	phoneNumber,
	geoLat,
	geoLon,
	link,
}: IPlace) => {
	const theme = useTheme();

	const position = useGeoPositionStore(state => state.position);

	let distanceInKm = '';
	if (position) {
		distanceInKm = distance(
			geoLat,
			geoLon,
			position.geoLat,
			position.geoLon,
			'K'
		).toFixed(2);
	}

	const getPlace = usePlacesStore(state => state.getPlace);

	useEffect(() => {
		getPlace(Number(id));
	}, []);

	useEffect(() => {
		updateGeoPosition();
	}, []);

	const handleClick = () => {
		window.open(link, '_blank');
	};

	return (
		<div className={styles.placeDetailed}>
			<BottomButtonContainer gap='20px'>
				<div className={styles.container}>
					<img className={styles.img} src={image} />
					<h3 className={styles.name} style={{ color: theme.text_color }}>
						{name}
					</h3>

					<ul className={styles.placeInfoList}>
						<PlaceInfoItem Icon={<IconStar />} value={rate} separator='' />
						<PlaceInfoItem
							Icon={<IconGeoTag />}
							value={`${address}, ${position ? distanceInKm : '???'} км от вас`}
							separator=''
						/>

						{workingHours && (
							<PlaceInfoItem
								Icon={<IconClock />}
								title='Рабочие часы'
								value={`${workingHours[0]} - ${workingHours[1]}`}
							/>
						)}

						{approximateCost && (
							<PlaceInfoItem
								Icon={<IconDollar />}
								title='Средний чек'
								value={`от ${approximateCost} ₽`}
							/>
						)}

						{phoneNumber && (
							<PlaceInfoItem
								Icon={<IconPhone />}
								title='Номер телефона'
								value={`+${phoneNumber}`}
							/>
						)}
					</ul>
				</div>

				{link && (
					<RoundedButton className={styles.button} onClick={handleClick}>
						Забронировать
					</RoundedButton>
				)}
			</BottomButtonContainer>
		</div>
	);
};
