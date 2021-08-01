import {
  FETCH_USER,
  FETCH_SUCCSES,
  FETCH_FAILED,
} from "../Actions/ActionTypes";

const LoginReducers = (user = { name: "", age: "" }, action) => {
  switch (action.type) {
    case FETCH_SUCCSES:
      return action.user;
    case FETCH_FAILED:
      return {};
    default:
      return user;
  }
};
export default LoginReducers;
