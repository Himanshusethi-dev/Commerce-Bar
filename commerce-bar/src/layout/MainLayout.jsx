import React from 'react'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store,persistor } from '../store/store'
import Header from '../components/header/Header'
import Footer from '../components/common/footer/Footer'
import { minHeight } from '@mui/system'
const MainLayout = () => {
  return (
    <>
     <Provider store={store} >
        <PersistGate persistor={persistor}>
         <Header />
         <div className="main" style={{minHeight:"100vh"}}>
         <Outlet />
         </div>
       
         <Footer />
        </PersistGate>
        
      </Provider>
    </>
    
  )
}

export default MainLayout