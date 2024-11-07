import useThemeStore from '@/useThemeStore';
import { Theme, themes, ThemeType } from './themes';

export const updateCssVariables = (theme: Theme) => {
	for (const [key, value] of Object.entries(theme)) {
		const cssVariableName = `--theme-${key.replace(/_/g, '-')}`;
		document.documentElement.style.setProperty(cssVariableName, value);
	}
};

export const useTheme = (theme: ThemeType | undefined = undefined) => {
	const storedTheme = useThemeStore(state => state.theme);
	if (theme === undefined) theme = storedTheme;
	return themes[theme];
};

export const setTheme = (theme: ThemeType) => {
	useThemeStore.getState().setTheme(theme);
	updateCssVariables(themes[theme]);
};
