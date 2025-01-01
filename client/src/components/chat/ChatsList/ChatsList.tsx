import { Loader } from '@/components/ui/Loader/Loader';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useEffect, useState } from 'react';
import { Chat } from './Chat/Chat';
import styles from './ChatsList.module.css';

export const ChatsList = () => {
	const chats = useMessengerStore(state => state.chats);
	const getChatsByUser = useMessengerStore(state => state.getChatsByUser);

	const [isLoading, setIsLoading] = useState(true);

	const userId = useLoginStore(state => state.userId);

	useEffect(() => {
		getChatsByUser(userId);
		setIsLoading(false);
	}, []);

	return (
		<>
			{isLoading && <Loader />}
			{chats?.length ? (
				<ul className={styles.chatsList}>
					{chats?.map(chat => (
						<Chat key={chat.id} {...chat} />
					))}
				</ul>
			) : (
				<p>У вас еще нет чатов</p>
			)}
		</>
	);
};
