import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface IUseScrollRef {
	behavior?: 'smooth' | 'auto' | 'instant';
	delay?: number;
	deps?: React.DependencyList;
	includePathname?: boolean;
}

export const useScrollRef = (
	options: IUseScrollRef = {
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

		console.log('scroll');
	};

	useLayoutEffect(() => {
		const timeoutId = setTimeout(() => {
			handleScroll();
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [...(deps ?? []), includePathname ? pathname : []]);

	return scrollRef;
};
