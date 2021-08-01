import { StyleSheet } from "react-native";
import { Colors, UtillSize } from "../../Themes";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    color: Colors.mainColor,
    fontSize: RFValue(13),
  },
  wrapIcon: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: Colors.mainColor,
    fontSize: RFValue(13),
  },
  imageBackground: {
    flex: 1,
    flexDirection: "column",

  },
  image: {
    resizeMode: "cover",
    justifyContent: 'flex-end',
    height: 300 * 4 / 3,

  },
  textLarge: {
    color: "white",
    fontSize: RFValue(15),
    textAlign: 'left',
    paddingBottom: 3
  },
  textSmall: {
    color: "white",
    fontSize: RFValue(10),
    textAlign: 'left',
  },
  
});
export default styles;