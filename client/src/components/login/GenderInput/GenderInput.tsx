import { IconMale } from '@/icons';
import { Gender } from '@/store/login/useLoginStore';
import { useTheme } from '@/theme';
import { Keyboard } from '@capacitor/keyboard';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useEffect, useRef } from 'react';

interface IGenderInput {
	gender: Gender;
	setGender: (gender: Gender) => void;
}

const GenderInput = ({ gender, setGender }: IGenderInput) => {
	const theme = useTheme();

	const maleInputWrapperRef = useRef<HTMLInputElement>(null);
	const femaleInputWrapperRef = useRef<HTMLInputElement>(null);

	const maleInput = maleInputWrapperRef.current?.getElementsByTagName(
		'input'
	)[0];
	const femaleInput = femaleInputWrapperRef.current?.getElementsByTagName(
		'input'
	)[0];

	useEffect(() => {
		const maleInput = maleInputWrapperRef.current?.getElementsByTagName(
			'input'
		)[0];
		const femaleInput = femaleInputWrapperRef.current?.getElementsByTagName(
			'input'
		)[0];

		if (gender === 'male') {
			maleInput?.focus();
		} else if (gender === 'female') {
			femaleInput?.focus();
		}
	}, [gender]);

	const hideKeyboard = async () => {
		try {
			await Keyboard.hide();
		} catch (err) {
			console.error(err);
		}
	};

	const handleSelectMale = async () => {
		if (gender !== 'male') {
			await hideKeyboard();
			maleInput?.focus();
			setGender('male');
		}
	};

	const handleSelectFemale = async () => {
		if (gender !== 'female') {
			await hideKeyboard();
			femaleInput?.focus();
			setGender('female');
		}
	};

	return (
		<Box sx={{ display: 'flex', gap: 2 }}>
			<TextField
				ref={maleInputWrapperRef}
				value={gender === 'male' ? 'Я мужчина' : ''}
				onClick={handleSelectMale}
				select={false}
				slotProps={{
					input: {
						startAdornment: gender !== 'male' && (
							<IconButton
								size='small'
								sx={{
									width: '100%',
									height: '100%',
									borderRadius: 0,
									marginBottom: 5 / 8,
									'&:hover': {
										backgroundColor: 'transparent',
									},
								}}
							>
								<IconMale />
							</IconButton>
						),
						endAdornment: null,
					},
				}}
				variant='standard'
				fullWidth
				sx={{
					width: gender === null ? 150 : gender === 'male' ? 200 : 100,
					transition: 'width 0.25s ease-in-out',
					textAlign: 'center',

					'.MuiInputBase-root': {
						color: theme.accent_color,
						textAlign: 'center',

						'&::before': {
							borderBottom:
								gender === 'male'
									? `2px solid ${theme.accent_color} !important`
									: `1px solid ${theme.grey} !important`,
						},

						'&::after': {
							borderBottom: `2px solid ${theme.accent_color}`,
						},
					},

					'.MuiInputBase-input': {
						fontSize: 16,
						lineHeight: '19px',
						fontWeight: 400,
						textAlign: 'center',
						paddingBottom: 14 / 8,
						caretColor: 'transparent',
					},
				}}
			/>
			<TextField
				ref={femaleInputWrapperRef}
				value={gender === 'female' ? 'Я женщина' : ''}
				onClick={handleSelectFemale}
				slotProps={{
					input: {
						startAdornment: gender !== 'female' && (
							<IconButton
								size='small'
								sx={{
									width: '100%',
									height: '100%',
									borderRadius: 0,
									marginBottom: 5 / 8,
									'&:hover': {
										backgroundColor: 'transparent',
									},
								}}
							>
								<IconMale /> {/* TODO: add correct icon */}
							</IconButton>
						),
						endAdornment: null,
					},
				}}
				variant='standard'
				fullWidth
				sx={{
					width: gender === null ? 150 : gender === 'female' ? 200 : 100,
					transition: 'width 0.25s ease-in-out',

					'.MuiInputBase-root': {
						color: theme.accent_color,

						'&::before': {
							borderBottom:
								gender === 'female'
									? `2px solid ${theme.accent_color} !important`
									: `1px solid ${theme.grey} !important`,
						},

						'&::after': {
							borderBottom: `2px solid ${theme.accent_color}`,
						},
					},

					'.MuiInputBase-input': {
						fontSize: 16,
						lineHeight: '19px',
						fontWeight: 400,
						textAlign: 'center',
						paddingBottom: 14 / 8,
						caretColor: 'transparent',
					},
				}}
			/>
		</Box>
	);
};

export default GenderInput;
