import { useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType==='light' ? '#eaeaea' : '#03001C'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />

      <Container >
        <Outlet /> 
        {/* Each children element of <App /> will be loaded in place of <Outlet />
        Whenever that specific path is mentioned in URL as per Router.tsx.
         */}
      </Container>


    </ThemeProvider>
  )
}

export default App
