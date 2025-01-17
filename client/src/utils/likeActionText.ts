import {
	ITabConfigurations,
	LikeTabsLabels,
} from '@/pages/Messenger/LikesPage/LikesPage';

export const getActionText = (
	selectedUsersLength: number,
	tabLabel: LikeTabsLabels,
	tabConfigurations: ITabConfigurations
) => {
	const config = tabConfigurations[tabLabel];

	if (!config) {
		return '';
	}

	if (selectedUsersLength === 0) {
		return config.noDataText;
	}

	const { pluralForms } = config;

	const pluralForm =
		selectedUsersLength === 1
			? pluralForms[0] // If 1, use singular
			: selectedUsersLength > 1 && selectedUsersLength < 5
			? pluralForms[1] // If from 2 to 4, use dual
			: pluralForms[2]; // Otherwise use plural form

	return `У Вас ${selectedUsersLength} ${pluralForm}`;
};
