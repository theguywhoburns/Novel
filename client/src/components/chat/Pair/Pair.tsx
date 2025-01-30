import styles from './Pair.module.css';

interface IPair
	extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
	renderImage: () => React.ReactNode;
	renderText: () => React.ReactNode;
	isButton?: boolean;
}

export const Pair = ({
	renderImage,
	renderText,
	isButton = false,
	...props
}: IPair) => {
	const content = (
		<div className={styles.pair}>
			{renderImage()}
			{renderText()}
		</div>
	);

	return (
		<>
			{isButton ? (
				<button className={styles.button} {...props}>
					{content}
				</button>
			) : (
				<div className={styles.card} {...props}>
					{content}
				</div>
			)}
		</>
	);
};
