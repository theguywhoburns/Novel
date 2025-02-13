import { useUserId } from '@/hooks/useUserId';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useEffect } from 'react';
import { BackHeader } from '../BackHeader/BackHeader';

export const ProfileHeader = () => {
	const userId = useUserId();
	const visitingUser = useUsersStore(state => state.visitingUser);

	const myProfileTitle = 'Редактирование';
	const otherProfileTitle = 'Профиль';

	const isMyProfile = Number(userId) === Number(visitingUser?.id);

	const title = isMyProfile ? myProfileTitle : otherProfileTitle;

	useEffect(() => {
		console.error(visitingUser?.id, userId, isMyProfile);
	}, [visitingUser, userId, isMyProfile]);

	return <BackHeader title={title} />;
};
