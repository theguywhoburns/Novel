import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { UserCardDetailed } from '@/components/user/UserCardDetailed/UserCardDetailed';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserCardDetailedPage.module.css';

export const UserCardDetailedPage = () => {
	const visitingUser = useUsersStore(state => state.visitingUser);
	const setVisitingUser = useUsersStore(state => state.setVisitingUser);

	const getUserById = useUsersStore(state => state.getUserById);

	const { id } = useParams();

	useEffect(() => {
		getUserById(Number(id), setVisitingUser);
		console.log(id);
	}, []);

	return (
		<div className={styles.UserCardDetailedPage}>
			{visitingUser?.id ? (
				<UserCardDetailed {...visitingUser} />
			) : (
				<NoDataText>Пользователь не найден</NoDataText>
			)}
		</div>
	);
};
