import { StyleSheet } from "react-native";
import { Colors, UtillSize } from "../../Themes";
import { Dimensions } from "react-native";
const widthItem = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  navBar: {
    height: UtillSize.navBarHeight,
    backgroundColor: Colors.colorNav,
  },
  viewHeader: {
    height: UtillSize.headerHeight,
    width: UtillSize.screenWidth,
    backgroundColor: Colors.colorNav,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  IconLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 46,
  },
  ContentHeader: {
    justifyContent: 'center',
  },
  wrapSearch: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: Colors.mainColor,
    marginVertical: 10,
    borderRadius: 10
  },
  searchInput: {
    width: widthItem - 110,
    height: 38,
    color: '#fff',
    marginLeft : 10
  },
  wrapIcon: {
    // width: 40,
    // alignSelf: 'center',
  },
});

export default styles