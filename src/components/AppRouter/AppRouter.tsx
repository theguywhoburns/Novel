import { privateRoutes, publicRoutes, RouteNames } from '@/routes';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter = ({ isAuth }: { isAuth: boolean }) => (
	<Routes>
		{isAuth
			? privateRoutes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
			  ))
			: null}
		{publicRoutes.map(route => (
			<Route key={route.path} path={route.path} element={<route.component />} />
		))}
		<Route path='*' element={<Navigate to={RouteNames.HOME} />} />
	</Routes>
);
