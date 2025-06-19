import React from "react";
//** MUI */
import { Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import FlexBetween from "components/flex/FlexBetween";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Avatar } from "@mui/material";
//** REDUCERS */
import { useDispatch, useSelector } from "react-redux";
import SidebarComp from "../components/SidebarComp";
import SideBarMenu from "../components/SideBarMenu";

const SideBar = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const minHeight = useMediaQuery("(min-height: 643px)");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      padding="1rem 6%"
      backgroundColor={palette.background.alt}
      width="100%"
      // height="100vh"
      // boxShadow={6}
    >
      {isNonMobileScreens ? (
        <FlexBetween>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.5rem)"
            color={palette.primary.dark}
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            Sekai
          </Typography>
        </FlexBetween>
      ) : (
        <FlexBetween>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.5rem)"
            color={palette.primary.dark}
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            S
          </Typography>
        </FlexBetween>
      )}
      {isNonMobileScreens ? (
        <Box width="100%">
          <SidebarComp Icon={HomeIcon} name={"Home"} path={"/home"} />
          <SidebarComp Icon={SearchIcon} name={"Search"} path={"/search"} />
          <SidebarComp Icon={ExploreOutlinedIcon} name={"Explore"} />
          <SidebarComp Icon={MovieFilterOutlinedIcon} name={"Reels"} />
          <SidebarComp Icon={MessageIcon} name={"Messages"} path={"/message"} />
          <SidebarComp
            Icon={FavoriteIcon}
            name={"Notifications"}
            path={"/notification"}
          />
          <SidebarComp
            Icon={AddBoxOutlinedIcon}
            name={"Create"}
            path={"/create"}
          />
          <SidebarComp
            Icon={Avatar}
            name={"Profile"}
            sx={{ width: 24, height: 24 }}
            path={`/account/${user?.userName}`}
          />

          <SideBarMenu />
        </Box>
      ) : (
        <Box width="100%">
          <SidebarComp Icon={HomeIcon} path={"/home"} />
          <SidebarComp Icon={SearchIcon} path={"/search"} />
          <SidebarComp Icon={ExploreOutlinedIcon} />
          <SidebarComp Icon={MovieFilterOutlinedIcon} />
          <SidebarComp Icon={MessageIcon} path={"/message"} />
          <SidebarComp Icon={FavoriteIcon} path={"/notification"} />
          <SidebarComp Icon={AddBoxOutlinedIcon} path={"/create"} />
          <SidebarComp
            Icon={Avatar}
            sx={{ width: 24, height: 24 }}
            path={`/account/${user?.userName}`}
          />
          <SideBarMenu />
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
