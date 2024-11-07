import { IconPopular } from '@/icons/Popular';
import { motion } from 'framer-motion';
import { Tag } from '../../TagsList/Tag/Tag';
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
	onClick?: () => void;
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
	onClick,
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
			dragElastic={1}
			onClick={onClick}
		>
			<img src={imgSrc} />
			{isPopular && (
				<Tag className={styles.popularTag} Icon={IconPopular}>
					Popular
				</Tag>
			)}
			<div className={styles.infoContainer}>
				<div className={styles.nameAndAge}>
					<span className={styles.name}>{name}</span>
					<span className={styles.age}>{age}</span>
				</div>
				<p className={styles.search}>{search}</p>
				<p className={styles.job}>{job}</p>
				<p className={styles.distance}>{distance}</p>
			</div>
		</motion.li>
	);
};
