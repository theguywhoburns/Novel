import { Pair } from './Pair/Pair';
import styles from './PairsList.module.css';

export interface IPair {
	id: number;
	imgSrc: string;
	name: string;
	age: number;
}

const pairs: IPair[] = [
	{
		id: 1,
		imgSrc: 'https://via.placeholder.com/100',
		name: 'John Doe',
		age: 25,
	},
	{
		id: 2,
		imgSrc: 'https://via.placeholder.com/100',
		name: 'John Doe',
		age: 25,
	},
	{
		id: 3,
		imgSrc: 'https://via.placeholder.com/100',
		name: 'John Doe',
		age: 25,
	},
];

export const PairsList = () => {
	return (
		<ul className={styles.pairsList}>
			{pairs?.map(pair => (
				<Pair key={pair.id} {...pair} />
			))}
		</ul>
	);
};
