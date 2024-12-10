import { ReactNode } from 'react';
import styles from './Form.module.css';

interface IForm {
	children: ReactNode;
}

export const Form = ({ children }: IForm) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{children}
		</form>
	);
};
