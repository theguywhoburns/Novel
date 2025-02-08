import { Separator } from "@/components/ui/Separator/Separator";
import { UserActionsList } from "@/components/ui/UserActionsList/UserActionsList";
import { TagsWithTitle } from "@/components/user/TagsWithTitle/TagsWithTitle";
import {
  IconCity,
  IconFingersCross,
  IconGender,
  IconGeoTag,
  IconJob,
  IconLanguage,
  IconVerified,
} from "@/icons";
import { RouteNames } from "@/routes";
import { useGeoPositionStore } from "@/store/geoPosition/useGeoPositionStore";
import { useLoginStore } from "@/store/login/useLoginStore";
import { useThemeStore } from "@/store/theme/useThemeStore";
import { useUsersStore } from "@/store/users/useUsersStore";
import { useTheme } from "@/theme";
import { distance } from "@/utils/distance";
import { JSX, useEffect } from "react";
import { UserActionButtons } from "../UserActionButtons/UserActionButtons";
import { IUser } from "../UsersList/UsersList";
import { TextWithIcon } from "./TextWithIcon/TextWithIcon";
import styles from "./UserCardDetailed.module.css";

export const UserCardDetailed = ({
  imgSrc,
  name,
  age,
  searchGoal,
  jobPosition,
  lat,
  lon,
  description,
  main,
  languages,
  interests,
  isVerified,
  gender,
  city,
}: IUser) => {
  const theme = useTheme();
  const themeVariant = useThemeStore((state) => state.theme);

  const userId = useLoginStore((state) => state.userId);
  const visitingUser = useUsersStore((state) => state.visitingUser);

  const currUserPosition = useGeoPositionStore((state) => state.position);

  const svgFillColor = themeVariant === "light" ? "#E7E8EC" : theme.grey;

  const formattedGender =
    gender === "male" ? "Мужчина" : gender === "female" ? "Женщина" : null;

  const distanceToUser =
    distance(
      Number(currUserPosition?.geoLat),
      Number(currUserPosition?.geoLon),
      Number(lat),
      Number(lon)
    ).toFixed(1) + " км";

  useEffect(() => {
    console.log(
      imgSrc,
      name,
      age,
      searchGoal,
      jobPosition,
      lat,
      lon,
      description,
      main?.length ? main : "no main",
      languages ? languages : "no langs",
      interests,
      isVerified,
      gender,
      city
    );
  }, [
    imgSrc,
    name,
    age,
    searchGoal,
    jobPosition,
    lat,
    lon,
    description,
    main,
    languages,
    interests,
    isVerified,
    gender,
    city,
  ]);

  const getTagsFromArrayOfStrings = (
    array: string[],
    Icon: JSX.Element | null = null
  ) => {
    return [array].map((tag, index) => ({
      id: String(index + 1),
      children: tag,
      Icon,
    }));
  };

  const languagesTags = getTagsFromArrayOfStrings(languages, <IconLanguage />);

  const interestsTags = getTagsFromArrayOfStrings(interests);

  const mainTags = getTagsFromArrayOfStrings(main, <IconJob />);

  useEffect(() => {
    console.log(mainTags, languagesTags, interestsTags);
  }, [mainTags, languagesTags, interestsTags]);

  useEffect(() => {
    console.log(visitingUser?.id, userId);
  }, [visitingUser, userId]);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={
            imgSrc ||
            "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ"
          }
        />
        {userId !== visitingUser?.id && (
          <UserActionButtons
            className={styles.actions}
            navigateTo={RouteNames.HOME}
          />
        )}
      </div>

      <div className={styles.infoContainer}>
        <div
          className={styles.nameAndAgeContainer}
          style={{ color: theme.text_color }}
        >
          <span className={styles.name}>{name}</span>
          <span className={styles.age}>{age}</span>

          {isVerified && <IconVerified />}
        </div>

        <div className={styles.mainInfoContainer}>
          <TextWithIcon Icon={<IconFingersCross />} color={theme.accent_color}>
            {searchGoal}
          </TextWithIcon>
          <TextWithIcon Icon={<IconJob />}>{jobPosition}</TextWithIcon>
          <TextWithIcon Icon={<IconGender />}>{formattedGender}</TextWithIcon>
          <TextWithIcon Icon={<IconCity />}>{city}</TextWithIcon>

          {userId !== visitingUser?.id ? (
            <TextWithIcon Icon={<IconGeoTag fill={svgFillColor} />}>
              {distanceToUser}
            </TextWithIcon>
          ) : null}
        </div>

        <Separator />

        <h3>Обо мне</h3>
        <p className={styles.description} style={{ color: theme.accent_color }}>
          {description}
        </p>

        <Separator />

        <TagsWithTitle title="Основное" tags={mainTags} />
        <TagsWithTitle title="Языки, которыми я владею" tags={languagesTags} />
        <TagsWithTitle title="Мои интересы" tags={interestsTags} />

        <UserActionsList />
      </div>
    </div>
  );
};
