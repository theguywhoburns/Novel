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

 const ref = useRef<HTMLDivElement>(null);

 const isAuth = true;

 useEffect(() => {
  updateCssVariables(themes[currentTheme]);
 }, [currentTheme]);

 const location = useLocation();

 useEffect(() => {
  ref.current?.scrollIntoView({ behavior: 'smooth' });
 }, [location, location.pathname]);

 return (
  <Layout>
   <div ref={ref} />
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