import { BackButton } from '@/components/ui/BackButton/BackButton';
import { RouteBase } from '@/routes';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useOnlineStatusStore } from '@/store/onlineStatus/useOnlineStatusStore';
import { useTheme } from '@/theme';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatHeader.module.css';
import { getAvatar } from '@/utils/getAvatar';

export const ChatHeader = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const chat = useMessengerStore(state => state.chat);
	const setMessages = useMessengerStore(state => state.setMessages);

	const onlineUsersId = useOnlineStatusStore(state => state.onlineUsersIds);
	const getOnlineStatus = useOnlineStatusStore(state => state.getOnlineStatus);

	const isOnline = getOnlineStatus(chat.interlocutor?.id);

	const genderStatus = {
		male: 'Был недавно',
		female: 'Была недавно',
	};

	const online = 'Онлайн';
	const offline = genderStatus[chat.interlocutor?.gender || 'male'];

	const onlineStatusMessage = isOnline ? online : offline;

	useEffect(() => {
		console.log('isOnline: ', isOnline);
		console.log('onlineUsersId: ', onlineUsersId);
	}, [isOnline, onlineUsersId]);

	const clearMessages = () => {
		setMessages([]);
	};

	const handleClick = () => {
		clearMessages();
		navigate(`${RouteBase.PROFILE}/${chat.interlocutor?.id}`, {
			state: { from: location.pathname },
		});
	};
	
	const avatar = getAvatar(chat.interlocutor?.imgSrc);

	return (
		<header className={styles.header}>
			<BackButton onClick={clearMessages} />
			<button className={styles.recipient} onClick={handleClick}>
				<div className={styles.recipientInfo}>
					<div style={{ color: theme.high_contrast_text_color }}>
						<span>{chat.interlocutor?.name},</span>
						<span>{chat.interlocutor?.age}</span>
					</div>

					<span
						className={styles.online}
						style={{ color: isOnline ? theme.green : theme.grey }}
					>
						{onlineStatusMessage}
					</span>
				</div>
				<img
					className={styles.avatar}
					src={avatar}
					alt='avatar'
				/>
			</button>
		</header>
	);
};
