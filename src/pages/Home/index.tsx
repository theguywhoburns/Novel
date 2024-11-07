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
						<h2 className={styles.settingsModalHeaderText}>Настройки поиска</h2>
					</div>
					<div className={styles.settingsModalScrollView}>
						<div className={styles.baseSubscriptionBanner}>
							<h3 className={styles.baseSubscriptionTitleText}>
								Базовая подписка
							</h3>
							<p className={styles.baseSubscriptionSubTitleText}>
								Расширь свои возможности
							</p>
						</div>

						<RangeInput label='Расстояние' min={0} max={100} unit='км' />
						<LabeledSwitch
							label='Показывать людей в радиусе'
							value={showPeopleInDistance}
							onChange={setShowPeopleInDistance}
						/>
						<div className={styles.separator} />

						<RangeInput label='Возраст' min={18} max={99} unit='лет' />
						<LabeledSwitch
							label='Показывать людей в радиусе'
							value={showPeopleInAge}
							onChange={setShowPeopleInAge}
						/>
						<LabeledSwitch
							label='Показывать меня мужчинам'
							value={showMeToMen}
							onChange={setShowMeToMen}
						/>
						<LabeledSwitch
							label='Показывать меня женщинам'
							value={showMeToWomen}
							onChange={setShowMeToWomen}
						/>

						<div className={styles.advancedSubscriptionBanner}>
							<h3 className={styles.advancedSubscriptionTitleText}>
								Продвинутая подписка
							</h3>
							<p className={styles.advancedSubscriptionSubTitleText}>
								Подбирай партнера по интересам
							</p>
						</div>

						<LabeledSwitch
							label='Пользователь верифицирован'
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
