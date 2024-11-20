import { SafeArea } from 'capacitor-plugin-safe-area';
import { useEffect } from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Layout } from './components/layout/Layout';
import { useScrollRef } from './hooks/useScrollRef';
import { useThemeStore } from './store/theme/useThemeStore';
import { updateCssVariables } from './theme';
import { themes } from './theme/themes';

function App() {
	const currentTheme = useThemeStore(state => state.theme);

	const scrollRef = useScrollRef({ behavior: 'auto', includePathname: true });

	const isAuth = true;

	useEffect(() => {
		updateCssVariables(themes[currentTheme]);
	}, [currentTheme]);

	const getInsets = async () => {
		try {
			const insetsValues = await SafeArea.getSafeAreaInsets();
			for (const [key, value] of Object.entries(insetsValues.insets)) {
				document.documentElement.style.setProperty(
					`--safe-area-inset-${key}`,
					`${value}px`
				);
			}

			console.log(insetsValues);
		} catch (error) {
			console.error('Error getting safe area insets:', error);
		}

		try {
			const statusBarHeight = await SafeArea.getStatusBarHeight();
			console.log(statusBarHeight, 'statusbarHeight');
		} catch (error) {
			console.error('Error getting status bar height:', error);
		}

		try {
			await SafeArea.removeAllListeners();
		} catch (error) {
			console.error('Error removing listeners:', error);
		}

		try {
			await SafeArea.addListener('safeAreaChanged', data => {
				const { insets } = data;
				for (const [key, value] of Object.entries(insets)) {
					document.documentElement.style.setProperty(
						`--safe-area-inset-${key}`,
						`${value}px`
					);
				}
				console.log('Updated safe area insets:', insets);
			});
		} catch (error) {
			console.error('Error adding listener:', error);
		}
	};

	useEffect(() => {
		getInsets();
	}, []);

	return (
		<Layout>
			<div ref={scrollRef} />
			<AppRouter isAuth={isAuth} />
			<style>
				{`
        :root {
          color-scheme: ${currentTheme === 'light' ? 'light' : 'dark'};
        }`}
			</style>
		</Layout>
	);
}

export default App;
