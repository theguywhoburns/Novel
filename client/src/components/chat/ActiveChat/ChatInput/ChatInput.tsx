import { Separator } from '@/components/ui/Separator/Separator';
import { IconMike, IconSticker } from '@/icons';
import { IconClip } from '@/icons/Clip';
import { useTheme } from '@/theme';
import { useState } from 'react';
import styles from './ChatInput.module.css';

export const ChatInput = () => {
	const theme = useTheme();

	const [newMessage, setNewMessage] = useState('');

	return (
		<div
			className={styles.chatInput}
			style={{ backgroundColor: theme.background_color }}
		>
			<div>
				<Separator marginY={[0, 12]} />
			</div>

			<div className={styles.chatInputContainer}>
				<IconClip />

				<div className={styles.inputContainer}>
					<input
						className={styles.input}
						style={{
							backgroundColor: theme.button_background_color,
							color: theme.text_color,
						}}
						type='text'
						placeholder='Сообщение'
						value={newMessage}
						onChange={e => setNewMessage(e.target.value)}
					/>
					<IconSticker className={styles.iconSticker} />
				</div>

				<IconMike />
			</div>
		</div>
	);
};
