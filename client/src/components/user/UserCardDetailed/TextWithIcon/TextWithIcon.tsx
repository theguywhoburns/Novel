import { useThemeStore } from '@/store/theme/useThemeStore';
import { useTheme } from '@/theme';
import React from 'react';
import styles from './TextWithIcon.module.css';

interface ITextWithIcon {
	Icon: React.ReactElement;
	children: React.ReactNode;
	color?: string;
}

export const TextWithIcon = ({ Icon, children, color }: ITextWithIcon) => {
	const theme = useTheme();
	const themeVariant = useThemeStore(state => state.theme);

	const textColor = themeVariant === 'light' ? theme.text_color : theme.grey;

	return (
		<div className={styles.textWithIcon}>
			{Icon}
			<p className={styles.text} style={{ color: color || textColor }}>
				{children}
			</p>
		</div>
	);
};
