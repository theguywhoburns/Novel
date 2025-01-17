import { BackHeader } from '@/components/layout/Header/BackHeader/BackHeader';
import { ChatHeader } from '@/components/layout/Header/ChatHeader/ChatHeader';
import { Header as DefaultHeader } from '@/components/layout/Header/Header';
import { PlaceHeader } from '@/components/layout/Header/PlaceHeader/PlaceHeader';
import { Page404 } from '@/pages/404';
import { HomePage } from '@/pages/Home/HomePage';
import { Settings } from '@/pages/Home/Settings/Settings';
import { LoginBirthDatePage } from '@/pages/Login/LoginBirthDatePage/LoginBirthDatePage';
import { LoginDescriptionPage } from '@/pages/Login/LoginDescriptionPage/LoginDescriptionPage';
import { LoginEmailPage } from '@/pages/Login/LoginEmailPage/LoginEmailPage';
import { LoginGenderPage } from '@/pages/Login/LoginGenderPage/LoginGenderPage';
import { LoginNamePage } from '@/pages/Login/LoginNamePage/LoginNamePage';
import { LoginPhotosPage } from '@/pages/Login/LoginPhotosPage/LoginPhotosPage';
import { LoginUserInfoPage } from '@/pages/Login/LoginUserInfoPage/LoginUserInfoPage';
import { LoginVerificationCodePage } from '@/pages/Login/LoginVerificationCode/LoginVerificationCode';
import { ChatPage } from '@/pages/Messenger/ChatPage/ChatPage';
import { LikesPage } from '@/pages/Messenger/LikesPage/LikesPage';
import { MessengerPage } from '@/pages/Messenger/MessengerPage';
import { Places } from '@/pages/Places';
import { PlaceDetailedPage } from '@/pages/Places/PlaceDetailedPage/PlaceDetailedPage';
import { Profile } from '@/pages/Profile/ProfilePage';
import TestPlayground from '@/pages/TestPlayground';

export interface IRoute {
	path: string;
	component: React.ComponentType;
}

export enum RouteBase {
	LOGIN_EMAIL = '/login_email',
	LOGIN_VERIFICATION_CODE = '/login_verification_code',
	LOGIN_NAME = '/login_name',
	LOGIN_BIRTH_DATE = '/login_birth_date',
	LOGIN_PHOTOS = '/login_photos',
	LOGIN_GENDER = '/login_gender',
	LOGIN_DESCRIPTION = '/login_description',
	LOGIN_USER_INFO = '/login_user_info',
	HOME = '/',
	SETTINGS = '/settings',
	REELS = '/reels',
	PLACES = '/places',
	PLACE = '/place',
	MESSENGER = '/messenger',
	CHAT = '/chat',
	LIKES = '/likes',
	PROFILE = '/profile',
	TESTING_PLAYGROUND = '/testing-playground',
}

export enum RouteNames {
	LOGIN_EMAIL = RouteBase.LOGIN_EMAIL,
	LOGIN_VERIFICATION_CODE = RouteBase.LOGIN_VERIFICATION_CODE,
	LOGIN_NAME = RouteBase.LOGIN_NAME,
	LOGIN_BIRTH_DATE = RouteBase.LOGIN_BIRTH_DATE,
	LOGIN_PHOTOS = RouteBase.LOGIN_PHOTOS,
	LOGIN_GENDER = RouteBase.LOGIN_GENDER,
	LOGIN_DESCRIPTION = RouteBase.LOGIN_DESCRIPTION,
	LOGIN_USER_INFO = RouteBase.LOGIN_USER_INFO,
	HOME = RouteBase.HOME,
	SETTINGS = RouteBase.SETTINGS,
	REELS = RouteBase.REELS,
	PLACES = RouteBase.PLACES,
	PLACE = RouteBase.PLACE + '/:id',
	MESSENGER = RouteBase.MESSENGER,
	CHAT = RouteBase.CHAT,
	LIKES = RouteBase.LIKES,
	PROFILE = RouteBase.PROFILE + '/:id',
	TESTING_PLAYGROUND = RouteBase.TESTING_PLAYGROUND,
}

export const RouteLayouts: Record<
	string,
	[React.ReactNode /*Header*/, boolean /*Show bottom nav*/]
> = {
	[RouteBase.LOGIN_EMAIL]: [<DefaultHeader />, false],
	[RouteBase.LOGIN_VERIFICATION_CODE]: [<BackHeader />, false],
	[RouteBase.LOGIN_NAME]: [<BackHeader />, false],
	[RouteBase.LOGIN_BIRTH_DATE]: [<BackHeader />, false],
	[RouteBase.LOGIN_PHOTOS]: [<BackHeader />, false],
	[RouteBase.LOGIN_GENDER]: [<BackHeader />, false],
	[RouteBase.LOGIN_DESCRIPTION]: [<BackHeader />, false],
	[RouteBase.LOGIN_USER_INFO]: [<BackHeader />, false],
	[RouteBase.HOME]: [<DefaultHeader />, true],
	[RouteBase.SETTINGS]: [<BackHeader title='Параметры поиска' />, true],
	[RouteBase.REELS]: [<DefaultHeader />, true],
	[RouteBase.PLACES]: [<DefaultHeader />, true],
	[RouteBase.PLACE]: [<PlaceHeader />, false],
	[RouteBase.MESSENGER]: [<DefaultHeader />, true],
	[RouteBase.CHAT]: [<ChatHeader />, false],
	[RouteBase.LIKES]: [<BackHeader title='Посмотреть лайки' />, false],
	[RouteBase.PROFILE]: [<BackHeader title='Редактирование' />, true],
	[RouteBase.TESTING_PLAYGROUND]: [<DefaultHeader />, true],
};

export const publicRoutes: IRoute[] = [
	{ path: RouteNames.LOGIN_EMAIL, component: LoginEmailPage },
	{
		path: RouteNames.LOGIN_VERIFICATION_CODE,
		component: LoginVerificationCodePage,
	},
	{ path: RouteNames.LOGIN_NAME, component: LoginNamePage },
	{ path: RouteNames.LOGIN_BIRTH_DATE, component: LoginBirthDatePage },
	{ path: RouteNames.LOGIN_PHOTOS, component: LoginPhotosPage },
	{ path: RouteNames.LOGIN_GENDER, component: LoginGenderPage },
	{ path: RouteNames.LOGIN_DESCRIPTION, component: LoginDescriptionPage },
	{ path: RouteNames.LOGIN_USER_INFO, component: LoginUserInfoPage },
];

export const privateRoutes: IRoute[] = [
	{ path: RouteNames.HOME, component: HomePage },
	{ path: RouteNames.SETTINGS, component: Settings },
	{ path: RouteNames.REELS, component: Page404 },
	{ path: RouteNames.PLACES, component: Places },
	{ path: RouteNames.PLACE, component: PlaceDetailedPage },
	{ path: RouteNames.MESSENGER, component: MessengerPage },
	{ path: RouteNames.CHAT, component: ChatPage },
	{ path: RouteNames.LIKES, component: LikesPage },
	{ path: RouteNames.PROFILE, component: Profile },
	{ path: RouteNames.TESTING_PLAYGROUND, component: TestPlayground },
];
