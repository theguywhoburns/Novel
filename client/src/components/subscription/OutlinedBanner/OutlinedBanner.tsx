import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { useTheme } from '@/theme';
import styles from './OutlinedBanner.module.css';

interface IOutlinedBanner {
	title: string;
	listData: string[];
	price: number;
	color: string;
	gradientColor: string;
	onClick: () => void;
}

export const OutlinedBanner = ({
	title,
	listData,
	price,
	color,
	gradientColor,
	onClick,
}: IOutlinedBanner) => {
	const theme = useTheme();

	return (
		<div className={styles.bannerWrapper} style={{ background: gradientColor }}>
			<div
				className={styles.banner}
				style={{ background: theme.background_color }}
			>
				<h3 className={styles.title} style={{ backgroundImage: gradientColor }}>
					{title}
				</h3>
				<ul className={styles.list} style={{ color }}>
					{listData.map(item => (
						<li key={item}>{item}</li>
					))}
				</ul>
				<RoundedButton
					sx={{
						background: gradientColor,
						'&:hover': {
							background: gradientColor,
							color: theme.white,
						},
					}}
					onClick={onClick}
				>
					От {price} р
				</RoundedButton>
			</div>
		</div>
	);
};
