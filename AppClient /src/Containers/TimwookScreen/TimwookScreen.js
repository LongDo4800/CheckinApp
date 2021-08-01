import React from "react";
import { NavHeader, Header } from "../../Components/Header";
import {
  View,
} from "react-native";
import { WebView } from 'react-native-webview';

//async 
function TimwookScreen({ navigation, route }) {
  
  let token = route.params.token;
  console.log("token", token)
  const myInjectedJs = "alert(10)";
  const myInjectedJs1 = `
  alert(0);
  (function(){
    alert(1);  
    window.localStorage.setItem('mushroom.tokens[/api/v2/]', '${token}');
    alert(2);
      window.location.href='https://timwook.com';
    }
  })();`;
  return (
    <View style={{ flex: 1 }}>
      <NavHeader />
      <Header
        leftFunction={() => navigation.openDrawer()}
        IconLeft={{ name: "menu", type: "Ionicons" }}
        title={"Timwook"}
        NoNavHeader
      />
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://timwook.com' }}
          javaScriptEnabled={true}
          injectedJavaScript={myInjectedJs}
        />
      </View>
    </View>
  )
}
export default TimwookScreen;
