import { useTheme } from '@/theme';
import { Keyboard } from '@capacitor/keyboard';
import { TextField } from '@mui/material';
import React, { useRef } from 'react';

interface CharInputsGroup {
	length: number;
	value: string;
	setValue: (value: string) => void;
	placeholder?: string;
	inputWidth?: string | number;
	textColor?: string;
	inputPaddingY?: [string | number, string | number];
	inputMarginRightIndexes?: number[];
	gap?: number;
	centerHorizontally?: boolean;
}

export const CharInputsGroup = ({
	length,
	value,
	setValue,
	placeholder,
	inputWidth = 40,
	textColor,
	inputPaddingY = [0, 0],
	inputMarginRightIndexes = [],
	gap = 8,
	centerHorizontally,
}: CharInputsGroup) => {
	const theme = useTheme();

	const inputsRef = useRef<(HTMLInputElement | null)[]>(
		Array(length).fill(null)
	);

	const handleChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const newValue = event.target.value;

		if (/^[0-9]$/.test(newValue)) {
			const newChar = newValue[0];
			const updatedValue = value.split('');
			updatedValue[index] = newChar;
			setValue(updatedValue.join(''));
		}
	};

	const handleKeyDown = (
		index: number,
		event: React.KeyboardEvent<HTMLDivElement>
	) => {
		switch (event.key) {
			case 'Backspace':
				const updatedValue = value.split('');

				if (updatedValue[index] !== '') {
					updatedValue[index] = '';
					setValue(updatedValue.join(''));

					if (index > 0) {
						inputsRef.current[index - 1]?.focus();
						console.log('focus on index', index - 1);
					}
				} else if (index > 0) {
					inputsRef.current[index - 1]?.focus();
					console.log('focus on index', index - 1);
				}
				break;

			default:
				inputsRef.current[index + 1]?.focus();
				console.log('focus on index', index + 1);
		}
	};
	const hideKeyboard = async () => {
		await Keyboard.hide();
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: gap ?? 8,
				margin: centerHorizontally ? '0 auto' : '0',
			}}
		>
			{Array.from({ length }).map((_, index) => (
				<div key={index}>
					<TextField
						inputRef={el => (inputsRef.current[index] = el)}
						value={value[index] || ''}
						placeholder={placeholder ? placeholder[index] : ''}
						onFocus={hideKeyboard}
						onChange={event => handleChange(index, event)}
						onKeyDown={event => handleKeyDown(index, event)}
						variant='standard'
						type='number'
						sx={{
							'.MuiInputBase-root': {
								fontSize: '16px',
								lineHeight: '19px',
								fontWeight: 400,
								color: textColor || theme.text_color,
								width: inputWidth,
								textAlign: 'center',
								marginRight: inputMarginRightIndexes[index] / 8,

								'.MuiInputBase-input': {
									textAlign: 'center !important',
									paddingTop: parseInt(inputPaddingY[0].toString()) / 8,
									paddingBottom: parseInt(inputPaddingY[1].toString()) / 8,
								},

								'&::before': {
									borderBottom: value[index]
										? `2px solid ${theme.accent_color} !important`
										: `1px solid ${theme.grey} !important`,
								},

								'&::after': {
									borderBottom: `2px solid ${theme.accent_color}`,
								},

								'&::placeholder': {
									color: `${theme.grey} !important`,
								},
							},
						}}
					/>
				</div>
			))}
		</div>
	);
};
