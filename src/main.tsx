import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SetTheme, themes } from './theme/index.tsx'
SetTheme(localStorage.getItem('theme') === 'dark' ? themes.dark : themes.light);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
