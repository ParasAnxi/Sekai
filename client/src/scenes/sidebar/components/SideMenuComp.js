import React from "react";
//** MUI */
import { Box, MenuItem, Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { ArrowBack } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { setLogOut, setTheme } from "features/user/userSlice";
import { DarkMode, LightMode } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BookmarkIcon from "@mui/icons-material/Bookmark";
//** REDUCERS */
import { useDispatch } from "react-redux";
import {
  setModeMenuOpen,
  setMoreSettingClose,
} from "features/moreSettings/moreSettingSlice";

const SideMenuComp = ({ Icon, name }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const handleMenuFunctions = () => {
    switch (Icon) {
      case SettingsIcon:
        dispatch(setMoreSettingClose());
        break;
      case BookmarkIcon:
        dispatch(setMoreSettingClose());
        break;
      case DarkMode:
        dispatch(setModeMenuOpen());
        dispatch(setMoreSettingClose());
        break;
      case LightMode:
        dispatch(setModeMenuOpen());
        dispatch(setMoreSettingClose());
        break;
      case ErrorOutlineIcon:
        dispatch(setMoreSettingClose());
        break;
      case SwitchAccountIcon:
        dispatch(setMoreSettingClose());
        break;
      case LogoutIcon:
        dispatch(setLogOut());
        dispatch(setMoreSettingClose());
        break;
      default:
        dispatch(setMoreSettingClose());
    }
  };

  return (
    <MenuItem
      sx={{
        width: "250px",
        "&": {
          borderRadius: name === "Settings" ? 5 : undefined,
          borderBottomRightRadius: name === "Settings" ? 0 : undefined,
          borderBottomLeftRadius: name === "Settings" ? 0 : undefined,
        },
        borderBottomRightRadius: Icon === LogoutIcon ? 10 : undefined,
        borderBottomLeftRadius: Icon === LogoutIcon ? 10 : undefined,
        backgroundColor: palette.background.default,
        "&:hover": {
          backgroundColor: palette.neutral.light,
        },
      }}
    >
      <Button
        fullWidth
        sx={{
          textTransform: "none",
          padding: "0.7rem",
          color: palette.primary.dark,
        }}
        onClick={() => handleMenuFunctions()}
      >
        <Box display="flex" flexDirection="row" gap="1.5rem" width="100%">
          {Icon && (
            <Icon
              sx={{
                fontSize: "25px",
              }}
            />
          )}
          <Typography
            marginTop="0.2rem"
            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
          >
            {name}
          </Typography>
        </Box>
      </Button>
    </MenuItem>
  );
};

export default SideMenuComp;
