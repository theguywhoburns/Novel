import { useGeoPositionStore } from "@/store/geoPosition/useGeoPositionStore";
import { useSettingsStore } from "@/store/settings/useSettingsStore";
import { Geolocation, Position } from "@capacitor/geolocation";

export const updateGeoPosition = () => {
    const position = new Promise<Position>((resolve, reject) => {
        if (useSettingsStore.getState().geolocationAllowed) {
            Geolocation.checkPermissions().then(() => {
                Geolocation.getCurrentPosition().then((position) => {    
                    resolve(position);  
                });
            }, () => {
                reject();
            });
            return;
        }
        reject();
    });

    position.then((position) => {
        const {latitude, longitude} = position.coords;
        useGeoPositionStore.getState().setPosition({latitude, longitude});
    });
}