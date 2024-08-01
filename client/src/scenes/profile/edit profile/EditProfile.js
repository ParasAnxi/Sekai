import React from "react";
import { useNavigate } from "react-router-dom";
//** MUI */
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//** REDUCERS */
import { useSelector } from "react-redux";
//** COMPONENTS */
import SideBar from "scenes/sidebar/sidebar/SideBar";
import EditProfileForm from "./EditProfileForm";
import NavBar from "scenes/sidebar/sidebar/NavBar";
import SidebarComp from "scenes/sidebar/components/SidebarComp";

const EditProfile = () => {
  const { palette } = useTheme();
  const Navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const isSmall = useMediaQuery("(min-width:500px)");
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {/* NAVBAR FOR SMALL SCREENS */}
      {!isMobileScreens && <NavBar />}
      {/* SIDEBAR */}
      <Box
        display="flex"
        gap="0.2rem"
        width="100%"
      >
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
        {/** SETTING MENU */}
        <Box
          display="flex"
          flexBasis="10"
          width="50%"
          flexDirection="column"
        >
          <Box
            backgroundColor={palette.background.alt}
            width="100%"
            position="sticky"
            top="0"
            flexDirection="column"
            overflow="scroll"
            height="100vh"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            {" "}
            <Typography
              color={palette.primary.dark}
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                padding:"1rem",
                textAlign:"center"
              }}
            >
              Settings
            </Typography>
            <SidebarComp Icon={AccountCircleIcon} name={"Edit Profile"} />
          </Box>
        </Box>
        {/** PROFILE EDIT */}
        <Box
          display="flex"
          flexBasis={isSmall ? "100" : "60"}
          width="100%"
          flexDirection="column"
        >
          <Box
            display="flex"
            backgroundColor={palette.background.alt}
            width="100%"
            overflow="scroll"
            height="100vh"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            <Box
              width={isMobileScreens ? "60%" : "100%"}
              padding="2rem"
              margin="2rem auto"
            >
              <Typography
                color={palette.primary.dark}
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Edit Profile
              </Typography>
              <EditProfileForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
