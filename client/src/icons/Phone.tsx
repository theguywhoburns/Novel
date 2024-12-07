import { useTheme } from '@/theme';

export const IconPhone = () => {
	const theme = useTheme();

	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 15 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M7.25 1C10.7018 1 13.5 3.79822 13.5 7.25C13.5 10.7018 10.7018 13.5 7.25 13.5C3.79822 13.5 1 10.7018 1 7.25C1 3.79822 3.79822 1 7.25 1ZM10.9194 10.1415C11.0087 10.0517 11.0589 9.93026 11.0589 9.80364C11.0589 9.67701 11.0087 9.55554 10.9194 9.46577L9.69602 8.24263C9.60622 8.15328 9.48469 8.10312 9.35801 8.10312C9.23133 8.10312 9.1098 8.15328 9.01999 8.24263L8.68755 8.57522C8.57716 8.68655 8.43375 8.75924 8.2787 8.78246C8.12365 8.80569 7.96524 8.7782 7.82708 8.7041C6.96192 8.24587 6.25434 7.53836 5.796 6.67327C5.72188 6.53507 5.69436 6.37664 5.71754 6.22154C5.74073 6.06645 5.81337 5.92298 5.92466 5.8125L6.25774 5.47998C6.34704 5.39018 6.39717 5.26868 6.39717 5.14203C6.39717 5.01538 6.34704 4.89388 6.25774 4.80408L5.03433 3.58105C4.94452 3.49169 4.82299 3.44153 4.6963 3.44153C4.56961 3.44153 4.44808 3.49169 4.35828 3.58105C4.30771 3.63147 4.24375 3.69238 4.17534 3.75684C4.17354 3.75854 4.17173 3.76025 4.16991 3.76197C3.99978 3.92277 3.78993 4.12111 3.70457 4.24629C3.25015 4.9113 3.46807 5.801 3.72986 6.43035C4.07568 7.25986 4.71304 8.16375 5.52517 8.97532C6.33657 9.78679 7.24016 10.4242 8.07014 10.77C8.69934 11.0322 9.5887 11.2496 10.2537 10.7953C10.3801 10.7089 10.5817 10.496 10.743 10.3247C10.7469 10.3207 10.7507 10.3166 10.7545 10.3126C10.8149 10.2488 10.8717 10.1889 10.9194 10.1415Z'
				fill={theme.grey}
			/>
			<path
				d='M10.9194 10.1415C11.0087 10.0517 11.0589 9.93026 11.0589 9.80364C11.0589 9.67701 11.0087 9.55554 10.9194 9.46577L9.69602 8.24263C9.60622 8.15328 9.48469 8.10312 9.35801 8.10312C9.23133 8.10312 9.1098 8.15328 9.01999 8.24263L8.68755 8.57522C8.57716 8.68655 8.43375 8.75924 8.2787 8.78246C8.12365 8.80569 7.96524 8.7782 7.82708 8.7041C6.96192 8.24587 6.25434 7.53836 5.796 6.67327C5.72188 6.53507 5.69436 6.37664 5.71754 6.22154C5.74073 6.06645 5.81337 5.92298 5.92466 5.8125L6.25774 5.47998C6.34704 5.39018 6.39717 5.26868 6.39717 5.14203C6.39717 5.01538 6.34704 4.89388 6.25774 4.80408L5.03433 3.58105C4.94452 3.49169 4.82299 3.44153 4.6963 3.44153C4.56961 3.44153 4.44808 3.49169 4.35828 3.58105C4.30771 3.63147 4.24375 3.69238 4.17534 3.75684L4.16991 3.76197C3.99978 3.92277 3.78993 4.12111 3.70457 4.24629C3.25015 4.9113 3.46807 5.801 3.72986 6.43035C4.07568 7.25986 4.71304 8.16375 5.52517 8.97532C6.33657 9.78679 7.24016 10.4242 8.07014 10.77C8.69934 11.0322 9.5887 11.2496 10.2537 10.7953C10.3801 10.7089 10.5817 10.496 10.743 10.3247L10.7545 10.3126C10.8149 10.2488 10.8717 10.1889 10.9194 10.1415Z'
				fill='#FDFEFE'
			/>
		</svg>
	);
};
