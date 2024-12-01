import { IconMuted } from '@/icons';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.css';

export interface IMessage {
	id: number;
	chatId: number;
	senderId: number;
	recipientId: number;
	type: 'text' | 'image' | 'video' | 'voice' | 'file' | 'sticker';
	text: string;
	image?: string;
	video?: string;
	voice?: string;
	file?: string;
	sticker?: string;
	createdAt: Date;
	status: 'sending' | 'sent' | 'read' | 'updated';
	replyToMessage: IMessage | null;
}

export interface IMessageProps extends IMessage {
	nextMessageSenderId: number | null;
	visibleButtonsGroupId: number | null;
	left: number;

	onToggleButtonsGroup: (
		messageId: number,
		e: React.MouseEvent,
		messageRef: React.RefObject<HTMLDivElement>
	) => void;
}

export interface IChat {
	id: number;
	userOneId: number;
	userTwoId: number;
	isMuted: boolean;
	lastMessage: IMessage | null;
	newMessagesAmount: number;
	interlocutor: {
		id: number;
		name: string;
		age: number;
		gender: 'male' | 'female';
		imgSrc: string;
	};
}

export const Chat = ({
	id,
	userOneId,
	userTwoId,
	lastMessage,
	newMessagesAmount,
	isMuted,
	interlocutor,
}: IChat) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const setChat = useMessengerStore(state => state.setChat);

	const { imgSrc, name, age } = interlocutor;

	const formattedAmount = Intl.NumberFormat('en-EN', {
		notation: 'compact',
		compactDisplay: 'short',
	}).format(newMessagesAmount);

	const handleClick = () => {
		navigate(`/chat/${id}`);
		setChat({
			id,
			userOneId,
			userTwoId,
			isMuted,
			lastMessage,
			newMessagesAmount,
			interlocutor,
		});
		localStorage.setItem(
			'chat',
			JSON.stringify({
				id,
				userOneId,
				userTwoId,
				isMuted,
				lastMessage,
				newMessagesAmount,
				interlocutor,
			})
		);
		console.log(id, lastMessage, newMessagesAmount, isMuted, interlocutor);
	};

	return (
		<li className={styles.chat} onClick={handleClick}>
			<img className={styles.img} src={imgSrc} alt='avatar' />
			<div className={styles.chatInfo}>
				<div
					className={styles.nameAgeAndNotifications}
					style={{ color: theme.high_contrast_text_color }}
				>
					<span className={styles.name}>{name},</span>
					<span className={styles.age}>{age}</span>
					{isMuted ? <IconMuted /> : null}
				</div>

				<div className={styles.textAndAmount}>
					<p className={styles.messageText} style={{ color: theme.grey }}>
						{lastMessage?.text}
					</p>
					{newMessagesAmount ? (
						<div
							className={styles.amountContainer}
							style={{
								backgroundColor: theme.accent_color,
								color: theme.white,
							}}
						>
							<span className={styles.amount}>{formattedAmount}</span>
						</div>
					) : null}
				</div>
			</div>
		</li>
	);
};

[
	{
		id: 2,
		userOneId: 1,
		userTwoId: 3,
		isMuted: false,
		lastMessage: {
			id: 2,
			chatId: 2,
			senderId: 1,
			recipientId: 3,
			type: 'text',
			text: 'Hi there!',
		},
		newMessagesAmount: 0,
		interlocutor: {
			id: 3,
			name: 'Charlie Brown',
			age: 36,
			imgSrc: null,
			gender: 'Male',
			isOnline: true,
		},
	},
];
