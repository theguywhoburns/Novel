import React from 'react';
import styles from './BottomButtonContainer.module.css';

interface IBottomButtonContainer {
	children: React.ReactNode;
}

export const BottomButtonContainer = ({ children }: IBottomButtonContainer) => {
	return <div className={styles.bottomButtonContainer}>{children}</div>;
};
