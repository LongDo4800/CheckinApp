import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../Containers/SplashScreen/SplashScreen";
import HomeScreen from "../Redux/Containers/HomeContainer";
import LoginScreen from "../Redux/Containers/LoginContainer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../Containers/DrawerScreen/DrawerScreen";
import ContactScreen from "../Containers/ContactScreen/ContactScreen";
import TimwookScreen from "../Containers/TimwookScreen/TimwookScreen";
import SupportScreen from "../Containers/TimwookScreen/Support";
import Aptech from "../Containers/TimwookScreen/Aptech";

import ForgotPasswordScreen from "../Containers/ForgotPassword/ForgotPasswordScreen";
import { Header } from "react-native/Libraries/NewAppScreen";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerHome() {
  console.log('???????');
  return (
    <Drawer.Navigator
      // drawerStyle={{ width: 300 }}
      drawerContent={(props) => <DrawerContent {...props} />} initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ContactsScreen" component={ContactScreen} options={{ header: null, headerLeft: null, gestureEnabled: false }} />
      <Drawer.Screen name="TimwookScreen" component={TimwookScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="Aptech" component={Aptech} />
    </Drawer.Navigator>
  )
}
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplasScreen"
        screenOptions={{
          headerShown: false,

        }}

      >
        <Stack.Screen name="SplasScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ header: null, headerLeft: null, gestureEnabled: false }}/>
        <Stack.Screen name="HomeScreen" component={DrawerHome} options={{ header: null, headerLeft: null, gestureEnabled: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
