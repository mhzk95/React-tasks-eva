import authReducer from "./authReducer";
import colorReducer from "./colorReducer";

// import { combineReducers } from "redux";

// const reducers =combineReducers({
//     auth:authReducer,
//     color:colorReducer
// })

const reducers = {
    auth:authReducer,
    color:colorReducer
}

export default reducers;