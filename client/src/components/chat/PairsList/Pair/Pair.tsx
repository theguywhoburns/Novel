import { IPair } from '../PairsList';
import styles from './Pair.module.css';

export const Pair = ({ imgSrc, name, age }: IPair) => {
	return (
		<li className={styles.pair}>
			<img className={styles.img} src={imgSrc} alt='avatar' />
			<div className={styles.nameAndAge}>
				<span className={styles.name}>{name},</span>
				<span className={styles.age}>{age}</span>
			</div>
		</li>
	);
};
