import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//** MUI */
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
//** REDUX */
import { useDispatch, useSelector } from "react-redux";
import { getChats, sendUserMessage } from "features/message/messageSlice";
import { getUserProfile } from "features/users/usersSlice";
//** WEB SOCKETS
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const Messages = () => {
  const { palette } = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //** USERS */
  const loggedInUser = useSelector((state) => state.user.user);
  const user = useSelector((state) => state.users.user);
  //** CHATS */
  const chats = useSelector((state) => state.message.chats);
  // console.log(chats);

  //** LOCAL MESSAGES */
  const [messages, setMessages] = useState(chats);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [sendMessage, setSendMessage] = useState("");
  // console.log(sendMessage)

  //** SMOOTH SCROLLING */
  const scrollRef = useRef();
  const containerRef = useRef(null);
  //** CONTAINER SCROLL */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [user, location]);
  //** MESSAGE SCROLL */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [user, messages, location]);

  //** SOCKETS FOR MESSAGES */
  useEffect(() => {
    if (user) {
      socket.emit("addOnlineUsers", loggedInUser.userName);
    }
  }, [loggedInUser]);
  //** MESSAGE DATA SCHEMA */
  const data = {
    sender: loggedInUser?.userName,
    receiver: user?.userName,
    message: sendMessage,
    time: Date.now(),
  };
  //** FETCHING DATA */
  useEffect(() => {
    dispatch(getChats(data));
    dispatch(getUserProfile(user?.userName));
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        if (
          data.sender === user.userName &&
          data.receiver === loggedInUser.userName
        ) {
          setArrivalMessage(data);
        }
      });
    }
  }, [user, loggedInUser]);

  useEffect(() => {
    setMessages(chats);
  }, [user, chats]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessage(e);
    }
  };
  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };
  //** SEND MESSAGE */
  const handleMessage = (e) => {
    e.preventDefault();
    dispatch(sendUserMessage(data));
    socket.emit("sendMessage", data);
    setMessages((prev) => [...prev, data]);
    setSendMessage("");
  };

  //** FORMAT MESSAGE DATE */
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  //** FORMAT HEADER DATE */
  const formatDateHeader = (isoString) => {
    const messageDate = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          minHeight: "50vh",
          maxHeight: "79vh",
          width: "100%",
          maxWidth: "90%",
          margin: "0 auto",
          borderRadius: "8px",
          flex: 1,
          position: "relative",
          overflow: "auto",
          padding: "1rem",
          "&::-webkit-scrollbar": {
            width: "0",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          alignItems="center"
          width="100%"
        >
          <Avatar
            sx={{ width: "100px", height: "100px" }}
            src={`http://localhost:3001/assets/${user?.profilePicture}`}
          />
          <Typography
            color={palette.primary.dark}
            sx={{
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            {user?.userName}
          </Typography>
          <Button
            sx={{
              fontSize: "15px",
              color: palette.primary.dark,
              "&:hover": { color: palette.primary.main },
            }}
            onClick={()=>Navigate(`/${user.userName}`)}
          >
            View Profile
          </Button>
        </Box>
        {messages?.map((message, index) => {
          const isUserMessage = message.sender === loggedInUser?.userName;
          const showAvatar =
            index === 0 || messages[index - 1].sender !== message.sender;

          const showDateHeader =
            index === 0 ||
            new Date(messages[index - 1].time).toDateString() !==
              new Date(message.time).toDateString();
          const isLastFromSender =
            index === messages.length - 1 ||
            messages[index + 1].sender !== message.sender;

          return (
            <React.Fragment key={index}>
              {showDateHeader && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    textAlign: "center",
                    display: "block",
                    margin: "1rem 0",
                  }}
                >
                  {formatDateHeader(message.time)}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                  justifyContent: isUserMessage ? "flex-end" : "flex-start",
                  paddingLeft: !isUserMessage ? "48px" : "0px",
                }}
              >
                {!isUserMessage && isLastFromSender && message.sender && (
                  <Avatar
                    sx={{
                      marginRight: "0.5rem",
                      position: "absolute",
                      left: 0,
                    }}
                    src={`http://localhost:3001/assets/${user.profilePicture}`}
                  >
                    {message.sender[0]}
                  </Avatar>
                )}
                <Box
                  sx={{
                    backgroundColor: isUserMessage
                      ? palette.background.paper
                      : palette.background.paper,
                    color: isUserMessage ? "inherit" : "inherit",
                    padding: "0.5rem 1rem",
                    borderRadius: "1rem",
                    maxWidth: "75%",
                    textAlign: isUserMessage ? "right" : "left",
                  }}
                >
                  {showAvatar &&
                    isLastFromSender &&
                    !isUserMessage &&
                    message.sender && (
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        {message.sender}
                      </Typography>
                    )}
                  <Typography
                    variant="body2"
                    ref={index === messages.length - 1 ? scrollRef : null}
                    fontSize="15px"
                  >
                    {message.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDate(message.time)}
                  </Typography>
                </Box>
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
      {/* Message Input */}
      <Divider />
      <Box
        sx={{ padding: "1.5rem" }}
        width="60%"
        position="fixed"
        bottom="0"
        zIndex="10"
      >
        <Box sx={{ display: "flex", alignItems: "center" }} width="100%">
          <InputBase
            sx={{
              borderRadius: "20px",
              padding: "0.5rem",
              border: "1px solid white",
            }}
            placeholder="Send message..."
            value={sendMessage}
            onChange={(e) => handleChange(e)}
            fullWidth
            onKeyDown={handleKeyDown}
          />
          <Button
            sx={{ marginLeft: "0.5rem" }}
            variant="contained"
            onClick={(e) => handleMessage(e)}
            disabled={sendMessage.trim().length === 0}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Messages;
