import { Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/flex/FlexBetween";
import { findUsers, onLeave } from "features/users/usersSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "scenes/sidebar/sidebar/NavBar";
import SideBar from "scenes/sidebar/sidebar/SideBar";

const Notification = () => {
  const isMobileScreens = useMediaQuery("(min-width:800px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [search, SetSearch] = useState("");

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(findUsers({ userName: search }));
  }, [search]);
  console.log(search);
  const usersList = useSelector((state) => state.users.users);

  return (
    <>
      {/** NAVBAR */}
      <Box position="sticky" top="0" zIndex="10" width="100%">
        {!isMobileScreens && <NavBar />}
      </Box>
      <Box display="flex" gap="0.2rem" width="100%">
        {/** SIDEBAR */}
        <Box
          display={!isMobileScreens ? "none" : "flex"}
          height="100vh"
          maxWidth="300px"
          minWidth="80px"
          minHeight="95vh"
          flexBasis="20"
          position="sticky"
          top="0"
          sx={{
            flexBasis: isNonMobileScreens ? "30%" : "10%",
          }}
        >
          <SideBar />
        </Box>
        {/* SEARCH AREA */}
        <Box
          display="flex"
          alignItems="center"
          alignContent="center"
          flexBasis="80"
          //   backgroundColor={palette.background.alt}
          width="100%"
          //   padding="2rem"
          flexDirection="column"
          //   backgroundColor="red"
          //   sx={{ marginTop: !isMobileScreens ? "60px" : null }}
        >
          <Box
            backgroundColor={palette.background.alt}
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
            padding="1rem"
            flexDirection="column"
            position="sticky"
            top="0"
            zIndex="9"
          >
            <Typography
              color={palette.primary.dark}
              fontSize="2rem"
              fontWeight="bold"
            >
              Notifications
            </Typography>
          </Box>
          <Box
            // backgroundColor="red"
            backgroundColor={palette.neutral.light}
            width="70%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap="0.6rem"
            borderRadius="1rem"
          >
            {usersList?.map((userList) => (
              <Box
                // backgroundColor="blue"
                width="80%"
                display="flex"
                alignItems="center"
                gap="1rem"
                padding="0.5rem"
                key={user._id}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  userList.userName === user.userName
                    ? Navigate(`/account/${user.userName}`)
                    : Navigate(`/${userList.userName}`);
                  dispatch(onLeave());
                }}
              >
                <Avatar
                  sx={{ width: "50px", height: "50px" }}
                  src={`http://localhost:3001/assets/${userList.profilePicture}`}
                />
                <Box>
                  <Typography>{userList.userName}</Typography>
                  <Typography>{userList.bio}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Notification;
