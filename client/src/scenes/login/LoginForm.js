import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
//** REDUCERS */
import { userLogin } from "features/user/userSlice";

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
};

const LoginForm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = async (values, onSubmitProps) => {
    dispatch(userLogin(values));
    onSubmitProps.resetForm();
    Navigate("/home")
  };
  return (
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
        setFieldValue,
        resetForm,
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
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      <VisibilityIcon />
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
            <Button
              fullWidth
              type="submit"
              sx={{
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
  );
};

export default LoginForm;
