"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import * as dropdownData from "./data";

import { IconMail } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import Image from "next/image";
import {
  useGetUserAvatarQuery,
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/store/auth/authApiSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import { logout as setLogout } from "@/store/auth/authSlice";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
  // console.log("🚀 ~ Profile ~ avatar:", avatar?.image);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        {isAuthenticated && avatar?.image ? (
          <Avatar
            // src={`${process.env.NEXT_PUBLIC_HOST}/media/${avatar?.image}`}
            src={`${avatar?.image}`}
            alt={"ProfileImg"}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        ) : (
          <Avatar
            src={""}
            alt={"ProfileImg"}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        )}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        {isAuthenticated && avatar?.image ? (
          <Typography variant="h5">{user?.first_name} Profile</Typography>
        ) : (
          <Typography variant="h5">{""} Please Login</Typography>
        )}
        {isAuthenticated && avatar?.image ? (
          <Stack direction="row" py={3} spacing={2} alignItems="center">
            <Avatar
              // src={`${process.env.NEXT_PUBLIC_HOST}/media/${avatar?.image}`}
              src={`${avatar?.image}`}
              alt={"ProfileImg"}
              sx={{ width: 95, height: 95 }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                fontWeight={600}
              >
                {user?.first_name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user?.last_name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <IconMail width={15} height={15} />
                {user?.email}
              </Typography>
            </Box>
          </Stack>
        ) : (
          ""
        )}
        {/* <Divider />
        {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))} */}
        <Box mt={2}>
          {/* <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" mb={2}>
                  Unlimited <br />
                  Access
                </Typography>
                <Button variant="contained" color="primary">
                  Upgrade
                </Button>
              </Box>
              <Image src={"/images/backgrounds/unlimited-bg.png"} width={150} height={183} alt="unlimited" className="signup-bg" />
            </Box>
          </Box> */}
          {isAuthenticated ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
              fullWidth
            >
              Logout
            </Button>
          ) : (
            <Button
              href="/auth/auth2/login"
              variant="outlined"
              color="primary"
              component={Link}
              fullWidth
            >
              Login
            </Button>
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
