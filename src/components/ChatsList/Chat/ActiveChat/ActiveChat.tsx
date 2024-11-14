import { MessagesList } from '@/components/MessagesList/MessagesList';

export const ActiveChat = () => {
	return (
		<div
			style={{
				width: '100%',
				maxWidth: 800,
				margin: '0 auto',
				position: 'relative',
			}}
		>
			<MessagesList />
			<input
				style={{
					width: '100%',
					maxWidth: 800,
					position: 'fixed',
					bottom: 60,
				}}
				type='text'
				placeholder='correct input field will be here'
			/>
		</div>
	);
};
