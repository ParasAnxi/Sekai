import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { palette } = useTheme();
  const isMobile = useMediaQuery("(min-width:600px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMedium = useMediaQuery("(min-width:800px)");
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState({});

  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userFeed, setUserFeed] = useState([]);
  const [hasMore,setHasMore] = useState(true);
  
  const scrollRef = useRef(null);
  const isFetchingRef = useRef(false);

  const getFeedPosts = useCallback(async () => {
    if (isFetchingRef.current || !user || !hasMore) return;
    setLoading(true);
    isFetchingRef.current = true;
      try {
        const res = await fetch(
          `http://localhost:3001/post/followingposts?page=${page}&limit=3`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ userName: user.userName }),
          }
        );
        const newData = await res.json();
        if(newData.posts.length === 0){
          setHasMore(false);
        }else{
          setUserFeed((prev) => [...prev, ...newData.posts]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
  }, [page, user, hasMore]);

  //** INFINITE SCROLLING */
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (
      container.scrollTop + container.clientHeight + 1 >=
        container.scrollHeight &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading,hasMore]);
  
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

  useEffect(() => {
    getFeedPosts();
  }, [getFeedPosts]);

  useEffect(() => {
    const indexMap = {};
    userFeed.forEach((feed) => {
      indexMap[feed._id] = 0;
    });
    setCurrentIndex(indexMap);
  }, [userFeed]);

  //** HANDLE MULPILE IMAGES */
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
        overflowX: "hidden",
      }}
      ref={scrollRef}
    >
      {userFeed?.map((feed) => (
        <Box
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
                sx={{
                  width: 56,
                  height: 56,
                  mr: 2,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => Navigate(`/${feed?.userName}`)}
              />
              <Box>
                <Box display="flex">
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => Navigate(`/${feed?.userName}`)}
                  >
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
            width={isMedium ? "50%" : "80%"}
            height="450px"
            display="flex"
            justifyContent="center"
          >
            {feed?.posts?.length > 0 && (
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
                    loading="lazy"
                    decoding="async"
                    alt={`Image ${currentIndex[feed._id] + 1}`}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      display: "block",
                      margin: "auto",
                      objectFit: "cover",
                      borderRadius: "10px",
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
          {loading && (
            <Box
              sx={{
                display: "flex",
                // width: "100vw",
                position: "absolute",
                left: "50%",
                bottom: "2%",
                alignContent: "center",
                zIndex: "10",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Feed;
