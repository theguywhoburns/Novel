import { BackButton } from '@/components/ui/BackButton/BackButton';
import { useTheme } from '@/theme';
import styles from './ChatHeader.module.css';

export const ChatHeader = () => {
	const theme = useTheme();

	const recipientUser = {
		id: 2,
		imgSrc:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ',
		name: 'Алиса',
		age: 23,
		isPopular: false,
		search: '',
		job: '',
		distance: '',
		isVerified: false,
		gender: 'female',
		city: '',
		about: '',
		main: [],
		languages: [],
		interests: [],
	};

	const { name, age, gender, imgSrc } = recipientUser;

	return (
		<header className={styles.header}>
			<BackButton />
			<div className={styles.recipientInfo}>
				<div style={{ color: theme.high_contrast_text_color }}>
					<span>{name},</span>
					<span>{age}</span>
				</div>

				<span className={styles.online} style={{ color: theme.grey }}>
					{gender === 'female' ? 'Была ' : 'Был '} недавно
				</span>
			</div>
			<img className={styles.avatar} src={imgSrc} alt='avatar' />
		</header>
	);
};
