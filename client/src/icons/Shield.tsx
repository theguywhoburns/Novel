import { useTheme } from '@/theme';

export const IconShield = (props: React.SVGProps<SVGSVGElement>) => {
	const theme = useTheme();

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='23'
			height='25'
			fill='none'
			viewBox='0 0 23 25'
			{...props}
		>
			<path
				fill={theme.separator_color}
				d='m11.09 0-11 3.884v8.632c0 9.753 10.676 12.407 10.783 12.433l.218.051.218-.05c.107-.027 10.782-2.681 10.782-12.434V3.884zM9.259 17.334l-4.315-4.19 1.296-1.258 3.019 2.93 6.685-6.49 1.296 1.26z'
			></path>
		</svg>
	);
};
