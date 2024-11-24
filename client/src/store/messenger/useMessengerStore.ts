import { IMessage } from '@/components/chat/ChatsList/Chat/Chat';
import { create } from 'zustand';

interface ITodo {
	title: string;
	isCompleted: boolean;
}

interface IMessengerStore {
	messages: IMessage[];
	setMessages: (
		value: IMessage[] | ((state: IMessage[]) => IMessage[])
	) => void;

	todos: ITodo[];
	setTodos: (value: ITodo[] | ((state: ITodo[]) => ITodo[])) => void;

	newMessageText: string;
	setNewMessageText: (newMessageText: string) => void;

	replyTo: IMessage | null;
	setReplyTo: (replyTo: IMessage | null) => void;

	messageToEdit: IMessage | null;
	setMessageToEdit: (messageToEdit: IMessage | null) => void;

	buttonsGroupVisibility: { [key: number]: boolean };
	setButtonsGroupVisibility: (buttonsGroupVisibility: {
		[key: number]: boolean;
	}) => void;

	left: number;
	setLeft: (left: number) => void;

	// getMessages: (socket: WebSocket | null) => void;

	sendNewMessage: ({
		data,
		socket,
	}: {
		data: IMessage;
		socket: WebSocket | null;
	}) => void;
}

export const useMessengerStore = create<IMessengerStore>(set => ({
	messages: [],
	setMessages: (value: IMessage[] | ((state: IMessage[]) => IMessage[])) =>
		set(state => ({
			messages: typeof value === 'function' ? value(state.messages) : value,
		})),

	todos: [],
	setTodos: (value: ITodo[] | ((state: ITodo[]) => ITodo[])) =>
		set(state => ({
			todos: typeof value === 'function' ? value(state.todos) : value,
		})),

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

	/* getMessages: socket => {
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			console.log('no socket or socket is not open');
			return;
		}

		const state = useMessengerStore.getState();

		socket.send(JSON.stringify({ type: 'getMessages' }));

		socket.onmessage = event => {
			const messages = JSON.parse(event.data);
			state.setMessages(messages);
		};
	}, */

	sendNewMessage: ({ data, socket }) => {
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			console.log('no socket or socket is not open');
			return;
		}

		const {
			id,
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

		const message: IMessage = {
			id,
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
}));
