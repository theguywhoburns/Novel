import { useTheme } from "@/theme";
import styles from "./UserCardTag.module.css";
import { JSX } from "react";

export interface ITag extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  Icon: JSX.Element | null;
  children: React.ReactNode;
}

export const UserCardTag = ({ id, Icon, children, ...props }: ITag) => {
  const theme = useTheme();

  const { className, ...otherProps } = props;

  return (
    <div
      id={id}
      className={`${styles.container} ${className}`}
      style={{ backgroundColor: theme.semi_transparent_white }}
      {...otherProps}
    >
      {Icon && Icon}
      <span className={styles.tagText} style={{ color: theme.white }}>
        {children}
      </span>
    </div>
  );
};
