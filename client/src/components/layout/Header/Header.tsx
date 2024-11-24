import { IconLogo, IconSettingsGear, IconShield } from '@/icons';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { Link, useLocation } from 'react-router-dom';
import { ChatHeader } from './ChatHeader/ChatHeader';
import styles from './Header.module.css';

export const Header = () => {
	const theme = useTheme();

	const isChatPage = useLocation().pathname.includes(
		RouteNames.CHAT.slice(0, 6)
	);

	return (
		<>
			{isChatPage && <ChatHeader />}
			{!isChatPage && (
				<header
					className={styles.header}
					style={{ backgroundColor: theme.background_color }}
				>
					<Link to='/'>
						<IconLogo style={{ width: 140, height: 50 }} />
					</Link>

					<div className={styles.buttonsWrapper}>
						<Link
							to='/'
							className={styles.link}
							style={{ backgroundColor: theme.button_background_color }}
						>
							<IconShield />
						</Link>

						<Link
							to='/settings'
							className={styles.link}
							style={{ backgroundColor: theme.button_background_color }}
						>
							<IconSettingsGear />
						</Link>
					</div>
				</header>
			)}
		</>
	);
};
