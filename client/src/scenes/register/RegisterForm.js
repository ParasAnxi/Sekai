import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { VisibilityOff } from "@mui/icons-material";
//** REDUCERS */
import { setError, userRegister } from "features/user/userSlice";
import SuccessAndError from "components/status/Status";
//** FORM VALUES */
const initialValues = {
  email: "",
  password: "",
  userName: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const { palette } = useTheme();
  //** PASSWORD VISIBILITY */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const error = useSelector((state)=>state.user.error);
  console.log(error)
//** FORM DATA */
  const handleFormSubmit = async (values) => {
    dispatch(userRegister(values));
  };

  //** REGISTER SCHEMA VALIDATION */
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

  const getName = async (checkName) => {
    const sendData = {
      userName: checkName,
    };
    const response = await fetch("http://localhost:3001/find/user-name-exist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const data = await response.json();
    return data.value;
  };
  const registerSchema = yup.object({
    userName: yup
      .string()
      .required("User Name is Required!")
      .matches(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/, "invalid user name")
      .test(
        "unique-userName",
        "UserName already Exists!",
        async (checkName) => {
          const data = await getName(checkName);
          return !data;
        }
      ),
    email: yup
      .string()
      .email("Invalid Email!")
      .required("Please enter your Email!")
      .test("unique-email", "Email already Exists!", async (checkEmail) => {
        const data = await getEmail(checkEmail);
        return !data;
      }),
    password: yup.string().min(5).required("Please enter your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  
  return (
    <>
      {error === "error" ? (
        <SuccessAndError
          type={"error"}
          color={"red"}
          message={"User Not Registered!"}
          time={5000}
          open={true}
          onClose={setError}
        />
      ) : null}
      {error === "noError" ? (
        <SuccessAndError
          type={"success"}
          color={"green"}
          message={"User Registered Successfully!"}
          time={1000}
          open={true}
          onClose={setError}
          formType={"loginPage"}
        />
      ) : null}

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="25px"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreen ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Name"
                name="userName"
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue("userName", e.target.value);
                }}
                value={values.userName}
                error={Boolean(touched.userName) && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
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
                        {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                type="sumbit"
                sx={{
                  margin: "2rem 0",
                  padding: "1rem",
                  borderRadius: "2rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                }}
              >
                <Typography fontWeight="500">REGISTER</Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
