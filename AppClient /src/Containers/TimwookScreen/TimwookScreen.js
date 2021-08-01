import React from "react";
import { NavHeader, Header } from "../../Components/Header";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import { WebView } from 'react-native-webview';
import { Text } from "native-base";

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
        title={"Class rules"}
        NoNavHeader
      />
      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView>
          <Text style={styles.Title}>
            Class time
          </Text>
          <Text style={[styles.text, { paddingLeft: 5 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at ex bibendum, blandit ligula sed, pellentesque dolor. Duis non efficitur lorem, vitae euismod nisi. Maecenas non mollis ante. Suspendisse id molestie nulla. Proin ut fermentum felis. Vestibulum viverra dapibus venenatis. Sed facilisis nibh ac consequat fermentum. Nunc elit leo, vulputate viverra bibendum quis, scelerisque quis diam. Nam consequat consectetur sem ut facilisis. Fusce tristique ornare massa, vel consectetur nibh mollis ultricies. Integer ornare lacinia tincidunt. Proin finibus tempus orci, vel suscipit quam tincidunt eu. Suspendisse lobortis ultrices lectus, et luctus mi sagittis vitae. Suspendisse ex sapien, congue placerat tristique sit amet, viverra sit amet mi
          </Text>
          <Text style={styles.Title}>
            In the class
          </Text>
          <Text style={[styles.text, { paddingLeft: 5 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at ex bibendum, blandit ligula sed, pellentesque dolor. Duis non efficitur lorem, vitae euismod nisi. Maecenas non mollis ante. Suspendisse id molestie nulla. Proin ut fermentum felis. Vestibulum viverra dapibus venenatis. Sed facilisis nibh ac consequat fermentum. Nunc elit leo, vulputate viverra bibendum quis, scelerisque quis diam. Nam consequat consectetur sem ut facilisis. Fusce tristique ornare massa, vel consectetur nibh mollis ultricies. Integer ornare lacinia tincidunt. Proin finibus tempus orci, vel suscipit quam tincidunt eu. Suspendisse lobortis ultrices lectus, et luctus mi sagittis vitae. Suspendisse ex sapien, congue placerat tristique sit amet, viverra sit amet mi
          </Text>
          <Text style={styles.Title}>
            About exams
          </Text>
          <Text style={[styles.text, { paddingLeft: 5 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at ex bibendum, blandit ligula sed, pellentesque dolor. Duis non efficitur lorem, vitae euismod nisi. Maecenas non mollis ante. Suspendisse id molestie nulla. Proin ut fermentum felis. Vestibulum viverra dapibus venenatis. Sed facilisis nibh ac consequat fermentum. Nunc elit leo, vulputate viverra bibendum quis, scelerisque quis diam. Nam consequat consectetur sem ut facilisis. Fusce tristique ornare massa, vel consectetur nibh mollis ultricies. Integer ornare lacinia tincidunt. Proin finibus tempus orci, vel suscipit quam tincidunt eu. Suspendisse lobortis ultrices lectus, et luctus mi sagittis vitae. Suspendisse ex sapien, congue placerat tristique sit amet, viverra sit amet mi
          </Text>
          <Text style={styles.Title}>
            About homeworks
          </Text>
          <Text style={[styles.text, { paddingLeft: 5 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at ex bibendum, blandit ligula sed, pellentesque dolor. Duis non efficitur lorem, vitae euismod nisi. Maecenas non mollis ante. Suspendisse id molestie nulla. Proin ut fermentum felis. Vestibulum viverra dapibus venenatis. Sed facilisis nibh ac consequat fermentum. Nunc elit leo, vulputate viverra bibendum quis, scelerisque quis diam. Nam consequat consectetur sem ut facilisis. Fusce tristique ornare massa, vel consectetur nibh mollis ultricies. Integer ornare lacinia tincidunt. Proin finibus tempus orci, vel suscipit quam tincidunt eu. Suspendisse lobortis ultrices lectus, et luctus mi sagittis vitae. Suspendisse ex sapien, congue placerat tristique sit amet, viverra sit amet mi
          </Text>
        </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 15,
  }
});
export default TimwookScreen;
