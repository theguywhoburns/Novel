import { Page404 } from '@/pages/404';
import Home from '@/pages/Home';
import { Settings } from '@/pages/Home/Settings/Settings';
import { UserCardDetailedPage } from '@/pages/Home/UserCardDetailedPage/UserCardDetailedPage';
import { ChatPage } from '@/pages/MessengerPage/ChatPage/ChatPage';
import { MessengerPage } from '@/pages/MessengerPage/MessengerPage';
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
	SETTINGS = 'settings',
	REELS = '/reels',
	PLACES = '/places',
	PLACE = '/place/:id',
	MESSENGER = '/messenger',
	CHAT = '/chat/:id',
	PROFILE = '/profile/:id',
	TESTING_PLAYGROUND = '/testing-playground',
}

export const publicRoutes: IRoute[] = [
	{ path: RouteNames.LOGIN, component: Page404 },
];

export const privateRoutes: IRoute[] = [
	{ path: RouteNames.HOME, component: Home },
	{ path: RouteNames.SETTINGS, component: Settings },
	{ path: RouteNames.REELS, component: Page404 },
	{ path: RouteNames.PLACES, component: Places },
	{ path: RouteNames.PLACE, component: PlaceDetailedPage },
	{ path: RouteNames.MESSENGER, component: MessengerPage },
	{ path: RouteNames.CHAT, component: ChatPage },
	{ path: RouteNames.PROFILE, component: UserCardDetailedPage },
	{ path: RouteNames.TESTING_PLAYGROUND, component: TestPlayground },
];
