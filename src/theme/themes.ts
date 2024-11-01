export interface Theme {
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
        highlight_text_color: '#fb847a',
        text_color: '#0a0f33',
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
        highlight_text_color: '#c846de',
        text_color: '#fdfefe',
        button_bg_color: '#2f3452',
        button_text_color: '#c7ccdf',
        button_selected_bg_color: '#c846de',
        button_selected_text_color: '#0a0f33',
        settings_modal_background_color: '#454545',

        icon_linear_gradient_stop_1: '#6A45D0',
        icon_linear_gradient_stop_2: '#C50AFC',
    },
};
