export const IconCross = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='54'
			height='54'
			viewBox='0 0 54 54'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M39.1212 19.1211L31.2433 26.9998L39.1212 34.8782C40.2929 36.0504 40.2929 37.9493 39.1212 39.1215C38.5357 39.707 37.7681 40 37.0008 40C36.2323 40 35.4646 39.7075 34.8796 39.1215L27 31.2423L19.1211 39.1215C18.5357 39.707 17.768 39.9999 17.0001 39.9999C16.2324 39.9999 15.4652 39.7074 14.8793 39.1215C13.7075 37.9497 13.7075 36.0508 14.8793 34.8781L22.7569 26.9997L14.8788 19.1211C13.7071 17.9493 13.7071 16.05 14.8788 14.8782C16.0504 13.7073 17.9486 13.7073 19.1206 14.8782L27 22.7569L34.8787 14.8782C36.0509 13.7073 37.9494 13.7073 39.1207 14.8782C40.293 16.05 40.2929 17.9493 39.1212 19.1211Z'
				fill='url(#svg_base_gradient)'
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
