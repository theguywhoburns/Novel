import { useTheme } from '@/theme';

export const IconMuted = (props: React.SVGProps<SVGSVGElement>) => {
	const theme = useTheme();

	return (
		<svg
			width='10.815918'
			height='11.565857'
			viewBox='0 0 10.8159 11.5659'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				id='↳ Icon Color'
				d='M1.68 3.06L8 9.37L8 11.07C8 11.36 7.77 11.54 7.51 11.56L3.87 8.07L0.99 8.06C0.44 8.06 0 7.62 0 7.06L0 4.06C0 3.51 0.44 3.06 1 3.06L1.68 3.06ZM2.46 0.21L4.65 2.41L7.51 0.06C7.77 0.08 8 0.26 8 0.55L8 5.75L10.59 8.35C10.88 8.64 10.88 9.11 10.59 9.41C10.3 9.7 9.82 9.7 9.53 9.41L1.4 1.28C1.11 0.98 1.11 0.51 1.4 0.21C1.69 -0.08 2.17 -0.08 2.46 0.21Z'
				fill='#B8C1CC'
				fill-opacity='1.000000'
				fill-rule='nonzero'
				color={theme.button_background_color}
			/>
		</svg>
	);
};
