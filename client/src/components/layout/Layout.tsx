import { useTheme } from '@/theme';
import { BottomNav } from './BottomNav/BottomNav';
import { Content } from './Content/Content';
import styles from './Layout.module.css';
import { RouteLayouts } from '@/routes';
import { useLocation } from 'react-router-dom';

interface ILayout {
	children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
	const theme = useTheme();
	const { pathname } = useLocation();
	console.log(pathname);
	const paths = pathname.split('/');
	const path = paths.length > 2 ? paths.slice(0, 2).join('/') : paths.join('/');
	console.log(path);
	const [Header, showBottomNav] = RouteLayouts[path];
	
	return (
		<div
			className={styles.wrapper}
			style={{ backgroundColor: theme.background_color }}
		>
			<Header />
			<Content>{children}</Content>
			<BottomNav show={showBottomNav} />
		</div>
	);
};
