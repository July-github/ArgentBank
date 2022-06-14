import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user';


const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = configureStore({reducer:{
    user: userReducer,
}, reduxDevtools})

export default store