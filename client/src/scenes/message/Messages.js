import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//** MUI */
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
//** REDUX */
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "features/users/usersSlice";
//** WEB SOCKETS */
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const Messages = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //** USERS */
  const loggedInUser = useSelector((state) => state.user.user);
  const user = useSelector((state) => state.users.user);
  const { userName } = useParams();

  //** LOCAL CHAT */
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [sendMessage, setSendMessage] = useState("");

  //** CHAT STATE */
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //** REFS */
  const scrollRef = useRef(null);
  const newMessageRef = useRef(null);
  const isFetchingRef = useRef(false);
  const previousScrollHeightRef = useRef(0);
  const debounceTimeoutRef = useRef(null);

  //** SCROLL */
  const scrollToPosition = (newContentHeight) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += newContentHeight;
    }
  };
  //** PAGE */
  useEffect(() => {
    setPage(1);
  }, [userName]);

  //** FETCH CHATS */
  const getMessages = useCallback(async () => {
    if (isFetchingRef.current || !user || !loggedInUser || !hasMore) return;
    setLoading(true);
    isFetchingRef.current = true;
    const data = {
      sender: loggedInUser?.userName,
      receiver: user?.userName,
      message: sendMessage,
      time: Date.now(),
    };
    try {
      if (page) {
        console.log("fetching for ", page);
        const response = await fetch(
          `http://localhost:3001/message/getChats?page=${page}&limit=10`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const newData = await response.json();
        if (page === 1) {
          setMessages(newData.messages);
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          }, 0);
        } else {
          setMessages((prev) => [...newData.messages, ...prev]);
          setTimeout(() => scrollToPosition(500), 0);
        }
        if (newData.messages.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [hasMore, page, user]);

  //** MESSAGE SCROLL */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length < 10]);

  //** SOCKETS FOR MESSAGES */
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.emit("addOnlineUsers", loggedInUser.userName);

    socket.on("receiveMessage", (data) => {
      if (
        data.sender === user.userName &&
        data.receiver === loggedInUser.userName
      ) {
        setArrivalMessage(data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, user]);

  //** FETCHING DATA */
  useEffect(() => {
    dispatch(getUserProfile(user.userName));
  }, []);

  useEffect(() => {
    if (user) {
      setPage(1);
      setMessages([]);
    }
  }, [user]);

  //** SCROLL EVENT */
  const handleScroll = useCallback(() => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollTop <= 400 &&
      !loading &&
      !isFetchingRef.current
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        previousScrollHeightRef.current = scrollRef.current.scrollHeight;
        setPage((prevPage) => prevPage + 1);
      }, 100);
    }
  }, [loading]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);
  
  //** MESSAGES */
  useEffect(() => {
    if (page) {
      getMessages();
    }
  }, [getMessages, page, user]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
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
    const data = {
      sender: loggedInUser?.userName,
      receiver: user?.userName,
      message: sendMessage,
      time: Date.now(),
    };
    socket.emit("sendMessage", data, (response) => {
      if (response.status === "ok") {
        setMessages((prev) => [...prev, data]);
      }
    });
    setMessages((prev) => [...prev, data]);
    setSendMessage("");
  };
  //** SCROLL INTO */
  useEffect(() => {
    setTimeout(()=>{
      newMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },50)
  }, [sendMessage, arrivalMessage]);

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
      {loading && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            left: "68%",
            top: "50%",
            alignContent: "center",
            zIndex: "10",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          minHeight: "50vh",
          maxHeight: "78vh",
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
            onClick={() => Navigate(`/${user.userName}`)}
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
                    fontSize="15px"
                    ref={index === messages.length - 1 ? newMessageRef : null}
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
            onChange={handleChange}
            fullWidth
            onKeyDown={handleKeyDown}
          />
          <Button
            sx={{ marginLeft: "0.5rem" }}
            variant="contained"
            onClick={handleMessage}
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
