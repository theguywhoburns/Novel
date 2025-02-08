import { IUser } from '@/components/user/UsersList/UsersList';
import { RouteBase } from '@/routes';
import { useTheme } from '@/theme';
import { getAvatar } from '@/utils/getAvatar';
import { useNavigate } from 'react-router-dom';
import styles from './LikedUser.module.css';

export interface ILikedUser
	extends Pick<IUser, 'id' | 'uploadedImages' | 'name' | 'age'> {}

export const LikedUser = ({ ...user }: ILikedUser) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const { id, uploadedImages, name, age } = user;

	const avatarUrl = getAvatar(uploadedImages);

	const handleClick = () => {
		navigate(`${RouteBase.PROFILE}/${id}`);
	};

	return (
		<li className={styles.likedUser} onClick={handleClick}>
			<img
				className={styles.img}
				src={
					avatarUrl ||
					'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ'
				}
				alt='avatar'
			/>
			<span className={styles.nameAndAge} style={{ color: theme.white }}>
				<span className={styles.name}>{name},</span>
				<span className={styles.age}>{age}</span>
			</span>
		</li>
	);
};
