import { Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/flex/FlexBetween";
import { refreshUser, setNotifications } from "features/user/userSlice";
import {
  findUsers,
  followUser,
  getUserProfile,
  onLeave,
  unFollowUser,
} from "features/users/usersSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "scenes/sidebar/sidebar/NavBar";
import SideBar from "scenes/sidebar/sidebar/SideBar";

const Notification = () => {
  const isMobileScreens = useMediaQuery("(min-width:800px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileHeight = useMediaQuery("(min-height:640px)");
  const isSmall = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [search, SetSearch] = useState("");
  const user = useSelector((state) => state.user.user);

  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      if (refresh) {
        dispatch(refreshUser(user.userName));
        setRefresh(false);
      }
    }, 1000);
  }, [dispatch, refresh, user]);

  useEffect(() => {
    dispatch(findUsers({ userName: search }));
  }, [search]);

  const getUniqueFollowNotifications = (notifications) => {
    const seen = new Map();
    return notifications.filter((notification) => {
      if (notification.typeOf === "follow") {
        if (seen.has(notification.userId)) {
          return false;
        }
        seen.set(notification.userId, true);
      }
      return true;
    });
  };

  const uniqueNotifications = getUniqueFollowNotifications(
    user?.notifications || []
  );
  useEffect(()=>{
    const notify = uniqueNotifications.length;
    dispatch(setNotifications(notify));
  },[])

  const handleFollow =  (userName,id) => {
    const followData = {
      toFollowUserName: userName,
      userName: user?.userName,
    };
    if (!user?.following.includes(id)) {
      dispatch(followUser(followData));
    }
    setRefresh(true);
  };

  return (
    <>
      {/** NAVBAR */}
      <Box position="fixed" top="0" zIndex="10" width="100%">
        {(!isMobileScreens || !isMobileHeight) && <NavBar />}
      </Box>
      <Box display="flex" gap="0.2rem" width="100%">
        {/** SIDEBAR */}
        <Box
          display={!isMobileScreens || !isMobileHeight ? "none" : "flex"}
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
            marginTop={!isMobileScreens || !isMobileHeight ? "70px" : null}
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
            alignItems={isSmall ? "center" : undefined}
            flexDirection="column"
            gap="0.6rem"
            borderRadius="1rem"
          >
            {uniqueNotifications?.map((list) => (
              <Box
                // backgroundColor="blue"
                // width="50%"
                width={isSmall ? "60%" : "100%"}
                display="flex"
                // justifyContent="space-around"
                alignItems="center"
                gap="1rem"
                padding="0.5rem"
                key={list._id}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                // onClick={() => {
                //   // list.userName === user.userName
                //     // ? Navigate(`/account/${user.userName}`)
                //     // : Navigate(`/${list.userName}`);
                //   // dispatch(onLeave());
                // }}
              >
                <Avatar
                  sx={{ width: "50px", height: "50px" }}
                  src={`http://localhost:3001/assets/${list?.userProfilePicture}`}
                  onClick={() => Navigate(`/${list?.userUserName}`)}
                  // onClick={() =>console.log(list.userId)}
                />
                <Box>
                  <Typography
                    color={palette.primary.dark}
                    fontSize="0.9rem"
                    fontWeight="bold"
                    onClick={() => Navigate(`/${list?.userUserName}`)}
                  >
                    {list?.title}
                  </Typography>
                </Box>
                {!user.following.includes(list?.userId) && (
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "15px",
                      // padding:"1rem",
                      color: palette.primary.dark,
                      "&:hover": { color: palette.primary.main },
                    }}
                    onClick={() =>
                      handleFollow(list?.userUserName, list?.userId)
                    }
                  >
                    Follow Back
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Notification;
