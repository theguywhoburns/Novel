import { IMessageEntity } from '@/components/chat/ActiveChat/ChatInput/ChatInput';
import { IChat, IMessage } from '@/components/chat/ChatsList/Chat/Chat';
import axios from 'axios';
import { create } from 'zustand';

const baseUrl = 'http://localhost:4000/api';

interface IMessengerStore {
	messages: IMessage[];
	setMessages: (
		value: IMessage[] | ((state: IMessage[]) => IMessage[])
	) => void;

	isMessagesLoading: boolean;
	setIsMessagesLoading: (isMessagesLoading: boolean) => void;

	newMessageText: string;
	setNewMessageText: (newMessageText: string) => void;

	replyTo: IMessageEntity | null;
	setReplyTo: (replyTo: IMessageEntity | null) => void;

	messageToEdit: IMessage | null;
	setMessageToEdit: (messageToEdit: IMessage | null) => void;

	buttonsGroupVisibility: { [key: number]: boolean };
	setButtonsGroupVisibility: (buttonsGroupVisibility: {
		[key: number]: boolean;
	}) => void;

	left: number;
	setLeft: (left: number) => void;

	chats: IChat[];
	setChats: (chats: IChat[]) => void;

	chat: IChat;
	setChat: (chat: IChat) => void;

	sendNewMessage: ({
		data,
		socket,
	}: {
		data: IMessageEntity;
		socket: WebSocket | null;
	}) => void;

	getChatsByUser: (userId: number) => void;
}

export const useMessengerStore = create<IMessengerStore>(set => ({
	messages: [],
	setMessages: (value: IMessage[] | ((state: IMessage[]) => IMessage[])) =>
		set(state => ({
			messages: typeof value === 'function' ? value(state.messages) : value,
		})),

	isMessagesLoading: true,
	setIsMessagesLoading: isMessagesLoading => set({ isMessagesLoading }),

	newMessageText: '',
	setNewMessageText: newMessageText => set({ newMessageText }),

	replyTo: null,
	setReplyTo: replyTo => set({ replyTo }),

	messageToEdit: null,
	setMessageToEdit: messageToEdit => set({ messageToEdit }),

	buttonsGroupVisibility: {},
	setButtonsGroupVisibility: buttonsGroupVisibility =>
		set({ buttonsGroupVisibility }),

	left: 0,
	setLeft: left => set({ left }),

	chats: [],
	setChats: chats => set({ chats }),

	chat: localStorage.getItem('chat')
		? JSON.parse(localStorage.getItem('chat') as string)
		: {},
	setChat: chat => set({ chat }),

	sendNewMessage: ({ data, socket }) => {
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			console.log('no socket or socket is not open');
			return;
		}

		const {
			senderId,
			recipientId,
			chatId,
			type,
			text,
			createdAt,
			status,
			replyToMessageId,
		} = data;

		const state = useMessengerStore.getState();

		const message: IMessageEntity = {
			senderId,
			recipientId,
			chatId,
			type,
			text,
			createdAt,
			status,
			replyToMessageId,
		};

		console.log(socket);

		if (state.newMessageText.length) {
			state.setNewMessageText('');
			socket.send(JSON.stringify(message));
		}
	},

	getChatsByUser: async userId => {
		try {
			const response = await axios.get<IChat[]>(`${baseUrl}/chats/${userId}`);

			console.log(response);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			useMessengerStore.getState().setChats(response.data);
		} catch (err) {
			console.error(err);
		}
	},
}));
