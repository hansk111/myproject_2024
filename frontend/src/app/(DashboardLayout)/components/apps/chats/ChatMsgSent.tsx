import React from "react";
import { useSelector, useDispatch } from "@/store/hooks";
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Popover from '@mui/material/Popover'
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import {
  IconMoodSmile,
  IconPaperclip,
  IconPhoto,
  IconSend,
} from "@tabler/icons-react";

import { useSendMessagesMutation } from "@/store/apps/chat/ChatApiSlice";

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState<any>("");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [chosenEmoji, setChosenEmoji] = React.useState<string>("");
  const {session} = useSelector((state) => state.chat)
  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setChosenEmoji(emojiData.unified);
    setMsg(emojiData.emoji);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [ sendMessages ] = useSendMessagesMutation();

  // console.log("session=", session);
  const handleChatMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };
  
  const handleKeyDownClick = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    sendMessages({session, msg});
    setMsg("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // 엔터키가 눌렸을 때 실행할 함수
      handleKeyDownClick(e);
    }
  };

  return (
    <Box p={2}>
      {/* ------------------------------------------- */}
      {/* sent chat */}
      {/* ------------------------------------------- */}
      <form
        // onSubmit={onChatMsgSubmit}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        {/* ------------------------------------------- */}
        {/* Emoji picker */}
        {/* ------------------------------------------- */}
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <IconMoodSmile />
        </IconButton>
        <Popover
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
          <Box p={2}>
            Selected:{" "}
            {chosenEmoji ? (
              <Emoji
                unified={chosenEmoji}
                emojiStyle={EmojiStyle.APPLE}
                size={22}
              />
            ) : (
              ""
            )}
          </Box>
        </Popover>
        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder="Type a Message"
          size="small"
          type="text"
          inputProps={{ "aria-label": "Type a Message" }}
          onChange={handleChatMsgChange.bind(null)}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          aria-label="delete"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();            
            sendMessages({session, msg});
            setMsg("");
          }}
          disabled={!msg}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="delete">
          <IconPhoto stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="delete">
          <IconPaperclip stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;
