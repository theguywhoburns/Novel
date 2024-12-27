import { privateRoutes, publicRoutes, RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
	const isAuth = useLoginStore(state => state.isAuth);

	useEffect(() => {
		console.log(isAuth);
	}, [isAuth]);

	return (
		<Routes>
			{isAuth &&
				privateRoutes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
				))}
			{publicRoutes.map(route => (
				<Route
					key={route.path}
					path={route.path}
					element={<route.component />}
				/>
			))}
			<Route path='*' element={<Navigate to={RouteNames.HOME} />} />
		</Routes>
	);
};
