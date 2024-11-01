import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SetTheme } from './theme/index.tsx'
import { themes } from './theme/themes.ts'
SetTheme(localStorage.getItem('theme') === 'dark' ? themes.dark : themes.light);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
