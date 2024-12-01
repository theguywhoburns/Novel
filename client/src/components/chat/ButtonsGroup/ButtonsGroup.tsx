import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import { Button, ButtonGroup } from '@mui/material';
import { IMessage } from '../ChatsList/Chat/Chat';

interface IButtonsGroup {
	id: number;
	chatId: number;
	senderId: number;
	recipientId: number;
	type: 'text' | 'image' | 'video' | 'voice' | 'file' | 'sticker';
	text: string;
	createdAt: Date;
	status: 'sending' | 'sent' | 'read' | 'updated';
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
	left,
	amISender,
}: IButtonsGroup) => {
	const theme = useTheme();

	const setReplyTo = useMessengerStore(state => state.setReplyTo);
	const setMessageToEdit = useMessengerStore(state => state.setMessageToEdit);
	const setNewMessageText = useMessengerStore(state => state.setNewMessageText);

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
			replyToMessageId: null,
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
			replyToMessage: null,
		});
		setReplyTo(null);
		setNewMessageText(text || '');
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
			<Button
				sx={{
					backgroundColor: theme.grey,
					color: theme.white,
					'&:hover': {
						color: theme.white,
					},
					widht: 138,
				}}
				onClick={handleReply}
			>
				Ответить
			</Button>

			{amISender && (
				<Button
					sx={{
						backgroundColor: theme.grey,
						color: theme.white,
						'&:hover': {
							color: theme.white,
						},
						widht: 138,
					}}
					onClick={handleEdit}
				>
					Редактировать
				</Button>
			)}
		</ButtonGroup>
	);
};
