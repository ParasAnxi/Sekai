import React from "react";
//** MUI */
import { Box } from "@mui/system";
import { Button, Typography, Avatar } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Badge } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
//** REDUCERS */
import { useSelector } from "react-redux";

const SidebarComp = ({ Icon, name }) => {
  const user = useSelector((state) => state.user.user);
  const { palette } = useTheme();
  return (
    <Button
      fullWidth
      sx={{
        textTransform: "none",
        color: palette.primary.dark,
        padding: "1rem",
        "&:hover": { color: palette.primary.main },
      }}
    >
      <Box display="flex" flexDirection="row" gap="2.3rem" width="100%">
        {Icon && (
          <>
            {Icon === MessageIcon ? (
              <Badge badgeContent={19} color="primary">
                <Icon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </Badge>
            ) : (
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
