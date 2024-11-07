import styles from './Content.module.css';

interface IContent {
	children: React.ReactNode;
}

export const Content = ({ children }: IContent) => {
	return <main className={styles.content}>{children}</main>;
};
