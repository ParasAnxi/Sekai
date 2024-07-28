import React from "react";
//** MUI */
import { Paper } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/system";
import { ArrowBack, DarkMode, LightMode } from "@mui/icons-material";
import SideModeComp from "./SideModeComp";
//** REDUCERS */
import { useDispatch, useSelector } from "react-redux";
import {
  setModeMenuClose,
} from "features/moreSettings/moreSettingSlice";

const SideBarMode = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const open = useSelector((state) => state.moreSetting.modesMenuOpen);

    const handleClose = ()=>{
        dispatch(setModeMenuClose())
    }
  return (
    <>
      <Menu
        id="mode-menu"
        elevation={0}
        anchorOrigin={{
          vertical: 535,
          horizontal:25,
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "mode-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            borderRadius: 5,
          },
        }}
      >
        <Paper elevation={2}>
          <SideModeComp
            Icon={ArrowBack}
            name={"Switch Apperance"}
            />
          <SideModeComp
            Icon={palette.mode === "dark" ? DarkMode : LightMode}
            name={palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
          />
        </Paper>
      </Menu>
    </>
  );
};

export default SideBarMode;
