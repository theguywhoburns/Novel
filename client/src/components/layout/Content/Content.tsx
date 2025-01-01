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

	const profilePathWithoutId = RouteNames.PROFILE.slice(0, 8);

	console.log(profilePathWithoutId);

	const isProfilePage = pathname.includes(profilePathWithoutId);

	console.log(isProfilePage, pathname, profilePathWithoutId);

	return (
		<main
			className={styles.content}
			style={{
				color: theme.text_color,
				backgroundColor: theme.background_color,
				padding: isChatPage
					? '5px 0 64px 0'
					: isProfilePage
					? '5px 0'
					: '5px 16px 16px',
				scrollbarWidth: isChatPage ? 'none' : 'auto',
			}}
		>
			{isChatPage ? (
				<>{children}</>
			) : (
				<div className={styles.contentInner}>{children}</div>
			)}
		</main>
	);
};
