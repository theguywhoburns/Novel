interface IIconArrowProps extends React.SVGProps<SVGSVGElement> {
	color: string;
	direction?: 'left' | 'right';
}

export const IconArrow = ({
	color,
	direction = 'left',
	...props
}: IIconArrowProps) => {
	return (
		<svg
			width='9.055908'
			height='15.652344'
			viewBox='0 0 9.05591 15.6523'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M8.8 15.39C9.14 15.05 9.14 14.5 8.8 14.16L2.45 7.82L8.8 1.48C9.14 1.14 9.14 0.59 8.8 0.25C8.46 -0.09 7.91 -0.09 7.57 0.25L0 7.82L7.57 15.39C7.91 15.73 8.46 15.73 8.8 15.39Z'
				fill={color}
				transform={
					direction === 'right'
						? 'rotate(180 4.527955 7.82615)'
						: 'rotate(0 4.527955 7.82615)'
				}
			/>
		</svg>
	);
};
