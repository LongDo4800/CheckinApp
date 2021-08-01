import React from "react";
import { NavHeader, Header } from "../../Components/Header";
import {
  View,
} from "react-native";
import { WebView } from 'react-native-webview';

//async 
function ForgotPasswordScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <NavHeader />
      <Header
        leftFunction={() => navigation.navigate('LoginScreen')}
        IconLeft={{ name: "arrow-back", type: "Ionicons" }}
        title={"Forgot password"}
        NoNavHeader
      />
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://timwook.com/forgot-password' }}
          javaScriptEnabled={true}
        />
      </View>
    </View>
  )
}
export default ForgotPasswordScreen;
