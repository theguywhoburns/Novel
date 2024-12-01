import styles from './PlaceInfoItem.module.css';

interface IPlaceInfoItem {
	Icon: React.ReactElement;
	title?: string;
	value: string | number;
	separator?: string;
}

export const PlaceInfoItem = ({
	Icon,
	title,
	value,
	separator = ': ',
}: IPlaceInfoItem) => {
	return (
		<li className={styles.placeInfoItem}>
			{Icon}
			<p>
				<span>
					{title}
					{separator}
				</span>
				<span>{value}</span>
			</p>
		</li>
	);
};
