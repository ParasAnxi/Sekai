import React, { useState } from "react";
//** MUI */
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
//** COMPONENTS */
import LoginForm from "../login/LoginForm.js";
import RegisterForm from "../register/RegisterForm.js";
const Auth = () => {
  const { palette } = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const [formType, SetFormType] = useState("loginForm");
  const login = formType === "loginForm";
  const register = formType === "registerForm";

  return (
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
        {login ? (
          <LoginForm />
        ) : (
          <RegisterForm SetFormType = {SetFormType} />
        )}
        <Typography
          onClick={() => {
            SetFormType(login ? "registerForm" : "loginForm");
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {login
            ? "Don't have an account? Register here!"
            : "Already have an account? Login here!"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Auth;
