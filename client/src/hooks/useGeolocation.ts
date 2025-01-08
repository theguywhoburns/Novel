import { useGeoPositionStore } from '@/store/geoPosition/useGeoPositionStore';
import { Capacitor } from '@capacitor/core';
import { Geolocation as geo } from '@capacitor/geolocation';
import { useEffect, useState } from 'react';

export const useGeolocation = () => {
	const geoAllowed = useGeoPositionStore(state => state.geoAllowed);

	const [hasPermission, setHasPermission] = useState(false);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		checkPermissions();
	}, []);

	const checkPermissions = async () => {
		try {
			const { location } = await geo.checkPermissions();
			const granted = location === 'granted';
			setHasPermission(granted);
			return granted;
		} catch (err) {
			setError(err);
			setHasPermission(false);
			return false;
		}
	};

	const requestPermissions = async () => {
		try {
			let granted;
			if (Capacitor.getPlatform() !== 'web') {
				const { location } = await geo.requestPermissions();
				granted = location === 'granted';
			} else {
				granted = await geo.getCurrentPosition().then(
					() => true,
					() => false
				);
			}
			setHasPermission(granted);
			return granted;
		} catch (err) {
			setError(err);
			setHasPermission(false);
			return false;
		}
	};

	const getLocation = async () => {
		if (!geoAllowed) {
			setError('Geolocation is disabled in settings.');
			return undefined;
		}

		if (!hasPermission) {
			const permissionGranted = await requestPermissions();
			if (!permissionGranted) {
				setError('Geolocation permission denied.');
				return undefined;
			}
		}

		try {
			const position = await geo.getCurrentPosition();
			return position;
		} catch (err) {
			setError(err);
			return undefined;
		}
	};

	return {
		getLocation,
		checkPermissions,
		requestPermissions,
		hasPermission,
		error,
	};
};
