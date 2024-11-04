import { TagsList } from '@/components/TagsList/TagsList';
import { IUser } from '../../UsersList';
import styles from './UserCardDetailed.module.css';

export const UserCardDetailed = ({
	imgSrc,
	isPopular,
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
		<div className={styles.container}>
			<p>
				{imgSrc} {isPopular} {name} {age} {search} {job} {distance} {about}
				{main[0].children} {languages[0].children} {interests[0].children}{' '}
				{about} {main[0].children}
			</p>

			<img src={imgSrc} />

			<div>
				<p>
					<span>{name}</span>
					<span>{age}</span>
				</p>
				{isVerified && <p>Verified</p>}
			</div>

			<div>
				<p>
					<span>{search}</span>
					<span>{job}</span>
					<span>{gender}</span>
					<span>{city}</span>
					<span>{distance}</span>
				</p>
			</div>

			<div>about...</div>

			<p>{main.map(el => el.children)}</p>

			<TagsList tags={main} />
		</div>
	);
};
