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
	button_secondary_background_color: string;
	settings_modal_background_color: string;
	separator_color: string;

	icon_linear_gradient_stop_1: string;
	icon_linear_gradient_stop_2: string;

	rounded_button_linear_gradiend_1: string;
	rounded_button_linear_gradiend_2: string;

	white: string;
	semi_transparent_white: string;
	grey: string;
}

export const themes = {
	light: {
		background_color: '#fdfefe',
		accent_color: '#fb847a',
		text_color: '#575757',
		secondary_text_color: '#0a0f33',
		button_background_color: '#F5F6FA',
		button_text_color: '#C8CDDF',
		button_selected_background_color: '#fb847a',
		button_selected_text_color: '#fdfefe',
		button_secondary_background_color: '#C8CDDF',
		settings_modal_background_color: '#fdfefe',
		separator_color: '#C8CDDF',

		icon_linear_gradient_stop_1: '#ff627e',
		icon_linear_gradient_stop_2: '#f4cd76',

		rounded_button_linear_gradiend_1: '#f4cd76',
		rounded_button_linear_gradiend_2: '#ff627e',

		white: '#fdfefe',
		semi_transparent_white: '#FFFFFF4D',
		grey: '#C8CDDF',
	},
	dark: {
		background_color: '#0b1034',
		accent_color: '#c946de',
		text_color: '#fdfefe',
		secondary_text_color: '#fdfefe',
		button_background_color: '#2f3452',
		button_text_color: '#C8CDDF',
		button_selected_background_color: '#c846de',
		button_selected_text_color: '#0a0f33',
		button_secondary_background_color: '#A3A8BA4C',
		settings_modal_background_color: '#454545',
		separator_color: '#A3A8BA4D',

		icon_linear_gradient_stop_1: '#6A45D0',
		icon_linear_gradient_stop_2: '#C50AFC',

		rounded_button_linear_gradiend_1: '#C50AFC',
		rounded_button_linear_gradiend_2: '#6A45D0',

		white: '#fdfefe',
		semi_transparent_white: '#FFFFFF4D',
		grey: '#C8CDDF',
	},
} as const;
