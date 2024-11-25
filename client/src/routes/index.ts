import { ChatHeader } from '@/components/layout/Header/ChatHeader/ChatHeader';
import { Header as DefaultHeader } from '@/components/layout/Header/Header';
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

export enum RouteBase {
	LOGIN = "/login",
	HOME = "/",
	SETTINGS = "/settings",
	REELS = "/reels",
	PLACES = "/places",
	PLACE = "/place",
	MESSENGER = "/messenger",
	CHAT = "/chat",
	PROFILE = "/profile",
	TESTING_PLAYGROUND = "/testing-playground",
}

export enum RouteNames {
	LOGIN = RouteBase.LOGIN,
	HOME = RouteBase.HOME,
	SETTINGS = RouteBase.SETTINGS,
	REELS = RouteBase.REELS,
	PLACES = RouteBase.PLACES,
	PLACE = RouteBase.PLACE + "/:id",
	MESSENGER = RouteBase.MESSENGER,
	CHAT = RouteBase.CHAT + "/:id",
	PROFILE = RouteBase.PROFILE + "/:id",
	TESTING_PLAYGROUND = RouteBase.TESTING_PLAYGROUND,
};

export const RouteLayouts: Record<
	string,
	[React.FC /*Header*/, boolean /*Show bottom nav*/]
> = {
	[RouteBase.LOGIN]:[DefaultHeader, true],
	[RouteBase.HOME]:[DefaultHeader, true],
	[RouteBase.SETTINGS]:[DefaultHeader, true],
	[RouteBase.REELS]:[DefaultHeader, true],
	[RouteBase.PLACES]:[DefaultHeader, true],
	[RouteBase.PLACE]:[DefaultHeader, true],
	[RouteBase.MESSENGER]:[DefaultHeader, true],
	[RouteBase.CHAT]:[ChatHeader, false],
	[RouteBase.PROFILE]:[DefaultHeader, true],
	[RouteBase.TESTING_PLAYGROUND]:[DefaultHeader, true],
};




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
