import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//** MUI */
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
//** REDUX
import { getChats } from "features/message/messageSlice";
import { findUsers, getUserProfile, onLeave } from "features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
//** COMPONENETS
import FlexBetween from "components/flex/FlexBetween";

const MessageUser = ({ setSearchModal }) => {
  const isMobileScreens = useMediaQuery("(min-width:800px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileHeight = useMediaQuery("(min-height:640px)");

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [search, SetSearch] = useState("");
  //** USERS */
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(findUsers({ userName: search }));
  }, [search]);
  const usersList = useSelector((state) => state.users.users);

  //** SEARCH USER */
  const handleMessageSearch = (userListName) => {
    if (userListName !== user.userName) {
      Navigate(`/message/${userListName}`);
      setSearchModal(false);
      const data = {
        sender: user.userName,
        receiver: userListName,
      };
      dispatch(getChats(data));
      dispatch(getUserProfile(userListName));
    }
  };
  return (
    <>
      <Box display="flex" gap="0.2rem" width="100%">
        {/* SEARCH AREA */}
        <Box
          display="flex"
          alignItems="center"
          alignContent="center"
          flexBasis="80"
          width="100%"
          flexDirection="column"
        >
          <Box
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
              Message
            </Typography>
          </Box>
          <FlexBetween
            backgroundColor={palette.neutral.light}
            borderRadius="9px"
            gap="3rem"
            padding="0.5rem 1.5rem"
            width="70%"
            position="sticky"
            top="80px"
            zIndex="8"
          >
            <InputBase
              autoFocus
              placeholder="Search..."
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
              fullWidth
            />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
          <Box
            backgroundColor={palette.neutral.light}
            width="70%"
            marginTop="1rem"
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap="0.6rem"
            borderRadius="1rem"
          >
            {usersList?.map((userList) => (
              <Box
                width="80%"
                display="flex"
                alignItems="center"
                gap="1rem"
                padding="0.5rem"
                key={userList._id}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleMessageSearch(userList.userName)}
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

export default MessageUser;
