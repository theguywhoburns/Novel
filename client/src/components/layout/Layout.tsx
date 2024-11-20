import { useTheme } from '@/theme';
import { BottomNav } from './BottomNav/BottomNav';
import { Content } from './Content/Content';
import { Header } from './Header/Header';
import styles from './Layout.module.css';

interface ILayout {
	children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
	const theme = useTheme();

	return (
		<div
			className={styles.wrapper}
			style={{ backgroundColor: theme.background_color }}
		>
			<Header />
			<Content>{children}</Content>
			<BottomNav />
		</div>
	);
};
