// src/components/Tabs/Tabs.tsx
import { useTheme } from '@/theme';
import styles from './Tabs.module.css';

interface ITab {
	type: string;
	label: string;
}

interface ITabs {
	tabs: ITab[];
	selectedTab: string;
	onSelectTab: (type: string) => void;
}

export const Tabs = ({ tabs, selectedTab, onSelectTab }: ITabs) => {
	const theme = useTheme();

	return (
		<ul className={styles.tabs}>
			{tabs.map(({ type, label }) => (
				<li>
					<button
						className={styles.tab}
						style={{
							background:
								selectedTab === type
									? theme.accent_color
									: theme.button_background_color,
							color: selectedTab === type ? theme.white : theme.grey,
						}}
						key={type}
						onClick={() => onSelectTab(type)}
					>
						{label}
					</button>
				</li>
			))}
		</ul>
	);
};

export default Tabs;
