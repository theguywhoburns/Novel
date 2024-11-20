import { useTheme } from '@/theme';
import styles from './Separator.module.css';

interface ISeparator {
	marginY?: [number | string, number | string];
}

export const Separator = ({ marginY = [6, 6] }: ISeparator) => {
	const theme = useTheme();

	const [marginTop, marginBottom] = marginY;

	return (
		<div
			className={styles.separator}
			style={{
				backgroundColor: theme.separator_color,
				marginTop: marginTop !== undefined ? marginTop : marginY[0],
				marginBottom: marginBottom !== undefined ? marginBottom : marginY[1],
			}}
		/>
	);
};
