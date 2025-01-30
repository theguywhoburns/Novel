import { useUserActions } from "@/hooks/useUserActions";
import { RouteBase } from "@/routes";
import { Gender } from "@/store/login/useLoginStore";
import { useSettingsStore } from "@/store/settings/useSettingsStore";
import { useUsersStore } from "@/store/users/useUsersStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { UserCard } from "./UserCard/UserCard";
import styles from "./UsersList.module.css";

export interface IUser {
  id: number;
  imgSrc: string;
  isPopular: boolean;
  name: string;
  age: number;
  lat: number;
  lon: number;
  searchGoal: string;
  jobPosition: string;
  distance: string;
  isVerified: boolean;
  gender: Gender;
  city: string;
  description: string;
  main: string[];
  languages: string[];
  interests: string[];
}

export const mockUsers = [
  // mock data, must be IUser[] type
  {
    id: 1,
    imgSrc:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ",
    isPopular: true,
    name: "John Doe 1",
    lat: 40.7128,
    lon: -74.006,
    age: 25,
    searchGoal: "Family",
    jobPosition: "Engineer",
    distance: "5 miles away",
    isVerified: true,
    gender: "male",
    city: "New York",
    description:
      "I am a software engineer with a passion for coding and problem-solving.",
    main: [
      { id: "1", Icon: null, children: "Coding" },
      { id: "2", Icon: null, children: "Gaming" },
      { id: "3", Icon: null, children: "Hiking" },
    ],
    languages: [
      { id: "1", Icon: null, children: "English" },
      { id: "2", Icon: null, children: "Spanish" },
    ],
    interests: [
      { id: "1", Icon: null, children: "Technology" },
      { id: "2", Icon: null, children: "Sports" },
      { id: "3", Icon: null, children: "Music" },
    ],
  },
  {
    id: 2,
    imgSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ",
    isPopular: false,
    name: "John Doe 2",
    lat: 40.7128,
    lon: -74.006,
    age: 25,
    searchGoal: "Husband",
    jobPosition: "Engineer",
    distance: "5 miles away",
    isVerified: false,
    gender: "male",
    city: "Los Angeles",
    description:
      "I am a software engineer with a passion for coding and problem-solving.",
    main: [
      { id: "1", Icon: null, children: "Coding" },
      { id: "2", Icon: null, children: "Gaming" },
      { id: "3", Icon: null, children: "Cooking" },
    ],
    languages: [
      { id: "1", Icon: null, children: "English" },
      { id: "2", Icon: null, children: "French" },
    ],
    interests: [
      { id: "1", Icon: null, children: "Technology" },
      { id: "2", Icon: null, children: "Sports" },
      { id: "3", Icon: null, children: "Travel" },
    ],
  },
  {
    id: 3,
    imgSrc:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ",
    isPopular: true,
    name: "John Doe 3",
    lat: 40.7128,
    lon: -74.006,
    age: 25,
    searchGoal: "Love",
    jobPosition: "Engineer",
    distance: "5 miles away",
    isVerified: true,
    gender: "male",
    city: "Chicago",
    description:
      "I am a software engineer with a passion for coding and problem-solving.",
    main: [
      { id: "1", Icon: null, children: "Coding" },
      { id: "2", Icon: null, children: "Gaming" },
      { id: "3", Icon: null, children: "Reading" },
    ],
    languages: [
      { id: "1", Icon: null, children: "English" },
      { id: "2", Icon: null, children: "German" },
    ],
    interests: [
      { id: "1", Icon: null, children: "Technology" },
      { id: "2", Icon: null, children: "Sports" },
      { id: "3", Icon: null, children: "History" },
    ],
  },
  {
    id: 4,
    imgSrc:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ",
    isPopular: false,
    name: "John Doe 4",
    lat: 40.7128,
    lon: -74.006,
    age: 25,
    searchGoal: "Friends",
    jobPosition: "Engineer",
    distance: "5 miles away",
    isVerified: false,
    gender: "male",
    city: "Houston",
    description:
      "I am a software engineer with a passion for coding and problem-solving.",
    main: [
      { id: "1", Icon: null, children: "Coding" },
      { id: "2", Icon: null, children: "Gaming" },
      { id: "3", Icon: null, children: "Sports" },
    ],
    languages: [
      { id: "1", Icon: null, children: "English" },
      { id: "2", Icon: null, children: "Italian" },
    ],
    interests: [
      { id: "1", Icon: null, children: "Technology" },
      { id: "2", Icon: null, children: "Sports" },
      { id: "3", Icon: null, children: "Music" },
    ],
  },
  {
    id: 5,
    imgSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ",
    isPopular: true,
    name: "John Doe 5",
    lat: 40.7128,
    lon: -74.006,
    age: 25,
    searchGoal: "New people",
    jobPosition: "Engineer",
    distance: "5 miles away",
    isVerified: true,
    gender: "male",
    city: "Phoenix",
    description:
      "I am a software engineer with a passion for coding and problem-solving.",
    main: [
      { id: "1", Icon: null, children: "Coding" },
      { id: "2", Icon: null, children: "Gaming" },
      { id: "3", Icon: null, children: "Travel" },
    ],
    languages: [
      { id: "1", Icon: null, children: "English" },
      { id: "2", Icon: null, children: "Japanese" },
    ],
    interests: [
      { id: "1", Icon: null, children: "Technology" },
      { id: "2", Icon: null, children: "Sports" },
      { id: "3", Icon: null, children: "Cooking" },
    ],
  },
];

export interface IUserActions {
  handleLike: () => void;
  handleDislike: () => void;
}

export const UsersList = () => {
  const users = useUsersStore((state) => state.users);

  const getFilteredUsers = useUsersStore((state) => state.getFilteredUsers);

  const settings = useSettingsStore((state) => state.settings);

  const currentIndex = useUsersStore((state) => state.currentIndex);
  const nextIndex = useUsersStore((state) => state.nextIndex);
  const direction = useUsersStore((state) => state.direction);

  const visitingUserId = useUsersStore((state) => state.visitingUserId);
  const setVisitingUserId = useUsersStore((state) => state.setVisitingUserId);

  const navigate = useNavigate();

  const { handleLike, handleDislike } = useUserActions({});

  const handleClick = () => {
    if (visitingUserId) {
      setVisitingUserId(null);
    } else {
      setVisitingUserId(Number(id));
      navigate(`${RouteBase.PROFILE}/${id}`);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleDislike,
    onSwipedRight: handleLike,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const {
    distanceRange,
    showPeopleInDistance,
    ageRange,
    showPeopleInAge,
    showVerifiedOnly,
  } = settings;

  const filter = {
    distanceRange,
    showPeopleInDistance,
    ageRange,
    showPeopleInAge,
    showVerifiedOnly,
  };

  useEffect(() => {
    getFilteredUsers(filter);
    console.log(users);
  }, []);

  const {
    id,
    imgSrc,
    isPopular,
    name,
    age,
    searchGoal,
    jobPosition,
    distance,
  } = users?.[currentIndex] ?? {};

  return (
    <div className={styles.usersList} {...handlers}>
      <motion.div
        style={{ borderRadius: 22 }}
        key={id}
        initial={{
          opacity: 1,
          x: direction === "right" ? "-100%" : "100%",
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 1,
          x: direction === "right" ? "100%" : "-100%",
        }}
        transition={{ duration: 0.5 }}
      >
        <UserCard
          style={{ position: "absolute", top: 0, left: 0 }}
          imgSrc={users?.[nextIndex]?.imgSrc ?? ""}
          isPopular={users?.[nextIndex]?.isPopular ?? false}
          name={users?.[nextIndex]?.name ?? "Ты долистал-(а) до конца"}
          age={users?.[nextIndex]?.age ?? 0}
          search={users?.[nextIndex]?.searchGoal ?? ""}
          job={users?.[nextIndex]?.jobPosition ?? ""}
          distance={users?.[nextIndex]?.distance ?? ""}
          isDraggable={false}
        />
        <UserCard
          imgSrc={imgSrc}
          isPopular={isPopular}
          name={name}
          age={age}
          search={searchGoal}
          job={jobPosition}
          distance={distance}
          isDraggable={true}
          onClick={handleClick}
        />
      </motion.div>
    </div>
  );
};
