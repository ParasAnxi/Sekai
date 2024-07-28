//** IMPORTS */
import { createSlice } from "@reduxjs/toolkit";

//** CONFIG */
const initialState = {
    moreSettingIsOpen: false,
    modesMenuOpen: false,
};

//** REDUCERS */
export const moreSettingSlice = createSlice({
  name: "moreSetting",
  initialState,
  reducers: {
    setMoreSettingOpen:(state)=>{
        state.moreSettingIsOpen = true;
    },
    setMoreSettingClose:(state)=>{
        state.moreSettingIsOpen = false;
    },
    setModeMenuOpen:(state)=>{
      state.modesMenuOpen = true;
    },
    setModeMenuClose:(state)=>{
      state.modesMenuOpen = false;
    }
  }
});

export const {
  setMoreSettingOpen,
  setMoreSettingClose,
  setModeMenuOpen,
  setModeMenuClose
} = moreSettingSlice.actions;

export default moreSettingSlice.reducer;
