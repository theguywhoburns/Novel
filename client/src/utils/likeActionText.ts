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

	// Get the last digit of selectedUsersLength
	const lastDigit = selectedUsersLength % 10;
	const lastTwoDigits = selectedUsersLength % 100;

	let pluralForm = pluralForms[2];

	if (lastTwoDigits > 10 && lastTwoDigits < 15) {
		pluralForm = pluralForms[2];
	} else {
		if (lastDigit === 1) {
			pluralForm = pluralForms[0];
		} else if (lastDigit >= 2 && lastDigit <= 4) {
			pluralForm = pluralForms[1];
		} else {
			pluralForm = pluralForms[2];
		}
	}

	return `У Вас ${selectedUsersLength} ${pluralForm}`;
};
