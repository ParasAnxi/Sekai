//** IMPORTS */
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
//** MUI */
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme/theme";
//** COMPONENTS */
import Auth from "./scenes/auth/Auth";
//** REDUX */
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state)=>state.user.theme);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme = {theme}>
          <CssBaseline/>
          <Routes>
            <Route path = "/" element = { <Auth/> }/>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
