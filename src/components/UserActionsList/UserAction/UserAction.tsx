import { Separator } from '@/components/TagsWithTitle/Separator/Separator';
import { IconArrow } from '@/icons/Arrow';
import { useTheme } from '@/theme';
import styles from './UserAction.module.css';

export interface IUserAction {
	title: string;
	onClick: () => void;
}

export const UserAction = ({ title, onClick }: IUserAction) => {
	const theme = useTheme();

	return (
		<li className={styles.userAction}>
			<div className={styles.container} onClick={onClick}>
				<div className={styles.actionAndArrow}>
					<span>{title}</span>
					<IconArrow
						color={theme.button_secondary_background_color}
						direction='right'
					/>
				</div>
			</div>
			<Separator />
		</li>
	);
};
