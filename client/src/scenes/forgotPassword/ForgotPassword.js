import React from "react";
import { useDispatch, useSelector } from "react-redux";
//** FROM */
import { Formik } from "formik";
import * as yup from "yup";
//** MUI */
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/flex/FlexBetween";
import { CircularProgress } from "@mui/material";
//** REDUCERS */
import { setFormType } from "features/form/formSlice";
import { resetPasswordLink, setError } from "features/user/userSlice";
//** COMPONENTS */
import SuccessAndError from "components/status/Status";
//** FORGOT PASSWORD SCHEMA VALIDATION */
const getEmail = async (checkEmail) => {
  const sendData = {
    email: checkEmail,
  };
  const response = await fetch("http://localhost:3001/find/email-exist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
  const data = await response.json();
  return data.value;
};
const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email!")
    .required("Please enter your Email!")
    .test("unique-email", "Email does not Exist!", async (checkEmail) => {
      const data = await getEmail(checkEmail);
      return data;
    }),
});

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  //** HANDLE FORM */
  const error = useSelector((state) => state.user.error);
  const handleFormSubmit = async (values) => {
    dispatch(resetPasswordLink(values));
  };
  const isLoading = useSelector((state) => state.user.status);
  return (
    <>
      {isLoading === "loading" ? (
        <Box
          sx={{
            display: "flex",
            widht: "100vw",
            position: "absolute",
            left: "47%",
            top: "44%",
            alignContent: "center",
            zIndex: "10",
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {error === "error" ? (
        <SuccessAndError
          type={"error"}
          color={"red"}
          message={"Email not Sent! Try again!"}
          time={5000}
          open={true}
          onClose={setError}
        />
      ) : null}
      {error === "noError" ? (
        <SuccessAndError
          type={"success"}
          color={"green"}
          message={"Email Sent Successfully!"}
          time={1000}
          formType={"loginPage"}
          open={true}
          onClose={setError}
        />
      ) : null}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="25px">
              <TextField
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                borderRadius: "2rem",
                margin: "2rem 0",
                padding: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              <Typography fontWeight="500">GET LINK</Typography>
            </Button>
            <FlexBetween>
              <Typography
                onClick={() => {
                  dispatch(setFormType("loginPage"));
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.neutral.dark,
                  },
                }}
                fontWeight="500"
              >
                sign in with another account!
              </Typography>
              <Typography
                onClick={() => {
                  dispatch(setFormType("registerPage"));
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.neutral.dark,
                  },
                }}
                fontWeight="500"
              >
                create a New account?
              </Typography>
            </FlexBetween>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
