import { useGeoPositionStore } from "@/store/geoPosition/useGeoPositionStore";
import { Geolocation, Position } from "@capacitor/geolocation";
import axios from "axios";

export const updateGeoPosition = () => {
  const position = new Promise<Position>((resolve, reject) => {
    if (useGeoPositionStore.getState().geoAllowed) {
      Geolocation.checkPermissions().then(
        () => {
          Geolocation.getCurrentPosition().then((position) => {
            resolve(position);
          });
        },
        () => {
          reject();
        }
      );
      return;
    }
    reject();
  });

  position.then(
    (position) => {
      console.debug(
        "[updateGeoPosition] Got position:",
        JSON.stringify(position)
      );
      const { latitude: geoLat, longitude: geoLon } = position.coords;
      useGeoPositionStore.getState().setPosition({ geoLat, geoLon });
      axios.patch(
        `http://localhost:4000/api/update_user/${localStorage.getItem(
          "userId"
        )}`,
        {
          lat: geoLat,
          lon: geoLon,
        }
      );
    },
    (error) => {
      console.error("[updateGeoPosition] Failed to get position:", error);
    }
  );
};

export const updateCity = () => {
  const position = useGeoPositionStore.getState().position;
  if (!position) {
    useGeoPositionStore.getState().setCity("");
    return;
  }

  console.debug(
    "[updateCity] Updating city for position:",
    JSON.stringify(position)
  );

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.geoLat}&lon=${position.geoLon}&zoom=18&accept-language=ru&addressdetails=1`;

  axios
    .get(url)
    .then((response) => {
      const address = response.data.address;
      const city = address.city || undefined;
      if (city) {
        useGeoPositionStore.getState().setCity(city);
      }
    })
    .catch((err) => {
      console.error("[updateCity] Failed to resolve the city!", err);
    });
};
