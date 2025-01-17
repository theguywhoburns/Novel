import { UserCardDetailed } from '@/components/user/UserCardDetailed/UserCardDetailed';
import { IUser } from '@/components/user/UsersList/UsersList';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserCardDetailedPage.module.css';

export const UserCardDetailedPage = () => {
	const users = useUsersStore(state => state.users);
	const getUserById = useUsersStore(state => state.getUserById);

	const { id } = useParams();

	useEffect(() => {
		getUserById(Number(id));
	}, []);

	const user: IUser | undefined = users.find(
		(user: IUser) => user.id === parseInt(id ?? '')
	);

	// const User = useUsersStore(state => state.user);

	return (
		<div className={styles.page}>
			{user?.id ? <UserCardDetailed {...user} /> : <p>User not found</p>}
		</div>
	);
};
