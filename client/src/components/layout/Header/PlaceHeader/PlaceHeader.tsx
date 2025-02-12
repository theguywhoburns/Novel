import { usePlacesStore } from '@/store/places/usePlacesStore';
import { BackHeader } from '../BackHeader/BackHeader';

export const PlaceHeader = () => {
	const place = usePlacesStore(state => state.place);

	const placeType = place.categoryName;

	return <BackHeader title={placeType} />;
};
