import Home from '@/pages/Home';
import TestPlayground from '@/pages/TestPlayground';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useEffect } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { UserCardDetailedPage } from './pages/Home/UserCardDetailedPage/UserCardDetailedPage';
import { updateCssVariables, useTheme } from './theme';
import { themes } from './theme/themes';
import useThemeStore from './useThemeStore';

function Places() {
	return <div>Places</div>;
}

function Chat() {
	return <div>Chat</div>;
}

function App() {
	const currentTheme = useThemeStore(state => state.theme);

	const theme = useTheme();

	useEffect(() => {
		updateCssVariables(themes[currentTheme]);
	}, [currentTheme]);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/places' element={<Places />} />
				<Route path='/nearby' element={<Chat />} />
				<Route path='/user/:id' element={<UserCardDetailedPage />} />
				<Route path='/test-playground' element={<TestPlayground />} />
			</Routes>

			<BottomNavigation
				style={{
					position: 'fixed',
					bottom: 0,
					backgroundColor: theme.background_color,
					justifyContent: 'space-between',
					left: 0,
					right: 0,
					height: 60,
				}}
				showLabels
			>
				<BottomNavigationAction
					label='Home'
					component={Link}
					to='/'
					sx={{ color: theme.text_color }}
				/>
				<BottomNavigationAction
					label='Places'
					component={Link}
					to='/places'
					sx={{ color: theme.text_color }}
				/>
				<BottomNavigationAction
					label='Chat'
					component={Link}
					to='/chat'
					sx={{ color: theme.text_color }}
				/>
				<BottomNavigationAction
					label='Testing playground'
					component={Link}
					to='/test-playground'
					sx={{ color: theme.text_color }}
				/>
			</BottomNavigation>
		</Router>
	);
}

export default App;
