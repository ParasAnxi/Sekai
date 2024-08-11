//** IMPORTS */
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//** MUI */
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Modal } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

//** REDUX */
import { useDispatch, useSelector } from "react-redux";
import { onLeave } from "features/users/usersSlice";
import { messagedUser } from "features/message/messageSlice.js";

//** COMPONENTS */
import NavBar from "scenes/sidebar/sidebar/NavBar";
import SideBar from "scenes/sidebar/sidebar/SideBar";
import FlexBetween from "components/flex/FlexBetween";
import FlexEvenly from "components/flex/FlexEvenly";
import MessageComp from "./MessageComp";
import MessageUser from "./MessageUser";
import Messages from "./Messages";
import Home from "scenes/home/Home";
import CreatePost from "scenes/post/create post/CreatePost";

const Message = () => {
  const isMobileScreens = useMediaQuery("(min-width:800px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileHeight = useMediaQuery("(min-height:640px)");
  const isSmall = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const location = useLocation();
  const { palette } = useTheme();

  const [searchModal, setSearchModal] = useState(false);
  const user = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(messagedUser(user.userName));
  }, []);

  const allMessagedUsers = useSelector((state) => state.message.users);
  // console.log(otherUser);

  return (
    <>
      <Modal
        open={searchModal}
        onClose={() => setSearchModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            backgroundColor: palette.background.alt,
            boxShadow: 3,
            borderRadius: "15px",
            p: 4,
          }}
        >
          <MessageUser setSearchModal={setSearchModal}/>
        </Box>
      </Modal>

      {/** NAVBAR */}
      {(!isMobileScreens || !isMobileHeight) && <NavBar />}

      {/* SIDEBAR */}
      <Box display="flex" gap="0.2rem" width="100%">
        <Box
          display={!isMobileScreens || !isMobileHeight ? "none" : "flex"}
          height="100vh"
          maxWidth="300px"
          minWidth="200px"
          minHeight="95vh"
          position="sticky"
          top="0"
          sx={{
            flexBasis: isNonMobileScreens ? "35%" : "18%",
          }}
        >
          <SideBar />
        </Box>
        {/** USER MENU */}
        <Box display="flex" flexBasis="10" width="35%" flexDirection="column">
          <Box
            backgroundColor={palette.background.alt}
            width="100%"
            position="sticky"
            top="0"
            flexDirection="column"
            overflow="scroll"
            height="100vh"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
              overflowX: "hidden",
            }}
          >
            <FlexEvenly
              position="sticky"
              top="0px"
              backgroundColor={palette.background.alt}
              zIndex="9"
              padding="1rem"
            >
              <Avatar
                src={`http://localhost:3001/assets/${user?.profilePicture}`}
              />
              <Typography
                color={palette.primary.dark}
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                {user.userName}
              </Typography>
              <IconButton
                sx={{
                  color: palette.primary.dark,
                  "&:hover": { color: palette.primary.main },
                }}
                onClick={() => setSearchModal(true)}
              >
                <PersonSearchIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </IconButton>
            </FlexEvenly>
            <Typography
              backgroundColor={palette.background.alt}
              width="100%"
              color={palette.primary.dark}
              sx={{
                position: "sticky",
                top: "94px",
                fontSize: "20px",
                fontWeight: "bold",
                padding: "1rem",
                textAlign: "center",
                zIndex: "8",
              }}
            >
              Messages
            </Typography>
            {allMessagedUsers?.map((user, index) => (
              <MessageComp
                key={user?.userId || `${user?.userName}-${index}`}
                Icon={Avatar}
                name={user?.userName}
                picture={user?.profilePicture}
                path={`/message/${user?.userName}`}
              />
            ))}
          </Box>
        </Box>
        {/** PEOPLES */}
        <Box
          display="flex"
          flexBasis={isSmall ? "100%" : "60%"}
          width="100%"
          flexDirection="column"
        >
          <Box
            display="flex"
            backgroundColor={palette.background.alt}
            width="100%"
            alignItems="center"
            flexDirection="column"
            overflow="auto"
            height="100vh"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            <Box
              display="flex"
              flexBasis={isSmall ? "100%" : "60%"}
              width="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <Typography
                      sx={{
                        color: palette.primary.dark,
                        fontSize: "30px",
                        fontWeight: "1000",
                      }}
                    >
                      Start Conversation!!
                    </Typography>
                  }
                />
                <Route path="/:userName" element={<Messages />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Message;
