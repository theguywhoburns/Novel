import { PairsList } from '@/components';
import { ChatsList } from '@/components/chat/ChatsList/ChatsList';
import { Separator } from '@/components/ui/Separator/Separator';
import { useTheme } from '@/theme';
import styles from './MessengerPage.module.css';

export const MessengerPage = () => {
	const theme = useTheme();

	return (
		<div className={styles.messengerPage}>
			<h2
				className={styles.titleWithMargin}
				style={{ color: theme.text_color }}
			>
				Новые пары
			</h2>
			<PairsList />

			<h2 className={styles.title} style={{ color: theme.text_color }}>
				Сообщения
			</h2>
			<Separator />
			<ChatsList />
		</div>
	);
};
