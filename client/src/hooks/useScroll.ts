import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface IUseScroll {
	behavior?: 'smooth' | 'auto' | 'instant';
	delay?: number;
	deps?: React.DependencyList;
	includePathname?: boolean;
}

export const useScroll = (
	options: IUseScroll = {
		behavior: 'smooth',
		delay: 0,
		deps: [],
		includePathname: false,
	}
) => {
	const { pathname } = useLocation();

	const { behavior, delay, deps, includePathname } = options;

	const scrollRef = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		scrollRef.current?.scrollIntoView({ behavior });

		console.log('scrolled');
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			handleScroll();
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [...(deps ?? []), includePathname ? pathname : []]);

	return scrollRef;
};
