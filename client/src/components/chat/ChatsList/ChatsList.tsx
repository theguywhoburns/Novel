import { Loader } from '@/components/ui/Loader/Loader';
import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { useUserId } from '@/hooks/useUserId';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useEffect, useState } from 'react';
import { Chat } from './Chat/Chat';
import styles from './ChatsList.module.css';

export const ChatsList = () => {
	const userId = useUserId();

	const chats = useMessengerStore(state => state.chats);
	const getChatsByUser = useMessengerStore(state => state.getChatsByUser);

	const [isLoading, setIsLoading] = useState(true);

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
				<NoDataText>У Вас еще нет чатов</NoDataText>
			)}
		</>
	);
};
