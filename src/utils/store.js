import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/reducer';
import { fetchUserToken, fetchUserData } from '../redux/reducer'

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default configureStore({
    reducer: {
        user: userReducer,
    },
    // middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(fetchUserToken, fetchUserData),
    reduxDevtools,
})