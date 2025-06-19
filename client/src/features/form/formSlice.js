//** IMPORTS */
import { createSlice } from "@reduxjs/toolkit";

//** CONFIG */
const initialState = {
    formType: "loginPage"
}

export const formSlice = createSlice({
    name:"form",
    initialState,
    reducers:{
        setFormType:(state,action)=>{
            state.formType = action.payload;
        }
    }
});
export const selectFormType = (state)=>state.form.formType;
export const { setFormType } = formSlice.actions;
export default formSlice.reducer;