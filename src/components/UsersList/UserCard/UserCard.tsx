import { motion } from 'framer-motion';
import styles from './UserCard.module.css';

export interface IUserCard {
	imgSrc: string;
	isPopular: boolean;
	name: string;
	age: number;
	search: string;
	job: string;
	distance: string;
	style?: React.CSSProperties;
}

export const UserCard = ({
	imgSrc,
	isPopular,
	name,
	age,
	search,
	job,
	distance,
	style,
}: IUserCard) => {
	return (
		<motion.li
			className={styles.userCard}
			style={style}
			initial={{ opacity: 0, x: 0 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			drag
			dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
			dragElastic={0.8}
		>
			<img src={imgSrc} />
			{isPopular && <span className={styles.popular}>Popular</span>}
			<div className={styles.infoContainer}>
				<div className={styles.nameAndAge}>
					<span className={styles.name}>{name}</span>
					<span className={styles.age}>{age}</span>
				</div>
				<p>{search}</p>
				<p>{job}</p>
				<p>{distance}</p>
			</div>
		</motion.li>
	);
};
