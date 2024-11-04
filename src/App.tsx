import './App.css';
import { BottomNavigation, BottomNavigationAction, createTheme, extendTheme, ThemeOptions, ThemeProvider} from '@mui/material';
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
  const themes: Record<string, ThemeOptions> = {
    light: {
        palette: {
            mode: 'light',
            primary: {
                main: '#1976d2',
                contrastText: '#fff',
            },
            secondary: {
                main: '#9c27b0',
                contrastText: '#fff',
            },
            background: {
                default: '#fdfefe',
                paper: '#fdfefe',
            },
            text: {
                primary: '#0a0f33',
                secondary: '#c7ccdf',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#f5f6fa',
                        color: '#c7ccdf',
                        '&.Mui-selected': {
                            backgroundColor: '#fb847a',
                            color: '#fdfefe',
                        },
                    },
                },
            },
        },
        custom: {
            iconLinearGradient: {
                stop1: '#ff627e',
                stop2: '#f4cd76',
            },
        },
    },
    dark: {
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
                contrastText: '#fff',
            },
            secondary: {
                main: '#9c27b0',
                contrastText: '#fff',
            },
            background: {
                default: '#0a0f33',
                paper: '#454545',
            },
            text: {
                primary: '#fdfefe',
                secondary: '#c7ccdf',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#2f3452',
                        color: '#c7ccdf',
                        '&.Mui-selected': {
                            backgroundColor: '#c846de',
                            color: '#0a0f33',
                        },
                    },
                },
            },
        },
        custom: {
            iconLinearGradient: {
                stop1: '#6A45D0',
                stop2: '#C50AFC',
            },
        },
    },
  };
  if(localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'light');
  }
  const mode = localStorage.getItem('theme');
  let theme = createTheme(themes[mode as keyof typeof themes]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/nearby" element={<Chat />} />
          <Route path="/test-playground" element={<TestPlayground />} />
        </Routes>

        <BottomNavigation
          style={{
            position: 'fixed',
            bottom: 0,
            backgroundColor: 'var(--theme-bg-color)',
            border: '1px solid var(--theme-text-color)',
            justifyContent: 'space-between',
            left: 0,
            right: 0,
            height: 60
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
          <BottomNavigationAction 
            label="Test Playground" 
            component={Link} 
            to="/test-playground" 
            sx={{ color: 'var(--theme-normal-text-color)' }} 
          />
        </BottomNavigation>
      </Router>
    </ThemeProvider>
  );
}

export default App;