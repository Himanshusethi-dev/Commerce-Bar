import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
const store = configureStore({
    reducer : {
        collectionFilter : filterReducer,
    }
})


export default store;

