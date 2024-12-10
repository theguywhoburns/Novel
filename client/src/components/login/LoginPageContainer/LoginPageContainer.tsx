import { ReactNode } from 'react';
import styles from './LoginPageContainer.module.css';

interface ILoginPageContainer {
	children: ReactNode;
}

export const LoginPageContainer = ({ children }: ILoginPageContainer) => {
	return <div className={styles.LoginPageContainer}>{children}</div>;
};
