import { LabeledRadioButtonsList } from '@/components/ui/LabeledRadioButtonsList/LabeledRadioButtonsList';
import styles from './RadioModalTriggerList.module.css';

export interface IRadioModalTrigger {
	Icon: React.FC | null;
	title: string;
	options: string[];
}

interface IRadioModalTiggerList {
	triggers: IRadioModalTrigger[];
}

export const RadioModalTriggerList = ({ triggers }: IRadioModalTiggerList) => {
	return (
		<div className={styles.list}>
			{triggers.map(item => (
				<LabeledRadioButtonsList
					key={item.title}
					Icon={item.Icon}
					title={item.title}
					options={item.options}
				/>
			))}
		</div>
	);
};
