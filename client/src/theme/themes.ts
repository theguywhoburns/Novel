export type ThemeType = 'light' | 'dark';

export interface Theme {
	background_color: string;
	accent_color: string;
	text_color: string;
	high_contrast_text_color: string;
	low_contrast_text_color: string;
	secondary_text_color: string;
	button_background_color: string;
	button_text_color: string;
	button_selected_background_color: string;
	button_selected_text_color: string;
	button_secondary_background_color: string;
	settings_modal_background_color: string;
	separator_color: string;
	list_item_background_color: string;

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
		background_color: '#FDFEFE',
		accent_color: '#FB847B',
		text_color: '#575757',
		high_contrast_text_color: '#000000',
		low_contrast_text_color: '#C8CDDF',
		secondary_text_color: '#0A0F33',
		button_background_color: '#F5F6FA',
		button_text_color: '#C8CDDF',
		button_selected_background_color: '#FB847A',
		button_selected_text_color: '#FDFEFE',
		button_secondary_background_color: '#C8CDDF',
		settings_modal_background_color: '#FDFEFE',
		separator_color: '#C8CDDF',
		list_item_background_color: '#F9FAFD',

		icon_linear_gradient_stop_1: '#FF627E',
		icon_linear_gradient_stop_2: '#F4CD76',

		rounded_button_linear_gradiend_1: '#F4CD76',
		rounded_button_linear_gradiend_2: '#FF627E',

		white: '#FDFEFE',
		semi_transparent_white: '#FFFFFF4D',
		grey: '#C8CDDF',
	},
	dark: {
		background_color: '#0B1034',
		accent_color: '#C946DE',
		text_color: '#FDFEFE',
		high_contrast_text_color: '#FDFEFE',
		low_contrast_text_color: '#FDFEFE',
		secondary_text_color: '#FDFEFE',
		button_background_color: '#2F3452',
		button_text_color: '#C8CDDF',
		button_selected_background_color: '#C946DE',
		button_selected_text_color: '#0A0F33',
		button_secondary_background_color: '#A3A8BA4C',
		settings_modal_background_color: '#454545',
		separator_color: '#A3A8BA4D',
		list_item_background_color: '#2F3452',

		icon_linear_gradient_stop_1: '#6A45D0',
		icon_linear_gradient_stop_2: '#C50AFC',

		rounded_button_linear_gradiend_1: '#C50AFC',
		rounded_button_linear_gradiend_2: '#6A45D0',

		white: '#FDFEFE',
		semi_transparent_white: '#FFFFFF4D',
		grey: '#C8CDDF',
	},
} as const;
