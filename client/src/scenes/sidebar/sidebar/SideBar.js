import React from "react";
//** MUI */
import {
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
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
import { useDispatch } from "react-redux";
import SidebarComp from "../components/SidebarComp";
import SideBarMenu from "../components/SideBarMenu";

const SideBar = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  return (
    <FlexBetween
      flexDirection="column"
      padding="1rem 6%"
      backgroundColor={palette.background.alt}
      width="100%"
      // height="100vh"
      // boxShadow={6}
    >
      {isNonMobileScreens ? 
      (<FlexBetween>
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
      </FlexBetween>)
        :(<FlexBetween>
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
      </FlexBetween>)}
      {isNonMobileScreens ? (<Box width="100%">
        <SidebarComp Icon={HomeIcon} name={"Home"} />
        <SidebarComp Icon={SearchIcon} name={"Search"} />
        <SidebarComp Icon={ExploreOutlinedIcon} name={"Explore"} />
        <SidebarComp Icon={MovieFilterOutlinedIcon} name={"Reels"} />
        <SidebarComp Icon={MessageIcon} name={"Messages"} />
        <SidebarComp Icon={FavoriteIcon} name={"Notifications"} />
        <SidebarComp Icon={AddBoxOutlinedIcon} name={"Create"} />
        <SidebarComp
          Icon={Avatar}
          name={"Profile"}
          sx={{ width: 24, height: 24 }}
        />
      </Box>):(
      <Box width="100%">
        <SidebarComp Icon={HomeIcon} />
        <SidebarComp Icon={SearchIcon}  />
        <SidebarComp Icon={ExploreOutlinedIcon}/>
        <SidebarComp Icon={MovieFilterOutlinedIcon}/>
        <SidebarComp Icon={MessageIcon}/>
        <SidebarComp Icon={FavoriteIcon}/>
        <SidebarComp Icon={AddBoxOutlinedIcon} />
        <SidebarComp
          Icon={Avatar}
          sx={{ width: 24, height: 24 }}
        />
      </Box>)}
      {isNonMobileScreens ? 
      <FlexBetween
      flexDirection="column"
      marginTop="50%"
      backgroundColor= {palette.background.alt}
      width="100%"
      >
        <SideBarMenu/>
      </FlexBetween>
    :  
      <Box
      flexDirection="column"
      backgroundColor= {palette.background.alt}
      width="100%"
      >
        <SideBarMenu/>
      </Box>
    }
    </FlexBetween>
  );
};

export default SideBar;
