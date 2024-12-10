import { BackButton } from '@/components/ui/BackButton/BackButton';
import { useTheme } from '@/theme';
import styles from './BackHeader.module.css';

interface IBackHeader {
	title?: string;
}

export const BackHeader = ({ title }: IBackHeader) => {
	const theme = useTheme();

	return (
		<header className={styles.backHeader}>
			<BackButton />
			<h3 className={styles.title} style={{ color: theme.accent_color }}>
				{title}
			</h3>
		</header>
	);
};
