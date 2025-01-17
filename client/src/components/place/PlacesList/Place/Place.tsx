import { IconGeoTag, IconStar } from "@/icons";
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

  const formattedRating = rate;

  const handleClick = () => {
    navigate(`/place/${id}`);
    setPlace({ id, name, imgSrc, rate, geoLat, geoLon, workingHours });
  };

  return (
    <li className={styles.place} onClick={handleClick}>
      <img
        className={styles.img}
        src={
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALIAuwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QALRABAAIAAgcIAgMBAAAAAAAAAAECAwQREyEzYXGREhQkMVJjgaFRcjJBsSL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+GgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmylYtjaLRExonzBCNG1cCs6LRSObzw3t/QM8aHhvb+jw3t/QM8aHhvb+jw3t/QM8aHhvb+nOaw6VwZmtIidMeUAogAAAAAAAAAAAAAJ8lv/AIlAnyW/+JB1nt5X9VeImZ0RGmeCxnt5X9XWRtSO1EzEWn8gqzExOidkvFnO2rN47OiZiNswrACTBw5xbxWPL+5e5nD1eLMRH/M7YBE0M5uLc4Z7Qzm4tzgGeAAAAAAAAAAAAAAnyW/+JQJ8lv8A4kHWe3lf1QUra9uzWNMp89vK/qkyWHorOJMbZ2RyBVwsOcTEinl+eC5j5atqR2I0WiNnFNFIi02iNs+cugQ5fC1VNv8AKfNznKdrC7Uedf8AFh5MaYmJjZIMloZzcW5wo4lZpeaz/Ur2c3FucAzwAAAAAAAAAAAAAE+S3/xKBPkt/wDEgnzWDfFvE10bI0eaDumLw6r4Ch3TF4dTumLw6r4Ch3TF4dTumLw6r4Ch3TF4dVnObi3OEyHObiecAzwAAAAAAAAAAAAAE+S3/wASgexaazprMxPAGqMzW4nrt1Nbieu3UGmMzW4nrt1Nbieu3UGmMzW4nrt1Nbieu3UGmhzm4nnClrcT126vJve0aLWtMcZByAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z"
        }
        alt="place image"
      />
      <div className={styles.dataContainer}>
        <p className={styles.placeName} style={{ color: theme.white }}>
          {name}
        </p>

        <div className={styles.iconAndValue} style={{ color: theme.grey }}>
          <IconStar style={{ transform: "scale(0.85)" }} />
          <span>{formattedRating}</span>
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
