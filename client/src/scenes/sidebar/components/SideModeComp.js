import React from "react";
//** MUI */
import { Box, MenuItem, Button, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { DarkMode, LightMode } from "@mui/icons-material";
//** REDUCERS */
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "features/user/userSlice";
import {
  setModeMenuClose,
  setMoreSettingOpen,
} from "features/moreSettings/moreSettingSlice";

const SideModeComp = ({ Icon, name, Back }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const handleMenuFunctions = () => {
    switch (Icon) {
      case ArrowBack:
        dispatch(setModeMenuClose());
        dispatch(setMoreSettingOpen());
        break;
      case DarkMode:
        dispatch(setTheme());
        break;
      case LightMode:
        dispatch(setTheme());
        break;
      default:
        dispatch(setModeMenuClose());
    }
  };

  return (
    <MenuItem
      sx={{
        width: "250px",
        "&": {
          borderRadius: name === "Switch Apperance" ? 5 : undefined,
          borderBottomRightRadius: name === "Switch Apperance" ? 0 : undefined,
          borderBottomLeftRadius: name === "Switch Apperance" ? 0 : undefined,
        },
        borderBottomRightRadius:
          Icon === DarkMode || LightMode ? 10 : undefined,
        borderBottomLeftRadius: Icon === DarkMode || LightMode ? 10 : undefined,
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

export default SideModeComp;
