import { legacy_createStore as createStore } from "redux";
import userReducer from '../features/user';


const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(userReducer, reduxDevtools)

export default store