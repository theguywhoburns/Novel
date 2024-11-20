import { ThemeType } from '@/theme/themes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IUseThemeStore {
	theme: ThemeType;
	setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<IUseThemeStore>()(
	persist(
		set => ({
			theme: 'light',
			setTheme: (theme: ThemeType) => set({ theme }),
		}),
		{
			name: 'theme',
		}
	)
);
