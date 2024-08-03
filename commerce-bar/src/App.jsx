import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import useCartFunctions from "./hooks/useCartFunctions"
import { Outlet } from 'react-router-dom';


function App() {
  useCartFunctions();
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
