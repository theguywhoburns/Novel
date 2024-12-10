import { useTheme } from '@/theme';
import { useEffect, useRef } from 'react';
import styles from './Timer.module.css';

interface ITimer extends React.HTMLAttributes<HTMLDivElement> {
	remainingTime: number;
	setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

export const Timer = ({
	remainingTime,
	setRemainingTime,
	...props
}: ITimer) => {
	const theme = useTheme();

	const animationFrameId = useRef<number | null>(null);
	const lastTimeRef = useRef<number>(performance.now());

	const updateTimer = () => {
		const currentTime = performance.now();
		const delta = currentTime - lastTimeRef.current;

		if (delta >= 1000) {
			setRemainingTime(prev => Math.max(prev - 1, 0));
			lastTimeRef.current = currentTime;
		}

		animationFrameId.current = requestAnimationFrame(updateTimer);
	};

	useEffect(() => {
		if (remainingTime > 0) {
			animationFrameId.current = requestAnimationFrame(updateTimer);
		}

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [remainingTime]);

	const minutes = Math.floor(remainingTime / 60);
	const seconds = remainingTime % 60;

	const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
		seconds
	).padStart(2, '0')}`;

	return (
		<div style={{ color: theme.accent_color }} {...props}>
			<span className={styles.time}>{formattedTime}</span>
		</div>
	);
};
