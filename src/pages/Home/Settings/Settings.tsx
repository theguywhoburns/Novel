import { useSettingsStore } from "@/store/settings/useSettingsStore";
import { useTheme } from "@/theme";
import styles from "./Settings.module.css";
import { useNavigate } from "react-router-dom";
import { IconArrow, IconHeartLoop, IconLoop } from "@/icons";
import { Banner } from "@/components/Banner/Banner";
import { LabeledSwitch, RangeInput, SettingsList } from "@/components";
export const Settings = () => {
  const theme = useTheme();
  const {
    showPeopleInDistance,
    setShowPeopleInDistance,
    showPeopleInAge,
    setShowPeopleInAge,
    showMeToMen,
    setShowMeToMen,
    showMeToWomen,
    setShowMeToWomen,
    isUserVerified,
    setIsUserVerified,
  } = useSettingsStore((state) => ({
    showPeopleInDistance: state.showPeopleInDistance,
    setShowPeopleInDistance: state.setShowPeopleInDistance,
    showPeopleInAge: state.showPeopleInAge,
    setShowPeopleInAge: state.setShowPeopleInAge,
    showMeToMen: state.showMeToMen,
    setShowMeToMen: state.setShowMeToMen,
    showMeToWomen: state.showMeToWomen,
    setShowMeToWomen: state.setShowMeToWomen,
    isUserVerified: state.isUserVerified,
    setIsUserVerified: state.setIsUserVerified,
  }));
  const navigate = useNavigate();
  return (
    <div className={styles.settingsPage}>
      <div className={styles.settingsPageHeader}>
        <button onClick={() => navigate(-1)} className={styles.settingsPageBtn}>
          <IconArrow color={theme.accent_color} />
        </button>
        <h2 className={styles.settingsPageHeaderText}>Настройки поиска</h2>
      </div>
      <div className={styles.settingsPageScrollView}>
        <Banner
          type="basic"
          title="Базовая подписка"
          subTitle="Расширь свои возможности"
          Icon={IconLoop}
        />

        <RangeInput label="Расстояние" min={0} max={100} unit="км" />
        <LabeledSwitch
          label="Показывать людей в радиусе"
          value={showPeopleInDistance}
          onChange={setShowPeopleInDistance}
        />
        <div className={styles.separator} />

        <RangeInput label="Возраст" min={18} max={99} unit="лет" />
        <LabeledSwitch
          label="Показывать людей в радиусе"
          value={showPeopleInAge}
          onChange={setShowPeopleInAge}
        />
        <LabeledSwitch
          label="Показывать меня мужчинам"
          value={showMeToMen}
          onChange={setShowMeToMen}
        />
        <LabeledSwitch
          label="Показывать меня женщинам"
          value={showMeToWomen}
          onChange={setShowMeToWomen}
        />

        <Banner
          type="advanced"
          title="Продвинутая подписка"
          subTitle="Расширь свои возможности"
          Icon={IconHeartLoop}
        />

        <LabeledSwitch
          label="Пользователь верифицирован"
          value={isUserVerified}
          onChange={setIsUserVerified}
        />

        <SettingsList />
      </div>
    </div>
  );
};
