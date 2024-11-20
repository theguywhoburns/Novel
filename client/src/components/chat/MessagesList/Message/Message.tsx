import { IMessageProps } from '@/components/chat/ChatsList/Chat/Chat';
import { IconRead } from '@/icons/Read';
import { IconSending } from '@/icons/Sending';
import { IconSent } from '@/icons/Sent';
import { IconUpdated } from '@/icons/Updated';
import { useTheme } from '@/theme';
import styles from './Message.module.css';

export const Message = ({
	senderId,
	type,
	text,
	createdAt,
	status,
	nextMessageSenderId,
}: IMessageProps) => {
	const theme = useTheme();

	const userId = 1;

	const amISender = userId === senderId;

	const isNextMessageFromSameSender = nextMessageSenderId === senderId;

	const formattedTime = createdAt.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});

	const recipientUser = {
		id: 2,
		imgSrc:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ',
		name: 'Алиса',
		age: 23,
		isPopular: false,
		search: '',
		job: '',
		distance: '',
		isVerified: false,
		gender: 'female',
		city: '',
		about: '',
		main: [],
		languages: [],
		interests: [],
	}; // we will get the user by recipientId instead

	return (
		<li
			className={[
				styles.message,
				amISender ? styles.sender : styles.recipient,
			].join(' ')}
		>
			{!amISender && (
				<img
					className={styles.avatar}
					style={{ marginBottom: isNextMessageFromSameSender ? 2 : 8 }}
					src={recipientUser.imgSrc}
					alt='avatar'
				/>
			)}
			<div
				className={styles.messageContent}
				style={{
					backgroundColor: amISender
						? theme.accent_color
						: theme.button_background_color,
					marginBottom: isNextMessageFromSameSender ? 2 : 8,
				}}
			>
				{type === 'text' ? (
					<p
						className={styles.messageText}
						lang='ru'
						style={{ color: amISender ? theme.white : theme.text_color }}
					>
						{text}
					</p>
				) : (
					<p>this message has not text type</p>
				)}

				<span
					className={styles.time}
					style={{ color: amISender ? theme.white : theme.grey }}
				>
					{formattedTime}
				</span>

				<div className={styles.statusWrapper}>
					{amISender &&
						(status === 'sending' ? (
							<IconSending />
						) : status === 'sent' ? (
							<IconSent />
						) : status === 'read' ? (
							<IconRead />
						) : status === 'updated' ? (
							<IconUpdated />
						) : null)}
				</div>
			</div>
		</li>
	);
};
