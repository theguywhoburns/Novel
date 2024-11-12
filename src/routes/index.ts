import Page404 from '@/pages/404';
import Home from '@/pages/Home';
import { UserCardDetailedPage } from '@/pages/Home/UserCardDetailedPage/UserCardDetailedPage';
import { Places } from '@/pages/Places';
import { PlaceDetailedPage } from '@/pages/Places/PlaceDetailedPage/PlaceDetailedPage';
import TestPlayground from '@/pages/TestPlayground';

export interface IRoute {
	path: string;
	component: React.ComponentType;
}

export enum RouteNames {
	LOGIN = '/login',
	HOME = '/',
	REELS = '/reels',
	PLACES = '/places',
	PLACE = '/place/:id',
	CHAT = '/chat',
	PROFILE = '/profile/:id',
	TESTING_PLAYGROUND = '/testing-playground',
}

export const publicRoutes: IRoute[] = [
	{ path: RouteNames.LOGIN, component: Page404 },
];

export const privateRoutes: IRoute[] = [
	{ path: RouteNames.HOME, component: Home },
	{ path: RouteNames.REELS, component: Page404 },
	{ path: RouteNames.PLACES, component: Places },
	{ path: RouteNames.PLACE, component: PlaceDetailedPage },
	{ path: RouteNames.CHAT, component: Page404 },
	{ path: RouteNames.PROFILE, component: UserCardDetailedPage },
	{ path: RouteNames.TESTING_PLAYGROUND, component: TestPlayground },
];
