import { IPlace } from '@/components/PlacesList/Place';
import { PlaceDetailed } from '@/components/PlacesList/Place/PlaceDetailed/PlaceDetailed';
import { useNavigate, useParams } from 'react-router-dom';
import { placesObj } from '..';
import { IconArrow } from '@/icons';

export const PlaceDetailedPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const place: IPlace | undefined = placesObj['parks'].find(
		place => place.id === parseInt(id ?? '')
	);

	return (
		<div>
			<button onClick={() => navigate(-1)}>
				<IconArrow color="#fff" />
			</button>
			{place?.id ? (
				<PlaceDetailed
					{...place}
				/>
			) : (
				<p>Не могу найти это место :/</p>
			)}
		</div>
	);
};
