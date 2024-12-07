import { PlaceDetailed } from '@/components/place/PlacesList/Place/PlaceDetailed/PlaceDetailed';
import { usePlacesStore } from '@/store/places/usePlacesStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const PlaceDetailedPage = () => {
	const { id } = useParams();

	const place = usePlacesStore(state => state.place);
	const getPlace = usePlacesStore(state => state.getPlace);

	useEffect(() => {
		getPlace(Number(id));
	}, []);

	return (
		<div>
			{place?.id ? (
				<PlaceDetailed {...place} />
			) : (
				<p>Не могу найти это место :/</p>
			)}
		</div>
	);
};
