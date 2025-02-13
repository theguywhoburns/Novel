import { useTheme } from '@/theme';
import { TextField } from '@mui/material';
import React, { HTMLAttributes, useRef } from 'react';

interface CharInputsGroup
	extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	length: number;
	value: string;
	setValue: (value: string) => void;
	placeholder?: string;
	inputWidth?: string | number;
	textColor?: string;
	inputPaddingY?: [string | number, string | number];
	inputMarginRightIndexes?: number[];
	gap?: number;
	isError?: boolean;
	errorText?: string;
	centerHorizontally?: boolean;
}

export const CharInputsGroup = ({
	length,
	value,
	setValue,
	inputMode = 'numeric',
	placeholder,
	inputWidth = 40,
	textColor,
	inputPaddingY = [0, 0],
	inputMarginRightIndexes = [],
	gap = 8,
	isError,
	errorText,
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

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 12,
				margin: centerHorizontally ? '0 auto' : '0',
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'row', gap }}>
				{Array.from({ length }).map((_, index) => (
					<TextField
						key={index}
						inputRef={el => (inputsRef.current[index] = el)}
						value={value[index] || ''}
						placeholder={placeholder ? placeholder[index] : ''}
						onChange={event => handleChange(index, event)}
						onKeyDown={event => handleKeyDown(index, event)}
						variant='standard'
						type={inputMode}
						sx={{
							'.MuiInputBase-root': {
								fontSize: '16px',
								lineHeight: '19px',
								fontWeight: 400,
								color: isError ? theme.red : textColor || theme.text_color,
								width: inputWidth,
								textAlign: 'center',
								marginRight: inputMarginRightIndexes[index] + 'px',

								'.MuiInputBase-input': {
									textAlign: 'center !important',
									paddingTop: parseInt(inputPaddingY[0].toString()) + 'px',
									paddingBottom: parseInt(inputPaddingY[1].toString()) + 'px',
								},

								'&::before': {
									borderBottom: value[index]
										? `2px solid ${
												isError ? theme.red : theme.accent_color
										  } !important`
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
				))}
			</div>
			<p
				style={{
					fontSize: 14,
					lineHeight: '19px',
					fontWeight: 500,
					color: theme.red,
				}}
			>
				{isError && errorText}
			</p>
		</div>
	);
};
