import { UserActionButtons } from "@/components/user/UserActionButtons/UserActionButtons";
import { UsersList } from "@/components/user/UsersList/UsersList";
import { useTheme } from "@/theme";
import styles from "./Home.module.css";
import { NoDataText } from "@/components/ui/NoDataText/NoDataText";
import { useUsersStore } from "@/store/users/useUsersStore";

export const HomePage = () => {
  const theme = useTheme();
  const users = useUsersStore((state) => state.users);

  return (
    <div
      className={styles.homePage}
      style={{ backgroundColor: theme.background_color }}
    >
      {!users?.length ? (
        <NoDataText style={{ fontWeight: 700 }}>Нет пользователей</NoDataText>
      ) : (
        <div className={styles.container}>
          <UsersList />
          <UserActionButtons />
        </div>
      )}
    </div>
  );
};
