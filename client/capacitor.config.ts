import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Layout } from './components/layout/Layout';
import { useScrollRef } from './hooks/useScrollRef';
import { RouteNames } from './routes';
import { useLoginStore } from './store/login/useLoginStore';
import { useThemeStore } from './store/theme/useThemeStore';
import { updateCssVariables } from './theme';
import { themes } from './theme/themes';
import { updateCity, updateGeoPosition } from './utils/updateGeoPosition';

function App() {
	const currentTheme = useThemeStore(state => state.theme);
	const scrollRef = useScrollRef({
		behavior: 'instant',
		includePathname: true,
	});

	const isAuth = useLoginStore(state => state.isAuth);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate(RouteNames.LOGIN_EMAIL);
		}
	}, [isAuth]);

	useEffect(() => {
		updateCssVariables(themes[currentTheme]);
	}, [currentTheme]);

	useEffect(() => {
		if (isAuth) {
			updateGeoPosition();
			updateCity();
		}
	}, []);

	return (
		<Layout>
			<div ref={scrollRef} />
			<AppRouter />
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
