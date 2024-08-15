import React, { useEffect } from "react";
//** MUI */
import { Box, useMediaQuery } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
//** COMPONENTS */
import SideBar from "scenes/sidebar/sidebar/SideBar";
import NavBar from "scenes/sidebar/sidebar/NavBar";
import { refreshUser } from "features/user/userSlice";
import { followingUserPosts } from "features/post/postSlice";
import Feed from "scenes/user feed/Feed";
import SidePage from "scenes/side components/SidePage";
const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const isMedium = useMediaQuery("(min-width:800px)");
  const isMobileHeight = useMediaQuery("(min-height:640px)");
  const user = useSelector((state) => state.user.user);
  // console.log(user._id)
  const posts = useSelector((state) => state.post.userPosts);
  const dispatch = useDispatch();
  // console.log(posts)
  useEffect(() => {
    if (user) {
      dispatch(refreshUser(user.userName));
    }
  }, []);

  return (
    <>
      {/* NAVBAR FOR SMALL SCREENS */}
      {(!isMedium || !isMobileHeight) && <NavBar />}
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
          display={!isMedium || !isMobileHeight ? "none" : "flex"}
          height="fit-content"
          maxWidth="300px"
          minWidth="80px"
          minHeight="95vh"
          position="sticky"
          top="0"
          sx={{
            flexBasis: isNonMobileScreens ? "35%" : "18%",
          }}
        >
          <SideBar />
        </Box>
        {/* MAIN SECTION */}
        <Box
          display="flex"
          flexDirection="column"
          flexBasis="100%"
          height="100vh"
          // width="80%"
          sx={{ overflow: "auto" }}
        >
          <Feed />
        </Box>

        {/* SIDE SECTION */}
        <Box
          display={!isMedium || !isMobileHeight ? "none" : "flex"}
          flexBasis="25%"
          flexDirection="column"
          height="100vh"
          // backgroundColor="blue"
          position="sticky"
          top="0"
          sx={{ overflow: "auto" }}
        >
          <SidePage />
        </Box>
      </Box>
    </>
  );
};

export default Home;
