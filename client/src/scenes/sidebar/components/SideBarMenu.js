import React from "react";
//** MUI */
import { Box, Button, Paper, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import {
  setMoreSettingOpen,
  setMoreSettingClose,
} from "features/moreSettings/moreSettingSlice";
import { useTheme } from "@mui/system";
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
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setMoreSettingOpen());
  };

  const handleClose = () => {
    dispatch(setMoreSettingClose());
  };

  const open = useSelector((state) => state.moreSetting.moreSettingIsOpen);

  return (
    <>
      <SideBarMode />
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
        <Box display="flex" flexDirection="row" gap="2rem" width="100%">
          <MenuIcon sx={{ fontSize: "30px" }} />
          <Typography
            sx={{ fontWeight: "bold", marginTop: "2px", fontSize: "1rem" }}
          >
            More
          </Typography>
        </Box>
      </Button>
      <Menu
        id="moresetting-menu"
        elevation={0}
        anchorOrigin={{
          vertical: 280,
          horizontal: 25,
          vertical: 280,
          horizontal: 25,
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "moresetting-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            borderRadius: 5,
          },
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
