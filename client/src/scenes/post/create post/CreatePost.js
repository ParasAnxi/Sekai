//** IMPORTS */
import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import Dropzone from "react-dropzone";
//** FORM */
import { Formik } from "formik";
import * as yup from "yup";
//** MUI */
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import FlexBetween from "components/flex/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { createPost, setPostError } from "features/post/postSlice";
import { useNavigate } from "react-router-dom";
import SuccessAndError from "components/status/Status";
import NavBar from "scenes/sidebar/sidebar/NavBar";
import SideBar from "scenes/sidebar/sidebar/SideBar";
//** FORM CONFIG */
const initialValues = {
  posts: [""],
  description: "",
  location: "",
};

const CreatePost = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.post.error);
  // console.log(error)
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(min-width:600px)");
  const isMobileHeight = useMediaQuery("(min-height:640px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //** POST FILE AND PREVIEW */
  const [postFiles, setPostFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  // console.log(user._id)
  const Navigate = useNavigate();
  const onDropFiles = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPostFiles((previousImages) => [...previousImages, ...newImages]);
      setCurrentIndex(postFiles.length);
    }
  }, []);

  //** CONFIG */
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    const uniquePicId = uuid();
    formData.append("userId", user._id);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("uniqueId", uniquePicId);
    for (let file in values.posts) {
      formData.append("posts", values.posts[file]);
    }
    for (let i in values.posts) {
      const pic = uniquePicId + values.posts[i].name;
      formData.append("postsPath", pic);
    }
    dispatch(createPost(formData));
    setTimeout(() => {
      onSubmitProps.resetForm();
    }, 2000);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % postFiles.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + postFiles.length) % postFiles.length
    );
  };
  return (
    <>
      {error === "error" ? (
        <SuccessAndError
          type={"error"}
          color={"red"}
          message={"Post Not Created!"}
          time={5000}
          open={true}
          onClose={setPostError}
        />
      ) : null}
      {error === "noError" ? (
        <SuccessAndError
          type={"success"}
          color={"green"}
          message={"Post Create Successfully!"}
          time={2000}
          open={true}
          onClose={setPostError}
          navigate={`/account/${user.userName}`}
        />
      ) : null}
      {/* NAVBAR FOR SMALL SCREENS */}
      {(!isMobile || !isMobileHeight) && <NavBar />}
      <Box display="flex" gap="0.2rem" width="100%">
        <Box
          display={!isMobile || !isMobileHeight ? "none" : "flex"}
          height="100vh"
          maxWidth="300px"
          minWidth="80px"
          minHeight="95vh"
          flexBasis="20"
          position="sticky"
          top="0"
          sx={{
            flexBasis: isNonMobileScreens ? "30%" : "18%",
          }}
        >
          <SideBar />
        </Box>
        <Box height="fit-content" sx={{ width: "100%" }}>
          <Box
            backgroundColor={palette.background.alt}
            sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
          >
            <Typography
              color={palette.primary.dark}
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              create post
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              padding="1rem"
            >
              <Avatar
                src={`http://localhost:3001/assets/${user?.profilePicture}`}
                onClick={() => Navigate(`/account/${user?.userName}`)}
                sx={{
                  width: "70px",
                  height: "70px",
                  minWidth: "20px",
                  minHeight: "20px",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
              <Typography
                fontSize="1rem"
                padding="0.5rem"
                fontWeight="bold"
                color={palette.primary.dark}
                onClick={() => Navigate(`/account/${user?.userName}`)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.main,
                  },
                }}
              >
                {user?.userName}
              </Typography>
            </Box>
            <FlexBetween
              display="flex"
              flexDirection="column"
              width={isMobile ? "60%" : "100%"}
              backgroundColor={palette.background.alt}
            >
              <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
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
                    <FlexBetween
                      width="100%"
                      sx={{
                        // border: `2px solid ${palette.primary.dark}`,
                        borderRadius: 5,
                      }}
                    >
                      {!formOpen && (
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          onDrop={(acceptedFiles) => {
                            setFieldValue("posts", acceptedFiles);
                          }}
                          onDropAccepted={onDropFiles}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              borderRadius="10px"
                              sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                              <input {...getInputProps()} />

                              <Button
                                fullWidth
                                sx={{
                                  margin: "1rem",
                                  padding: "1rem 3rem 1rem 3rem",
                                  color: palette.background.dark,
                                  "&:hover": { color: palette.primary.main },
                                }}
                              >
                                <Typography fontWeight="500">
                                  Add Posts
                                </Typography>
                              </Button>
                            </Box>
                          )}
                        </Dropzone>
                      )}
                      {!formOpen && (
                        <Button
                          fullWidth
                          onClick={() => setFormOpen(true)}
                          sx={{
                            margin: "1rem",
                            color: palette.background.dark,
                            padding: "1rem 3rem 1rem 3rem",
                            "&:hover": { color: palette.primary.main },
                          }}
                        >
                          <Typography fontWeight="500">Next</Typography>
                        </Button>
                      )}
                      {formOpen && (
                        <Button
                          fullWidth
                          onClick={() => setFormOpen(false)}
                          sx={{
                            margin: "1rem",
                            color: palette.background.dark,
                            padding: "1rem 3rem 1rem 3rem",
                            "&:hover": { color: palette.primary.main },
                          }}
                        >
                          <Typography fontWeight="500">Back</Typography>
                        </Button>
                      )}
                      {formOpen && (
                        <Button
                          fullWidth
                          type="submit"
                          sx={{
                            margin: "1rem",
                            color: palette.background.dark,
                            padding: "1rem 4rem 1rem 4rem",
                            "&:hover": { color: palette.primary.main },
                          }}
                        >
                          <Typography fontWeight="500">submit</Typography>
                        </Button>
                      )}
                    </FlexBetween>
                    {formOpen && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap="25px"
                        width="100%"
                        alignItems={!isMobile ? "center" : undefined}
                        marginBottom="3rem"
                      >
                        <Typography
                          fontSize="1rem"
                          fontWeight="bold"
                          color={palette.primary.dark}
                        >
                          Location
                        </Typography>
                        <TextField
                          name="location"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("location", e.target.value);
                          }}
                          value={values.location}
                          error={
                            Boolean(touched.location) &&
                            Boolean(errors.location)
                          }
                          helperText={touched.location && errors.location}
                          sx={{ width: !isMobile ? "60%" : "100%" }}
                        />
                        <Typography
                          fontSize="1rem"
                          fontWeight="bold"
                          color={palette.primary.dark}
                        >
                          Description
                        </Typography>
                        <TextField
                          name="description"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue("description", e.target.value);
                          }}
                          value={values.description}
                          error={
                            Boolean(touched.description) &&
                            Boolean(errors.description)
                          }
                          helperText={touched.description && errors.description}
                          multiline
                          maxRows={8}
                          sx={{
                            width: !isMobile ? "60%" : "100%",
                          }}
                        />
                      </Box>
                    )}
                  </form>
                )}
              </Formik>
            </FlexBetween>
            {!formOpen && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: isMobile ? "60%" : "100%",
                    height: isMobile ? "auto" : "600px",
                    position: "relative",
                  }}
                >
                  {postFiles.length > 0 && (
                    <>
                      <IconButton
                        onClick={handlePrev}
                        sx={{
                          display: postFiles.length == 1 ? "none" : null,
                          position: "absolute",
                          left: isMobile ? 16 : 16,
                          top: isMobile ? "50%" : "22%",
                          transform: "translateY(-50%)",
                          zIndex: 1,
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                          },
                        }}
                      >
                        <ArrowBackIos
                          sx={{
                            display: postFiles.length == 1 ? "none" : null,
                          }}
                        />
                      </IconButton>
                      <Box
                        backgroundColor={palette.background.alt}
                        key={postFiles.name}
                        component="img"
                        src={postFiles[currentIndex]}
                        alt={`Carousel Image ${currentIndex + 1}`}
                        sx={{
                          width: "100%",
                          height: isMobile ? "400px" : "250px",
                          objectFit: "contain",
                          borderRadius: "10px",
                        }}
                      />

                      <IconButton
                        onClick={handleNext}
                        sx={{
                          display: postFiles.length == 1 ? "none" : null,
                          position: "absolute",
                          right: isMobile ? 16 : 16,
                          top: isMobile ? "50%" : "22%",
                          transform: "translateY(-50%)",
                          zIndex: 1,
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                          },
                        }}
                      >
                        <ArrowForwardIos />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
