import Home from "@/pages/Home";
import TestPlayground from "@/pages/TestPlayground";

const Page404 = () => <div>404</div>;

export interface IRoute {
	path: string;
	component: React.ComponentType;
}

export enum RouteNames {
	LOGIN = '/login',
	HOME = '/',
	REELS = '/reels',
	PLACES = '/places',
	CHAT = '/chat/:id?',
	PROFILE = '/profile/:id?',
	TESTING_PLAYGROUND = '/testing-playground',
}

export const publicRoutes: IRoute[] = [
	{ path: RouteNames.LOGIN, component: Page404 },
];

export const privateRoutes: IRoute[] = [
	{ path: RouteNames.HOME,   component: Home },
    { path: RouteNames.REELS,  component: Page404 },
    { path: RouteNames.PLACES, component: Page404 },
    { path: RouteNames.CHAT,   component: Page404 },
    { path: RouteNames.PROFILE,component: Page404 },
    { path: RouteNames.TESTING_PLAYGROUND, component: TestPlayground },
];
