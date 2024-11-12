import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Layout } from './components/layout/Layout';
import { useThemeStore } from './store/theme/useThemeStore';
import { updateCssVariables } from './theme';
import { themes } from './theme/themes';

function App() {
	
	const currentTheme = useThemeStore(state => state.theme);

	const scrollRef = useRef<HTMLDivElement>(null);

	const isAuth = true;

	useEffect(() => {
		updateCssVariables(themes[currentTheme]);
	}, [currentTheme]);

	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

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
