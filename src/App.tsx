import { useEffect } from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Layout } from './components/layout/Layout';
import { useThemeStore } from './store/theme/useThemeStore';
import { updateCssVariables } from './theme';
import { themes } from './theme/themes';

function App() {
	const currentTheme = useThemeStore(state => state.theme);

	const isAuth = true;

	useEffect(() => {
		updateCssVariables(themes[currentTheme]);
	}, [currentTheme]);

	return (
		<Layout>
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
