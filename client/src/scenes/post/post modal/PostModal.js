import React, { useEffect, useRef, useState } from "react";
//** MUI */
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
//** REDUX */
import { useDispatch, useSelector } from "react-redux";
import { addComment, setPostId } from "features/post/postSlice";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Menu,
  MoreHoriz,
  ThreeDRotationRounded,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useNavigate } from "react-router-dom";

const POST_API = "http://localhost:3001/post";

const PostModal = ({ postModalOpen, setPostModalOpen }) => {
  const postId = useSelector((state) => state.post.postId);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const isMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(true);
  const [allComments, setAllComments] = useState([]);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const Navigate = useNavigate();
  //** HANDLE MODAL */
  const handleClose = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setPostModalOpen(false);
      dispatch(setPostId(null));
    }
  };

  useEffect(() => {
    if (postModalOpen) {
      document.addEventListener("mousedown", handleClose);
    } else {
      document.removeEventListener("mousedown", handleClose);
    }
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [postModalOpen]);

  const [post, setPost] = useState([]);
  const loggedInUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState(null);
  const theme = useSelector((state) => state.user.theme);
  const [fullPost, setFullPost] = useState([]);
  //** FETCH POST */
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${POST_API}/getpost/${postId}`, {
        method: "GET",
      });
      const data = await response.json();
      setPost(data.post.posts);
      setUser(data.post);
      setAllComments(data.post.comments);
      // console.log(data.post);
    };
    fetchPost();
  }, []);
  // console.log(allComments)
  const [currentIndex, setCurrentIndex] = useState(0);

  // console.log(post.posts)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + post?.length) % post.length
    );
  };

  const handleNavigate = async () => {
    if (user.userName === loggedInUser.userName) {
      Navigate(`/account/${loggedInUser?.userName}`);
      setPostModalOpen(false);
    } else {
      Navigate(`/${user?.userName}`);
      setPostModalOpen(false);
    }
  };
  const [showFullComment, setShowFullComment] = useState({});
  const toggleCommentExpansion = (id) => {
    setShowFullComment((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCommentNavigate = (userName) => {
    if (userName === loggedInUser.userName) {
      Navigate(`/account/${loggedInUser?.userName}`);
      setPostModalOpen(false);
    } else {
      Navigate(`/${userName}`);
      setPostModalOpen(false);
    }
  };
  //** COMMENT */
  const [comment, setComment] = useState("");

  const handleComment = (e) => {
    e.preventDefault();
    const commentData = {
      postId: postId,
      userName: loggedInUser.userName,
      profilePicture: loggedInUser.profilePicture,
      comment: comment,
    };
    //  console.log(commentData);
    setAllComments((prev) => [...prev, commentData]);
    dispatch(addComment(commentData));
    setComment("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleComment(e);
    }
  };

  return (
    <>
      {!loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              width: "75%",
              backgroundColor: palette.background.alt,
              boxShadow: 3,
              borderRadius: "15px",
              p: 4,
              zIndex: "11",
            }}
          >
            {postModalOpen && (
              <Box position="absolute" top="5px" right="10px">
                <IconButton onClick={() => setPostModalOpen(null)}>
                  <Close />
                </IconButton>
              </Box>
            )}
            <Box display="flex" gap="1rem">
              {/** POSTS AREA */}
              <Box position="relative">
                {post?.length > 0 && (
                  <>
                    <IconButton
                      onClick={handlePrev}
                      sx={{
                        display: post?.length === 1 ? "none" : null,
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
                          display: post?.length === 1 ? "none" : null,
                        }}
                      />
                    </IconButton>
                    <Box position="relative">
                      <Box
                        // backgroundColor={palette.background.alt}
                        key={post.name}
                        component="img"
                        src={`http://localhost:3001/assets/${post[currentIndex]}`}
                        alt={`Carousel Image ${currentIndex + 1}`}
                        sx={{
                          width: "700px",
                          height: isMobile ? "600px" : "250px",
                          objectFit: "contain",
                          borderRadius: "10px",
                        }}
                      />
                    </Box>

                    <IconButton
                      onClick={handleNext}
                      sx={{
                        display: post.length === 1 ? "none" : null,
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

              {/** SIDE */}
              <Box
                // backgroundColor="red"
                width="100%"
              >
                <Box
                  // bgcolor="pink"
                  padding="0.5rem"
                  display="flex"
                  justifyContent="space-between"
                  borderBottom={
                    theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.3)"
                      : "1px solid rgba(0, 0, 0, 0.3)"
                  }
                >
                  <Box display="flex" alignItems="center" gap="0.8rem">
                    <Avatar
                      src={`http://localhost:3001/assets/${user?.userProfilePicture}`}
                      onClick={handleNavigate}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                    <Typography
                      onClick={handleNavigate}
                      sx={{
                        fontSize: "0.9rem",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      {user?.userName}
                    </Typography>
                  </Box>
                  <IconButton>
                    <MoreHoriz sx={{ fontSize: "1.6rem" }} />
                  </IconButton>
                </Box>
                <Box
                  // bgcolor="blue"
                  display="flex"
                  padding="0.5rem"
                  gap="1rem"
                  borderBottom={
                    theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.3)"
                      : "1px solid rgba(0, 0, 0, 0.3)"
                  }
                >
                  <Box>
                    <Avatar
                      src={`http://localhost:3001/assets/${user?.userProfilePicture}`}
                      onClick={handleNavigate}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    // backgroundColor="yellow"
                    // component="pre"
                    maxHeight="250px"
                    overflow="auto"
                    sx={{
                      "&::-webkit-scrollbar": {
                        width: "0",
                      },
                      overflowX: "hidden",
                    }}
                  >
                    <Typography
                      flexWrap="wrap"
                      marginTop="0.5rem"
                      onClick={handleNavigate}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      {user?.userName} {" • "} {user?.description}
                    </Typography>
                  </Box>
                </Box>
                {/** COMMENTS */}
                <Box
                  //  backgroundColor="green"
                  padding="0.5rem"
                  minHeight="65%"
                  borderBottom={
                    theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.3)"
                      : "1px solid rgba(0, 0, 0, 0.3)"
                  }
                >
                  <Box
                    // backgroundColor="grey"
                    display="flex"
                    flexDirection="column"
                    maxHeight="380px"
                    overflow="auto"
                    sx={{"&::-webkit-scrollbar": {
                        width: "0",
                      }, overflowX: "hidden" }}
                  >
                    {allComments?.map((comment) => {
                      const isExpanded = showFullComment[comment.id] || false;
                      return (
                        <Box
                          display="flex"
                          gap="1rem"
                          padding="0.5rem"
                          key={comment._id}
                        >
                          <Avatar
                            src={`http://localhost:3001/assets/${comment.profilePicture}`}
                            onClick={() =>
                              handleCommentNavigate(comment.userName)
                            }
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                          />
                          <Typography
                            marginTop="0.5rem"
                            width="250px"
                            sx={{
                              whiteSpace: isExpanded ? "normal" : "nowrap",
                              overflow: "hidden",
                              textOverflow: isExpanded ? "clip" : "ellipsis",
                              cursor: "pointer",
                            }}
                            onClick={() => toggleCommentExpansion(comment.id)}
                          >
                            {comment?.userName} {" • "} {comment?.comment}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  // backgroundColor="blue"
                  width="100%"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <IconButton>
                      <FavoriteBorderIcon sx={{ fontSize: "1.6rem" }} />
                    </IconButton>
                    <Typography>
                      {Object.keys(user?.likes).length} Likes
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <BookmarkBorderOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  // backgroundColor="red"
                  display="flex"
                  justifyContent="space-between"
                >
                  <InputBase
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    sx={{ flex: 1, padding: "10px", fontSize: "15px" }}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <Button
                    sx={{ marginLeft: "0.5rem" }}
                    onClick={(e) => handleComment(e)}
                    disabled={comment.trim().length === 0}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PostModal;
