import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import { Button, ButtonGroup } from '@mui/material';

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
	replyToMessageId,
}: {
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
	replyToMessageId: number | null;
}) => {
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
			replyToMessageId,
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
			replyToMessageId,
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
				left: left - 69,
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
