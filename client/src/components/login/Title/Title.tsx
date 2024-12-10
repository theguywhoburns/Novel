import { useTheme } from '@/theme';
import { ReactNode } from 'react';
import styles from './Title.module.css';

interface ITitle {
	children: ReactNode;
}

export const Title = ({ children }: ITitle) => {
	const theme = useTheme();

	return (
		<h3 className={styles.title} style={{ color: theme.text_color }}>
			{children}
		</h3>
	);
};
