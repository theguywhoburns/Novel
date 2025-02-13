import { RouteBase } from '@/routes';
import { useNavigate } from 'react-router-dom';
import { Pair } from '../../Pair/Pair';
import { INewPair } from '../NewPairsList';
import styles from './NewPairCard.module.css';
import { getAvatar } from '@/utils/getAvatar';

export const NewPairCard = ({ id, imgSrc, name, age }: INewPair) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`${RouteBase.PROFILE}/${id}`);
	};

	const avatar = getAvatar(imgSrc);

	return (
		<Pair
			className={styles.newPairCard}
			renderImage={() => (
				<img
					className={styles.img}
					src={avatar}
					alt='avatar'
				/>
			)}
			renderText={() => (
				<p className={styles.nameAndAge}>
					<span className={styles.name}>{name},</span>
					<span className={styles.age}>{age}</span>
				</p>
			)}
			onClick={handleClick}
			isButton={false}
		/>
	);
};
