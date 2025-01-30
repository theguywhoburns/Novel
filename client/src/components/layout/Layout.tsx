import { routeLayouts } from '@/routes';
import { useTheme } from '@/theme';
import { useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav/BottomNav';
import { Content } from './Content/Content';
import styles from './Layout.module.css';

interface ILayout {
	children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
	const theme = useTheme();
	const { pathname } = useLocation();

	const paths = pathname.split('/');
	const path = paths.length > 2 ? paths.slice(0, 2).join('/') : paths.join('/');

	const [Header, showBottomNav] = routeLayouts[path];

	return (
		<div
			className={styles.wrapper}
			style={{ backgroundColor: theme.background_color }}
		>
			{Header}
			<Content>{children}</Content>
			<BottomNav show={showBottomNav} />
		</div>
	);
};
