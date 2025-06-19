import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//** MUI */
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
//** COMPONENTS */
import LoginForm from "../login/LoginForm.js";
import RegisterForm from "../register/RegisterForm.js";
import ForgotPassword from "scenes/forgotPassword/ForgotPassword.js";
//** REDUCERS */
import { selectFormType, setFormType } from "features/form/formSlice.js";
const Auth = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch()
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const pageType = useSelector(selectFormType);
  return (
    <>
      {pageType === "forgotPasswordPage" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Box
            width={isNonMobileScreen ? "50%" : "90%"}
            padding="2rem"
            margin="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={palette.background.alt}
            textAlign="center"
            sx={{ boxShadow: 3 }}
          >
            <Typography color="primary" fontWeight="bold" fontSize="2.0rem">
              Forgot Password
            </Typography>
            <Typography
              fontWeight="500"
              variant="h5"
              sx={{
                marginBottom: "1.5rem",
              }}
            >
              Enter your email and we'll send you a link to reset your password!
            </Typography>
            <ForgotPassword />
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Box
            width={isNonMobileScreen ? "50%" : "90%"}
            padding="2rem"
            margin="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={palette.background.alt}
            textAlign="center"
            sx={{ boxShadow: 3 }}
          >
            <Typography color="primary" fontWeight="bold" fontSize="2.0rem">
              Sekai
            </Typography>
            <Typography
              fontWeight="500"
              variant="h5"
              sx={{
                marginBottom: "1.5rem",
              }}
            >
              Welcome to Sekai!
            </Typography>
            {pageType === "loginPage" ? <LoginForm /> : <RegisterForm />}
            <Typography
              onClick={() => {
                const page =
                  pageType === "loginPage" ? "registerPage" : "loginPage";
                dispatch(
                  setFormType(
                    pageType === "loginPage" ? "registerPage" : "loginPage"
                  )
                );
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.neutral.dark,
                },
              }}
            >
              {pageType === "loginPage"
                ? "Don't have an account? Register here!"
                : "Already have an account? Login here!"}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Auth;
