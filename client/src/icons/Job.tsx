import { useThemeStore } from '@/store/theme/useThemeStore';
import { useTheme } from '@/theme';

export const IconJob = () => {
	const theme = useTheme();
	const themeVariant = useThemeStore(state => state.theme);

	const color = themeVariant === 'light' ? '#E7E8EC' : theme.grey;

	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 15 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9.36714 11.7243C10.774 9.7552 12.7619 6.62667 12.7619 4.66667C12.7619 3.42899 12.2602 2.242 11.3672 1.36683C10.4741 0.491665 9.26294 0 8 0C6.73706 0 5.52586 0.491665 4.63282 1.36683C3.73979 2.242 3.2381 3.42899 3.2381 4.66667C3.2381 6.62667 5.22595 9.7552 6.63286 11.7243C6.78659 11.9399 6.99115 12.116 7.22916 12.2375C7.46717 12.3591 7.7316 12.4226 8 12.4226C8.2684 12.4226 8.53283 12.3591 8.77084 12.2375C9.00885 12.116 9.21341 11.9399 9.36714 11.7243ZM5.61905 6.53333V4.2C5.61905 4.07623 5.66922 3.95753 5.75852 3.87002C5.84782 3.7825 5.96894 3.73333 6.09524 3.73333H6.80952V3.5C6.80952 3.31435 6.88478 3.1363 7.01873 3.00503C7.15269 2.87375 7.33437 2.8 7.52381 2.8H8.47619C8.66563 2.8 8.84731 2.87375 8.98127 3.00503C9.11522 3.1363 9.19048 3.31435 9.19048 3.5V3.73333H9.90476C10.0311 3.73333 10.1522 3.7825 10.2415 3.87002C10.3308 3.95753 10.381 4.07623 10.381 4.2V6.53333C10.381 6.6571 10.3308 6.7758 10.2415 6.86332C10.1522 6.95083 10.0311 7 9.90476 7H6.09524C5.96894 7 5.84782 6.95083 5.75852 6.86332C5.66922 6.7758 5.61905 6.6571 5.61905 6.53333ZM8.71429 3.5V3.73333H7.28571V3.5C7.28571 3.43812 7.3108 3.37877 7.35545 3.33501C7.4001 3.29125 7.46066 3.26667 7.52381 3.26667H8.47619C8.53934 3.26667 8.5999 3.29125 8.64455 3.33501C8.6892 3.37877 8.71429 3.43812 8.71429 3.5ZM13 12.3667C13 13.8822 9.1731 14 8 14C6.8269 14 3 13.8833 3 12.3667C3 11.7439 3.64286 11.2875 4.91071 11.0105C5.03401 10.9836 5.16316 11.0058 5.26977 11.0722C5.37638 11.1386 5.4517 11.2438 5.47917 11.3646C5.50664 11.4854 5.484 11.612 5.41624 11.7165C5.34848 11.821 5.24115 11.8948 5.11786 11.9217C4.32071 12.0958 4.05286 12.2922 3.975 12.369C4.1881 12.5888 5.36262 13.0667 8 13.0667C10.6374 13.0667 11.8119 12.5888 12.0255 12.369C11.9471 12.2922 11.679 12.0958 10.8826 11.9217C10.8192 11.9108 10.7588 11.8874 10.7049 11.8529C10.651 11.8185 10.6047 11.7737 10.569 11.7212C10.5333 11.6687 10.5088 11.6097 10.497 11.5477C10.4851 11.4857 10.4863 11.422 10.5003 11.3605C10.5143 11.2989 10.5409 11.2408 10.5785 11.1896C10.6161 11.1384 10.6638 11.0952 10.7189 11.0626C10.774 11.03 10.8353 11.0087 10.899 10.9999C10.9628 10.9912 11.0277 10.9952 11.0898 11.0117C12.3571 11.2875 13 11.7439 13 12.3667Z'
				fill={color}
			/>
		</svg>
	);
};
