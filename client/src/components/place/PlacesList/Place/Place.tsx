import { IconGeoTag, IconStar } from "@/icons";
import { RouteBase } from "@/routes";
import { useGeoPositionStore } from "@/store/geoPosition/useGeoPositionStore";
import { usePlacesStore } from "@/store/places/usePlacesStore";
import { useTheme } from "@/theme";
import { distance } from "@/utils/distance";
import { useNavigate } from "react-router-dom";
import styles from "./Place.module.css";

export interface IPlace {
  id?: number;
  name: string;
  imgSrc: string;
  rate: number;
  workingHours: [string, string];
  description?: string;
  approximateCost?: number;
  phoneNumber?: string;
  address?: string;
  geoLat: number;
  geoLon: number;
  link?: string;
}

export const Place = ({
  id,
  name,
  imgSrc,
  rate,
  geoLat,
  geoLon,
  workingHours,
}: IPlace) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const position = useGeoPositionStore((state) => state.position);

  const setPlace = usePlacesStore((state) => state.setPlace);

  let distanceInKm = "";
  if (position) {
    distanceInKm = distance(
      geoLat,
      geoLon,
      position?.geoLat,
      position?.geoLon,
      "K"
    ).toFixed(2);
  }

  const handleClick = () => {
    navigate(`${RouteBase.PLACE}/${id}`);
    setPlace({ id, name, imgSrc, rate, geoLat, geoLon, workingHours });
  };

  return (
    <li className={styles.place} onClick={handleClick}>
      <img
        className={styles.img}
        src={
          imgSrc ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ"
        }
        alt="place image"
      />
      <div className={styles.dataContainer}>
        <p className={styles.placeName} style={{ color: theme.white }}>
          {name}
        </p>

        <div className={styles.iconAndValue} style={{ color: theme.grey }}>
          <IconStar style={{ transform: "scale(0.85)" }} />
          <span>{rate}</span>
        </div>

        <div
          className={styles.iconAndValue}
          style={{ color: theme.grey, marginLeft: 2.5 }}
        >
          <IconGeoTag style={{ transform: "scale(0.88)" }} />
          <span>{position ? distanceInKm : "???"} км от вас</span>
        </div>
      </div>
    </li>
  );
};
