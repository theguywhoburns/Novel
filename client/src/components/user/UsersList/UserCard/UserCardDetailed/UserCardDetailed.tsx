import { Separator } from '@/components/ui/Separator/Separator';
import { UserActionsList } from '@/components/ui/UserActionsList/UserActionsList';
import { TagsWithTitle } from '@/components/user/TagsWithTitle/TagsWithTitle';
import { IconVerified } from '@/icons';
import { useTheme } from '@/theme';
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
	const theme = useTheme();

	return (
		<div className={styles.container}>
			<img className={styles.img} src={imgSrc} />

			<div
				className={styles.nameAndAgeContainer}
				style={{ color: theme.accent_color }}
			>
				<span className={styles.name}>{name}</span>
				<span className={styles.age}>{age}</span>

				{isVerified && <IconVerified />}
			</div>

			<div className={styles.mainInfoContainer}>
				<p className={styles.search} style={{ color: theme.accent_color }}>
					{search}
				</p>
				<p>{job}</p>
				<p>{gender}</p>
				<p>{city}</p>
				<p>{distance}</p>
			</div>

			<Separator />

			<h3>Обо мне</h3>
			<p className={styles.about} style={{ color: theme.accent_color }}>
				{about}
			</p>

			<Separator />

			<TagsWithTitle title='Основное' tags={main} />
			<TagsWithTitle title='Языки, которые я владею' tags={languages} />
			<TagsWithTitle title='Мои интересы' tags={interests} />

			<UserActionsList />
		</div>
	);
};
