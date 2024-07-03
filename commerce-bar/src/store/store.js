import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import filterReducer from "./slices/filterSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice"


const rootReducer  = combineReducers({
    collectionFilter : filterReducer,
    authProvider : authReducer,
    cart : cartReducer
}) 

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authProvider','cart']
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);


export  const store = configureStore({
    reducer : persistedReducer
})


export const persistor = persistStore(store);

