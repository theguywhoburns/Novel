import { useTheme } from '@/theme';
import styles from './Content.module.css';

interface IContent {
	children: React.ReactNode;
}

export const Content = ({ children }: IContent) => {
	const theme = useTheme();

	return (
		<main
			className={styles.content}
			style={{
				color: theme.text_color,
				backgroundColor: theme.background_color,
			}}
		>
			{children}
		</main>
	);
};
