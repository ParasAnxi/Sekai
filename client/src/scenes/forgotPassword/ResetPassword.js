import React,{ useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { changePassword } from "features/user/userSlice";
//** COMPONENTS */
import SuccessAndError from "components/flex/Status";

const forgotPasswordSchema = yup.object({
  password: yup
    .string()
    .min(5)
    .required("Please enter your new password!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
});

const initialValues = {
  password: "",
  confirmPassword:"",
};

const ResetPassword = () => {
  const { id, token } = useParams();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  //** PASSWORD VISIBILITY */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const error = useSelector((state) => state.user.error);
  //** HANDLE FORM */
  const handleFormSubmit = async (values) => {
    const data = {
      id: id,
      token: token,
      password: values.password,
    };
    dispatch(changePassword(data));
  };
  return (
    <>
      {error === "error" ? (
        <SuccessAndError
          type={"error"}
          color={"red"}
          message={"Link Expired! Password did'nt changed."}
          time={5000}
        />
      ) : null}
      ;
      {error === "noError" ? (
        <SuccessAndError
          type={"success"}
          color={"green"}
          message={"Password changed Successully!"}
          time={1000}
          navigate={"/"}
        />
      ) : null}
      ;
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
            Reset Password
          </Typography>
          <Typography
            fontWeight="500"
            variant="h5"
            sx={{
              marginBottom: "1.5rem",
            }}
          >
            Here your can change your password!
          </Typography>
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOff />
                            )}
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
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
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
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: "span 2" }}
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
                  <Typography fontWeight="500">CHANGE PASSWORD</Typography>
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
