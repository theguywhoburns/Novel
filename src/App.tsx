import Home from '@/pages/Home';
import TestPlayground from '@/pages/TestPlayground';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { UserCardDetailedPage } from './pages/Home/UserCardDetailedPage/UserCardDetailedPage';
import { updateCssVariables } from './theme';
import useThemeStore from './useThemeStore';
import { useEffect } from 'react';
import { themes } from './theme/themes';

function Places() {
	return <div>Places</div>;
}

function Chat() {
	return <div>Chat</div>;
}

function App() {
	const currentTheme = useThemeStore(state => state.theme);
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
					backgroundColor: 'var(--theme-background-color)',
					border: '1px solid var(--theme-text-color)',
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
					sx={{ color: 'var(--theme-normal-text-color)' }}
				/>
				<BottomNavigationAction
					label='Places'
					component={Link}
					to='/places'
					sx={{ color: 'var(--theme-normal-text-color)' }}
				/>
				<BottomNavigationAction
					label='Chat'
					component={Link}
					to='/chat'
					sx={{ color: 'var(--theme-normal-text-color)' }}
				/>
				<BottomNavigationAction
					label='Testing playground'
					component={Link}
					to='/test-playground'
					sx={{ color: 'var(--theme-normal-text-color)' }}
				/>
			</BottomNavigation>
		</Router>
	);
}

export default App;
