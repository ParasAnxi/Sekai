import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { followingUserPosts } from "features/post/postSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const { palette } = useTheme();
  const isMobile = useMediaQuery("(min-width:600px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMedium = useMediaQuery("(min-width:800px)");
  const userFeed = useSelector((state) => state.post.userFeed);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState({});

  useEffect(() => {
    if (user) {
      // console.log("hello")
      dispatch(followingUserPosts({ userName: user.userName }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const indexMap = {};
    userFeed.forEach((feed) => {
      indexMap[feed._id] = 0;
    });
    setCurrentIndex(indexMap);
  }, [userFeed]);

  const handleNext = (feedId) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [feedId]:
        (prevIndex[feedId] + 1) %
        userFeed.find((feed) => feed._id === feedId).posts.length,
    }));
  };

  const handlePrev = (feedId) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [feedId]:
        (prevIndex[feedId] -
          1 +
          userFeed.find((feed) => feed._id === feedId).posts.length) %
        userFeed.find((feed) => feed._id === feedId).posts.length,
    }));
  };
  //** FORMAT DATE */
  const formatDate = (isoString) => {
    const messageDate = new Date(isoString);
    const now = new Date();
    const diff = now - messageDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let timeAgo = "";

    if (years > 0) {
      timeAgo = years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      timeAgo = months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
      timeAgo = days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      timeAgo = hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      timeAgo = minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      timeAgo = "just now";
    }

    return `• ${timeAgo}`;
  };
  // console.log(userFeed);
  return (
    <Box
      // backgroundColor={palette.background.default}
      // backgroundColor="red"
      display="flex"
      flexDirection="column"
      // justifyContent="center"
      alignItems="center"
      overflow="scroll"
      //   position="relative"
      // gap="0.1rem"
      sx={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
        overflowX: "hidden",
      }}
    >
      {userFeed?.map((feed) => (
        <Box
          // backgroundColor="pink"
          // backgroundColor={palette.background.alt}
          key={feed._id}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          padding="0.5rem"
        >
          <Box
            display="flex"
            // alignItems="center"
            // backgroundColor="red"
            // backgroundColor={palette.background.alt}
            justifyContent="space-between"
            width={isMedium ? "50%" : "80%"}
            padding="0.5rem"
            sx={{
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                src={`http://localhost:3001/assets/${feed?.userProfilePicture}`}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Box display="flex">
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    {feed?.userName}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", margin: "0 0 0 0.3rem" }}>
                    {formatDate(feed.createdAt)}
                  </Typography>
                </Box>
                <Typography>{feed?.location}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton>
                <MoreHorizIcon sx={{ fontSize: "1.6rem" }} />
              </IconButton>
            </Box>
          </Box>
          <Box
            backgroundColor={palette.background.alt}
            // backgroundColor="white"
            // borderRadius="1rem 1rem 0 0"

            width={isMedium ? "50%" : "80%"}
            height="450px"
            display="flex"
            justifyContent="center"
            // alignItems="center"
          >
            {feed.posts.length > 0 && (
              <>
                <Box
                  display="flex"
                  alignContent="center"
                  sx={{
                    width: "450px",
                    height: "auto",
                    position: "relative",
                    mb: 2,
                    // boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <IconButton
                    onClick={() => handlePrev(feed._id)}
                    sx={{
                      display: feed.posts.length === 1 ? "none" : null,
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                      color: "white",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <Box
                    component="img"
                    src={`http://localhost:3001/assets/${
                      feed.posts[currentIndex[feed._id]]
                    }`}
                    alt={`Image ${currentIndex[feed._id] + 1}`}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      display: "block",
                      margin: "auto",
                      objectFit: "cover",
                      // borderRadius: "10px",
                    }}
                  />
                  <IconButton
                    onClick={() => handleNext(feed._id)}
                    sx={{
                      display: feed.posts.length === 1 ? "none" : null,
                      position: "absolute",
                      right: 16,
                      top: "50%",
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
                </Box>
              </>
            )}
          </Box>
          <Box
            // backgroundColor="red"
            width={isMedium ? "50%" : "80%"}
            padding="0 0.4rem"
            backgroundColor={palette.background.alt}
            sx={{
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <Box
              display="flex"
              // backgroundColor="blue"
              width="100%"
              justifyContent="space-between"
            >
              <Box display="flex">
                <IconButton>
                  <FavoriteBorderIcon sx={{ fontSize: "1.6rem" }} />
                </IconButton>
                <IconButton>
                  <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                </IconButton>
                <IconButton>
                  <SendOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                </IconButton>
              </Box>
              <Box>
                <IconButton>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              // backgroundColor="red"
              // width="50%"
              justifyContent="space-between"
            >
              <Typography sx={{ fontSize: "0.9rem", padding: "0 0.7rem" }}>
                {Object.keys(feed.likes).length} likes
              </Typography>
            </Box>
            <Box
              display="flex"
              // backgroundColor="red"
              // width="50%"
              justifyContent="space-between"
            >
              <Typography
                component="pre"
                sx={{ fontSize: "0.9rem", padding: "0 0.7rem" }}
              >
                {feed.userName} {feed.description}
              </Typography>
            </Box>
            <Box
              display="flex"
              // backgroundColor="red"
              // width="50%"
              justifyContent="space-between"
            >
              {feed.comments.length === 0 ? (
                <Typography
                  component="pre"
                  sx={{ fontSize: "0.9rem", padding: "0 0.7rem" }}
                >
                  0 comments
                </Typography>
              ) : (
                <Typography
                  component="pre"
                  sx={{ fontSize: "0.9rem", padding: "0 0.7rem" }}
                >
                  view all {feed.comments.length} comments
                </Typography>
              )}
            </Box>
            <Box
              display="flex"
              // backgroundColor="red"
              // width="50%"
              justifyContent="space-between"
            >
              <InputBase
                // value={sendMessage}
                // onChange={(e) => setSendMessage(e.target.value)}
                placeholder="Add a comment..."
                sx={{ flex: 1, padding: "10px", fontSize: "15px" }}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Feed;
