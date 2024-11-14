import { IconArrow } from '@/icons';
import { useNavigate } from 'react-router-dom';

export const Page404 = () => {
	const navigate = useNavigate();

	return (
		<div>
			<button onClick={() => navigate(-1)}>
				<IconArrow color='#fff' />
			</button>
			<h1>404: Page not found</h1>
		</div>
	);
};
