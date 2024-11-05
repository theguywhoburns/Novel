import { UserCardDetailed } from '@/components/UsersList/UserCard/UserCardDetailed/UserCardDetailed';
import { IUser, users } from '@/components/UsersList/UsersList';
import { useParams } from 'react-router-dom';
import styles from './UserCardDetailedPage.module.css';

export const UserCardDetailedPage = () => {
	const { id } = useParams();
	const user: IUser | undefined = users.find(
		(user: IUser) => user.id === parseInt(id ?? '')
	);

	return (
		<div className={styles.page}>
			{user?.id ? (
				<UserCardDetailed
					id={user.id}
					imgSrc={user.imgSrc}
					isPopular={user.isPopular}
					name={user.name}
					age={user.age}
					search={user.search}
					job={user.job}
					distance={user.distance}
					about={user.about}
					main={user.main}
					languages={user.languages}
					interests={user.interests}
					isVerified={user.isVerified}
					gender={user.gender}
					city={user.city}
				/>
			) : (
				<p>User not found</p>
			)}
		</div>
	);
};
