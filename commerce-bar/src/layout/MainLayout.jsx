import React from 'react'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store,persistor } from '../store/store'
import Header from '../components/header/Header'
import Footer from '../components/common/footer/Footer'
const MainLayout = () => {
  return (
    <>
     <Provider store={store} >
        <PersistGate persistor={persistor}>
         <Header />
         <Outlet />
         <Footer />
        </PersistGate>
        
      </Provider>
    </>
    
  )
}

export default MainLayout