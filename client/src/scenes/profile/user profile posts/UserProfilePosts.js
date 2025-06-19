import React, { useState } from "react";
//** MUI */
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
//** COMPONENTS */
import PostModal from "scenes/post/post modal/PostModal";
import { setPostId } from "features/post/postSlice";
import { useDispatch } from "react-redux";

const UserProfilePosts = ({ posts }) => {
  const isNonMobile = useMediaQuery("(min-width:830px)");
  const { palette } = useTheme();
  const dispatch = useDispatch();

  //** POST MODAL */
  const [postModalOpen, setPostModalOpen] = useState(false);
  //** HANDLE POST CLICK */
  const handlePostClick = (id)=>{
    dispatch(setPostId(id));
    setPostModalOpen(true);
  }
  
  return (
    <>
      {posts?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            padding: "1rem",
            // backgroundColor: "red",
            // height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize="2rem"
            color={palette.primary.dark}
            fontWeight="bolder"
            variant="h1"
          >
            No Posts
          </Typography>
        </Box>
      )}
      <Box
        display="grid"
        columnGap="0.4rem"
        gridTemplateColumns={
          isNonMobile
            ? "repeat(3, minmax(200px, 1fr))"
            : "repeat(auto-fill, minmax(200px, 1fr))"
        }
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
        }}
      >
        {posts
          ?.map((post) => (
            <Box
              position="relative"
              key={post._id}
              sx={{
                "&:hover": { cursor: "pointer" },
              }}
              // onClick={()=>console.log(post._id)}
            >
              {post?.posts.length !== 1 && (
                <FilterNoneIcon
                  sx={{
                    fontSize: "2.2rem",
                    zIndex: "9",
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "rgba(128, 128, 128, 0.5)",
                    borderRadius: "50%",
                    padding: "0.5rem",
                  }}
                />
              )}
              {post?.posts?.length > 0 && (
                <img
                  src={`http://localhost:3001/assets/${post.posts[0]}`}
                  alt=""
                  width="100%"
                  height="200px"
                  loading="lazy"
                  style={{ objectFit: "cover", borderRadius:"5px" }}
                  onClick={()=>handlePostClick(post._id)}
                />
              )}
            </Box>
          ))
          .reverse()}
        {postModalOpen && <PostModal postModalOpen={postModalOpen} setPostModalOpen={setPostModalOpen} />}
      </Box>
    </>
  );
};

export default UserProfilePosts;
