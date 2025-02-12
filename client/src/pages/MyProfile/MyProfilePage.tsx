import { PowerUpButton } from '@/components/user/PowerUpButton/PowerUpButton';
import { useUserId } from '@/hooks/useUserId';
import {
	IconIncognito,
	IconPowerUpCrystal,
	IconRocket,
	IconVerified,
} from '@/icons';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useTheme } from '@/theme';
import { getAvatar } from '@/utils/getAvatar';
import { useEffect } from 'react';
import { Banners } from './Banners/Banners';
import styles from './MyProfilePage.module.css';

export const MyProfilePage = () => {
	const theme = useTheme();

	const userId = useUserId();

	const user = useUsersStore(state => state.user);
	const setUser = useUsersStore(state => state.setUser);

	const getUserById = useUsersStore(state => state.getUserById);

	const { name, age, uploadedImages, isVerified } = user;

	useEffect(() => {
		getUserById(userId, setUser);
	}, []);

	const avatarUrl = getAvatar(uploadedImages, ';') as string;

	useEffect(() => {
		console.log('IMAGES: ', uploadedImages);
		console.log('AVATAR: ', avatarUrl);
	}, [uploadedImages, avatarUrl]);

	return (
		<div className={styles.myProfilePage}>
			<div>
				<div className={styles.userCard}>
					<img className={styles.avatar} src={avatarUrl} alt='avatar' />
					<p className={styles.nameAndAge} style={{ color: theme.dark_grey }}>
						<span>{name},</span>
						<span className={styles.age}>{age}</span>
						{isVerified && <IconVerified />}
					</p>
				</div>

				<div className={styles.powerUpButtons}>
					<PowerUpButton Icon={<IconRocket />} textColor='#DA30F6'>
						Получить Бусты
					</PowerUpButton>
					<PowerUpButton Icon={<IconPowerUpCrystal />} textColor='#1CD0F8'>
						Магазин Кристаллов
					</PowerUpButton>
					<PowerUpButton Icon={<IconIncognito />} textColor='#934EEF'>
						Невидимый режим
					</PowerUpButton>
				</div>

				<Banners />
			</div>
		</div>
	);
};
