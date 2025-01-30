import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { PowerUpButton } from '@/components/user/PowerUpButton/PowerUpButton';
import {
	IconIncognito,
	IconPowerUpCrystal,
	IconRocket,
	IconVerified,
} from '@/icons';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useTheme } from '@/theme';
import { useEffect } from 'react';
import styles from './MyProfilePage.module.css';

export const MyProfilePage = () => {
	const theme = useTheme();

	const userId = useLoginStore(state => state.userId);
	const user = useUsersStore(state => state.user);
	const setUser = useUsersStore(state => state.setUser);

	const getUserById = useUsersStore(state => state.getUserById);

	const { name, age, imgSrc, isVerified } = user;

	useEffect(() => {
		getUserById(userId, setUser);
	}, []);

	const handleClick = () => {};

	return (
		<div className={styles.myProfilePage}>
			<div className={styles.container}>
				<div className={styles.userCard}>
					<img
						className={styles.avatar}
						src={
							imgSrc ||
							'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ'
						}
						alt='avatar'
					/>
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

				<div
					className={styles.banner}
					style={{ border: `1px solid ${theme.accent_color}` }}
				>
					<h3 className={styles.title} style={{ color: theme.accent_color }}>
						Базовая подписка
					</h3>
					<ul className={styles.list} style={{ color: theme.accent_color }}>
						<li>Фильтр по возрасту и расстоянию</li>
						<li>Безлимитное количество свайпов</li>
						<li>Уменьшение комиссии на кристаллы</li>
					</ul>
					<RoundedButton onClick={handleClick}>От 100 р</RoundedButton>
				</div>
			</div>
		</div>
	);
};
