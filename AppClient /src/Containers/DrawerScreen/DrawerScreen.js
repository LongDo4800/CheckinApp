import React, { useState, useEffect, useReducer, useLayoutEffect } from "react";
import { NavHeader } from "../../Components/Header";
import styles from "./DrawerStyle";
import { Fonts, Colors, Images } from '../../Themes';
import { Icon, Root } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  SafeAreaView,
  Text,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from "react-native";
import mushroom from "../../Api/siten-assistant.api";
import { StackActions } from '@react-navigation/native';
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HideMessage, ShowMessage } from "../../Components/Message";
import { LogoutMode } from "mushroomjs-auth";

const DrawerScreen = ({ navigation }) => {
  const [inforUser, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [nameUser, setName] = useState('');
  const [positionUser, setPosition] = useState('');
  const imageDefault = require('../../Assets/Images/not_avatar.jpg');
  const [token, setToken] = useState('');
  const [isOpenModalLogout, setModalOpen] = useState(false);
  let hasConnection = true;
  let name;
  const [urlAvatar, setUrlAvatar] = useState('');

  const logout = async () => {
    try {
      await mushroom.$auth.logoutAsync({ mode: LogoutMode.InvalidClientSession });
    } catch (error) {
      
    }
    await clearAllData();
    navigation.dispatch(
      StackActions.replace('LoginScreen')
    );
  }

  const clearAllData = async () => {
    await AsyncStorage.clear();
  }

  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      hasConnection = false;
    } else {
      hasConnection = true;
    }
    console.log('check connection');
  });

  const openModalLogout = () => {
    if (hasConnection) {
      setModalOpen(true);
    } else {
      ShowMessage('Whoops! No internet connection found. Check your connection and try again!', 'warning');
      setTimeout(() => {
        HideMessage();
      }, 3000);
    }
  }

  useEffect(() => {
    checkConnection();
    getInforUser();
    // getInforUser();

  }, []);

  const getInforUser = async () => {

    let name = await AsyncStorage.getItem('nameUser');
    let position = await AsyncStorage.getItem('position');
    let url = await AsyncStorage.getItem('urlAvatar');
    setLoading(true);
    if (!name && !position) {
      let token = await AsyncStorage.getItem('token');
      setToken(token)
      console.log(token, 'token');
      fetch('https://timwook.com/api/v2/timers/?userId=$$user_id', {
        method: 'GET',
        headers: {
          'Token': token,
        },
      }).then(data => {
        return data.json();
      }).then(async (data) => {
        console.log(data, 'datadatadata');
        setValue(data.result);
        await AsyncStorage.setItem('nameUser', data.result[0].name);
        await AsyncStorage.setItem('position', data.result[0].position);
        await AsyncStorage.setItem('urlAvatar', data.result[0].avatar);
        setName(data.result[0].name);
        console.log(data, 'hhhhhhhhhhhh');
        setPosition(data.result[0].position);
        setUrlAvatar(data.result[0].avatar);
        console.log(urlAvatar, nameUser, positionUser, 'infor user');
      })
        .catch(error => {
          console.log('Request failed', error);
        });
    } else {
      setName(name);
      setPosition(position);
      setUrlAvatar(url);
    }
    setLoading(false);
  }
  return (

    <Root>
      <View style={styles.Container}>
        {!loading ?
          <View style={styles.imageBackground}>
            <View>
              <ImageBackground source={{
                uri: mushroom.$file.linkBuilder.thumb.id(urlAvatar).square(512).build()
              }} style={styles.image}
              >
                <LinearGradient colors={['rgba(3, 173, 283 , .9)', 'rgba(4,76,135, .9)']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
                  <View style={{ justifyContent: 'flex-start', padding: 10 }}>
                    <Text style={styles.textLarge}>{nameUser}</Text>
                    <Text style={styles.textSmall}>{positionUser}</Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
            <ScrollView>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  paddingBottom: 5,
                }}>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('HomeScreen')}>
                  <View style={styles.wrapIcon}>
                    <Icon name="md-time" type="Ionicons" style={[styles.icon, { color: '#1591e7' }]} />
                  </View>
                  <Text style={{ fontSize: RFValue(13), color: '#1591e7', }}>Timekeeping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ContactsScreen')}>
                  <View style={styles.wrapIcon}>
                    <Icon name="contacts" type="AntDesign" style={styles.icon} />
                  </View>
                  <Text style={styles.Text}>Siteners</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TimwookScreen', { token: token })}>
                  <View style={styles.wrapIcon}>
                    <Image source={Images.LogoTimwook} />
                  </View>
                  <Text style={styles.Text}>Timwook</Text>
                </TouchableOpacity> */}
              </View>
              <View style={{ marginTop: 5 }}>
                {/* <TouchableOpacity style={styles.item}>
              <View style={styles.wrapIcon}>
                <Icon name="shield" type="Feather" style={styles.icon} />
              </View>
              <Text style={styles.Text}>Đổi mật khẩu</Text>
            </TouchableOpacity> */}
                <TouchableOpacity style={styles.item} onPress={() => openModalLogout()}>
                  <View style={styles.wrapIcon}>
                    <Icon
                      name="logout"
                      type="AntDesign"
                      style={[styles.icon, { fontSize: RFValue(13), color: 'red' }]}
                    />
                  </View>
                  <Text style={{ fontSize: RFValue(13), color: 'red', paddingLeft: 5 }}>Log out</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <Modal isVisible={isOpenModalLogout}>
              <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10 }}>
                <Icon name="logout" type="AntDesign" style={[styles.icon, { fontSize: RFValue(40), color: 'red', alignSelf: 'center' }]} />
                <Text style={{ textAlign: 'center', fontSize: RFValue(14), fontWeight: 'bold' }}>Are you sure to log out?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                  <TouchableOpacity onPress={() => setModalOpen(false)}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#1e90ff', borderRadius: 10, width: 150 }}>
                      <Text style={{ color: '#fff', textAlign: 'center', fontSize: RFValue(11) }}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => logout()}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#dc3545', borderRadius: 10, width: 150 }}>
                      <Text style={{ color: '#fff', textAlign: 'center', fontSize: RFValue(11) }}>Log me out</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View> : null}
      </View>
    </Root >
  )
}
export default DrawerScreen;
