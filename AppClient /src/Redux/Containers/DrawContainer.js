import { connect } from "react-redux";
import DrawerScreen from "../../Containers/DrawerScreen/DrawerScreen";

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducers,
  };
};

const DrawContainer = connect(
  mapStateToProps,
)(DrawerScreen);
export default DrawContainer;
