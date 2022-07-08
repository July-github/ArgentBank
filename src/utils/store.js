import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/reducer';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default configureStore({
    reducer: {
        user: userReducer,
    },

    reduxDevtools,
})