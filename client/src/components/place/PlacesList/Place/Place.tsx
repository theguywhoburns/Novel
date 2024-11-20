import { IconGeoTag, IconStar } from '@/icons';
import { useTheme } from '@/theme';
import { Rating } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import styles from './Place.module.css';

export interface IPlace {
	id?: number;
	name: string;
	imgSrc: string;
	rating: Rating;
	workingHours: [number, number] | [string, string];
	description?: string;
	approximateCost?: number;
	phoneNumber?: string;
	address?: string; // We will use open street map to get the latitude and longitude from this address
}

export const Place = ({ id, name, imgSrc, rating }: IPlace) => {
	const theme = useTheme();

	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/place/${id}`);
	};

	const formattedRating = rating / 10;

	return (
		<li className={styles.place} onClick={handleClick}>
			<img className={styles.img} src={imgSrc} alt='place image' />
			<div className={styles.dataContainer}>
				<p className={styles.placeName} style={{ color: theme.white }}>
					{name}
				</p>

				<div className={styles.iconAndValue} style={{ color: theme.grey }}>
					<IconStar />
					<span>{formattedRating}</span>
				</div>

				<div className={styles.iconAndValue} style={{ color: theme.grey }}>
					<IconGeoTag />
					<span>? км от вас</span>
				</div>
			</div>
		</li>
	);
};
