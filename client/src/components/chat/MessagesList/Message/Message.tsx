import { IMessageProps } from "@/components/chat/ChatsList/Chat/Chat";
import { Separator } from "@/components/ui/Separator/Separator";
import { IconNotSent } from "@/icons/NotSent";
import { IconRead } from "@/icons/Read";
import { IconSending } from "@/icons/Sending";
import { IconSent } from "@/icons/Sent";
import { useLoginStore } from "@/store/login/useLoginStore";
import { useThemeStore } from "@/store/theme/useThemeStore";
import { useTheme } from "@/theme";
import { memo, useRef } from "react";
import { ButtonsGroup } from "../../ButtonsGroup/ButtonsGroup";
import styles from "./Message.module.css";

export const Message = memo(
  ({
    id,
    chatId,
    senderId,
    recipientId,
    type,
    text,
    createdAt,
    status,
    replyToMessage,
    nextMessageSenderId,
    visibleButtonsGroupId,
    left,
    onToggleButtonsGroup,
  }: IMessageProps) => {
    const theme = useTheme();

    const currentTheme = useThemeStore((state) => state.theme);
    const userId = useLoginStore((state) => state.userId);

    const messageRef = useRef<HTMLDivElement>(null);
    const messageContentRef = useRef<HTMLDivElement>(null);

    const amISender = userId === senderId;
    const amIRecipient = userId === recipientId;
    const isNextMessageFromSameSender = nextMessageSenderId === senderId;

    const formattedTime =
      createdAt &&
      new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    const recipientUser = {
      id: 2,
      imgSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ",
      name: "Алиса",
      age: 23,
      isPopular: false,
      search: "",
      job: "",
      distance: "",
      isVerified: false,
      gender: "female",
      city: "",
      about: "",
      main: [],
      languages: [],
      interests: [],
    }; // we will get the user by recipientId instead

    return (
      <div
        className={[
          styles.message,
          amISender ? styles.sender : amIRecipient ? styles.recipient : "",
        ].join(" ")}
        ref={messageRef}
      >
        {!amISender && (
          <img
            className={styles.avatar}
            style={{ marginBottom: isNextMessageFromSameSender ? 2 : 8 }}
            src={recipientUser.imgSrc}
            alt="avatar"
          />
        )}
        <div
          className={styles.messageContent}
          style={{
            backgroundColor: amISender
              ? theme.accent_color
              : theme.button_background_color,
            marginBottom: isNextMessageFromSameSender ? 2 : 8,
          }}
          ref={messageContentRef}
          onClick={(e) => onToggleButtonsGroup(id, e, messageContentRef)}
        >
          {replyToMessage?.id && (
            <div
              className={styles.replyToMessage}
              style={{
                background:
                  currentTheme === "light"
                    ? "rgba(0, 0, 0, 0.08)"
                    : "rgba(0, 0, 0, 0.14)",
              }}
            >
              <Separator
                direction="vertical"
                color={amISender ? theme.white : theme.accent_color}
                marginY={[0, 0]}
              />
              <p
                className={styles.replyToMessageText}
                lang="ru"
                style={{ color: amISender ? theme.white : theme.text_color }}
              >
                {replyToMessage?.text}
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            {type === "text" ? (
              <p
                className={styles.messageText}
                lang="ru"
                style={{ color: amISender ? theme.white : theme.text_color }}
              >
                {text}
              </p>
            ) : (
              <p>this message has not text type</p>
            )}

            <div className={styles.timeAndStatus}>
              <span
                className={styles.time}
                style={{ color: amISender ? theme.white : theme.grey }}
              >
                {formattedTime}
              </span>

              {amISender && (
                <div className={styles.statusWrapper}>
                  {status === "sending" ? (
                    <IconSending />
                  ) : status === "sent" ? (
                    <IconSent />
                  ) : status === "read" ? (
                    <IconRead />
                  ) : status === "not sent" ? (
                    <IconNotSent />
                  ) : null}
                </div>
              )}
            </div>
          </div>
          {visibleButtonsGroupId === id && (
            <ButtonsGroup
              id={id}
              chatId={chatId}
              senderId={senderId}
              recipientId={recipientId}
              type={type}
              text={text}
              createdAt={createdAt}
              status={status}
              left={left}
              amISender={amISender}
              replyToMessage={replyToMessage || null}
            />
          )}
        </div>
      </div>
    );
  }
);
