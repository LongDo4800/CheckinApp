import { connect } from "react-redux";
import HomeScreen from "../../Containers/HomeScreen/HomeScreen";

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.LoginReducers,
  };
};

const HomeContainer = connect(
  mapStateToProps,
  null
)(HomeScreen);
export default HomeContainer;
