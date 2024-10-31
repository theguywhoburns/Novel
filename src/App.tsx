import './App.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';

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
      </Routes>

      <BottomNavigation
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'black',
          border: '1px solid white',
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
          sx={{ color: 'white' }} 
        />
        <BottomNavigationAction 
          label="Places" 
          component={Link} 
          to="/places" 
          sx={{ color: 'white' }} 
        />
        <BottomNavigationAction 
          label="Chat" 
          component={Link} 
          to="/chat" 
          sx={{ color: 'white' }} 
        />
      </BottomNavigation>
    </Router>
  );
}

export default App;