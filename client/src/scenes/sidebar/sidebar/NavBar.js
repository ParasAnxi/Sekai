import React from "react";
//** MUI */
import {
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
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Avatar } from "@mui/material";
//** REDUCERS */
import { useDispatch } from "react-redux";
import SidebarComp from "../components/SidebarComp";
const NavBar = () => {
    //** CONFIG */
  const { palette } = useTheme();
  const small = useMediaQuery("(min-width:500px)");
  const extraSmall = useMediaQuery("(min-width:500px)");
  
  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={palette.background.alt}
      width="100%"
      position="fixed"
      top="0"
      zIndex="11"
    >
      <Box width="100%" display="flex">
        <SidebarComp Icon={HomeIcon} />
        <SidebarComp Icon={SearchIcon} />
        {small && <SidebarComp Icon={AddBoxOutlinedIcon} />}
        {extraSmall && <SidebarComp Icon={ExploreOutlinedIcon} />}
        <SidebarComp Icon={MovieFilterOutlinedIcon} />
        <SidebarComp Icon={MessageIcon} />
        <SidebarComp Icon={Avatar} sx={{ width: 24, height: 24 }} />
      </Box>
    </FlexBetween>
  );
};

export default NavBar;