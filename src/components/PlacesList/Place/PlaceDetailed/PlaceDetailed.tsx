import { useTheme } from '@/theme';
import { IPlace } from '..';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';

export const PlaceDetailed = ({ imgSrc, name, rating, address, workingHours, approximateCost, phoneNumber}: IPlace) => {
	const theme = useTheme();
	return (
		<div>
			<img src={imgSrc} />
			<div>
				<p style={{ color: theme.text_color, fontSize: 24, fontWeight: 600 }}>{name}</p>
				<p>{rating}</p>
				<p>Рабочие часы: {workingHours[0]} - {workingHours[1]}</p>
				<p>{address} { ", ? км от вас"/*TODO: добавить расстояние*/}</p>
				{approximateCost ?? <p>Средний чек: от {approximateCost} ₽</p>}
				{phoneNumber ?? <p>Номер телефона: +{phoneNumber}</p>}
			</div>
			<RoundedButton onClick={() => {}}>
				<p>Забронировать</p>
			</RoundedButton>
		</div>
	);
};
