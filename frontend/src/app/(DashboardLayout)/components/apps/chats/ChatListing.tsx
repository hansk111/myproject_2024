"use client";
import React, { useRef, useState } from "react";
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from "@/store/hooks";
import Scrollbar from "../../custom-scroll/Scrollbar";

import { ChatsType } from "../../../types/apps/chat";
import { last } from "lodash";
import { formatDistanceToNowStrict } from "date-fns";
import { IconChevronDown, IconSearch, IconTrash } from "@tabler/icons-react";
import {
  useGetUserAvatarQuery,
  useRetrieveUserQuery,
} from "@/store/auth/authApiSlice";
import {
  useNewChatMutation,
  useGetSessionsQuery,
  useDeleteChatMutation,
} from "@/store/apps/chat/ChatApiSlice";
import { useSelector } from "@/store/hooks";
import { setSession, searchChat } from "@/store/apps/chat/ChatSlice";

const ChatListing = () => {

  const dispatch = useDispatch();

  const { data: avatar } = useGetUserAvatarQuery();
  const { data: user } = useRetrieveUserQuery();
  const [render, setRender] = useState(0)
  const [ newChat ] = useNewChatMutation();
  const [ deleteChat ] = useDeleteChatMutation();
  const {data: sessions}  = useGetSessionsQuery();
  const { chatSearch } = useSelector((state) => state.chat);
  const ref = useRef();
  const { session } = useSelector((state) => state.chat)
  // const lastActivity = (chat: ChatsType) => last(chat.created_at)?.createdAt;
  const [sessionid, SetSessionid] = useState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNewchatClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    newChat(sessionid)
      .unwrap()
      .then((data) => {    
        dispatch(setSession(data[0].session))
        SetSessionid(data[0].id)
      })

  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handledeleteChat = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    deleteChat(sessionid)
      .unwrap()
        .then((data) => {     
          dispatch(setSession(data[0].session))
          SetSessionid(data[0].id)
        })
  }
  // console.log("session=======", session)

  const filterSessions = (sessions: any, cSearch: string) => {
    if (sessions)
      return sessions.filter((t:any) =>
        t.session.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())
      );

    return sessions;
  };
  
  const filtersessions = useSelector((state) =>
    filterSessions(sessions, chatSearch)
  );
  // console.log("filtersessions===========",filtersessions)

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* Profile */}
      {/* ------------------------------------------- */}
      <Box display={"flex"} alignItems="center" gap="10px" p={3}>
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          overlap="circular"
          color="success"
        >
          <Avatar
            alt="Remy Sharp"
            // src="/images/profile/user-1.jpg"
            src={avatar?.image}
            sx={{ width: 54, height: 54 }}
          />
        </Badge>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            대화 세션 : {session}
          </Typography>
          <Typography variant="body2">{user?.email}</Typography>
        </Box>
      </Box>
      {/* ------------------------------------------- */}
      {/* Search */}
      {/* ------------------------------------------- */}
      <Box px={3} py={1}>
        <TextField
          id="outlined-search"
          placeholder="Search contacts"
          size="small"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={"16"} />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => dispatch(searchChat(e.target.value))}
        />
      </Box>
      {/* ------------------------------------------- */}
      {/* Contact List */}
      {/* ------------------------------------------- */}
      <List sx={{ px: 0 }}>
        <Box px={2.5} pb={1}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Recent Chats <IconChevronDown size="16" />
          </Button>
          <Button
            id="newchat-button"
            onClick={handleNewchatClick}
            color="inherit"
          >
            New Chat
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Sort By Time</MenuItem>
            <MenuItem onClick={handleClose}>Sort By Unread</MenuItem>
            <MenuItem onClick={handleClose}>Mark as all Read</MenuItem>
          </Menu>
        </Box>
        <Scrollbar
          sx={{
            height: { lg: "calc(100vh - 100px)", md: "100vh" },
            maxHeight: "600px",
          }}
        >
          {filtersessions && filtersessions.length ? (
            filtersessions.map((sessionitem:any) => (
              <ListItemButton                
                key={sessionitem.id}
                onClick={() => {
                  dispatch(setSession(sessionitem.session))
                  SetSessionid(sessionitem.id)
                }}
                sx={{
                  mb: 0.5,
                  py: 2,
                  px: 3,
                  alignItems: "start",
                }}
                selected={sessionitem.id === sessionid}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                      {sessionitem.created_at ? (
                        <Typography
                          variant="body2"
                          color="grey.400"
                          mb={1}
                        >
                          {formatDistanceToNowStrict(
                            new Date(sessionitem.created_at),
                            {
                              addSuffix: false,
                            }
                          )}{" "}
                          ago
                        </Typography>
                      ) : null}
                      {sessionitem.session}
                    </Typography>                    
                  }
                />
                
                <Box sx={{ flexShrink: "0" }} mt={0.5}>
                  <Typography variant="body2">
                    {/* {formatDistanceToNowStrict(new Date(lastActivity(session)), {
                      addSuffix: false,
                    })} */}
                  </Typography>
                  {sessionitem.id === sessionid ? (
                    <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={handledeleteChat}                                          
                    >
                      <IconTrash width={20} />
                    </IconButton>
                  </Tooltip>
                  ) : (
                    <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={handledeleteChat}
                      style={{ display: 'none' }}                      
                    >
                      <IconTrash width={20} />
                    </IconButton>
                  </Tooltip>
                  )}
                </Box>
              </ListItemButton>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: "white" }}>
                No Chat Found Please create new chat!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
