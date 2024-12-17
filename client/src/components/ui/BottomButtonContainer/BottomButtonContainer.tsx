import React from 'react';
import styles from './BottomButtonContainer.module.css';

interface IBottomButtonContainer {
	children: React.ReactNode;
	gap?: number | string;
}

export const BottomButtonContainer = ({
	children,
	gap,
}: IBottomButtonContainer) => {
	return (
		<div
			className={styles.bottomButtonContainer}
			style={{ gap: gap ?? '50px' }}
		>
			{children}
		</div>
	);
};
