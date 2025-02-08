import { IconMuted } from '@/icons';
import { RouteBase } from '@/routes';
import { Gender } from '@/store/login/useLoginStore';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.css';

export type Status = 'sending' | 'sent' | 'read' | 'not sent';

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
	status: Status;
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
		gender: Gender;
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
		navigate(RouteBase.CHAT);

		const selectedChat: IChat = {
			id,
			userOneId,
			userTwoId,
			isMuted,
			lastMessage,
			newMessagesAmount,
			interlocutor,
		};

		setChat(selectedChat);
		localStorage.setItem('chat', JSON.stringify(selectedChat));
	};

	return (
		<li className={styles.chat} onClick={handleClick}>
			<img className={styles.img} src={imgSrc} alt='avatar' />
			<div className={styles.chatInfo}>
				<div
					className={styles.nameAgeAndNotifications}
					style={{ color: theme.high_contrast_text_color }}
				>
					<span className={styles.name} style={{ color: theme.text_color }}>
						{name},
					</span>
					<span className={styles.age} style={{ color: theme.text_color }}>
						{age}
					</span>
					{isMuted && <IconMuted />}
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
