import React from "react";
//** MUI */
import { Avatar, Box, Typography, useTheme } from "@mui/material";
//** REDUX */
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const SidePage = () => {
  const { palette } = useTheme();
  const Navigate = useNavigate();
  //** USER */
  const user = useSelector((state) => state.user.user);
  return (
    <Box display="flex" gap="2rem" flexDirection="column">
      <Box
        display="flex"
        // backgroundColor="red"
        padding="2rem 1rem"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          //  backgroundColor="yellow"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => Navigate(`/account/${user?.userName}`)}
        >
          <Avatar src={`http://localhost:3001/assets/${user?.profilePicture}`} />
          <Typography sx={{ fontSize: "1rem" }}>{user?.userName}</Typography>
          {/* <Typography>{user.bio}</Typography> */}
        </Box>
      </Box>
      {/** another thing */}
      {/* <Box display="flex" backgroundColor="pink">
        hello
      </Box>
      <Box display="flex" backgroundColor="pink">
        hello
      </Box> */}
    </Box>
  );
};

export default SidePage;
