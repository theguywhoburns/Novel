import { IUser } from '@/components/user/UsersList/UsersList';
import { IconMuted } from '@/icons';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.css';

export interface IChat {
	id: number;
	participantIds: number[];
	areNotifivationsEnabled: boolean;
}

export interface IMessage {
	id: number;
	chatId: number;
	senderId: number;
	recipientId: number;
	type: 'text' | 'image' | 'video' | 'voice' | 'file' | 'sticker';
	text?: string;
	image?: string;
	video?: string;
	voice?: string;
	file?: string;
	sticker?: string;
	createdAt: Date;
	status: 'sending' | 'sent' | 'read' | 'updated';
}

export interface IMessageProps extends IMessage {
	nextMessageSenderId: number | null;
}

export interface IChatProps {
	id: number;
	lastMessage: IMessage;
	newMessagesAmount: number;
	areNotifivationsEnabled: boolean;
}

export const Chat = ({
	id,
	lastMessage,
	newMessagesAmount,
	areNotifivationsEnabled,
}: IChatProps) => {
	const theme = useTheme();

	const navigate = useNavigate();

	const { text } = lastMessage;

	const user: IUser = {
		id: 5,
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
	}; // we will get the user by senderId instead

	const { imgSrc, name, age } = user;

	const formattedAmount = Intl.NumberFormat('en-EN', {
		notation: 'compact',
		compactDisplay: 'short',
	}).format(newMessagesAmount);

	const handleClick = () => {
		navigate(`/chat/${id}`);
	};

	return (
		<li className={styles.chat} onClick={handleClick}>
			<img className={styles.img} src={imgSrc} alt='avatar' />
			<div className={styles.chatInfo}>
				<div className={styles.nameAgeAndNotifications}>
					<span
						className={styles.name}
						style={{ color: theme.quaternary_text_color }}
					>
						{name},
					</span>
					<span
						className={styles.age}
						style={{ color: theme.quaternary_text_color }}
					>
						{age}
					</span>
					{areNotifivationsEnabled ? null : <IconMuted />}
				</div>

				<div className={styles.textAndAmount}>
					<p className={styles.messageText} style={{ color: theme.grey }}>
						{text}
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
