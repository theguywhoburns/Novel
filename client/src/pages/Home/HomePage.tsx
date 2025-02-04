import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { UserActionButtons } from '@/components/user/UserActionButtons/UserActionButtons';
import { UsersList } from '@/components/user/UsersList/UsersList';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useSettingsStore } from '@/store/settings/useSettingsStore';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useTheme } from '@/theme';
import { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Home.module.css';

export const HomePage = () => {
	const theme = useTheme();

	const userId = useLoginStore(state => state.userId);
	const users = useUsersStore(state => state.users);
	const settings = useSettingsStore(state => state.settings);

	const getSettingsByUser = useSettingsStore(state => state.getSettingsByUser);
	const getFilteredUsers = useUsersStore(state => state.getFilteredUsers);

	const {
		distanceRange,
		showPeopleInDistance,
		ageRange,
		showPeopleInAge,
		showVerifiedOnly,
	} = settings;

	const filter = {
		distanceRange,
		showPeopleInDistance,
		ageRange,
		showPeopleInAge,
		showVerifiedOnly,
	};

	const [settingsLoaded, setSettingsLoaded] = useState(false);

	useLayoutEffect(() => {
		const fetchSettings = async () => {
			await getSettingsByUser(userId);
			console.log('SETTINGS: ', settings);
			setSettingsLoaded(true);
		};

		fetchSettings();
	}, [userId]);

	useEffect(() => {
		console.log('FILTER: ', filter);
		if (settingsLoaded) {
			getFilteredUsers(userId, filter);
			console.log('filtered users: ', users);
		}
	}, [userId, settingsLoaded]);

	return (
		<div
			className={styles.homePage}
			style={{ backgroundColor: theme.background_color }}
		>
			{!users?.length ? (
				<NoDataText>Нет пользователей</NoDataText>
			) : (
				<div className={styles.container}>
					<UsersList users={users} />
					<UserActionButtons />
				</div>
			)}
		</div>
	);
};
