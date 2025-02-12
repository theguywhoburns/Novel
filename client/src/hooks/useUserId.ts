import { useLoginStore } from '@/store/login/useLoginStore';

export const useUserId = () => {
	let userId = useLoginStore(state => state.userId);

	if (!userId) {
		userId = Number(localStorage.getItem('userId'));
	}

	return userId;
};
