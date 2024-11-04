import styles from './UserTag.module.css';

interface IUserTag extends React.HTMLAttributes<HTMLDivElement> {
	Icon: React.FC | null;
	children: React.ReactNode;
}

export const UserTag = ({ Icon, children, ...props }: IUserTag) => {
	return (
		<div className={styles.container} {...props}>
			{Icon && <Icon />}
			<span className={styles.tagText}>{children}</span>
		</div>
	);
};
