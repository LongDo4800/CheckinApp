import { connect } from "react-redux";
import LoginScreen from "../../Containers/LoginScreen/LoginScreen";
import { fetchUserAction } from "../Actions";

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => {
      dispatch(fetchUserAction());
    },
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
export default LoginContainer;
