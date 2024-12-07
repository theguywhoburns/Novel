import { useEffect } from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Layout } from './components/layout/Layout';
import { useScrollRef } from './hooks/useScrollRef';
import { useThemeStore } from './store/theme/useThemeStore';
import { updateCssVariables } from './theme';
import { themes } from './theme/themes';
import { updateCity, updateGeoPosition } from './utils/updateGeoPosition';

function App() {
	const currentTheme = useThemeStore(state => state.theme);
	const scrollRef = useScrollRef({ behavior: 'auto', includePathname: true });
	const isAuth = true;

	useEffect(() => {
		updateCssVariables(themes[currentTheme]);
	}, [currentTheme]);

	useEffect(() => {
		updateGeoPosition();
		updateCity();
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
