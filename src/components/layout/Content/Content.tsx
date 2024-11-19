import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { useLocation } from 'react-router-dom';
import styles from './Content.module.css';

interface IContent {
	children: React.ReactNode;
}

export const Content = ({ children }: IContent) => {
	const theme = useTheme();

	const { pathname } = useLocation();

	const chatPathWithoutId = RouteNames.CHAT.slice(0, 6);

	const isChatPage = pathname.includes(chatPathWithoutId);

	return (
		<main
			className={styles.content}
			style={{
				color: theme.text_color,
				backgroundColor: theme.background_color,
				padding: isChatPage ? '5px 0 0 0' : '5px 20px 20px',
			}}
		>
			{children}
		</main>
	);
};
