import { Separator } from "@/components/ui/Separator/Separator";
import { IconMike, IconSticker } from "@/icons";
import { useLoginStore } from "@/store/login/useLoginStore";
import { useMessengerStore } from "@/store/messenger/useMessengerStore";
import { useTheme } from "@/theme";
import { IconButton } from "@mui/material";
import { forwardRef, useEffect, useRef } from "react";
import { IMessage } from "../../ChatsList/Chat/Chat";
import { ImageUploader } from "../../ImageUploader/ImageUploader";
import styles from "./ChatInput.module.css";

export interface IMessageEntity
  extends Omit<IMessage, "id" | "replyToMessage"> {
  id?: number;
  replyToMessageId: number | null;
}

interface IChatInput {
  onChatInputHeightAvailable: (height: number) => void;
  sendNewMessage: (data: IMessageEntity) => void;
  editMessage: (message: IMessage) => void;
  scrollBottomRef: React.RefObject<HTMLDivElement> | null;
}

export const ChatInput = forwardRef<HTMLDivElement, IChatInput>(
  (
    {
      onChatInputHeightAvailable,
      sendNewMessage,
      editMessage,
      scrollBottomRef,
    },
    ref
  ) => {
    const theme = useTheme();

    const inputRef = useRef<HTMLInputElement>(null);

    const chat = useMessengerStore((state) => state.chat);

    const replyTo = useMessengerStore((state) => state.replyTo);
    const setReplyTo = useMessengerStore((state) => state.setReplyTo);

    const messageToEdit = useMessengerStore((state) => state.messageToEdit);
    const setMessageToEdit = useMessengerStore(
      (state) => state.setMessageToEdit
    );

    const newMessageText = useMessengerStore((state) => state.newMessageText);
    const setNewMessageText = useMessengerStore(
      (state) => state.setNewMessageText
    );

    const editedMessageText = useMessengerStore(
      (state) => state.editedMessageText
    );
    const setEditedMessageText = useMessengerStore(
      (state) => state.setEditedMessageText
    );

    const userId = useLoginStore((state) => state.userId);

    const recipientId =
      chat?.userOneId === userId ? chat?.userTwoId : chat?.userOneId;

    const newMessage: IMessageEntity = {
      senderId: userId || 0,
      recipientId,
      chatId: chat?.id,
      type: "text",
      text: newMessageText,
      createdAt: new Date(Date.now()),
      status: "sending",
      replyToMessageId: replyTo?.id || null,
    };

    const handleSendNewMessage = () => {
      sendNewMessage(newMessage);
      setReplyTo(null);
      setMessageToEdit(null);

      scrollBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleEditMessage = () => {
      console.log("edit message: ", {
        ...messageToEdit,
        text: editedMessageText,
      });
      if (messageToEdit) {
        editMessage({ ...messageToEdit, text: editedMessageText });
        setMessageToEdit(null);
        setEditedMessageText("");
      }
    };

    useEffect(() => {
      if ((messageToEdit || replyTo) && inputRef?.current) {
        inputRef?.current.focus();
      }
    }, [messageToEdit, replyTo]);

    const handleResetAll = () => {
      setMessageToEdit(null);
      setReplyTo(null);

      messageToEdit && setNewMessageText("");
    };

    useEffect(() => {
      if (inputRef.current) {
        const height = inputRef.current.offsetHeight;
        onChatInputHeightAvailable(height);
      }
    }, [messageToEdit, replyTo]);

    return (
      <div
        className={styles.chatInput}
        style={{ backgroundColor: theme.background_color }}
        ref={ref}
      >
        <div>
          <Separator marginY={[0, 16]} />
        </div>

        {(replyTo || messageToEdit) && (
          <div className={styles.replyContainer}>
            <Separator direction="vertical" color={theme.accent_color} />
            <div>
              {replyTo ? (
                <>
                  <span style={{ color: theme.accent_color }}>В ответ</span>
                  <p style={{ color: theme.text_color }}>{replyTo?.text}</p>
                </>
              ) : (
                <>
                  <span style={{ color: theme.accent_color }}>
                    Редактирование
                  </span>
                  <p style={{ color: theme.text_color }}>
                    {messageToEdit?.text}
                  </p>
                </>
              )}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 30,
                  height: 30,
                  fontSize: 16,
                  fontWeight: 700,
                  color: theme.text_color,
                  "&:hover": {
                    backgroundColor: theme.accent_color,
                    color: theme.text_color,
                  },
                }}
                onClick={handleResetAll}
              >
                &#10005;
              </IconButton>
            </div>
          </div>
        )}

        <div className={styles.chatInputContainer}>
          <ImageUploader
            onImageUpload={() => console.log("uploaded")}
            selectedImage={null}
          />

          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              style={{
                backgroundColor: theme.button_background_color,
                color: theme.text_color,
              }}
              ref={inputRef}
              type="text"
              placeholder="Сообщение"
              value={!messageToEdit ? newMessageText : editedMessageText}
              onChange={(e) =>
                !messageToEdit
                  ? setNewMessageText(e.target.value)
                  : setEditedMessageText(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  !messageToEdit ? handleSendNewMessage() : handleEditMessage();
                }
              }}
            />
            <IconSticker className={styles.iconSticker} />
          </div>

          {newMessageText ? (
            <IconButton
              sx={{
                width: 28,
                height: 28,
                fontWeight: 700,
                fontSize: 20,
                color: theme.text_color,
                "&:hover": {
                  backgroundColor: theme.accent_color,
                  color: theme.text_color,
                },
              }}
              onClick={handleSendNewMessage}
            >
              &#10148;
            </IconButton>
          ) : editedMessageText ? (
            <IconButton
              sx={{
                width: 28,
                height: 28,
                fontWeight: 700,
                fontSize: 20,
                color: theme.text_color,
                "&:hover": {
                  backgroundColor: theme.accent_color,
                  color: theme.text_color,
                },
              }}
              onClick={handleEditMessage}
            >
              &#10003;
            </IconButton>
          ) : (
            <IconMike />
          )}
        </div>
      </div>
    );
  }
);
