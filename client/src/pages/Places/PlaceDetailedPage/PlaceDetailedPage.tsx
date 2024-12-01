import { IPlace } from '@/components/place/PlacesList/Place/Place';
import { PlaceDetailed } from '@/components/place/PlacesList/Place/PlaceDetailed/PlaceDetailed';
import { useParams } from 'react-router-dom';
import { placesObj } from '..';

export const PlaceDetailedPage = () => {
	const { id } = useParams();

	const place: IPlace | undefined = placesObj['parks'].find(
		place => place.id === parseInt(id ?? '')
	);

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
