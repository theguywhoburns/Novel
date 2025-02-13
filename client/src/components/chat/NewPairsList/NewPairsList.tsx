import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { useUserId } from '@/hooks/useUserId';
import { useNewPairsStore } from '@/store/newPairs/useNewPairsStore';
import { useEffect } from 'react';
import { NewPairCard } from './NewPairCard/NewPairCard';
import styles from './NewPairsList.module.css';

export interface INewPair {
	id: number;
	imgSrc: string;
	name: string;
	age: number;
}

export const NewPairsList = () => {
	const userId = useUserId();
	const newPairs = useNewPairsStore(state => state.newPairs);
	const getNewPairsByUser = useNewPairsStore(state => state.getNewPairsByUser);

	useEffect(() => {
		getNewPairsByUser(userId);
	}, [userId]);

	return (
		<>
			{[].length ? (
				<ul className={styles.pairsList}>
					{newPairs?.map(pair => (
						<NewPairCard key={pair.id} {...pair} />
					))}
				</ul>
			) : (
				<NoDataText className={styles.noDataText}>
					У Вас еще нет новых пар
				</NoDataText>
			)}
		</>
	);
};
