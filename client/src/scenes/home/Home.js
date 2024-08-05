import React from "react";
//** MUI */
import { Box, useMediaQuery } from "@mui/system";
import { useSelector } from "react-redux";
//** COMPONENTS */
import SideBar from "scenes/sidebar/sidebar/SideBar";
import NavBar from "scenes/sidebar/sidebar/NavBar";
const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const user = useSelector((state) => state.user.user);
  // console.log(user._id)
  const posts = useSelector((state)=>state.post.userPosts)
  // console.log(posts)
  return (
    <>
      {/* NAVBAR FOR SMALL SCREENS */}
      {!isMobileScreens && <NavBar />}
      {/* SIDEBAR */}
      <Box
        display={isNonMobileScreens ? "flex" : "flex"}
        justifyContent="space-between"
        width="100%"
        // backgroundColor="red"
        // padding=""
        gap="0.5rem"
      >
        <Box
          display={!isMobileScreens ? "none" : "flex"}
          height="fit-content"
          maxWidth="300px"
          minWidth="80px"
          minHeight="95vh"
          position="sticky"
          top = "0"
          sx={{
            flexBasis: isNonMobileScreens ? "30%" : "18%",
          }}
        >
          <SideBar />
        </Box>
        {/* MAIN SECTION */}
        <Box display="flex" flexDirection="column" flexBasis="75%">
          hello
        </Box>
        {/* SIDE SECTION */}
        <Box display={isNonMobileScreens ? "flex" : "flex"} flexBasis="25%">
          side section
        </Box>
      </Box>
    </>
  );
};

export default Home;
