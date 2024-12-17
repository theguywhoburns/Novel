import { useTheme } from '@/theme';
import { Keyboard } from '@capacitor/keyboard';
import { TextField } from '@mui/material';
import { useRef } from 'react';

interface ITextInput {
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	placeholder?: string;
	textBelow?: string;
	type?: 'text' | 'email' | 'password';
	variant?: 'outlined' | 'filled' | 'standard';
	paddingY?: [number | string, number | string];
	multiLine?: boolean;
}

export const TextInput = ({
	value,
	onChange,
	placeholder,
	textBelow,
	type = 'text',
	variant = 'standard',
	paddingY = [4, 5],
	multiLine = false,
}: ITextInput) => {
	const theme = useTheme();

	const inputRef = useRef<HTMLDivElement | null>(null);

	const showKeyboard = async () => {
		console.log('showKeyboard called');
		try {
			await Keyboard.show();
			if (inputRef.current) {
				inputRef.current.focus();
			}
			console.log('Keyboard.show() completed');
		} catch (error) {
			console.error('Error showing keyboard:', error);
		}
	};

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
		>
			<TextField
				ref={inputRef}
				value={value}
				onChange={onChange}
				onFocus={showKeyboard}
				placeholder={placeholder}
				type={type}
				variant={variant}
				multiline={multiLine}
				sx={{
					'.MuiInputBase-root': {
						fontSize: '16px',
						lineHeight: '19px',
						fontWeight: 400,
						color: theme.text_color,
						paddingTop: parseInt(paddingY[0].toString()) / 8,
						paddingBottom: parseInt(paddingY[1].toString()) / 8,

						'&::before': {
							borderBottom: `1px solid ${theme.grey} !important`,
						},

						'&::after': {
							borderBottom: `2px solid ${theme.accent_color}`,
						},

						'::placeholder': {
							color: theme.grey,
						},
					},
				}}
			/>
			<span
				style={{
					position: 'absolute',
					bottom: 3,
					right: 0,
					fontSize: 10,
					lineHeight: '12px',
					fontWeight: 500,
					color: theme.grey,
				}}
			>
				{textBelow}
			</span>
		</div>
	);
};
