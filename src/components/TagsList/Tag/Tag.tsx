import styles from './Tag.module.css';

export interface ITag extends React.HTMLAttributes<HTMLLIElement> {
	id: string;
	Icon: React.FC | null;
	children: React.ReactNode;
}

export const Tag = ({ id, Icon, children, ...props }: ITag) => {
	const { className, ...otherProps } = props;

	return (
		<li id={id} className={`${styles.container} ${className}`} {...otherProps}>
			{Icon && <Icon />}
			<span className={styles.tagText}>{children}</span>
		</li>
	);
};
