import React from 'react'
//** MUI */
import { Box, useMediaQuery } from '@mui/system'
import { useSelector } from 'react-redux';
//** COMPONENTS */
import SideBar from 'scenes/sidebar/sidebar/SideBar';
const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state)=>state.user.user);
  // console.log(user._id)
  return (
    <Box
      display={isNonMobileScreens ? "flex" : "flex"}
      justifyContent="space-between"
      width="100%"
      // backgroundColor="red"
      padding = "0 1rem 1rem 0"
      gap = "0.5rem"
    >
      <Box
        flexBasis={isNonMobileScreens ? "20%" : "18%"}
      >
        <SideBar/>
      </Box>
      <Box>
        hello
      </Box>
    </Box>
  )
}

export default Home