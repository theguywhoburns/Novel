import { create } from 'zustand';

interface IUseOnlineStatusStore {
	onlineUsersIds: string[];
	setOnlineUsersIds: (userIds: string[]) => void;
	getOnlineStatus: (userId: number) => boolean;
}

export const useOnlineStatusStore = create<IUseOnlineStatusStore>(
	(set, get) => ({
		onlineUsersIds: [],
		setOnlineUsersIds: userIds => set({ onlineUsersIds: userIds }),

		getOnlineStatus: userId => {
			const { onlineUsersIds } = get();
			return onlineUsersIds.includes(userId?.toString());
		},
	})
);
