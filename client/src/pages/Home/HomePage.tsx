import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { UserActionButtons } from '@/components/user/UserActionButtons/UserActionButtons';
import { UsersList } from '@/components/user/UsersList/UsersList';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useSettingsStore } from '@/store/settings/useSettingsStore';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useTheme } from '@/theme';
import { useEffect } from 'react';
import styles from './Home.module.css';

export const HomePage = () => {
	const theme = useTheme();

	const userId = useLoginStore(state => state.userId);
	const users = useUsersStore(state => state.users);
	const settings = useSettingsStore(state => state.settings);

	const getFilteredUsers = useUsersStore(state => state.getFilteredUsers);

	console.log(users);

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
		getFilteredUsers(userId, filter);
		console.log('filtered users: ', users);
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
