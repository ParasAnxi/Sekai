import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
//** FORM */
import { Formik } from "formik";
import * as yup from "yup";
//** REDUCERS */
import { useDispatch, useSelector } from "react-redux";
import {  changeProfilePic } from "features/user/userSlice";
//** MUI */
import {
  TextField,
  useTheme,
  Box,
  Typography,
  Button,
  Avatar,
  Modal,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/flex/FlexBetween";
//** COMPONENTS */

//** EDIT SCHEMA VALIDATION */
const profilePicSchema = yup.object({
  profilePicture: yup.string(),
});

const EditProfilePic = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { userName } = useParams();
  const error = useSelector((state) => state.user.error);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(min-width:600px)");
  const isSmall = useMediaQuery("(min-width:500px)");
  // console.log(error);
  //** CONFIG */
  const initialValues = {
    picture: "",
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    const oldPicturePath = user.profilePicture ? user.profilePicture : "";
    const uniquePicId = uuid();
    const pic = values.picture.name ? uniquePicId + values.picture.name : "";

    const formData = new FormData();
    formData.append("profilePicture", pic);
    formData.append("toDeletePicture", oldPicturePath);
    formData.append("userName", userName);
    formData.append("uniqueId", uniquePicId);

    for (let value in values) {
      formData.append(value, values[value]);
    }
    dispatch(changeProfilePic(formData));
    setTimeout(() => {
      onSubmitProps.resetForm();
    }, 500);
  };

  return (
    <>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" minWidth="250px">
              <Typography
                fontSize="1rem"
                padding="0.5rem"
                fontWeight="bold"
                color={palette.primary.dark}
              >
                Profile Picture
              </Typography>
              <FlexBetween
                sx={{
                  // border: `2px solid ${palette.primary.dark}`,
                  borderRadius: 5,
                }}
              >
                <Box>
                  <Avatar
                    src={`http://localhost:3001/assets/${user.profilePicture}`}
                    sx={{
                      width: "70px",
                      height: "70px",
                      minWidth: "20px",
                      minHeight: "20px",
                    }}
                  />
                </Box>

                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setFieldValue("picture", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      borderRadius="10px"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <Typography component="p" color={palette.primary.dark}>
                          Click or Drop File Here!
                        </Typography>
                      ) : (
                        <FlexBetween sx={{ width: "100%", gap: "1rem" }}>
                          <Typography color={palette.primary.dark}>
                            {values.picture.name}
                          </Typography>
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>

                <Button
                  widht="100px"
                  type="submit"
                  sx={{
                    margin: "1rem",
                    color: palette.background.dark,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  <Typography fontWeight="500">
                    {!values.picture ? "Remove" : "Change"}
                  </Typography>
                </Button>
              </FlexBetween>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditProfilePic;
