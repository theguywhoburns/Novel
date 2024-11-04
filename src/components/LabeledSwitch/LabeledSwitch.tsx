import { IOSSwitch } from '../IOSSwitch/IOSSwitch';
import styles from './LabeledSwitch.module.css';

export interface ITextSwitch {
	label: string;
	value: boolean;
	onChange: (checked: boolean) => void;
}

export const LabeledSwitch = ({ label, value, onChange }: ITextSwitch) => (
	<div className={styles.container}>
		<span className={styles.label}>{label}</span>
		<div className={styles.switchContainer}>
			<IOSSwitch checked={value} onChange={e => onChange(e.target.checked)} />
		</div>
	</div>
);
