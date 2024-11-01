import { Theme } from "./themes";

export const SetTheme = (theme: Theme) => {
    for (const [key, value] of Object.entries(theme)) {
        const cssVariableName = `--theme-${key.replace(/_/g, '-')}`;
        document.documentElement.style.setProperty(cssVariableName, value);
    }
}
