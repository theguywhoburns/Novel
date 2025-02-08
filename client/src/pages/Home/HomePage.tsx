import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { UserActionButtons } from '@/components/user/UserActionButtons/UserActionButtons';
import { UsersList } from '@/components/user/UsersList/UsersList';
import { useSettingsStore } from '@/store/settings/useSettingsStore';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useTheme } from '@/theme';
import { useEffect } from 'react';
import styles from './Home.module.css';
import { UserId } from '@/store/login/useLoginStore';

export const HomePage = () => {
	const theme = useTheme();

	const userId = localStorage.getItem('userId') as UserId;
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

	useEffect(() => {
		getSettingsByUser(userId);
	}, [userId]);

	useEffect(() => {
		getFilteredUsers(userId, filter);
	}, [userId]);

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
