import { combineReducers } from "redux";
import LoginReducers from "./LoginReducers";

 const allReducers = combineReducers({
    LoginReducers,
     // them reducer vao day
 });
 export default allReducers;