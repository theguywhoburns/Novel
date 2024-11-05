import { TagsWithTitle } from '@/components/TagsWithTitle/TagsWithTitle';
import { IUser } from '../../UsersList';
import styles from './UserCardDetailed.module.css';

export const UserCardDetailed = ({
	imgSrc,
	name,
	age,
	search,
	job,
	distance,
	about,
	main,
	languages,
	interests,
	isVerified,
	gender,
	city,
}: IUser) => {
	return (
		<div className={[styles.container, 'secondary-text'].join(' ')}>
			<img src={imgSrc} />

			<div className={styles.nameAndAgeContainer}>
				<span className={styles.name}>{name}</span>
				<span className={styles.age}>{age}</span>

				{isVerified && <p>Verified</p>}
			</div>

			<div className={styles.mainInfoContainer}>
				<p>{search}</p>
				<p>{job}</p>
				<p>{gender}</p>
				<p>{city}</p>
				<p>{distance}</p>
			</div>

			<h3>Обо мне</h3>
			<p className={styles.about}>{about}</p>

			<TagsWithTitle title='Основное' tags={main} />
			<TagsWithTitle title='Языки, которые я владею' tags={languages} />
			<TagsWithTitle title='Мои интересы' tags={interests} />
		</div>
	);
};
