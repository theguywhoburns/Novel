import { NoDataText } from '@/components/ui/NoDataText/NoDataText';
import { useNewPairsStore } from '@/store/newPairs/useNewPairsStore';
import { useEffect } from 'react';
import { Pair } from './Pair/Pair';
import styles from './PairsList.module.css';

export interface IPair {
	id: number;
	imgSrc: string;
	name: string;
	age: number;
}

export const PairsList = () => {
	const newPairs = useNewPairsStore(state => state.newPairs);
	const getNewPairsByUser = useNewPairsStore(state => state.getNewPairsByUser);

	useEffect(() => {
		getNewPairsByUser();
	}, []);

	return (
		<>
			{newPairs.length ? (
				<ul className={styles.pairsList}>
					{newPairs?.map(pair => (
						<Pair key={pair.id} {...pair} />
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
