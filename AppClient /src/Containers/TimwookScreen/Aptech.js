import React from "react";
import { NavHeader, Header } from "../../Components/Header";
import {
  View,
} from "react-native";
import { WebView } from 'react-native-webview';

//async 
function Aptech({ navigation, route }) {
  
  let token = route.params.token;
  console.log("token", token)
  const myInjectedJs = "alert(10)";
  
  return (
    <View style={{ flex: 1 }}>
      <NavHeader />
      <Header
        leftFunction={() => navigation.openDrawer()}
        IconLeft={{ name: "menu", type: "Ionicons" }}
        title={"APTECH"}
        NoNavHeader
      />
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://aptechvietnam.com.vn/' }}
          javaScriptEnabled={true}
          injectedJavaScript={myInjectedJs}
        />
      </View>
    </View>
  )
}
export default Aptech;
