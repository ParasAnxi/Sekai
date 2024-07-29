import React from "react";
//** MUI */
import { Box, useMediaQuery } from "@mui/system";
import { Button, Typography, Avatar } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Badge } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
//** REDUCERS */
import { useSelector } from "react-redux";

const SidebarComp = ({ Icon, name }) => {
  const user = useSelector((state) => state.user.user);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const small = useMediaQuery("(min-width:500px)");
  return (
    <Button
      fullWidth
      sx={{
        textTransform: "none",
        color: palette.primary.dark,
        padding: !small ? "0.5" : "1rem",
        "&:hover": { color: palette.primary.main },
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        gap={isNonMobileScreens ? "2.3rem" : null}
        width="100%"
        justifyContent={!isNonMobileScreens ? "center" : null}
      >
        {Icon && (
          <>
            {Icon === FavoriteIcon ? (
              <Badge badgeContent={"10M"} color="primary">
                <Icon
                  sx={{
                    fontSize: !small ? "30px" : "25px",
                  }}
                />
              </Badge>
            ) : null}
            {Icon === MessageIcon ? (
              <Badge badgeContent={"10k"} color="primary">
                <Icon
                  sx={{
                    fontSize: !small ? "30px" : "25px",
                  }}
                />
              </Badge>
            ) : null}

            {Icon === MessageIcon || Icon === FavoriteIcon ? null : (
              <Icon
                src={Icon === Avatar && user ? user.profilePicture : null}
                sx={{
                  width: Icon === Avatar ? 25 : null,
                  height: Icon === Avatar ? 25 : null,
                  bgcolor: Icon === Avatar ? palette.primary.dark : null,
                  fontSize: "25px",
                }}
              />
            )}
          </>
        )}

        <Typography
          marginTop="0.2rem"
          sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
        >
          {name}
        </Typography>
      </Box>
    </Button>
  );
};

export default SidebarComp;
