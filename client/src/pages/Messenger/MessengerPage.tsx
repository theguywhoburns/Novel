import { PairsList } from '@/components';
import { ChatsList } from '@/components/chat/ChatsList/ChatsList';
import { Separator } from '@/components/ui/Separator/Separator';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import styles from './MessengerPage.module.css';

export const MessengerPage = () => {
	const theme = useTheme();

	const navigate = useNavigate();

	const handleClick = () => {
		navigate(RouteNames.LIKES);
	};

	return (
		<div className={styles.messengerPage}>
			<h2
				className={styles.titleWithMargin}
				style={{ color: theme.text_color }}
			>
				Новые пары
			</h2>
			<div>
				<p onClick={handleClick} style={{ color: theme.accent_color }}>
					Посмотреть лайки
				</p>
				<PairsList />
			</div>

			<h2 className={styles.title} style={{ color: theme.text_color }}>
				Сообщения
			</h2>
			<Separator />
			<ChatsList />
		</div>
	);
};
