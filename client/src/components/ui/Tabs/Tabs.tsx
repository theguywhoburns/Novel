// src/components/Tabs/Tabs.tsx
import { useTheme } from '@/theme';
import styles from './Tabs.module.css';

export interface ITab<T extends string> {
	label: T;
	displayedLabel: string;
}

interface ITabs<T extends string, F extends Function>
	extends React.HTMLAttributes<HTMLUListElement> {
	tabs: ITab<T>[];
	selectedTab: T;
	setSelectedTab: F;
}

export const Tabs = <T extends string, F extends Function>({
	tabs,
	selectedTab,
	setSelectedTab,
	...props
}: ITabs<T, F>) => {
	const theme = useTheme();

	const { className, ...otherProps } = props;

	return (
		<ul className={[styles.tabs, className].join(' ')} {...otherProps}>
			{tabs.map(({ label, displayedLabel }) => (
				<li key={displayedLabel}>
					<button
						className={styles.tab}
						style={{
							background:
								selectedTab === label
									? theme.accent_color
									: theme.button_background_color,
							color: selectedTab === label ? theme.white : theme.grey,
						}}
						key={label}
						onClick={() => setSelectedTab(label)}
					>
						{displayedLabel}
					</button>
				</li>
			))}
		</ul>
	);
};

export default Tabs;
