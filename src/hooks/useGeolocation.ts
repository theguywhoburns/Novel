// Create a new hook called useGeolocation
import { useSettingsStore } from "@/store/settings/useSettingsStore";
import { Geolocation } from "@capacitor/geolocation";

export const useGeolocation = () => {
  const geolocationAllowed = useSettingsStore((state) => state);
  const setGeolocationAllowed = useSettingsStore(
    (state) => state.setGeolocationAllowed
  );

  const initGeolocation = async () => {
    if (!geolocationAllowed) return;

    const haveGeolocationPermission = await Geolocation.checkPermissions();
    if (haveGeolocationPermission.location !== "granted") {
      if (!(await Geolocation.requestPermissions())) {
        setGeolocationAllowed(false);
      }
    }
  };

  Promise.all([initGeolocation()]);

  return Geolocation;
};
