import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//Add css for toast notification
import 'react-toastify/ReactToastify.css'
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

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

  const {setBasket} = useStoreContext(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId) {
      agent.Basket.get()
                  .then(basket => setBasket(basket))
                  .catch(error => console.log(error))
                  .finally(()=> setLoading(false))
    }
  }, [setBasket]) //as soon as basket value changes, fetch the data again from backend

  if(loading){
    return <LoadingComponent message="Initialising App..."/>
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" theme='colored' hideProgressBar/>
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
