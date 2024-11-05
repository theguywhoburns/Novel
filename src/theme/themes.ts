export type ThemeType = 'light' | 'dark';

export interface Theme {
    background_color: string;
    accent_color: string;
    text_color: string;
    secondary_text_color: string;
    button_background_color: string;
    button_text_color: string;
    button_selected_background_color: string;
    button_selected_text_color: string;
    settings_modal_background_color: string;
    
    icon_linear_gradient_stop_1: string;
    icon_linear_gradient_stop_2: string;

    white: string;
    semi_transparent_white: string;
    grey: string;
}

export const themes = {
    light: {
        background_color: '#fdfefe',
        accent_color: '#fb847a',
        text_color: '#0a0f33',
        secondary_text_color: '#575757',
        button_background_color: '#f5f6fa',
        button_text_color: '#c7ccdf',
        button_selected_background_color: '#fb847a',
        button_selected_text_color: '#fdfefe',
        settings_modal_background_color: '#fdfefe',

        icon_linear_gradient_stop_1: '#ff627e',
        icon_linear_gradient_stop_2: '#f4cd76',

        white: '#fdfefe',
        semi_transparent_white: '#FFFFFF4D',
        grey: '#C8CDDF',
    },
    dark: {
        background_color: '#0a0f33',
        accent_color: '#c946de',
        text_color: '#fdfefe',
        secondary_text_color: '#575757',//TODO: Fix for dark theme
        button_background_color: '#2f3452',
        button_text_color: '#c7ccdf',
        button_selected_background_color: '#c846de',
        button_selected_text_color: '#0a0f33',
        settings_modal_background_color: '#454545',

        icon_linear_gradient_stop_1: '#6A45D0',
        icon_linear_gradient_stop_2: '#C50AFC',

        white: '#fdfefe',
        semi_transparent_white: '#FFFFFF4D',
        grey: '#C8CDDF',
    },
} as const;
