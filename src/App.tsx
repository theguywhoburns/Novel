import './App.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TestPlayground from '@/pages/TestPlayground';
import Home from '@/pages/Home';

function Places() {
  return <div>Places</div>;
}

function Chat() {
  return <div>Chat</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/nearby" element={<Chat />} />
        <Route path="/test-playground" element={<TestPlayground />} />
      </Routes>

      <BottomNavigation
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'var(--theme-bg-color)',
          border: '1px solid var(--theme-text-color)',
          justifyContent: 'space-between',
          left: 0,
          right: 0,
        }}
        showLabels
      >
        <BottomNavigationAction 
          label="Home" 
          component={Link} 
          to="/" 
          sx={{ color: 'var(--theme-normal-text-color)' }} 
        />
        <BottomNavigationAction 
          label="Places" 
          component={Link} 
          to="/places" 
          sx={{ color: 'var(--theme-normal-text-color)' }} 
        />
        <BottomNavigationAction 
          label="Chat" 
          component={Link} 
          to="/chat" 
          sx={{ color: 'var(--theme-normal-text-color)' }} 
        />
      </BottomNavigation>
    </Router>
  );
}

export default App;