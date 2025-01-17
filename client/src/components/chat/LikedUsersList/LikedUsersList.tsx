import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { ILikedUser, LikedUser } from './LikedUser/LikedUser';
import styles from './LikedUsersList.module.css';

interface ILikedUsersList {
	likedUsers: ILikedUser[];
	noDataText: string;
}

export const LikedUsersList = ({ likedUsers, noDataText }: ILikedUsersList) => {
	return (
		<>
			{likedUsers.length ? (
				<ul className={styles.likedUsersList}>
					{likedUsers.map(user => (
						<LikedUser key={user.id} {...user} />
					))}
				</ul>
			) : (
				<NoDataText>{noDataText}</NoDataText>
			)}
		</>
	);
};
