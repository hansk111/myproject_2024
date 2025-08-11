"use client";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import { IconPower } from "@tabler/icons-react";
import { AppState } from "@/store/store";
import Link from "next/link";
import {
  useLogoutMutation,
  useGetUserAvatarQuery,
  useRetrieveUserQuery,
} from "@/store/auth/authApiSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import { logout as setLogout } from "@/store/auth/authSlice";

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };

  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

  const { data: avatar } = useGetUserAvatarQuery();

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu && isAuthenticated && avatar?.image ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={`${avatar?.image}`}
            // src={`${process.env.NEXT_PUBLIC_HOST}/media/${avatar?.image}`}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">{user?.first_name}</Typography>
            <Typography variant="caption">{user?.last_name}</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                href=""
                aria-label="logout"
                size="small"
                onClick={handleLogout}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
