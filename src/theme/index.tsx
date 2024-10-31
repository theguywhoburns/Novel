
interface Theme {
    bg_color: string;
    text_color: string;
    button_bg_color: string;
    button_text_color: string;
    button_selected_bg_color: string;
    button_selected_text_color: string;
    settings_modal_background_color: string;
    
    icon_linear_gradient_stop_1: string;
    icon_linear_gradient_stop_2: string;
}
export const themes = {
    light: {
        bg_color: '#fdfefe',
        text_color: '#fb847a',
        normal_text_color: '#0a0f33',
        button_bg_color: '#f5f6fa',
        button_text_color: '#c7ccdf',
        button_selected_bg_color: '#fb847a',
        button_selected_text_color: '#fdfefe',
        settings_modal_background_color: '#fdfefe',

        icon_linear_gradient_stop_1: '#ff627e',
        icon_linear_gradient_stop_2: '#f4cd76',
    },
    dark: {
        bg_color: '#0a0f33',
        normal_text_color: '#fdfefe',
        text_color: '#c846de',
        button_bg_color: '#2f3452',
        button_text_color: '#c7ccdf',
        button_selected_bg_color: '#c846de',
        button_selected_text_color: '#0a0f33',
        settings_modal_background_color: '#454545',

        icon_linear_gradient_stop_1: '#ff627e',
        icon_linear_gradient_stop_2: '#f4cd76',
    },
};

export const SetTheme = (theme: Theme) => {
    for (const [key, value] of Object.entries(theme)) {
        const cssVariableName = `--theme-${key.replace(/_/g, '-')}`;
        document.documentElement.style.setProperty(cssVariableName, value);
    }
}
