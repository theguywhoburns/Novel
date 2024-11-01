import { useState } from "react";
import { RangeInput, LabeledSwitch, LabeledRadioButton, SettingsList } from "../../components"; 
import styles from "./Home.module.css";
import { Modal } from "@mui/material";

const Home = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showPeopleInDistance, setShowPeopleInDistance] = useState(false);
  const [showPeopleInAge, setShowPeopleInAge] = useState(false);
  const [showMeToMen, setShowMeToMen] = useState(false);
  const [showMeToWomen, setShowMeToWomen] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isAries, setIsAries] = useState(false);

  return (
    <div className={styles.screen}>
      <Modal open={isSettingsOpen}>
        <div className={styles.settingsModal}>
          <div className={styles.settingsModalHeader}>
            <button onClick={() => setIsSettingsOpen(false)} className={styles.settingsModalBtn}>
              Back
            </button>
            <h2 className={styles.settingsModalHeaderText}>Search Settings</h2>
          </div>
          <div className={styles.settingsModalScrollView}>
            <div className={styles.baseSubscriptionBanner}>
              <h3 className={styles.baseSubscriptionTitleText}>Basic Subscription</h3>
              <p className={styles.baseSubscriptionSubTitleText}>Expand your capabilities</p>
            </div>

            <RangeInput label="Distance" min={0} max={100} unit="km" />
            <LabeledSwitch
              label="Show people within range"
              value={showPeopleInDistance}
              onChange={setShowPeopleInDistance}
            />
            <div className={styles.separator} />

            <RangeInput label="Age" min={18} max={99} unit="years" />
            <LabeledSwitch
              label="Show people within range"
              value={showPeopleInAge}
              onChange={setShowPeopleInAge}
            />
            <LabeledSwitch
              label="Show me to men"
              value={showMeToMen}
              onChange={setShowMeToMen}
            />
            <LabeledSwitch
              label="Show me to women"
              value={showMeToWomen}
              onChange={setShowMeToWomen}
            />

            <div className={styles.advancedSubscriptionBanner}>
              <h3 className={styles.advancedSubscriptionTitleText}>Advanced Subscription</h3>
              <p className={styles.advancedSubscriptionSubTitleText}>Match partners by interests</p>
            </div>

            <LabeledSwitch
              label="User Verified"
              value={isUserVerified}
              onChange={setIsUserVerified}
            />

            <LabeledRadioButton label="Aries" isSelected={isAries} setIsSelected={setIsAries} />

            <SettingsList />
          </div>
        </div>
      </Modal>
      <div className={styles.header}>
        <button className={styles.headerBtn}>
          Shield
        </button>
        <button onClick={() => setIsSettingsOpen(true)} className={styles.headerBtn}>
          SettingsGear
        </button>
      </div>
      <div className={styles.lilMenu}>
        <button className={styles.lilMenuBtn}>
          LeftArrow
        </button>
        <button className={styles.lilMenuBtn}>
          Cross
        </button>
        <button className={styles.lilMenuBtn}>
          Heart
        </button>
        <button className={styles.lilMenuBtn}>
          Diamond
        </button>
      </div>
    </div>
  );
};

export default Home;