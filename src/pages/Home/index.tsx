import { IconArrow } from '@/icons/arrow';
import IconCrystal from '@/icons/crystal';
import IconDiscard from '@/icons/discard';
import IconSettingsGear from '@/icons/settingsGear';
import IconShield from '@/icons/shield';
import { useTheme } from '@/theme';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { LabeledSwitch, RangeInput, SettingsList } from '../../components';
import styles from './Home.module.css';

const Home = () => {
	const theme = useTheme();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [showPeopleInDistance, setShowPeopleInDistance] = useState(false);
	const [showPeopleInAge, setShowPeopleInAge] = useState(false);
	const [showMeToMen, setShowMeToMen] = useState(false);
	const [showMeToWomen, setShowMeToWomen] = useState(false);
	const [isUserVerified, setIsUserVerified] = useState(false);
	return (
		<div className={styles.screen}>
			<Modal open={isSettingsOpen}>
				<div className={styles.settingsModal}>
					<div className={styles.settingsModalHeader}>
						<button
							onClick={() => setIsSettingsOpen(false)}
							className={styles.settingsModalBtn}
						>
							<IconArrow color={theme.accent_color} />
						</button>
						<h2 className={styles.settingsModalHeaderText}>Search Settings</h2>
					</div>
					<div className={styles.settingsModalScrollView}>
						<div className={styles.baseSubscriptionBanner}>
							<h3 className={styles.baseSubscriptionTitleText}>
								Basic Subscription
							</h3>
							<p className={styles.baseSubscriptionSubTitleText}>
								Expand your capabilities
							</p>
						</div>

						<RangeInput label='Distance' min={0} max={100} unit='km' />
						<LabeledSwitch
							label='Show people within range'
							value={showPeopleInDistance}
							onChange={setShowPeopleInDistance}
						/>
						<div className={styles.separator} />

						<RangeInput label='Age' min={18} max={99} unit='years' />
						<LabeledSwitch
							label='Show people within range'
							value={showPeopleInAge}
							onChange={setShowPeopleInAge}
						/>
						<LabeledSwitch
							label='Show me to men'
							value={showMeToMen}
							onChange={setShowMeToMen}
						/>
						<LabeledSwitch
							label='Show me to women'
							value={showMeToWomen}
							onChange={setShowMeToWomen}
						/>

						<div className={styles.advancedSubscriptionBanner}>
							<h3 className={styles.advancedSubscriptionTitleText}>
								Advanced Subscription
							</h3>
							<p className={styles.advancedSubscriptionSubTitleText}>
								Match partners by interests
							</p>
						</div>

						<LabeledSwitch
							label='User Verified'
							value={isUserVerified}
							onChange={setIsUserVerified}
						/>

						<SettingsList />
					</div>
				</div>
			</Modal>
			<div className={styles.header}>
				<button className={styles.headerBtn}>
					<IconShield />
				</button>
				<button
					onClick={() => setIsSettingsOpen(true)}
					className={styles.headerBtn}
				>
					<IconSettingsGear />
				</button>
			</div>
			<div className={styles.lilMenu}>
				<button className={styles.lilMenuBtn}>
					<IconDiscard />
				</button>
				<button className={styles.lilMenuBtn}>Cross</button>
				<button className={styles.lilMenuBtn}>Heart</button>
				<button className={styles.lilMenuBtn}>
					<IconCrystal />
				</button>
			</div>
		</div>
	);
};

export default Home;
