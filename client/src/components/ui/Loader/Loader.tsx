import { useTheme } from '@/theme';
import { CircularProgress } from '@mui/material';
import styles from './Loader.module.css';

interface ILoader extends React.HTMLAttributes<HTMLDivElement> {}

export const Loader = ({ ...props }: ILoader) => {
	const theme = useTheme();

	return (
		<div className={styles.loaderWrapper} {...props}>
			<CircularProgress sx={{ color: theme.accent_color }} />
		</div>
	);
};
