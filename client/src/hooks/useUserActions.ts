import { useUsersStore } from '@/store/users/useUsersStore';
import { useNavigate } from 'react-router-dom';

interface IUseUserActions {
	navigateTo?: string;
}

export const useUserActions = ({ navigateTo }: IUseUserActions) => {
	const navigate = useNavigate();

	const users = useUsersStore(state => state.users);

	const likeUser = useUsersStore(state => state.likeUser);
	const dislikeUser = useUsersStore(state => state.dislikeUser);

	const currentIndex = useUsersStore(state => state.currentIndex);
	const setCurrentIndex = useUsersStore(state => state.setCurrentIndex);

	const setNextIndex = useUsersStore(state => state.setNextIndex);
	const setDirection = useUsersStore(state => state.setDirection);

	const handleRate = () => {
		if (!users) return;

		setCurrentIndex(prevIndex =>
			prevIndex < users.length - 1 ? prevIndex + 1 : prevIndex
		);
		setNextIndex(currentIndex + 1);

		navigateTo && navigate(navigateTo);
	};

	const handleLike = () => {
		if (!users) return;

		likeUser(users[currentIndex].id);
		handleRate();
		setDirection('right');
	};

	const handleDislike = () => {
		if (!users) return;

		dislikeUser(users[currentIndex].id);
		handleRate();
		setDirection('left');
	};

	return {
		handleLike,
		handleDislike,
	};
};
