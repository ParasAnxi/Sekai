import React, { useState } from "react";
import { useDispatch } from "react-redux";
//** FROM */
import { Formik } from "formik";
import * as yup from "yup";
//** MUI */
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControlLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Checkbox from "@mui/material/Checkbox";
import FlexBetween from "components/flex/FlexBetween";
import { VisibilityOff } from "@mui/icons-material";
//** REDUCERS */
import { userLogin } from "features/user/userSlice";
import { setFormType } from "features/form/formSlice";
import SuccessAndError from "components/flex/Status";

//** LOGIN SCHEMA VALIDATION */
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email!")
    .required("Please enter your Email!"),
  password: yup.string().min(5).required("Please enter your password"),
});

const initialValues = {
  email: "",
  password: "",
  remember:false
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  //** PASSWORD VISIBILITY */
  const [showPassword, setShowPassword] = useState(false);
  //** HANDLE FORM */
  const handleFormSubmit = async (values) => {
    dispatch(userLogin(values));
  };
  return (
    <>
      <SuccessAndError
        type={"error"}
        color={"red"}
        message={"Invalid Credentials!"}
        time={5000}
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
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
            <Box
              display="grid"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              gap="25px"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreen ? undefined : "span 4",
                },
              }}
            >
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

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOff/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box>
              <FlexBetween marginTop="2rem">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: palette.primary.main,
                        "&:hover": {
                          cursor: "pointer",
                          color: palette.neutral.dark,
                        },
                      }}
                      name="remember"
                      value={values.remember}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        marginTop: "2px",
                        color: palette.primary.main,
                        "&:hover": {
                          cursor: "pointer",
                          color: palette.neutral.dark,
                        },
                      }}
                    >
                      Remember me
                    </Typography>
                  }
                />
                <Typography
                  onClick={() => {
                    dispatch(setFormType("forgotPasswordPage"));
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
                  Forgot Password
                </Typography>
              </FlexBetween>
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
                <Typography fontWeight="500">LOGIN</Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
