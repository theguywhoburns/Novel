import { useTheme } from '@/theme';

export const IconLike = (props: React.SVGProps<SVGSVGElement>) => {
	const theme = useTheme();
	return (
		<svg
			width='55'
			height='54'
			viewBox='0 0 55 54'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<ellipse
				cx='27.5'
				cy='27'
				rx='27.5'
				ry='27'
				fill='url(#svg_base_gradient)'
			/>
			<path
				d='M34.2969 14C32.7232 14 31.2805 14.5064 30.0088 15.5052C28.7896 16.4628 27.9779 17.6825 27.5 18.5693C27.0221 17.6824 26.2104 16.4628 24.9912 15.5052C23.7195 14.5064 22.2768 14 20.7031 14C16.3117 14 13 17.6479 13 22.4853C13 27.7114 17.1315 31.2871 23.3861 36.7001C24.4483 37.6193 25.6522 38.6613 26.9035 39.7726C27.0684 39.9192 27.2802 40 27.5 40C27.7198 40 27.9316 39.9192 28.0965 39.7726C29.348 38.6612 30.5518 37.6193 31.6145 36.6995C37.8685 31.2871 42 27.7114 42 22.4853C42 17.6479 38.6883 14 34.2969 14Z'
				fill={theme.background_color}
			/>

			<defs>
				<radialGradient
					id='svg_base_gradient'
					cx='0'
					cy='0'
					r='1'
					gradientTransform='matrix(-34.67518 32.09046 -305.84215 -330.47611 17.65 .281)'
					gradientUnits='userSpaceOnUse'
				>
					<stop className='svg-grad-start-color'></stop>
					<stop offset='1' className='svg-grad-end-color'></stop>
				</radialGradient>
			</defs>
		</svg>
	);
};