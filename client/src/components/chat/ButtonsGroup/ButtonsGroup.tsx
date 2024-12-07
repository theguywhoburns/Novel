import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import { Button, ButtonGroup } from '@mui/material';
import { IMessage } from '../ChatsList/Chat/Chat';

interface IButtonsGroup extends IMessage {
	left: number;
	amISender: boolean;
	replyToMessage: IMessage | null;
}

export const ButtonsGroup = ({
	id,
	chatId,
	senderId,
	recipientId,
	type,
	text,
	createdAt,
	status,
	replyToMessage,
	left,
	amISender,
}: IButtonsGroup) => {
	const theme = useTheme();

	const setReplyTo = useMessengerStore(state => state.setReplyTo);
	const setMessageToEdit = useMessengerStore(state => state.setMessageToEdit);
	const setNewMessageText = useMessengerStore(state => state.setNewMessageText);
	const setEditedMessageText = useMessengerStore(
		state => state.setEditedMessageText
	);

	const handleReply = () => {
		setReplyTo({
			id,
			chatId,
			senderId,
			recipientId,
			type,
			text,
			createdAt,
			status,
			replyToMessageId: replyToMessage?.id || null,
		});
		setMessageToEdit(null);
	};

	const handleEdit = () => {
		setMessageToEdit({
			id,
			chatId,
			senderId,
			recipientId,
			type,
			text,
			createdAt,
			status,
			replyToMessage,
		});
		setReplyTo(null);
		setNewMessageText('');
		setEditedMessageText(text);
	};

	interface IActionButton {
		text: string;
		onClick: () => void;
	}

	const ActionButton = ({ text, onClick }: IActionButton) => {
		return (
			<Button
				sx={{
					backgroundColor: theme.grey,
					color: theme.white,
					'&:hover': {
						color: theme.white,
					},
					widht: 138,
				}}
				onClick={onClick}
			>
				{text}
			</Button>
		);
	};

	return (
		<ButtonGroup
			size='small'
			variant='contained'
			orientation='vertical'
			sx={{
				position: 'absolute',
				top: 18.5,
				left,
				zIndex: 10,
				'.MuiButtonGroup-grouped': {
					borderColor: 'transparent',
					borderRadius: 2,
					borderWidth: 0,
				},
				width: 138,
				background: theme.grey,
				borderRadius: 4,
			}}
		>
			<ActionButton text={'Ответить'} onClick={handleReply} />
			{amISender && (
				<ActionButton text={'Редактировать'} onClick={handleEdit} />
			)}
		</ButtonGroup>
	);
};
