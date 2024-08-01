import React from "react";
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
import { useSelector } from "react-redux";
//** COMPONENTS */
import SideBar from "scenes/sidebar/sidebar/SideBar";
import FlexBetween from "components/flex/FlexBetween";
import NavBar from "scenes/sidebar/sidebar/NavBar";

const UserProfile = () => {
  const { palette } = useTheme();
  const Navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const isSmall = useMediaQuery("(min-width:500px)");

  const user = useSelector((state) => state.user.user);
  const followersLength = user.followers.length;
  const followingLength = user.following.length;
  // console.log(user.profilePicture);
  return (
    <>
      {!isMobileScreens && <NavBar />}
      <Box display="flex" gap="0.2rem" width="100%">
        {/** SIDE BAR */}
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
            flexBasis: isNonMobileScreens ? "30%" : "18%",
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
              <Box
                padding="1rem"
              >
                <Avatar
                  src={`http://localhost:3001/assets/${user.profilePicture}`}
                  sx={{
                    minHeight: "50px",
                    minWidth: "50px",
                    width: !isMobileScreens ? "70px" : "150px",
                    height: !isMobileScreens ? "70px" : "150px",
                  }}
                />
              </Box>

              <Box
                padding="1rem"
                width="100%"
                minWidth="200px"
              >
                <FlexBetween>
                  <Typography color={palette.primary.dark} fontSize="1rem">
                    {user.userName}
                  </Typography>
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "15px",
                      color: palette.primary.dark,
                      "&:hover": { color: palette.primary.main },
                    }}
                    onClick={() => Navigate(`/account/${user.userName}/edit`)}
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
                  <Box marginTop="1rem">
                    <Typography fontSize="1rem" color={palette.primary.dark}>
                      {user.nickName}
                    </Typography>
                    <Typography
                      component="pre"
                      display="block"
                      fontSize="1rem"
                      // backgroundColor="red"
                      height="100px"
                      color={palette.primary.dark}
                    >
                      <pre>{user.bio}</pre>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </FlexBetween>
          </Box>
          <Box
          >
            Posts
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
