import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { AppRouter } from './AppRouter';
import { Layout } from './components/layout/Layout';
import { useScrollRef } from './hooks/useScrollRef';
import { RouteNames } from './routes';
import { useLoginStore } from './store/login/useLoginStore';
import { useThemeStore } from './store/theme/useThemeStore';
import { updateCssVariables } from './theme';
import { themes } from './theme/themes';
import { getServerUrl } from './utils/serverUrl';
import { updateCity, updateGeoPosition } from './utils/updateGeoPosition';

function App() {
	const currentTheme = useThemeStore(state => state.theme);
	const scrollRef = useScrollRef({
		behavior: 'instant',
		includePathname: true,
	});
	const navigate = useNavigate();

	const isAuth = useLoginStore(state => state.isAuth);

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
		console.log(
			'Launching in ',
			process.env.NODE_ENV === 'development' ? 'debug' : 'production',
			' mode'
		);
		console.log('Server url: ', getServerUrl());
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
