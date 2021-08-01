import React, { useState, useEffect } from "react";

import styles from "./LoginScreenStyle";
import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  BackHandler
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Input } from "react-native-elements";
import { Icon } from "native-base";
import { NavHeader } from "../../Components/Header";
import { HideMessage, ShowMessage } from "../../Components/Message";
import mushroom from "../../Api/siten-assistant.api";
import { UtillSize } from "../../Themes";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import { TopNavigatorParamsList } from '../../types';
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestPermission, saveFirebaseToken } from '../../Services/FirebaseService';

export interface LoginProps {
  navigation: StackNavigationProp<TopNavigatorParamsList, 'LoginScreen'>;
  isConnected: boolean
}

// function LoginScreen( { navigation }) {
const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const mesLoginFail = 'Account or password is incorrect!';
  const [userInfor, ChangeInfor] = useState({ UserName: "", PassWord: "" });
  const [loading, setLoading] = useState(false);
  const imageBrandName = (require('../../Assets/Images/brandname.png'));
  const cloud = (require('../../Assets/Images/cloud.png'));
  let isConnected: boolean;

  useEffect(() => {
    const backAction = () => {
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    checkConnection();
    return () => backHandler.remove();
  }, []);


  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      isConnected = false;
    } else {
      isConnected = true;
    }
  });

  const handerChange = (value: string, name: string) => {
    ChangeInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const goToForgotPwScreen = () => {
    if (!isConnected) {
      ShowMessage('Whoops! No internet connection found. Check your connection and try again!', 'danger', 3000);
      return;
    }
    navigation.navigate('ForgotPasswordScreen');
  }

  const login = async () => {
    if (loading === true) return;

    if (!isConnected) {
      ShowMessage('Whoops! No internet connection found. Check your connection and try again!', 'danger', 3000);
      return;
    }
    try {
      if (!userInfor.UserName) {
        ShowMessage('Email is required!', 'danger');
        return;
      }
      if (!userInfor.PassWord) {
        ShowMessage('Password is required!', 'danger');
        return;
      }
      // if (userInfor.PassWord.length < 6) {
      //   ShowMessage('Password must include more than 6 characters !', 'danger');
      //   return;
      // }
      let res = await mushroom.$auth.loginAsync(userInfor.UserName.toLowerCase(), userInfor.PassWord, true);
      console.log(res, 'infor login');
      setLoading(true);

      if (res.result) {
        // await AsyncStorage.clear();
        let tokenLogin = res.result.token;
        console.log(tokenLogin, 'tokenLogin');
        await AsyncStorage.setItem('token', tokenLogin);
        let request = await requestPermission();
        if (request) {
          saveFirebaseToken();
          // await updateFcmToken();
        }
        navigation.navigate('HomeScreen');
      } else {
        ShowMessage(mesLoginFail, 'warning');
        console.log('??????', res);
        setTimeout(() => {
          HideMessage();
        }, 3000);
        return
      }
    } catch (error) {
      ShowMessage(mesLoginFail, error, 'warning');
      console.log('??????!', error);
      setTimeout(() => {
        HideMessage();
      }, 3000);
      return
    }
    setLoading(false);
  };

  return (

    <View style={styles.Container}>
      <StatusBar barStyle="light-content" />
      <NavHeader />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <LinearGradient colors={['#0052a3', '#00adee']} start={{ x: 0.5, y: 1.2 }} end={{ x: 0.5, y: 0.208 }} style={{ flex: 1 }}>
          {/* <Image source={imageBrandName} style={{ width: 150, height: 100, top: 50, alignSelf: 'center', marginBottom: 30 }} />*/}
          <Image source={cloud} style={{ width: '100%', height: 500, position: 'absolute', top: Dimensions.get('window').width / 2 }} /> 
          <Text style={{ top: 50, alignSelf: 'center', marginBottom: 30, color: 'white', fontSize: 40,fontWeight:'bold' }}>Aptech Assitant</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <View style={{ marginHorizontal: UtillSize.marginLogin }}>
              <View style={styles.viewInput}>
                <Input
                  placeholder='Your email'
                  placeholderTextColor='rgba(255, 255, 255 , .7)'
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  inputStyle={{ color: '#fff', fontSize: RFValue(13) }}
                  value={userInfor.UserName}
                  onChangeText={(e) => handerChange(e, 'UserName')}
                  onFocus={() => null}
                  keyboardType='email-address'

                  leftIcon={
                    <Icon
                      type='EvilIcons'
                      name='user'
                      style={{ color: '#fff', fontSize: RFValue(19) }}
                    />
                  }
                />
              </View>
              <View style={styles.viewInput}>
                <Input
                  placeholder='Your password'
                  value={userInfor.PassWord}
                  onChangeText={(e) => handerChange(e, 'PassWord')}
                  secureTextEntry={true}
                  placeholderTextColor='rgba(255, 255, 255 , .7)'
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  inputStyle={{ color: '#fff', fontSize: RFValue(13) }}
                  onFocus={() => null}
                  leftIcon={
                    <Icon
                      name='lock'
                      type='EvilIcons'
                      style={{ color: '#fff', fontSize: RFValue(19) }}
                    />
                  }
                />
              </View>
              <View style={styles.wrapTextForgot}>
                <TouchableOpacity
                  //  disabled={disableLogin}
                  onPress={(() => goToForgotPwScreen())}>
                  <Text style={styles.textForGot}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                // disabled={disableLogin}
                style={styles.ButtonLogin}
                onPress={(() => login())}>
                <Text style={styles.textLogin}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
}
export default LoginScreen;
