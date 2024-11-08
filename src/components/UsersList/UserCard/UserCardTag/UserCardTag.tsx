import styles from './UserCardTag.module.css';

export interface ITag extends React.HTMLAttributes<HTMLDivElement> {
	id?: string;
	Icon: React.FC | null;
	children: React.ReactNode;
}

export const UserCardTag = ({ id, Icon, children, ...props }: ITag) => {
	const { className, ...otherProps } = props;

	return (
		<div id={id} className={`${styles.container} ${className}`} {...otherProps}>
			{Icon && <Icon />}
			<span className={styles.tagText}>{children}</span>
		</div>
	);
};
