
// export default ChatContent;
import React from "react";
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Stack from '@mui/material/Stack'
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  IconDotsVertical,
  IconMenu2,
  IconPhone,
  IconVideo,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "@/store/hooks";

import { formatDistanceToNowStrict } from "date-fns";
import { useGetSessionChatQuery } from "@/store/apps/chat/ChatApiSlice";
import {
  useGetUserAvatarQuery,
  useRetrieveUserQuery,
} from "@/store/auth/authApiSlice";
import ReactMarkdown from 'react-markdown';
import { ListItemText } from "@mui/material";

interface ChatContentProps {
  toggleChatSidebar: () => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  toggleChatSidebar,
}: any) => {
  const [open, setOpen] = React.useState(true);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { data: avatar } = useGetUserAvatarQuery();
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
  const {session} = useSelector((state: any) => state.chat)
  const { data: sessionchat } = useGetSessionChatQuery(session);

  const dispatch = useDispatch();

  return (
    <Box>
      {sessionchat ? (
        <Box>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: "block", md: "block", lg: "none" },
                  mr: "10px",
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <ListItem dense disableGutters>
                <ListItemAvatar>
                  {/* <Badge
                    color={
                      chatDetails.status === "online"
                        ? "success"
                        : chatDetails.status === "busy"
                        ? "error"
                        : chatDetails.status === "away"
                        ? "warning"
                        : "secondary"
                    }
                    variant="dot"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    overlap="circular"
                  >
                    <Avatar alt={chatDetails.name} src={chatDetails.thumb} sx={{width: 40, height: 40}} />
                  </Badge> */}
                </ListItemAvatar>
                <ListItemText
//                primary={
//                  <Typography variant="h5">{sessionchat?.message}</Typography>
//                }
//                secondary={sessionchat?.response.substring(0,50)}
                />
              </ListItem>
              <Stack direction={"row"}>
                <IconButton aria-label="phone">
                  <IconPhone stroke={1.5} />
                </IconButton>
                <IconButton aria-label="video">
                  <IconVideo stroke={1.5} />
                </IconButton>
                <IconButton aria-label="sidebar" onClick={() => setOpen(!open)}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}

          <Box display="flex">
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box width="100%">
              <Box
                sx={{
                  height: "650px",
                  overflow: "auto",
                  maxHeight: "800px",
                }}
              >
                <Box p={3}>
                  {sessionchat.map((chat:any) => {
                    return (
                      <Box key={chat.id}>
                       
                          <Box display="flex">
                            <ListItemAvatar>
                              <Avatar
                                alt="avatar image"
                                src={avatar?.image}
                                sx={{ width: 40, height: 40 }}
                                
                              />
                            </ListItemAvatar>
                            
                            <Box>
                              {chat.created_at ? (
                                <Typography
                                  variant="body2"
                                  color="grey.400"
                                  mb={1}
                                >
                                  {chat.user},{" "}
                                  {formatDistanceToNowStrict(
                                    new Date(chat.created_at),
                                    {
                                      addSuffix: false,
                                    }
                                  )}{" "}
                                  ago 
                                </Typography>
                              ) : null}
                              {chat.session ? (
                                <Box
                                  mb={2}
                                  sx={{
                                    p: 1,
                                    backgroundColor: "grey.100",
                                    mr: "auto",
                                    maxWidth: "640px",
                                  }}
                                >
                                  {chat.message}
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                 
                          <Box
                            mb={1}
                            display="flex"
                            alignItems="flex-end"
                            flexDirection="row-reverse"
                          >

                            <Box
                              alignItems="flex-end"
                              display="flex"
                              flexDirection={"column"}
                            >
                            
                              {chat.created_at ? (
                                <Typography
                                  variant="body2"
                                  color="grey.400"
                                  mb={1}
                                >
                                  AI Response,{" "}
                                    {formatDistanceToNowStrict(
                                    new Date(chat.created_at),
                                    {
                                      addSuffix: false,
                                    }
                                  )}{" "}
                                  ago
                                </Typography>
                              ) : null}
                              {chat.session ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    p: 1,
                                    backgroundColor: "primary.light",
                                    ml: "auto",
                                    maxWidth: "640px",
                                  }}
                                >
                                  <ReactMarkdown>
                                    {chat.response}
                                  </ReactMarkdown>
                                </Box>
                              ) : null}
                              {chat.session ? (
                                <Box
                                  mb={1}
                                  sx={{ overflow: "hidden", lineHeight: "0px" }}
                                >
                                  {/* <Image
                                    src={chat.msg}
                                    alt="attach"
                                    width="250" height="165"
                                  /> */}
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* ------------------------------------------- */}
            {/* Chat right sidebar Content */}
            {/* ------------------------------------------- */}
            {/* {open ? (
              <Box flexShrink={0}>
                <ChatInsideSidebar
                  isInSidebar={lgUp ? open : !open}
                  chat={chatDetails}
                />
              </Box>
            ) : (
              ""
            )} */}
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
          {/* ------------------------------------------- */}
          {/* if No Chat Content */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: "10px",
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
          <Typography variant="h4">Select Chat</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
