import styles from './NoDataText.module.css';

interface INoDataText extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
}

export const NoDataText = ({ children, ...props }: INoDataText) => {
	return (
		<p className={styles.noDataText} {...props}>
			{children}
		</p>
	);
};
