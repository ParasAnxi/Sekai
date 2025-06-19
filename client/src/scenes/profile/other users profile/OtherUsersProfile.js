import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//** MUI */
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { Settings } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//** REDUCERS */
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getUserProfile,
  unFollowUser,
} from "features/users/usersSlice";
import { refreshUser } from "features/user/userSlice";
//** COMPONENTS */
import SideBar from "scenes/sidebar/sidebar/SideBar";
import FlexBetween from "components/flex/FlexBetween";
import NavBar from "scenes/sidebar/sidebar/NavBar";
import UserProfilePosts from "../user profile posts/UserProfilePosts";
import { otherUserPosts } from "features/post/postSlice";

const OtherUsersProfile = () => {
  const { palette } = useTheme();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  //** MEDIA QUERY */
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const isSmall = useMediaQuery("(min-width:500px)");
  const isMedium = useMediaQuery("(min-width:800px)");
  const isMobileHeight = useMediaQuery("(min-height:640px)");

  const { userName } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(userName));
    dispatch(otherUserPosts(userName));
  }, []);
  //** USER */
  const user = useSelector((state) => state.users.user);
  // console.log(user);
  const followersLength = user?.followers?.length;
  const followingLength = user?.following?.length;
  // console.log(user.profilePicture);
  const posts = useSelector((state) => state.post.otherUserPosts);

  const loggedInUser = useSelector((state) => state.user.user);
  const includesInFollowing = user?.followers.includes(loggedInUser?._id);
  // console.log(loggedInUser);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState("loading");

  //** HANDLE FOLLOW */
  const handleFollow = async () => {
    const followData = {
      toFollowUserName: userName,
      userName: loggedInUser?.userName,
    };
    const unFollowData = {
      toUnfollowUserName: userName,
      userName: loggedInUser?.userName,
    };
    if (user?.followers.includes(loggedInUser?._id)) {
      dispatch(unFollowUser(unFollowData));
    } else {
      dispatch(followUser(followData));
    }
    setRefresh(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (refresh) {
        dispatch(refreshUser(loggedInUser?.userName));
        setRefresh(false);
      }
    }, 1000);
  }, [dispatch, refresh, loggedInUser]);

  useEffect(() => {
    if (userName === loggedInUser?.userName) {
      Navigate(`/account/${userName}`);
    }
  });
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading("idle");
    },500)
  },[])
  return (
    <>
      {/** NAVBAR */}
      <Box position="fixed" top="0" zIndex="10" width="100%">
        {(!isMedium || !isMobileHeight) && <NavBar />}
      </Box>
      <Box
        display="flex"
        gap="0.2rem"
        width="100%"
        sx={{ marginTop: !isMedium || !isMobileHeight ? "70px" : null }}
      >
        {/** SIDE BAR */}
        <Box
          display={!isMedium || !isMobileHeight ? "none" : "flex"}
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
        {isLoading === "loading" ? (
          <Box
            sx={{
              display: "flex",
              widht: "100vw",
              position: "absolute",
              left: "50%",
              top: "50%",
              alignContent: "center",
              zIndex: "10",
            }}
          >
            <CircularProgress sx={{ color: palette.primary.dark }} />
          </Box>
        ) : (
        <Box
          display="flex"
          alignItems="center"
          alignContent="center"
          flexBasis="80"
          backgroundColor={palette.background.alt}
          width="100%"
          height="100vh"
          flexDirection="column"
        >
          <Box
            padding={!isSmall ? "1rem" : "0.5rem"}
            margin={!isSmall ? "1rem" : "0"}
          >
            <FlexBetween
              gap={!isSmall ? "1rem" : "0.5rem"}
              sx={{
                flexDirection: !isMobileScreens ? "column" : null,
              }}
            >
              <Box padding="1rem">
                <Avatar
                  src={`http://localhost:3001/assets/${user?.profilePicture}`}
                  sx={{
                    minHeight: "50px",
                    minWidth: "50px",
                    width: !isMobileScreens ? "70px" : "150px",
                    height: !isMobileScreens ? "70px" : "150px",
                  }}
                />
              </Box>

              <Box padding="1rem" width="100%" minWidth="200px">
                <FlexBetween>
                  <Typography color={palette.primary.dark} fontSize="1rem">
                    {user?.userName}
                  </Typography>
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "15px",
                      color: palette.primary.dark,
                      "&:hover": { color: palette.primary.main },
                    }}
                    onClick={() => handleFollow()}
                  >
                    {includesInFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "15px",
                      color: palette.primary.dark,
                      "&:hover": { color: palette.primary.main },
                    }}
                    onClick={() => Navigate(`/message/${userName}`)}
                  >
                    Message
                  </Button>
                  <IconButton>
                    <MoreHorizIcon
                      sx={{ color: palette.primary.dark, fontSize: "25px" }}
                    />
                  </IconButton>
                </FlexBetween>
                <Box>
                  <Box display="flex" alignItems="center" gap="2rem">
                    <Typography fontSize="1rem" color={palette.primary.dark}>
                      0 posts
                    </Typography>
                    <Button
                      sx={{
                        textTransform: "none",
                        fontSize: "15px",
                        color: palette.primary.dark,
                        "&:hover": { color: palette.primary.main },
                      }}
                    >
                      {followersLength} Followers
                    </Button>
                    <Button
                      sx={{
                        textTransform: "none",
                        fontSize: "15px",
                        color: palette.primary.dark,
                        "&:hover": { color: palette.primary.main },
                      }}
                    >
                      {followingLength} Following
                    </Button>
                  </Box>
                  {user?.nickName && user.bio && (
                    <Box marginTop="1rem">
                      <Typography fontSize="1rem" color={palette.primary.dark}>
                        {user?.nickName}
                      </Typography>
                      <Typography
                        component="pre"
                        display="block"
                        fontSize="1rem"
                        height="100px"
                        color={palette.primary.dark}
                      >
                        <pre>{user?.bio}</pre>
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </FlexBetween>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            // height="60%"
            width="70%"
          >
            <UserProfilePosts posts={posts} />
          </Box>
        </Box>)}
      </Box>
    </>
  );
};

export default OtherUsersProfile;
