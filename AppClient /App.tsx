import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import AppNavigator from "./src/Navigators/AppNavigator";
import createSagaMiddleware from "redux-saga";
import {
  View
} from 'react-native';

import allReducers from "./src/Redux/Reducers";
import mushroom from "./src/Api/siten-assistant.api";
import FlashMessage from "react-native-flash-message";
import SplashScreen from 'react-native-splash-screen';
import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

mushroom.$setting.set("diagnostic.log_request", true);
mushroom.$setting.set("diagnostic.log_response", true);

interface Props {
  loading?: boolean;
}

const App: React.FC<Function> = () => {
  const [loading, setLoading] = React.useState(true);

  const onReady = () => {
    setLoading(false);
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }

    mushroom.$setting.set("diagnostic.log_request", true);
    mushroom.$setting.set("diagnostic.log_response", true);

    if (mushroom.$auth && mushroom.$auth.isReady) {
      onReady();
    } else {
      mushroom._on("$auth.ready", () => onReady());
    }
  }, [])

  return loading ? <View></View> : (
    <Provider store={store}>
      <AppNavigator />
      <FlashMessage position="top" titleStyle={{ fontSize: RFValue(9) }} />
    </Provider>
  );

}

export default App;