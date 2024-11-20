import { useTheme } from '@/theme';
import styles from './UserTag.module.css';

interface IUserTag extends React.HTMLAttributes<HTMLDivElement> {
	Icon: React.FC | null;
	children: React.ReactNode;
}

export const UserTag = ({ Icon, children, ...props }: IUserTag) => {
	const theme = useTheme();
	return (
		<div
			className={styles.container}
			style={{ border: `1px solid ${theme.accent_color}` }}
			{...props}
		>
			{Icon && <Icon />}
			<span className={styles.tagText} style={{ color: theme.accent_color }}>
				{children}
			</span>
		</div>
	);
};
