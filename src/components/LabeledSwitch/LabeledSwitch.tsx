import { Switch } from '@mui/material';
import styles from './LabeledSwitch.module.css';

export interface ITextSwitch {
	label: string;
	value: boolean;
	onChange: (checked: boolean) => void;
}

export const LabeledSwitch = ({ label, value, onChange }: ITextSwitch) => (
	<div className={styles.container}>
		<label className={styles.label}>{label}</label>
		<div className={styles.switchContainer}>
			<Switch checked={value} onChange={e => onChange(e.target.checked)} />
		</div>
	</div>
);
