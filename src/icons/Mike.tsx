import { useTheme } from '@/theme';

export const IconMike = (props: React.SVGProps<SVGSVGElement>) => {
	const theme = useTheme();

	return (
		<svg
			width='23'
			height='26'
			viewBox='0 0 23 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M5.92781 6.5C5.92781 3.18629 8.61606 0.5 11.9322 0.5C15.2483 0.5 17.9366 3.18629 17.9366 6.5V11.5C17.9366 14.8137 15.2483 17.5 11.9322 17.5C8.61606 17.5 5.92781 14.8137 5.92781 11.5V6.5ZM11.9322 2.5C9.72144 2.5 7.92927 4.29086 7.92927 6.5V11.5C7.92927 13.7091 9.72144 15.5 11.9322 15.5C14.1429 15.5 15.9351 13.7091 15.9351 11.5V6.5C15.9351 4.29086 14.1429 2.5 11.9322 2.5Z'
				fill={theme.separator_color}
			/>
			<path
				d='M20.8249 16.0865C21.0783 15.5957 20.8857 14.9925 20.3946 14.7392C19.9034 14.4859 19.2998 14.6784 19.0463 15.1692C18.3731 16.4727 17.3541 17.5661 16.1009 18.3299C14.8477 19.0937 13.4085 19.4985 11.9406 19.5C10.4727 19.5015 9.03258 19.0997 7.77777 18.3386C6.52297 17.5774 5.50175 16.4861 4.82576 15.1841C4.57124 14.6938 3.96721 14.5026 3.47661 14.7569C2.98602 15.0113 2.79464 15.6149 3.04916 16.1051C3.89414 17.7327 5.17067 19.0967 6.73917 20.0482C8.01818 20.8241 9.45117 21.3012 10.9315 21.4499V24.5C10.9315 25.0523 11.3795 25.5 11.9322 25.5C12.4849 25.5 12.9329 25.0523 12.9329 24.5V21.4499C14.4203 21.3005 15.8597 20.8195 17.1431 20.0373C18.7096 19.0826 19.9833 17.7158 20.8249 16.0865Z'
				fill={theme.separator_color}
			/>
		</svg>
	);
};
