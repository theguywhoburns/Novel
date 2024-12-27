import { LabeledRadioButtonsList } from '@/components/ui/LabeledRadioButtonsList/LabeledRadioButtonsList';
import styles from './RadioModalTriggerList.module.css';

export interface IRadioModalTrigger {
	Icon: React.FC;
	title: string;
	options: string[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
}

interface IRadioModalTriggerList {
	triggers: IRadioModalTrigger[];
}

export const RadioModalTriggerList = ({ triggers }: IRadioModalTriggerList) => {
	return (
		<div className={styles.list}>
			{triggers.map(item => (
				<LabeledRadioButtonsList
					key={item.title}
					Icon={item.Icon}
					title={item.title}
					options={item.options}
					selectedOption={item.selectedOption}
					setSelectedOption={item.setSelectedOption}
				/>
			))}
		</div>
	);
};
