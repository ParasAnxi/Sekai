import React from "react";
import { useNavigate, useParams } from "react-router-dom";
//** FORM */
import { Formik } from "formik";
import * as yup from "yup";
//** MUI */
import { TextField, useTheme, Box, Typography, Button } from "@mui/material";
//** REDUCERS */
import { changeInfo, setError } from "features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
//** COMPONENTS */
import SuccessAndError from "components/status/Status";
import EditProfilePic from "./EditProfilePic";

//** EDIT SCHEMA VALIDATION */
const editSchema = yup.object({
  nickName: yup.string().max(10),
  bio: yup.string().max(150),
});

const EditProfileForm = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { userName } = useParams();
  const error = useSelector((state) => state.user.error);
  //** CONFIG */
  const initialValues = {
    nickName: user.nickName,
    bio: user.bio,
  };
  const handleFormSubmit = async (values) => {
    const data = {
      nickName: values.nickName,
      bio: values.bio,
      userName: userName,
    };
    dispatch(changeInfo(data));
  };
  return (
    <>
      {error === "error" ? (
        <SuccessAndError
          type={"error"}
          color={"red"}
          message={"Profile not updated!"}
          time={5000}
          open={true}
          onClose={setError}
          navigate={`/account/${userName}`}
        />
      ) : null}
      {error === "noError" ? (
        <SuccessAndError
          type={"success"}
          color={"green"}
          message={"Profile Updated!"}
          time={1000}
          open={true}
          onClose={setError}
        />
      ) : null}
      <EditProfilePic />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
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
              display="flex"
              flexDirection="column"
              minWidth="200px"
              minHeight="100px"
            >
              <Typography
                fontSize="1rem"
                padding="0.5rem"
                fontWeight="bold"
                color={palette.primary.dark}
              >
                Name
              </Typography>
              <TextField
                // label="NickName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nickName}
                name="nickName"
                error={Boolean(touched.nickName) && Boolean(errors.nickName)}
                helperText={touched.nickName && errors.nickName}
                sx={{
                  border: 0,
                  "& fieldset": {
                    borderRadius: 5,
                    border: `2px solid ${palette.primary.dark}`,
                    wordWrap: "break-word",
                  },
                }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              minWidth="200px"
              minHeight="400px"
            >
              <Typography
                fontSize="1rem"
                padding="0.5rem"
                fontWeight="bold"
                color={palette.primary.dark}
              >
                Bio
              </Typography>
              <TextField
                // label="Bio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bio}
                name="bio"
                error={Boolean(touched.bio) && Boolean(errors.bio)}
                helperText={touched.bio && errors.bio}
                multiline
                maxRows={5}
                sx={{
                  border: 0,
                  "& fieldset": {
                    borderRadius: 5,
                    border: `2px solid ${palette.primary.dark}`,
                    wordWrap: "break-word",
                  },
                }}
              />
              <Button
                widht="100px"
                type="submit"
                sx={{
                  borderRadius: "2rem",
                  marginTop: "2rem",
                  padding: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                <Typography fontWeight="500">SUBMIT</Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditProfileForm;
