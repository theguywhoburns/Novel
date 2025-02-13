import { useGeoPositionStore } from "@/store/geoPosition/useGeoPositionStore";
import { Geolocation, Position } from "@capacitor/geolocation";
import { getServerUrl } from "@/utils/serverUrl";
import axios from "axios";

export const updateGeoPosition = () => {
  console.log("[updateGeoPosition] Requesting position update...");
  const position = new Promise<Position>((resolve, reject) => {
    if (useGeoPositionStore.getState().geoAllowed) {
      Geolocation.checkPermissions().then(
        () => {
          Geolocation.getCurrentPosition().then((position) => {
            console.log(
              "[updateGeoPosition] Got position:",
              JSON.stringify(position)
            );
            resolve(position);
          });
        },
        () => {
          console.error("[updateGeoPosition] Failed to get position!");
          reject();
        }
      );
      return;
    }
    console.error("[updateGeoPosition] Geo position is not allowed!");
    reject();
  });

  position.then(
    (position) => {
      console.log(
        "[updateGeoPosition] Updating position:",
        JSON.stringify(position)
      );
      const { latitude: geoLat, longitude: geoLon } = position.coords;
      useGeoPositionStore.getState().setPosition({ geoLat, geoLon });
      axios
        .patch(
          `http://${getServerUrl()}:4000/api/update_user/${localStorage.getItem(
            "userId"
          )}`,
          {
            lat: geoLat,
            lon: geoLon,
          }
        )
        .then((_) => {
          console.log(
            "[updateGeoPosition] Successfully updated position on server!"
          );
        })
        .catch((error) => {
          console.error(
            "[updateGeoPosition] Failed to update position on server!",
            error
          );
        });
    },
    (error) => {
      console.error(
        "[updateGeoPosition] Failed to get position:",
        JSON.stringify(error)
      );
      const geoLat = 55.9133;
      const geoLon = 37.8129;
      useGeoPositionStore.getState().setPosition({ geoLat, geoLon });
      axios
        .patch(
          `http://${getServerUrl()}:4000/api/update_user/${localStorage.getItem(
            "userId"
          )}`,
          {
            lat: geoLat,
            lon: geoLon,
          }
        )
        .then((_) => {
          console.log(
            "[updateGeoPosition] Successfully updated position on server!"
          );
        })
        .catch((error) => {
          console.error(
            "[updateGeoPosition] Failed to update position on server!",
            error
          );
        });
    }
  );
};

export const updateCity = () => {
  console.log("[updateCity] Updating city...");
  const position = useGeoPositionStore.getState().position;
  if (!position) {
    console.log("[updateCity] No position to update city!");
    useGeoPositionStore.getState().setCity("Королёв");
    return;
  }

  console.log(
    "[updateCity] Updating city for position:",
    JSON.stringify(position)
  );

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.geoLat}&lon=${position.geoLon}&zoom=18&accept-language=ru&addressdetails=1`;

  axios
    .get(url)
    .then((response) => {
      console.log(
        "[updateCity] Successfully got city from server!",
        JSON.stringify(response)
      );
      const address = response.data.address;
      const city = address.city || undefined;
      if (city) {
        console.log("[updateCity] Updating city:", city);
        useGeoPositionStore.getState().setCity(city);
      }
    })
    .catch((err) => {
      console.error("[updateCity] Failed to resolve the city!", err);
      useGeoPositionStore.getState().setCity("Королёв");
    });
};
