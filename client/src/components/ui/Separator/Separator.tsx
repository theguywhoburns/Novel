import { useTheme } from '@/theme';
import styles from './Separator.module.css';

interface ISeparator {
	marginY?: [number | string, number | string];
	direction?: 'horizontal' | 'vertical';
	color?: string;
}

export const Separator = ({
	marginY = [6, 6],
	direction = 'horizontal',
	color,
}: ISeparator) => {
	const theme = useTheme();

	const separatorColor = color || theme.separator_color;

	const [marginTop, marginBottom] = marginY;

	return (
		<div
			className={[styles.separator, styles[direction]].join(' ')}
			style={{
				backgroundColor: separatorColor,
				marginTop: marginTop !== undefined ? marginTop : marginY[0],
				marginBottom: marginBottom !== undefined ? marginBottom : marginY[1],
			}}
		/>
	);
};
