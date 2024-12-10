import { useTheme } from '@/theme';
import { ReactNode } from 'react';
import styles from './Explanation.module.css';

interface IExplanation {
	children: ReactNode;
	marginY?: [number | string, number | string];
}

export const Explanation = ({ children, marginY = [0, 0] }: IExplanation) => {
	const theme = useTheme();

	return (
		<label
			className={styles.explanation}
			style={{
				color: theme.grey,
				marginTop: marginY[0],
				marginBottom: marginY[1],
			}}
		>
			{children}
		</label>
	);
};
