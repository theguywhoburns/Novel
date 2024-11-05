import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeType } from './theme/themes';

export interface IUseThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const useThemeStore = create<IUseThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: ThemeType) => set({ theme }),
    }),
    {
      name: 'theme',
    }
  )
);

export default useThemeStore;
