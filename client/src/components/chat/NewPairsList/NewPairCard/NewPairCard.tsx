import { Pair } from '../../Pair/Pair';
import { INewPair } from '../NewPairsList';
import styles from './NewPairCard.module.css';

export const NewPairCard = ({ imgSrc, name, age }: INewPair) => {
	return (
		<Pair
			renderImage={() => (
				<img
					className={styles.img}
					src={
						imgSrc ||
						'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ'
					}
					alt='avatar'
				/>
			)}
			renderText={() => (
				<p className={styles.nameAndAge}>
					<span className={styles.name}> {name},</span>
					<span className={styles.age}>{age}</span>
				</p>
			)}
			isButton={false}
		/>
	);
};
