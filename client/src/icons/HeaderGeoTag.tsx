import { useTheme } from '@/theme';

export const IconHeaderGeoTag = () => {
	const theme = useTheme();

	return (
		<svg
			width='40'
			height='40'
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M20 8C14.4817 8 10 12.3023 10 17.5998C10 21.0094 11.535 23.9981 13.3967 26.3517C16.1333 29.8108 19.5567 31.8764 19.5567 31.8764C19.8267 32.0412 20.1733 32.0412 20.445 31.8764C20.445 31.8764 23.8667 29.8108 26.6033 26.3517C28.465 23.9981 30 21.0094 30 17.5998C30 12.3023 25.52 8 20 8ZM20 12.7999C18.8949 12.7999 17.8351 13.2213 17.0537 13.9715C16.2723 14.7216 15.8333 15.739 15.8333 16.7999C15.8333 17.8607 16.2723 18.8781 17.0537 19.6282C17.8351 20.3784 18.8949 20.7998 20 20.7998C21.1051 20.7998 22.1649 20.3784 22.9463 19.6282C23.7277 18.8781 24.1667 17.8607 24.1667 16.7999C24.1667 15.739 23.7277 14.7216 22.9463 13.9715C22.1649 13.2213 21.1051 12.7999 20 12.7999Z'
				fill={theme.separator_color}
			/>
		</svg>
	);
};
