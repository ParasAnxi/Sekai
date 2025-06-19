import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//** MUI */
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { Settings } from "@mui/icons-material";
//** REDUCERS */
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "features/user/userSlice";
import { userPosts } from "features/post/postSlice";
//** COMPONENTS */
import SideBar from "scenes/sidebar/sidebar/SideBar";
import FlexBetween from "components/flex/FlexBetween";
import NavBar from "scenes/sidebar/sidebar/NavBar";
import UserProfilePosts from "../user profile posts/UserProfilePosts";

const UserProfile = () => {
  const { palette } = useTheme();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  
  //** MEDIA QUERY */
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const isSmall = useMediaQuery("(min-width:500px)");
  const isMedium = useMediaQuery("(min-width:800px)");
  const isMobileHeight = useMediaQuery("(min-height:640px)");

  //** USER */
  const user = useSelector((state) => state.user.user);
  const followersLength = user.followers.length;
  const followingLength = user.following.length;
  // console.log(user);
  const posts = useSelector((state) => state.post.userPosts);
  // console.log(posts);
  useEffect(() => {
    dispatch(refreshUser(user.userName));
    dispatch(userPosts(user.userName));
  }, []);
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
        sx={{ marginTop: (!isMedium || !isMobileHeight) ? "70px" : null }}
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
        <Box
          display="flex"
          alignItems="center"
          alignContent="center"
          flexBasis="80"
          backgroundColor={palette.background.alt}
          width="100%"
          height="auto"
          flexDirection="column"
        >
          <Box
            padding={!isSmall ? "1rem" : "0.5rem"}
            margin={!isSmall ? "1rem" : "0.5rem"}
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
                    onClick={() => Navigate(`/account/${user?.userName}/edit`)}
                  >
                    Edit Profile
                  </Button>
                  <IconButton>
                    <Settings
                      sx={{ color: palette.primary.dark, fontSize: "25px" }}
                    />
                  </IconButton>
                </FlexBetween>
                <Box>
                  <Box display="flex" alignItems="center" gap="2rem">
                    <Typography fontSize="1rem" color={palette.primary.dark}>
                      {`${posts.length} Posts`}
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
                  <Box marginTop="1rem">
                    <Typography fontSize="1rem" color={palette.primary.dark}>
                      {user?.nickName}
                    </Typography>
                    <Typography
                      component="pre"
                      display="block"
                      fontSize="1rem"
                      color={palette.primary.dark}
                    >
                      <pre>{user?.bio}</pre>
                    </Typography>
                  </Box>
                  {!isSmall && (
                    <Button
                      sx={{
                        fontSize: "1rem",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                      fullWidth
                      onClick={() => Navigate("/create")}
                    >
                      Create New Post
                    </Button>
                  )}
                </Box>
              </Box>
            </FlexBetween>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            height="auto"
            width="70%"
          >
            <UserProfilePosts posts={posts} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
