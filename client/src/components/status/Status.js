import React from 'react'
import { useNavigate } from 'react-router-dom';
//** MUI */
import { Alert, Snackbar, useTheme } from '@mui/material';
//** REDUCERS */
import { useDispatch, useSelector } from 'react-redux';
import { setError } from 'features/user/userSlice';
import { setFormType } from 'features/form/formSlice';

const SuccessAndError = ({type,color,message,time,navigate,formType,open,onClose}) => {
  const {palette} = useTheme();
  const dispatch = useDispatch();

  //** NAVIGATIONS */
  const Navigate = useNavigate();
  const handleNavigate = ()=>{
    if(navigate){
      Navigate(navigate);
    }
  };
  const setForm = ()=>{
    if(formType){
      dispatch(setFormType(formType));
    }
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={time}
        onClose={()=>{
          dispatch(onClose());
          handleNavigate();
          setForm();
        }}
      >
        <Alert
          severity={type}
          variant="filled"
          sx={{
            color: {color},
            backgroundColor: palette.background.alt,
            width: "100%",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SuccessAndError