import React, { useEffect, useState } from 'react';
import styles from "./SplashScreenStyle";
import { Images } from "../../Themes";
import { StackActions } from '@react-navigation/native';
import mushroom, { DEVICE_NOTIFICATION_SERVICE_ENUM } from "../../Api/siten-assistant.api";
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from "react-native-device-info";
import Modal from "react-native-modal";
import NetInfo from '@react-native-community/netinfo';
import { TopNavigatorParamsList } from '../../types';
import { HideMessage, ShowMessage } from "../../Components/Message";
import messaging from '@react-native-firebase/messaging';
import {
  StatusBar,
  View,
  ImageBackground,
  Text,
  Image,
  Dimensions,
  Platform,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestPermission, saveFirebaseToken } from '../../Services/FirebaseService';

export interface SplashProps {
  navigation: StackNavigationProp<TopNavigatorParamsList, 'Splash'>;
  isMustUpdate: boolean,
}

const SplashScreen: React.FC<SplashProps> = ({ navigation }) => {

  const imageBrandName = (require('../../Assets/Images/brandname.png'));
  const cloud = (require('../../Assets/Images/cloud.png'));
  const [isMustUpdate, setMustUpdate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAppStore, setOpenAppStore] = useState('');

  useEffect(() => {
    checkNetwork();
  }, []);

  const checkTrangThai = async () => {
    try {
      let result = await mushroom.$auth.statusAsync();
      console.log(result, 'resultresult');
      if (result.result.status == 'guest') {
        navigation.navigate('LoginScreen')
      } else {
        let request = await requestPermission();
        if (request) {
          saveFirebaseToken();
          // await updateFcmToken();
        }

        navigation.navigate('HomeScreen');
      }
    } catch (error) {
    }
  }

  const updateFcmToken = async () => {
    try {
      const res = await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken()
      console.log("updateFcmToken", token, res)
    } catch (error) {
      console.log(error)
    }
  }

  const checkNetwork = () => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        checkVersion();
      } else {
        goHomeNoNowork();
      }
    });
  }

  const checkVersion = async () => {
    // await AsyncStorage.clear();
    const objectPlatform: Record<string, string> = { ios: 'IOS', android: 'ANDROID' };
    const localPlatform = Platform.OS;
    const versionLocal = Number(DeviceInfo.getBuildNumber());
    let osDevice;

    try {
      const response = await mushroom.sa_version.listAsync();
      console.log(response, 'response');
      osDevice = response.result.find(el => el.platform == objectPlatform[localPlatform]);
      setOpenAppStore(osDevice?.link || '');
      if (versionLocal < (osDevice?.min || 0)) {
        setMustUpdate(false);
        setOpenUpdate(true);
        openURL(osDevice?.link || '');
      } else if (versionLocal >= (osDevice?.min || 0) && versionLocal < (osDevice?.current || 0)) {
        setMustUpdate(false);
        setOpenUpdate(true);
      } else {
        checkTrangThai();
      }
    } catch (error) {
      console.log(error);

    }
  }

  const goHomeNoNowork = async () => {
    let token = await AsyncStorage.getItem('token');
    console.log(token, ';token');
    if (token) {
      navigation.dispatch(
        StackActions.replace('HomeScreen')
      );
    } else {
      Alert.alert(
        'Oops! No internnet connection',
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      );
    }
  }



  const openURL = (link: string) => {
    Linking.openURL(link);
  }

  return (
    <View style={styles.Container}>
      <LinearGradient colors={['#0052a3', '#00adee']} start={{ x: 0.5, y: 1.2 }} end={{ x: 0.5, y: 0.208 }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={cloud} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width * 900 / 1085, position: 'absolute', top: '35%' }}></Image>
        <Image source={imageBrandName} style={{ alignSelf: 'center', width: Dimensions.get('window').width * .5, height: Dimensions.get('window').width * .5 * 492 / 760, marginBottom: 50 }}></Image>

        <Modal isVisible={openUpdate} >
          <View style={{ width: '80%', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#fff', padding: 25, borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: "center" }}>A new version of Siten Assistant is available now. Please update to get the best experience!</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {!isMustUpdate ?
                <TouchableOpacity style={{ padding: 10, marginTop: 15, alignSelf: 'center' }} onPress={() => {
                  setOpenUpdate(false);
                  checkTrangThai()
                }}>
                  <Text style={{ fontSize: 16, color: 'red' }}>Remind later</Text>
                </TouchableOpacity> : null
              }
              <TouchableOpacity style={{ padding: 10, marginTop: 15, alignSelf: 'center' }} onPress={() => openURL(openAppStore)} >
                <Text style={{ color: 'rgb(0, 138, 203)', fontSize: 16 }}>Update now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
