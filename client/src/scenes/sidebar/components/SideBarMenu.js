import React, { useState } from "react";
//** MUI */
import { Box, Button, Paper, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import {
  setMoreSettingOpen,
  setMoreSettingClose,
} from "features/moreSettings/moreSettingSlice";
import { useMediaQuery, useTheme } from "@mui/system";
import SideMenuComp from "./SideMenuComp";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { DarkMode, LightMode } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import SideBarMode from "./SideBarMode";
//** REDUCERS */
import { useDispatch, useSelector } from "react-redux";
const SideBarMenu = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    dispatch(setMoreSettingOpen());
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(setMoreSettingClose());
    setAnchorEl(null);
  };

  const open = useSelector((state) => state.moreSetting.moreSettingIsOpen);

  return (
    <>
      <SideBarMode anchorEl={anchorEl} />
      
        <Button
          id="moresetting-button"
          aria-controls={open ? "moresetting-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpen}
          fullWidth
          sx={{
            textTransform: "none",
            color: palette.primary.dark,
            padding: "1rem",
            "&:hover": { color: palette.primary.main },
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap="2rem"
            width="100%"
            
            justifyContent={!isNonMobileScreens ? "center" : null}
          >
            <MenuIcon sx={{ fontSize: "30px" }} />
            {isNonMobileScreens ? (
              <Typography
                sx={{ fontWeight: "bold", marginTop: "2px", fontSize: "1rem" }}
              >
                More
              </Typography>
            ) : null}
          </Box>
        </Button>
        <Menu
          id="moresetting-menu"
          elevation={0}
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          MenuListProps={{
            "aria-labelledby": "moresetting-button",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "transparent",
              borderRadius: 5,
              "&::-webkit-scrollbar": {
                width: "0",
              },
            },
            height: !isNonMobileScreens ? "300px" : null,
          }}
        >
          <Paper elevation={2}>
            <SideMenuComp Icon={SettingsIcon} name={"Settings"} />
            <SideMenuComp Icon={BookmarkIcon} name={"Saved"} />
            <SideMenuComp
              Icon={palette.mode === "dark" ? DarkMode : LightMode}
              name={"Switch Appearance"}
            />
            <SideMenuComp Icon={ErrorOutlineIcon} name={"Report a problem"} />
            <SideMenuComp Icon={SwitchAccountIcon} name={"Switch Account"} />
            <SideMenuComp Icon={LogoutIcon} name={"Log Out"} />
          </Paper>
        </Menu>
    </>
  );
};

export default SideBarMenu;
