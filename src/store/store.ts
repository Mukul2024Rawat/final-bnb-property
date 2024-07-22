import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import formReducer from './slices/formSlice';

export const store=configureStore({
    reducer:{
        search:searchReducer,
        form: formReducer,

    }
})

//types  of state and dispatch

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch

export default store;