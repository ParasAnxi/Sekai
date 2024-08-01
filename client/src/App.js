//** IMPORTS */
import { BrowserRouter as Router, Routes, Route,Navigate, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
//** MUI */
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme/theme";
//** REDUX */
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "features/user/userSlice";
//** COMPONENTS */
import Auth from "./scenes/auth/Auth";
import Home from "scenes/home/Home";
import UserProfile from "scenes/profile/user profile/UserProfile";
import ResetPassword from "scenes/forgotPassword/ResetPassword";
import EditProfile from "scenes/profile/edit profile/EditProfile";

function App() {
  const mode = useSelector((state)=>state.user.theme);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  const dispatch = useDispatch();
  //** REDUCER CONFIG */
  const token = useSelector((state)=>state.user.token);
  const auth = Boolean(useSelector((state)=>state.user.token));
  // const navigate = useNavigate();
  if(token != null){
    const decodedToken = jwtDecode(token);
    setInterval(()=>{
      if(decodedToken.exp < (new Date().getTime())/1000){
        dispatch(setLogOut());
      }
    },(1000 * 60 * 1))
  }

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={auth ? <Navigate to="/home" /> : <Auth />}
            />
            <Route
              path="/home"
              element={auth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/reset-password/:id/:token"
              element={auth ? <ResetPassword /> : <Navigate to="/" />}
            />
            <Route path="/account/:userName" element={auth ? <UserProfile />: <Navigate to="/" />} />
            <Route path="/account/:userName/edit" element={auth ? <EditProfile />: <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
