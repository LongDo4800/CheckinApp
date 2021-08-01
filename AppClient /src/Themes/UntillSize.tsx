import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");
//dif iphone 6-6plus check margin, width, height device info
export const utilsSize = {
  headerHeight: 50,
  normalFontSize: 14,
  smallFontSize: 13,
  memSizeText: 15,
  marginLogin:20,
  titleFontSize: 16 ,
  heightInput: 45,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight:
    Platform.OS === "ios"
      ? height === 812 || width === 812 || height === 896 || width === 896
        ? 44
        : 20
      : 0, // check navBarHeight iphone X, Xm
  marginTop:
    Platform.OS === "ios"
      ? height === 812 || width === 812 || height === 896 || width === 896
        ? 34
        : 18
      : 6,
  iconTop: Platform.OS === "ios" ? 28 : 12,
  imageRandom: "https://unsplash.it/1000/1000",
  shadowMain: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
};

export default utilsSize;
